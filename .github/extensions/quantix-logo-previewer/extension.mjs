import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { CanvasError, createCanvas, joinSession } from '@github/copilot-sdk/extension';
import declaration from './extension.json' with { type: 'json' };
import { createPreviewPage } from './preview-page.mjs';

const instances = new Map();

function closeServer(server) {
  return new Promise((resolve) => {
    if (!server.listening) {
      resolve();
      return;
    }
    server.close(resolve);
  });
}

function resolveLogoPath(workspaceRoot) {
  return path.resolve(workspaceRoot, 'images', 'logo.svg');
}

function getWorkspaceRoot(input) {
  if (input && typeof input.workspaceRoot === 'string' && input.workspaceRoot.trim()) {
    return path.resolve(input.workspaceRoot);
  }
  return process.cwd();
}

async function openPreview({ instanceId, input }) {
  const existing = instances.get(instanceId);
  if (existing) {
    await closeServer(existing.server);
    instances.delete(instanceId);
  }

  const workspaceRoot = getWorkspaceRoot(input);
  const logoPath = resolveLogoPath(workspaceRoot);
  let logo;
  try {
    logo = await fs.readFile(logoPath, 'utf8');
  } catch (error) {
    throw new CanvasError('logo_not_found', `Could not read Quantix logo at ${logoPath}`);
  }

  const state = { background: 'light' };
  const html = createPreviewPage(logo);

  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url || '/', 'http://127.0.0.1');

    if (url.pathname === '/' && request.method === 'GET') {
      response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      response.end(html);
      return;
    }

    if (url.pathname === '/api/state' && request.method === 'GET') {
      response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify(state));
      return;
    }

    if (url.pathname === '/api/background' && request.method === 'POST') {
      let body = '';
      for await (const chunk of request) body += chunk;
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        response.writeHead(400, { 'content-type': 'application/json' });
        response.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      if (!['light', 'dark', 'green', 'transparent'].includes(parsed.background)) {
        response.writeHead(400, { 'content-type': 'application/json' });
        response.end(JSON.stringify({ error: 'Invalid background' }));
        return;
      }
      state.background = parsed.background;
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify(state));
      return;
    }

    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    server.close();
    throw new CanvasError('server_start_failed', 'Could not start the logo preview server');
  }

  instances.set(instanceId, { server, state });
  return `http://127.0.0.1:${address.port}/`;
}

const actionHandlers = {
  set_background: async ({ instanceId, input }) => {
    const instance = instances.get(instanceId);
    if (!instance) throw new CanvasError('instance_not_found', 'Open the logo preview before changing its background');
    if (!input || !['light', 'dark', 'green', 'transparent'].includes(input.background)) {
      throw new CanvasError('invalid_background', 'Choose light, dark, green, or transparent');
    }
    instance.state.background = input.background;
    return { background: input.background };
  },
};

await joinSession({
  canvases: declaration.canvases.map((canvas) => createCanvas({
    ...canvas,
    actions: canvas.actions?.map((action) => ({
      ...action,
      handler: actionHandlers[action.name],
    })),
    open: openPreview,
    onClose: async ({ instanceId }) => {
      const instance = instances.get(instanceId);
      if (instance) {
        await closeServer(instance.server);
        instances.delete(instanceId);
      }
    },
  })),
});

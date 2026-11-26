'use strict';
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

app.use(compression());
app.use((req, res, next) => {
  const forwardedProto = String(req.headers['x-forwarded-proto'] || req.protocol)
    .split(',')[0].trim().toLowerCase();
  const hostname = (req.headers.host || '').toLowerCase().split(':')[0];
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';

  if (!isLocalHost && (forwardedProto !== 'https' || hostname !== 'quantixtools.com')) {
    return res.redirect(301, `https://quantixtools.com${req.originalUrl}`);
  }

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(self)');
  next();
});

const G410 = `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><title>410 Gone</title>
<meta name="robots" content="noindex,nofollow">
</head><body><p>This page has been permanently removed.
<a href="https://quantixtools.com/">QuantixTools — Free Islamic Tools</a></p></body></html>`;

const gonePaths = [
  '/blog',
  '/blog/best-ai-summarizer-tools',
  '/blog/ai-tools-for-students',
  '/blog/ai-tools',
  '/blog/compress-pdf-without-losing-quality',
  '/blog/pdf-to-word-free',
  '/tools',
  '/tools/ai-blog-generator',
  '/tools/text-to-speech',
  '/tools/mp3-cutter',
  '/tools/resize-image',
  '/tools/qr-code-generator',
  '/tools/qr-scanner',
  '/tools/password-generator',
  '/tools/image-cropper',
  '/tools/remove-background',
  '/tools/compress-image',
  '/tools/merge-pdf',
  '/tools/ai-chat',
  '/tools/ai-summarizer',
  '/tools/compress-pdf',
  '/tools/trim-video',
  '/tools/rotate-pdf',
  '/tools/scientific-calculator',
  '/tools/merge-videos',
  '/tools/voice-recorder',
  '/tools/currency-converter',
  '/tools/ai-paraphraser',
  '/tools/jpg-to-pdf',
  '/tools/pdf-to-word',
  '/tools/ai-meeting-notes',
  '/tools/blur-background',
  '/tools/fancy-font',
  '/tools/habit-tracker',
  '/tools/serp-preview',
  '/tools/developer',
  '/tools/youtube-title-generator',
  '/tools/productivity',
  '/tools/essay-writer',
  '/tools/ai-translator',
  '/tools/compress-video',
  '/tools/pdf-to-excel',
  '/tools/regex-tester',
  '/tools/ai-tweet-generator',
  '/tools/pdf-to-text',
  '/tools/extract-audio',
  '/tools/webcam-recorder',
  '/tools/audio-converter',
  '/tools/business',
  '/tools/student',
  '/tools/seo',
  '/tools/image',
  '/bangkok',
  '/world-clock-widget',
  '/world-clock',
  '/ai-meeting-planner',
  '/time-management-tips',
  '/time-calculator',
  '/meeting-planner',
  '/timezone',
  '/timezone-converter',
  '/city-time',
  '/freextool',
  '/singapore',
  '/london',
  '/sydney',
  '/riyadh',
  '/abu-dhabi',
  '/time-difference/new-york-and-london',
  '/time-difference/london-and-singapore',
  '/api/indexnow',
];
gonePaths.forEach((pathname) => {
  app.get([pathname, `${pathname}/`], (_req, res) => res.status(410).send(G410));
});

const PAGE_ROUTES = {
  '/': 'index.html',
  '/zakat-calculator/': 'pages/zakat/index.html',
  '/zakat-calculator/gold/': 'pages/zakat/gold.html',
  '/zakat-calculator/crypto/': 'pages/zakat/crypto.html',
  '/zakat-calculator/nisab/': 'pages/zakat/nisab.html',
  '/zakat-calculator/stocks/': 'pages/zakat/stocks.html',
  '/zakat-calculator/business/': 'pages/zakat/business.html',
  '/halal-food-checker/': 'pages/halal/index.html',
  '/halal-food-checker/scanner/': 'pages/halal/scanner.html',
  '/halal-food-checker/e102/': 'pages/halal/e102.html',
  '/halal-food-checker/e110/': 'pages/halal/e110.html',
  '/halal-food-checker/e120/': 'pages/halal/e120.html',
  '/halal-food-checker/e150/': 'pages/halal/e150.html',
  '/halal-food-checker/e160a/': 'pages/halal/e160a.html',
  '/halal-food-checker/e300/': 'pages/halal/e300.html',
  '/halal-food-checker/e407/': 'pages/halal/e407.html',
  '/halal-food-checker/e422/': 'pages/halal/e422.html',
  '/halal-food-checker/e441/': 'pages/halal/e441.html',
  '/halal-food-checker/e471/': 'pages/halal/e471.html',
  '/halal-food-checker/e621/': 'pages/halal/e621.html',
  '/about/': 'about.html',
  '/contact/': 'contact.html',
  '/privacy-policy/': 'privacy-policy.html',
  '/terms/': 'terms.html',
};

const legacyRedirects = {
  '/index.html': '/',
  '/pages/zakat/index.html': '/zakat-calculator/',
  '/pages/zakat/gold.html': '/zakat-calculator/gold/',
  '/pages/zakat/crypto.html': '/zakat-calculator/crypto/',
  '/pages/zakat/nisab.html': '/zakat-calculator/nisab/',
  '/pages/zakat/stocks.html': '/zakat-calculator/stocks/',
  '/pages/zakat/business.html': '/zakat-calculator/business/',
  '/pages/halal/index.html': '/halal-food-checker/',
  '/pages/halal/scanner.html': '/halal-food-checker/scanner/',
  '/pages/halal/e102.html': '/halal-food-checker/e102/',
  '/pages/halal/e110.html': '/halal-food-checker/e110/',
  '/pages/halal/e120.html': '/halal-food-checker/e120/',
  '/pages/halal/e150.html': '/halal-food-checker/e150/',
  '/pages/halal/e160a.html': '/halal-food-checker/e160a/',
  '/pages/halal/e300.html': '/halal-food-checker/e300/',
  '/pages/halal/e407.html': '/halal-food-checker/e407/',
  '/pages/halal/e422.html': '/halal-food-checker/e422/',
  '/pages/halal/e441.html': '/halal-food-checker/e441/',
  '/pages/halal/e471.html': '/halal-food-checker/e471/',
  '/pages/halal/e621.html': '/halal-food-checker/e621/',
  '/halal-food-checker.html': '/halal-food-checker/',
  '/zakat-crypto.html': '/zakat-calculator/crypto/',
  '/about.html': '/about/',
  '/contact.html': '/contact/',
  '/contact-us': '/contact/',
  '/contact-us/': '/contact/',
  '/privacy-policy.html': '/privacy-policy/',
  '/terms.html': '/terms/',
  '/privacy': '/privacy-policy/',
  '/privacy/': '/privacy-policy/',
  '/ar': '/',
  '/ar/': '/',
  '/ar/halal-food-checker/': '/halal-food-checker/',
  '/ar/halal-food-checker/e471/': '/halal-food-checker/e471/',
  '/ar/halal-food-checker/e120/': '/halal-food-checker/e120/',
  '/ar/zakat-calculator/gold/': '/zakat-calculator/gold/',
  '/ar/zakat-calculator/crypto/': '/zakat-calculator/crypto/',
  '/zakat-calculator/uae/': '/zakat-calculator/',
  '/zakat-calculator/usa/': '/zakat-calculator/',
  '/zakat-calculator/saudi-arabia/': '/zakat-calculator/',
};
app.use((req, res, next) => {
  const target = legacyRedirects[req.path];
  if (target) return res.redirect(301, `${target}${req.url.slice(req.path.length)}`);

  if (
    req.path !== '/' &&
    !req.path.endsWith('/') &&
    Object.prototype.hasOwnProperty.call(PAGE_ROUTES, `${req.path}/`)
  ) {
    return res.redirect(301, `/${req.path.slice(1)}/${req.url.slice(req.path.length)}`);
  }
  next();
});

const S = (file) => (_req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(path.join(__dirname, file));
};
Object.entries(PAGE_ROUTES)
  .filter(([route]) => route !== '/')
  .forEach(([route, file]) => app.get(route, S(file)));
app.get('/', (req, res) => {
  res.vary('Accept');
  res.set(
    'Link',
    '<https://quantixtools.com/llms.txt>; rel="describedby"; type="text/plain", ' +
      '<https://quantixtools.com/?format=markdown>; rel="alternate"; type="text/markdown"',
  );

  const accept = (req.get('Accept') || '').toLowerCase();
  if (req.query.format === 'markdown' || accept.split(',').some((type) =>
    type.trim().split(';')[0] === 'text/markdown')) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.type('text/markdown').sendFile(path.join(__dirname, 'index.md'));
  }

  return S(PAGE_ROUTES['/'])(req, res);
});
app.get('/robots.txt', S('robots.txt'));
app.get('/sitemap.xml', S('sitemap.xml'));
app.get('/ads.txt', S('ads.txt'));
app.get('/llms.txt', (_req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.type('text/plain').sendFile(path.join(__dirname, 'llms.txt'));
});
app.get('/.well-known/mcp/server-card.json', (_req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.type('application/json').sendFile(
    path.join(__dirname, '.well-known', 'mcp', 'server-card.json'),
  );
});

const legacyENumbers = [
  'e100','e101','e102','e104','e110','e120','e122','e124','e127','e129',
  'e131','e132','e133','e140','e141','e150','e150a','e150b','e150c','e150d',
  'e153','e160','e160a','e160b','e160c','e161b','e162','e163','e170','e171',
  'e200','e202','e210','e211','e220','e250','e251','e270','e280','e296',
  'e300','e306','e321','e322','e330','e338','e340','e341','e385','e401',
  'e404','e407','e410','e412','e414','e415','e417','e418','e420','e422',
  'e430','e431','e433','e440','e441','e442','e450','e451','e460','e461',
  'e466','e471','e472','e472b','e472c','e472e','e473','e476','e481','e482',
  'e483','e491','e492','e500','e501','e503','e516','e551','e621','e627',
  'e631','e635','e901','e903','e904','e920','e950','e951','e952','e954',
  'e955','e960','e965','e1412','e1420','e1422','e1442',
];
legacyENumbers.forEach((code) => {
  const slug = code.toLowerCase();
  const route = `/halal-food-checker/${slug}/`;
  if (PAGE_ROUTES[route]) return;

  app.get([`/halal-food-checker/${slug}`, route], (_req, res) => {
    res.redirect(301, `/halal-food-checker/?q=${code.toUpperCase()}`);
  });
});

app.use('/css', express.static(path.join(__dirname, 'css'), {
  maxAge: 0,
  dotfiles: 'ignore',
}));
app.use('/js', express.static(path.join(__dirname, 'js'), {
  maxAge: 0,
  dotfiles: 'ignore',
}));
app.use('/images', express.static(path.join(__dirname, 'images'), {
  maxAge: '7d',
  dotfiles: 'ignore',
}));

app.use((_req, res) => res.status(404).sendFile(path.join(__dirname, '404.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`QuantixTools :${PORT}`));

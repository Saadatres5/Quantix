// QuantixTools — Production server for Hostinger Node.js hosting
'use strict';

const express = require('express');
const path    = require('path');
const app     = express();

// ── 1. HTTPS + www → bare domain (301) ────────────────────────
app.use((req, res, next) => {
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  const host  = (req.headers.host || '').toLowerCase();
  if (proto !== 'https' || host.startsWith('www.')) {
    const cleanHost = host.startsWith('www.') ? host.slice(4) : host;
    return res.redirect(301, `https://${cleanHost}${req.originalUrl}`);
  }
  next();
});

// ── 2. Static files ────────────────────────────────────────────
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  index: false,
  dotfiles: 'ignore',
}));

// ── 3. 410 GONE — MyZoneTime ghost pages still in Google index ─
// These pages never existed on QuantixTools — tell Google to drop them
const GHOST_PAGES_410 = [
  '/blog', '/blog/', '/blog/best-ai-summarizer-tools',
  '/blog/ai-tools-for-students',
  '/tools', '/tools/',
  '/tools/ai-blog-generator', '/tools/mp3-cutter',
  '/tools/resize-image', '/tools/qr-code-generator',
  '/tools/merge-pdf', '/tools/qr-scanner',
  '/tools/password-generator', '/tools/business',
  '/tools/student', '/tools/seo', '/tools/image',
  '/tools/remove-background', '/tools/compress-image',
  '/tools/image-cropper', '/tools/ai-paraphraser',
  '/tools/ai-meeting-notes',
  '/bangkok', '/world-clock-widget', '/ai-meeting-planner',
  '/time-management-tips', '/freextool',
  // Old MyZoneTime routes
  '/timezone', '/world-clock', '/city-time',
];
GHOST_PAGES_410.forEach(p => {
  // handle both with and without trailing slash
  [p, p.endsWith('/') ? p.slice(0,-1) : p+'/'].forEach(variant => {
    app.get(variant, (req, res) => {
      res.status(410).send(`<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><title>410 Gone — QuantixTools</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://quantixtools.com/">
</head><body>
<h1>410 — Page No Longer Exists</h1>
<p>This page has been permanently removed. Visit <a href="https://quantixtools.com/">QuantixTools</a>.</p>
</body></html>`);
    });
  });
});

// ── 4. Missing trailing slash → add it (301) ──────────────────
const SLASH_REDIRECTS = [
  '/zakat-calculator', '/halal-food-checker',
  '/zakat-calculator/gold', '/zakat-calculator/crypto',
  '/zakat-calculator/nisab',
  '/halal-food-checker/e471', '/halal-food-checker/e441',
  '/halal-food-checker/e120', '/halal-food-checker/scanner',
  '/about', '/contact', '/privacy-policy', '/terms',
  // Fix "privacy" without -policy (GSC shows /privacy getting traffic)
  '/privacy',
];
SLASH_REDIRECTS.forEach(p => {
  app.get(p, (req, res) => {
    // /privacy → /privacy-policy/
    if (p === '/privacy') return res.redirect(301, '/privacy-policy/');
    res.redirect(301, p + '/');
  });
});

// ── 5. Raw .html / /pages/* → canonical clean URL (301) ───────
const RAW_TO_CANONICAL = {
  '/pages/zakat/index.html':   '/zakat-calculator/',
  '/pages/zakat/gold.html':    '/zakat-calculator/gold/',
  '/pages/zakat/crypto.html':  '/zakat-calculator/crypto/',
  '/pages/zakat/nisab.html':   '/zakat-calculator/nisab/',
  '/pages/halal/index.html':   '/halal-food-checker/',
  '/pages/halal/e471.html':    '/halal-food-checker/e471/',
  '/pages/halal/e441.html':    '/halal-food-checker/e441/',
  '/pages/halal/e120.html':    '/halal-food-checker/e120/',
  '/pages/halal/scanner.html': '/halal-food-checker/scanner/',
  '/halal-food-checker.html':  '/halal-food-checker/',
  '/zakat-crypto.html':        '/zakat-calculator/crypto/',
  '/about.html':               '/about/',
  '/contact.html':             '/contact/',
  '/privacy-policy.html':      '/privacy-policy/',
  '/terms.html':               '/terms/',
  // GSC-reported raw paths still being indexed
  '/privacy-policy':           '/privacy-policy/',
  '/about':                    '/about/',
};
Object.entries(RAW_TO_CANONICAL).forEach(([from, to]) => {
  app.get(from, (req, res) => res.redirect(301, to));
});

// ── 6. /ar/ → handled by JS lang switcher ─────────────────────
app.get(['/ar', '/ar/'], (req, res) => res.redirect(301, '/'));

// ── 7. Speculative E-number pages → halal checker ─────────────
// GSC shows traffic for E-numbers not yet on the site
const ENUMBER_CATCH = [
  'e621','e110','e412','e270','e150','e150c','e150d',
  'e200','e153','e631','e422','e476','e481','e102',
  'e407','e415','e472','e466','e501','e420','e440',
  'e160a','e160c','e161b','e162','e163','e170','e171',
  'e211','e296','e306','e321','e341','e401','e410',
  'e417','e433','e442','e451','e482','e492','e503',
  'e551','e627','e950','e1422','e472b','e472e',
];
ENUMBER_CATCH.forEach(e => {
  app.get(`/halal-food-checker/${e}/`, (req, res) =>
    res.redirect(301, `/halal-food-checker/?q=${e.toUpperCase()}`));
  app.get(`/halal-food-checker/${e}`, (req, res) =>
    res.redirect(301, `/halal-food-checker/?q=${e.toUpperCase()}`));
});

// ── 8. Clean URL routes → serve HTML files ────────────────────
app.get('/',                            (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/zakat-calculator/',           (req, res) => res.sendFile(path.join(__dirname, 'pages/zakat/index.html')));
app.get('/zakat-calculator/gold/',      (req, res) => res.sendFile(path.join(__dirname, 'pages/zakat/gold.html')));
app.get('/zakat-calculator/crypto/',    (req, res) => res.sendFile(path.join(__dirname, 'pages/zakat/crypto.html')));
app.get('/zakat-calculator/nisab/',     (req, res) => res.sendFile(path.join(__dirname, 'pages/zakat/nisab.html')));
app.get('/halal-food-checker/',         (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/index.html')));
app.get('/halal-food-checker/e471/',    (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/e471.html')));
app.get('/halal-food-checker/e441/',    (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/e441.html')));
app.get('/halal-food-checker/e120/',    (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/e120.html')));
app.get('/halal-food-checker/scanner/', (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/scanner.html')));
app.get('/about/',                      (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact/',                    (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/privacy-policy/',             (req, res) => res.sendFile(path.join(__dirname, 'privacy-policy.html')));
app.get('/terms/',                      (req, res) => res.sendFile(path.join(__dirname, 'terms.html')));

// ── 9. 404 → branded 404 page ─────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`QuantixTools running on :${PORT}`));

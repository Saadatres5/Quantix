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

// ── 2. Static files (css, js, images, ads.txt, robots.txt …) ──
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  index: false,          // we handle / ourselves
  dotfiles: 'ignore',
}));

// ── 3. Raw .html / /pages/* → canonical clean URL (301) ───────
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
};
Object.entries(RAW_TO_CANONICAL).forEach(([from, to]) => {
  app.get(from, (req, res) => res.redirect(301, to));
});

// ── 4. Missing trailing slash → add it (301) ──────────────────
const SLASH_REDIRECTS = [
  '/zakat-calculator',
  '/halal-food-checker',
  '/zakat-calculator/gold',
  '/zakat-calculator/crypto',
  '/zakat-calculator/nisab',
  '/halal-food-checker/e471',
  '/halal-food-checker/e441',
  '/halal-food-checker/e120',
  '/halal-food-checker/scanner',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
];
SLASH_REDIRECTS.forEach(p => {
  app.get(p, (req, res) => res.redirect(301, p + '/'));
});

// ── 5. /ar/ — removed, i18n is JS-based; redirect to homepage ─
app.get('/ar/', (req, res) => res.redirect(301, '/'));
app.get('/ar',  (req, res) => res.redirect(301, '/'));

// ── 6. Broken internal links found in HTML → redirect to correct pages ──
const BROKEN_TO_FIXED = {
  // /pages/halal/*.html with trailing slash (browser adds it)
  '/pages/halal/e471.html/':    '/halal-food-checker/e471/',
  '/pages/halal/e441.html/':    '/halal-food-checker/e441/',
  '/pages/halal/e120.html/':    '/halal-food-checker/e120/',
  '/pages/halal/scanner.html/': '/halal-food-checker/scanner/',
  '/pages/zakat/crypto.html/':  '/zakat-calculator/crypto/',
  '/pages/zakat/gold.html/':    '/zakat-calculator/gold/',
  '/pages/zakat/nisab.html/':   '/zakat-calculator/nisab/',
  // Speculative country/topic pages → redirect to parent tool
  '/zakat-calculator/uae/':        '/zakat-calculator/',
  '/zakat-calculator/saudi-arabia/': '/zakat-calculator/',
  '/zakat-calculator/pakistan/':    '/zakat-calculator/',
  '/zakat-calculator/malaysia/':    '/zakat-calculator/',
  '/zakat-calculator/uk/':          '/zakat-calculator/',
  '/zakat-calculator/usa/':         '/zakat-calculator/',
  '/zakat-calculator/stocks/':      '/zakat-calculator/',
  '/zakat-calculator/business/':    '/zakat-calculator/',
  '/halal-food-checker/e422/':      '/halal-food-checker/',
  '/halal-food-checker/e476/':      '/halal-food-checker/',
  '/halal-food-checker/e481/':      '/halal-food-checker/',
  '/halal-food-checker/gelatin/':   '/halal-food-checker/e441/',
  '/halal-food-checker/halal-list/':'/halal-food-checker/',
  '/halal-food-checker/haram-list/':'/halal-food-checker/',
};
Object.entries(BROKEN_TO_FIXED).forEach(([from, to]) => {
  app.get(from, (req, res) => res.redirect(301, to));
});

// ── 7. Clean URL routes → serve HTML files ────────────────────
app.get('/',                         (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/zakat-calculator/',        (req, res) => res.sendFile(path.join(__dirname, 'pages/zakat/index.html')));
app.get('/zakat-calculator/gold/',   (req, res) => res.sendFile(path.join(__dirname, 'pages/zakat/gold.html')));
app.get('/zakat-calculator/crypto/', (req, res) => res.sendFile(path.join(__dirname, 'pages/zakat/crypto.html')));
app.get('/zakat-calculator/nisab/',  (req, res) => res.sendFile(path.join(__dirname, 'pages/zakat/nisab.html')));
app.get('/halal-food-checker/',      (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/index.html')));
app.get('/halal-food-checker/e471/', (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/e471.html')));
app.get('/halal-food-checker/e441/', (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/e441.html')));
app.get('/halal-food-checker/e120/', (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/e120.html')));
app.get('/halal-food-checker/scanner/', (req, res) => res.sendFile(path.join(__dirname, 'pages/halal/scanner.html')));
app.get('/about/',          (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact/',        (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/privacy-policy/', (req, res) => res.sendFile(path.join(__dirname, 'privacy-policy.html')));
app.get('/terms/',          (req, res) => res.sendFile(path.join(__dirname, 'terms.html')));

// ── 8. 404 handler ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`QuantixTools on :${PORT}`));

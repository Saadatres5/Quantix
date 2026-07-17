'use strict';
const express = require('express');
const path    = require('path');
const app     = express();

// ── 1. HTTPS + www → bare domain 301 ──────────────────────────
app.use((req, res, next) => {
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  const host  = (req.headers.host || '').toLowerCase();
  if (proto !== 'https' || host.startsWith('www.')) {
    const h = host.startsWith('www.') ? host.slice(4) : host;
    return res.redirect(301, `https://${h}${req.originalUrl}`);
  }
  next();
});

// ── 2. Static assets ──────────────────────────────────────────
app.use(express.static(path.join(__dirname), {
  extensions: ['html'], index: false, dotfiles: 'ignore'
}));

// ── 3. 410 GONE — every MyZoneTime/ghost page Google still has ─
const G410 = `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><title>410 Gone</title>
<meta name="robots" content="noindex,nofollow">
<link rel="canonical" href="https://quantixtools.com/">
</head><body><p>This page has been permanently removed.
<a href="https://quantixtools.com/">QuantixTools — Free Islamic Tools</a></p></body></html>`;

const GONE = [
  // MyZoneTime blog ghost pages
  '/blog','/blog/',
  '/blog/best-ai-summarizer-tools','/blog/best-ai-summarizer-tools/',
  '/blog/ai-tools-for-students','/blog/ai-tools-for-students/',
  '/blog/ai-tools','/blog/ai-tools/',
  // MyZoneTime tool ghost pages
  '/tools','/tools/',
  '/tools/ai-blog-generator','/tools/ai-blog-generator/',
  '/tools/mp3-cutter','/tools/mp3-cutter/',
  '/tools/resize-image','/tools/resize-image/',
  '/tools/qr-code-generator','/tools/qr-code-generator/',
  '/tools/merge-pdf','/tools/merge-pdf/',
  '/tools/qr-scanner','/tools/qr-scanner/',
  '/tools/password-generator','/tools/password-generator/',
  '/tools/image-cropper','/tools/image-cropper/',
  '/tools/remove-background','/tools/remove-background/',
  '/tools/compress-image','/tools/compress-image/',
  '/tools/image','/tools/image/',
  '/tools/business','/tools/business/',
  '/tools/student','/tools/student/',
  '/tools/seo','/tools/seo/',
  '/tools/ai-meeting-notes','/tools/ai-meeting-notes/',
  '/tools/ai-paraphraser','/tools/ai-paraphraser/',
  '/tools/blur-background','/tools/blur-background/',
  // MyZoneTime pages
  '/bangkok','/bangkok/',
  '/world-clock-widget','/world-clock-widget/',
  '/world-clock','/world-clock/',
  '/ai-meeting-planner','/ai-meeting-planner/',
  '/time-management-tips','/time-management-tips/',
  '/timezone','/timezone/',
  '/city-time','/city-time/',
  '/freextool','/freextool/',
];
GONE.forEach(p => app.get(p, (_req, res) => res.status(410).send(G410)));

// ── 4. Trailing slash enforcer 301 ────────────────────────────
['/zakat-calculator','/halal-food-checker',
 '/zakat-calculator/gold','/zakat-calculator/crypto',
 '/zakat-calculator/nisab',
 '/halal-food-checker/e471','/halal-food-checker/e441',
 '/halal-food-checker/e120','/halal-food-checker/scanner',
 '/about','/contact','/privacy-policy','/terms',
 '/privacy','/privacy-policy',
].forEach(p => app.get(p, (req, res) => {
  if (p === '/privacy') return res.redirect(301, '/privacy-policy/');
  res.redirect(301, p + '/');
}));

// ── 5. Raw .html → canonical 301 ─────────────────────────────
({
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
}).forEach ? Object.entries({
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
}).forEach(([f,t]) => app.get(f, (_,r) => r.redirect(301, t))) : null;

// ── 6. /ar/ → homepage ───────────────────────────────────────
app.get(['/ar','/ar/'], (_,r) => r.redirect(301,'/'));

// ── 7. E-number deep links → checker with auto-search ─────────
['e100','e101','e102','e104','e110','e120','e122','e124','e127',
 'e129','e131','e132','e133','e140','e141','e150','e150a','e150b',
 'e150c','e150d','e153','e160','e160a','e160b','e160c','e161b',
 'e162','e163','e170','e171','e200','e202','e210','e211','e220',
 'e250','e251','e270','e280','e296','e300','e306','e321','e322',
 'e330','e338','e340','e341','e385','e401','e404','e407','e410',
 'e412','e414','e415','e417','e418','e420','e422','e430','e431',
 'e433','e440','e441','e442','e450','e451','e460','e461','e466',
 'e471','e472','e472b','e472c','e472e','e473','e476','e481','e482',
 'e483','e491','e492','e500','e501','e503','e516','e551','e621',
 'e627','e631','e635','e901','e903','e904','e920','e950','e951',
 'e952','e954','e955','e960','e965','e1412','e1420','e1422','e1442',
].forEach(e => {
  [
    `/halal-food-checker/${e}`,
    `/halal-food-checker/${e}/`,
    `/halal-food-checker/${e.toUpperCase()}`,
    `/halal-food-checker/${e.toUpperCase()}/`,
  ].forEach(p => app.get(p, (_,r) =>
    r.redirect(301, `/halal-food-checker/?q=${e.toUpperCase()}`)));
});

// ── 8. Main page routes ───────────────────────────────────────
const S = (f) => (_, r) => r.sendFile(path.join(__dirname, f));
app.get('/',                            S('index.html'));
app.get('/zakat-calculator/',           S('pages/zakat/index.html'));
app.get('/zakat-calculator/gold/',      S('pages/zakat/gold.html'));
app.get('/zakat-calculator/crypto/',    S('pages/zakat/crypto.html'));
app.get('/zakat-calculator/nisab/',     S('pages/zakat/nisab.html'));
app.get('/halal-food-checker/',         S('pages/halal/index.html'));
app.get('/halal-food-checker/e471/',    S('pages/halal/e471.html'));
app.get('/halal-food-checker/e441/',    S('pages/halal/e441.html'));
app.get('/halal-food-checker/e120/',    S('pages/halal/e120.html'));
app.get('/halal-food-checker/scanner/', S('pages/halal/scanner.html'));
app.get('/about/',                      S('about.html'));
app.get('/contact/',                    S('contact.html'));
app.get('/privacy-policy/',             S('privacy-policy.html'));
app.get('/terms/',                      S('terms.html'));

// ── 9. 404 ────────────────────────────────────────────────────
app.use((_,r) => r.status(404).sendFile(path.join(__dirname,'404.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`QuantixTools :${PORT}`));

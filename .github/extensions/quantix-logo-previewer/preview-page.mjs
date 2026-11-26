export function createPreviewPage(logoSvg) {
  const encodedLogo = logoSvg.replaceAll('</script>', '<\\/script>');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Quantix Logo Preview</title>
  <style>
    :root { color-scheme: light; --ink:#102319; --green:#0a5c3f; --surface:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family:system-ui,-apple-system,"Segoe UI",sans-serif; color:var(--ink); background:#eef3ef; }
    main { min-height:100vh; padding:32px; }
    .header { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:24px; }
    h1 { margin:0; font-size:22px; letter-spacing:-0.02em; }
    .controls { display:flex; gap:8px; flex-wrap:wrap; }
    button { border:1px solid #ccd8d1; background:#fff; color:#153524; border-radius:10px; padding:9px 12px; font-weight:700; cursor:pointer; }
    button[aria-pressed="true"] { background:var(--green); border-color:var(--green); color:#fff; }
    button:focus-visible { outline:3px solid #72a890; outline-offset:2px; }
    .grid { display:grid; grid-template-columns:minmax(280px,1fr) 280px; gap:24px; }
    .stage { min-height:480px; display:grid; place-items:center; border-radius:20px; transition:background .2s; box-shadow:0 12px 32px rgba(16,35,25,.08); }
    .stage[data-background="light"] { background:#f8faf9; }
    .stage[data-background="dark"] { background:#16221b; }
    .stage[data-background="green"] { background:#0a5c3f; }
    .stage[data-background="transparent"] { background-color:#fff; background-image:linear-gradient(45deg,#e5ebe7 25%,transparent 25%),linear-gradient(-45deg,#e5ebe7 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5ebe7 75%),linear-gradient(-45deg,transparent 75%,#e5ebe7 75%); background-size:24px 24px; background-position:0 0,0 12px,12px -12px,-12px 0; }
    .logo { width:min(72%,360px); height:auto; filter:drop-shadow(0 10px 20px rgba(16,35,25,.12)); }
    .sizes { display:grid; gap:12px; align-content:start; }
    .size-card { background:#fff; border:1px solid #dde6e1; border-radius:16px; padding:16px; display:flex; align-items:center; gap:14px; }
    .size-card strong { margin-left:auto; color:#607066; font-size:13px; }
    .size-card img { display:block; height:auto; }
    .size-128 { width:128px; }.size-64 { width:64px; }.size-32 { width:32px; }.size-16 { width:16px; }
    @media (max-width:760px) { main{padding:20px}.grid{grid-template-columns:1fr}.stage{min-height:360px}.sizes{grid-template-columns:repeat(2,minmax(0,1fr))}.size-card{flex-wrap:wrap}.size-card strong{width:100%;margin:0} }
  </style>
</head>
<body>
  <main>
    <header class="header">
      <h1>Quantix logo</h1>
      <nav class="controls" aria-label="Preview background">
        <button type="button" data-background="light" aria-pressed="true">Light</button>
        <button type="button" data-background="dark" aria-pressed="false">Dark</button>
        <button type="button" data-background="green" aria-pressed="false">Green</button>
        <button type="button" data-background="transparent" aria-pressed="false">Transparent</button>
      </nav>
    </header>
    <section class="grid" aria-label="Logo previews">
      <div class="stage" data-background="light" aria-label="Large logo preview">
        <img class="logo" alt="Quantix logo" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(encodedLogo)}">
      </div>
      <aside class="sizes" aria-label="Common favicon sizes">
        ${[128,64,32,16].map((size) => `<div class="size-card"><img class="size-${size}" alt="" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(encodedLogo)}"><strong>${size}px</strong></div>`).join('')}
      </aside>
    </section>
  </main>
  <script>
    const stage = document.querySelector('.stage');
    const buttons = [...document.querySelectorAll('button[data-background]')];
    async function setBackground(background) {
      stage.dataset.background = background;
      for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.background === background));
    }
    buttons.forEach((button) => button.addEventListener('click', async () => {
      const response = await fetch('/api/background', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({background:button.dataset.background}) });
      if (response.ok) setBackground((await response.json()).background);
    }));
    fetch('/api/state').then((response) => response.json()).then(({background}) => setBackground(background));
  </script>
</body>
</html>`;
}

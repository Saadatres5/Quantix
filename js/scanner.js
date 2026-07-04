/* QuantixTools — Product Halal Scanner */
/* Scans barcode -> Open Food Facts API -> matches ingredients against E-number database */

(function () {
  'use strict';

  let html5QrCode = null;
  let isScanning = false;

  /* ── Status helpers ── */
  function setStatus(msg, type) {
    const el = document.getElementById('scan-status');
    if (!el) return;
    el.textContent = msg;
    el.className = 'scan-status' + (type ? ' scan-status-' + type : '');
  }

  function showSection(id) {
    ['scan-idle', 'scan-active', 'scan-loading', 'scan-result', 'scan-error'].forEach(s => {
      const el = document.getElementById(s);
      if (el) el.style.display = s === id ? 'block' : 'none';
    });
  }

  /* ── Start camera scanning ── */
  window.startScan = function () {
    if (isScanning) return;
    showSection('scan-active');
    setStatus('Point your camera at a barcode', 'info');

    if (typeof Html5Qrcode === 'undefined') {
      setStatus('Scanner library failed to load. Check your connection.', 'error');
      showSection('scan-error');
      return;
    }

    html5QrCode = new Html5Qrcode('qr-reader');
    const config = { fps: 10, qrbox: { width: 250, height: 150 }, aspectRatio: 1.5 };

    html5QrCode.start(
      { facingMode: 'environment' },
      config,
      (decodedText) => {
        onBarcodeDetected(decodedText);
      },
      () => { /* ignore per-frame scan failures */ }
    ).then(() => {
      isScanning = true;
    }).catch((err) => {
      setStatus('Camera access denied or unavailable. Try manual entry below.', 'error');
      console.error('Scanner start error:', err);
    });
  };

  /* ── Stop scanning ── */
  window.stopScan = function () {
    if (html5QrCode && isScanning) {
      html5QrCode.stop().then(() => {
        isScanning = false;
        showSection('scan-idle');
      }).catch(() => {});
    } else {
      showSection('scan-idle');
    }
  };

  /* ── Manual barcode entry ── */
  window.submitManualBarcode = function () {
    const input = document.getElementById('manual-barcode');
    const code = (input?.value || '').trim();
    if (!code) {
      setStatus('Please enter a barcode number', 'error');
      return;
    }
    if (html5QrCode && isScanning) {
      html5QrCode.stop().catch(() => {});
      isScanning = false;
    }
    onBarcodeDetected(code);
  };

  /* ── Handle detected barcode ── */
  async function onBarcodeDetected(barcode) {
    if (html5QrCode && isScanning) {
      try { await html5QrCode.stop(); } catch (e) {}
      isScanning = false;
    }
    showSection('scan-loading');
    document.getElementById('loading-barcode').textContent = barcode;

    try {
      const product = await fetchProductByBarcode(barcode);
      if (!product) {
        showError('Product not found in the database. Try a different barcode or check manually using our E-number search.');
        return;
      }
      renderProductResult(product, barcode);
    } catch (err) {
      console.error('Product lookup error:', err);
      showError('Could not reach the product database. Check your connection and try again.');
    }
  }

  /* ── Fetch product from Open Food Facts (free, no API key) ── */
  async function fetchProductByBarcode(barcode) {
    const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,brands,ingredients_text,ingredients,additives_tags,image_front_url,countries`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    return data.product;
  }

  /* ── Extract E-numbers from product additives_tags ── */
  function extractENumbers(product) {
    const found = [];
    const tags = product.additives_tags || [];
    tags.forEach(tag => {
      // tags look like "en:e471", "en:e120"
      const match = tag.match(/e(\d{3}[a-z]?)/i);
      if (match) {
        const code = 'E' + match[1].toUpperCase();
        if (!found.includes(code)) found.push(code);
      }
    });
    return found;
  }

  /* ── Render the scan result ── */
  function renderProductResult(product, barcode) {
    const eNumbers = extractENumbers(product);
    const dbResults = eNumbers.map(code => window.getENumber ? window.getENumber(code) : null).filter(Boolean);

    // Determine overall verdict
    let overall = 'unknown';
    if (dbResults.length > 0) {
      if (dbResults.some(e => e.status === 'X')) overall = 'haram';
      else if (dbResults.some(e => e.status === 'M')) overall = 'mashbooh';
      else overall = 'halal';
    }

    const verdictConfig = {
      halal: { label: '✓ Likely Halal', cls: 'verdict-halal', note: 'No haram or doubtful additives detected in our database. Always verify with certification for full assurance.' },
      haram: { label: '✗ Contains Haram Additive(s)', cls: 'verdict-haram', note: 'This product contains at least one additive classified as haram.' },
      mashbooh: { label: '⚠ Contains Doubtful Additive(s)', cls: 'verdict-mashbooh', note: 'This product contains additives whose source cannot be confirmed without certification.' },
      unknown: { label: '? No E-Numbers Detected', cls: 'verdict-mashbooh', note: 'We could not detect tracked E-numbers for this product. Check the ingredients list manually below.' }
    };
    const v = verdictConfig[overall];

    document.getElementById('result-product-name').textContent = product.product_name || 'Unknown Product';
    document.getElementById('result-product-brand').textContent = product.brands || '';
    document.getElementById('result-barcode').textContent = barcode;

    const img = document.getElementById('result-product-image');
    if (product.image_front_url) {
      img.src = product.image_front_url;
      img.style.display = 'block';
      img.alt = (product.product_name || 'Product') + ' packaging photo';
    } else {
      img.style.display = 'none';
    }

    const verdictEl = document.getElementById('result-verdict');
    verdictEl.className = 'verdict ' + v.cls;
    verdictEl.style.fontSize = '1.2rem';
    verdictEl.innerHTML = v.label;
    document.getElementById('result-verdict-note').textContent = v.note;

    // E-number breakdown
    const breakdown = document.getElementById('result-enumbers');
    if (dbResults.length > 0) {
      breakdown.innerHTML = dbResults.map(e => `
        <div class="enumber-card" style="margin-bottom:.5rem">
          <div class="enumber-card-header">
            <div><span class="enumber-code">${e.code}</span><span class="enumber-name">${e.name}</span></div>
            <span class="verdict ${e.status === 'H' ? 'verdict-halal' : e.status === 'X' ? 'verdict-haram' : 'verdict-mashbooh'}">${e.status === 'H' ? '✓ Halal' : e.status === 'X' ? '✗ Haram' : '⚠ Mashbooh'}</span>
          </div>
          <p class="enumber-desc">${e.desc}</p>
        </div>`).join('');
    } else if (eNumbers.length > 0) {
      breakdown.innerHTML = `<p style="color:var(--text-muted);font-size:.875rem">Detected additives (${eNumbers.join(', ')}) are not yet in our detailed database. <a href="/halal-food-checker/">Search them manually here →</a></p>`;
    } else {
      breakdown.innerHTML = `<p style="color:var(--text-muted);font-size:.875rem">No E-numbers were tagged for this product in the database.</p>`;
    }

    // Raw ingredients text
    const ingredientsBox = document.getElementById('result-ingredients-text');
    if (product.ingredients_text) {
      ingredientsBox.textContent = product.ingredients_text;
      ingredientsBox.parentElement.style.display = 'block';
    } else {
      ingredientsBox.parentElement.style.display = 'none';
    }

    showSection('scan-result');
  }

  function showError(message) {
    document.getElementById('error-message').textContent = message;
    showSection('scan-error');
  }

  /* ── Reset to scan again ── */
  window.scanAnother = function () {
    showSection('scan-idle');
    const input = document.getElementById('manual-barcode');
    if (input) input.value = '';
  };

  document.addEventListener('DOMContentLoaded', function () {
    showSection('scan-idle');
  });

})();

/* QuantixTools — Zakat Calculator Engine */
/* Covers: cash, gold, silver, stocks, crypto, business, rental */

(function () {
  'use strict';

  /* ── Nisab Values (update periodically — gold 85g, silver 595g) ── */
  const NISAB = {
    gold_grams: 85,
    silver_grams: 595,
    gold_price_usd_per_gram: 98.50,   // approximate — update quarterly
    silver_price_usd_per_gram: 1.15,
    get goldNisab() { return this.gold_grams * this.gold_price_usd_per_gram; },
    get silverNisab() { return this.silver_grams * this.silver_price_usd_per_gram; }
  };

  const ZAKAT_RATE = 0.025; // 2.5%
  const isArabic = document.documentElement.lang.toLowerCase().startsWith('ar');
  const text = isArabic ? {
    due: 'الزكاة المستحقة (2.5%)',
    cash: 'النقود والمدخرات المصرفية',
    gold: 'قيمة الذهب',
    silver: 'قيمة الفضة',
    stocks: 'الأسهم',
    crypto: 'الأصول المشفرة',
    inventory: 'مخزون تجاري',
    receivables: 'مستحقات تجارية',
    rental: 'الدخل الإيجاري',
    savings: 'مدخرات أخرى',
    debts: 'الديون',
    net: 'صافي الأموال المحتسبة',
    dueStatus: '✓ الزكاة مستحقة',
    belowNisab: '✗ أقل من النصاب',
    month: 'شهريًا',
    share: 'تقدير زكاتي هذا العام'
  } : {
    due: 'Zakat Due (2.5%)',
    cash: 'Cash & Bank Savings',
    gold: 'Gold Value',
    silver: 'Silver Value',
    stocks: 'Stocks & Shares',
    crypto: 'Crypto Assets',
    inventory: 'Business Inventory',
    receivables: 'Business Receivables',
    rental: 'Rental Income',
    savings: 'Other Savings',
    debts: 'Less: Debts',
    net: 'Net Zakatable Wealth',
    dueStatus: '✓ Zakat Due',
    belowNisab: '✗ Below Nisab',
    month: '/month',
    share: 'My Zakat this year'
  };

  /* ── Currency rates vs USD (update quarterly) ── */
  const CURRENCY = {
    USD: 1, AED: 3.67, SAR: 3.75, GBP: 0.79,
    EUR: 0.92, PKR: 278, MYR: 4.72, IDR: 15900,
    BDT: 110, EGP: 30.9, TRY: 32.5, INR: 83.5
  };

  /* ── Helpers ── */
  function val(id) {
    const el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : 0;
  }
  function sel(id) {
    const el = document.getElementById(id);
    return el ? el.value : 'USD';
  }
  function fmt(num, currency) {
    return new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-US', {
      style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2
    }).format(num);
  }
  function toUSD(amount, currency) {
    return amount / (CURRENCY[currency] || 1);
  }
  function fromUSD(amount, currency) {
    return amount * (CURRENCY[currency] || 1);
  }

  /* ── Main Calculator ── */
  window.calculateZakat = function () {
    const currency = sel('currency');
    const nisabMethod = sel('nisab-method') || 'silver';

    // Collect assets (all converted to USD internally)
    const cash = toUSD(val('cash'), currency);
    const goldGrams = val('gold-grams');
    const silverGrams = val('silver-grams');
    const stocksValue = toUSD(val('stocks'), currency);
    const cryptoValue = toUSD(val('crypto'), currency);
    const businessInventory = toUSD(val('business-inventory'), currency);
    const businessReceivables = toUSD(val('business-receivables'), currency);
    const rentalIncome = toUSD(val('rental-income'), currency);
    const otherSavings = toUSD(val('other-savings'), currency);

    // Liabilities
    const debts = toUSD(val('debts'), currency);

    // Gold & Silver value in USD
    const goldValue = goldGrams * NISAB.gold_price_usd_per_gram;
    const silverValue = silverGrams * NISAB.silver_price_usd_per_gram;

    // Total zakatable wealth
    const totalAssets = cash + goldValue + silverValue + stocksValue +
      cryptoValue + businessInventory + businessReceivables +
      rentalIncome + otherSavings;

    const netWealth = Math.max(0, totalAssets - debts);

    // Nisab threshold
    const nisabValue = nisabMethod === 'gold' ? NISAB.goldNisab : NISAB.silverNisab;
    const nisabInCurrency = fromUSD(nisabValue, currency);

    // Zakat due
    const zakatDueUSD = netWealth >= nisabValue ? netWealth * ZAKAT_RATE : 0;
    const zakatDue = fromUSD(zakatDueUSD, currency);
    const netWealthDisplay = fromUSD(netWealth, currency);

    // Show results
    const resultBox = document.getElementById('zakat-result');
    if (!resultBox) return;
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    document.getElementById('result-zakat-due').textContent = fmt(zakatDue, currency);
    document.getElementById('result-net-wealth').textContent = fmt(netWealthDisplay, currency);
    document.getElementById('result-nisab').textContent = fmt(nisabInCurrency, currency);
    document.getElementById('result-eligible').textContent = zakatDueUSD > 0 ? text.dueStatus : text.belowNisab;
    document.getElementById('result-eligible').className = zakatDueUSD > 0 ? 'eligible-yes' : 'eligible-no';

    // Breakdown
    const breakdown = document.getElementById('zakat-breakdown');
    if (breakdown) {
      const rows = [
        [text.cash, fromUSD(cash, currency)],
        [text.gold, fromUSD(goldValue, currency)],
        [text.silver, fromUSD(silverValue, currency)],
        [text.stocks, fromUSD(stocksValue, currency)],
        [text.crypto, fromUSD(cryptoValue, currency)],
        [text.inventory, fromUSD(businessInventory, currency)],
        [text.receivables, fromUSD(businessReceivables, currency)],
        [text.rental, fromUSD(rentalIncome, currency)],
        [text.savings, fromUSD(otherSavings, currency)],
        [text.debts, -fromUSD(debts, currency)],
      ].filter(r => r[1] !== 0);

      breakdown.innerHTML = rows.map(r => `
        <tr>
          <td>${r[0]}</td>
          <td style="text-align:right;color:${r[1] < 0 ? '#c0392b' : 'inherit'}">${fmt(r[1], currency)}</td>
        </tr>`).join('') + `
        <tr style="font-weight:700;background:var(--green-light)">
          <td>${text.net}</td>
          <td style="text-align:right">${fmt(netWealthDisplay, currency)}</td>
        </tr>
        <tr style="font-weight:700;background:var(--green-dark);color:#fff">
          <td>${text.due}</td>
          <td style="text-align:right">${fmt(zakatDue, currency)}</td>
        </tr>`;
    }

    // Monthly breakdown
    const monthly = document.getElementById('result-monthly');
    if (monthly) monthly.textContent = fmt(zakatDue / 12, currency) + (isArabic ? ` ${text.month}` : text.month);

    // Share text
    window._zakatResult = `${text.share}: ${fmt(zakatDue, currency)} — QuantixTools.com`;
  };

  /* ── Reset ── */
  window.resetZakat = function () {
    ['cash','gold-grams','silver-grams','stocks','crypto',
     'business-inventory','business-receivables','rental-income',
     'other-savings','debts'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const resultBox = document.getElementById('zakat-result');
    if (resultBox) resultBox.style.display = 'none';
  };

  /* ── Share result ── */
  window.shareZakat = function () {
    if (navigator.share && window._zakatResult) {
      navigator.share({ title: 'My Zakat Calculation', text: window._zakatResult, url: window.location.href });
    } else {
      window.copyResult(window._zakatResult || window.location.href);
    }
  };

  /* ── Nisab display on page load ── */
  function updateNisabDisplay() {
    const goldEl = document.getElementById('nisab-gold-value');
    const silverEl = document.getElementById('nisab-silver-value');
    const currency = sel('currency') || 'USD';
    if (goldEl) goldEl.textContent = fmt(fromUSD(NISAB.goldNisab, currency), currency);
    if (silverEl) silverEl.textContent = fmt(fromUSD(NISAB.silverNisab, currency), currency);
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateNisabDisplay();
    const currencyEl = document.getElementById('currency');
    if (currencyEl) currencyEl.addEventListener('change', updateNisabDisplay);
  });

})();

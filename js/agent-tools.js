(function () {
  'use strict';

  const modelContext = document.modelContext ||
    (typeof navigator !== 'undefined' && navigator.modelContext);
  if (!modelContext || typeof modelContext.registerTool !== 'function') return;

  const pages = [
    { title: 'Zakat Calculator', url: '/zakat-calculator/', terms: 'zakat calculate assets cash savings' },
    { title: 'Zakat on Gold', url: '/zakat-calculator/gold/', terms: 'zakat gold jewellery nisab' },
    { title: 'Zakat on Cryptocurrency', url: '/zakat-calculator/crypto/', terms: 'zakat crypto bitcoin cryptocurrency' },
    { title: 'Zakat Nisab', url: '/zakat-calculator/nisab/', terms: 'zakat nisab threshold silver gold' },
    { title: 'Zakat on Stocks', url: '/zakat-calculator/stocks/', terms: 'zakat stocks shares investments' },
    { title: 'Zakat on Business Assets', url: '/zakat-calculator/business/', terms: 'zakat business inventory assets' },
    { title: 'Halal E-Number Checker', url: '/halal-food-checker/', terms: 'halal food additive e number checker' },
    { title: 'Barcode Scanner', url: '/halal-food-checker/scanner/', terms: 'halal barcode product scanner' },
    { title: 'About QuantixTools', url: '/about/', terms: 'about methodology sources' },
    { title: 'Contact QuantixTools', url: '/contact/', terms: 'contact email support feedback' },
  ];

  const registration = modelContext.registerTool({
    name: 'find_quantix_page',
    description: 'Find the relevant QuantixTools calculator, guide, checker, or contact page for a search query.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The subject or tool the visitor is looking for.',
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute({ query }) {
      const terms = String(query || '').toLowerCase().split(/\s+/).filter(Boolean);
      if (terms.length === 0) return JSON.stringify({ results: [] });

      const results = pages
        .map((page) => ({
          title: page.title,
          url: new URL(page.url, window.location.origin).href,
          score: terms.reduce((score, term) =>
            score + (page.title.toLowerCase().includes(term) ? 2 : 0) +
              (page.terms.includes(term) ? 1 : 0), 0),
        }))
        .filter((page) => page.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, 5)
        .map(({ title, url }) => ({ title, url }));

      return JSON.stringify({ results });
    },
  });

  if (registration && typeof registration.catch === 'function') {
    registration.catch((error) => {
      console.error('Unable to register QuantixTools WebMCP tools:', error);
    });
  }

  if (typeof window.getENumber === 'function') {
    const additiveRegistration = modelContext.registerTool({
      name: 'lookup_halal_additive',
      description: 'Look up an E-number in the QuantixTools food-additive database. Returns the listed status, source, and notes; not a religious ruling.',
      inputSchema: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'E-number to look up, for example E471.',
            pattern: '^E?[0-9]{3,4}[A-Za-z]?$',
          },
        },
        required: ['code'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute({ code }) {
        const additive = window.getENumber(String(code || '').trim().toUpperCase());
        if (!additive) {
          return JSON.stringify({ found: false, code: String(code || '').trim().toUpperCase() });
        }
        return JSON.stringify({
          found: true,
          code: additive.code,
          name: additive.name,
          status: additive.status,
          category: additive.category,
          source: additive.source,
          notes: additive.desc,
          commonProducts: additive.brands,
          disclaimer: 'Informational reference only; consult a qualified scholar for a personal ruling.',
        });
      },
    });

    if (additiveRegistration && typeof additiveRegistration.catch === 'function') {
      additiveRegistration.catch((error) => {
        console.error('Unable to register the QuantixTools additive lookup tool:', error);
      });
    }
  }
})();

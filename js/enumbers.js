/* QuantixTools — Halal E-Number Search Engine */
/* Database: 104 food additives with halal/haram/mashbooh status */

(function () {
  'use strict';

  const STATUS = { H: 'Halal', X: 'Haram', M: 'Mashbooh (Doubtful)' };
  const STATUS_CLASS = { H: 'verdict-halal', X: 'verdict-haram', M: 'verdict-mashbooh' };
  const STATUS_ICON = { H: '✓', X: '✗', M: '?' };
  const MAX_VISIBLE_RESULTS = 24;

  /* ── Full E-Number Database ── */
  const ENUMBERS = [
    // Colours
    { code:'E100', name:'Curcumin (Turmeric)', status:'H', category:'Colour', source:'Plant (turmeric root)', desc:'Natural yellow colour from turmeric. Always halal.', brands:'Common in curry products, mustard, cheese.' },
    { code:'E101', name:'Riboflavin (Vitamin B2)', status:'M', category:'Colour', source:'Synthetic or animal', desc:'Can be derived from whey (dairy) or animal sources. Check source.', brands:'Energy drinks, cereals, dairy.' },
    { code:'E102', name:'Tartrazine', status:'H', category:'Colour', source:'Synthetic', desc:'Synthetic colourant. Check product-specific ingredients and certification guidance.', brands:'Sweets, soft drinks, snacks.' },
    { code:'E104', name:'Quinoline Yellow', status:'H', category:'Colour', source:'Synthetic', desc:'Synthetic dye. Halal.', brands:'Smoked fish, scotch eggs.' },
    { code:'E110', name:'Sunset Yellow FCF', status:'H', category:'Colour', source:'Synthetic', desc:'Orange-yellow synthetic dye. Halal.', brands:'Jelly, jam, sweets.' },
    { code:'E120', name:'Carmine (Cochineal)', status:'X', category:'Colour', source:'Insect (cochineal bug)', desc:'Derived from cochineal insects. QuantixTools classifies it as Haram; scholarly and certification guidance may differ.', brands:'Yoghurt, juices, sweets, lipstick.' },
    { code:'E122', name:'Carmoisine', status:'H', category:'Colour', source:'Synthetic', desc:'Red synthetic dye. Halal.', brands:'Jelly, ice cream, drinks.' },
    { code:'E124', name:'Ponceau 4R', status:'H', category:'Colour', source:'Synthetic', desc:'Red synthetic dye. Halal.', brands:'Strawberry jelly, tinned cherries.' },
    { code:'E127', name:'Erythrosine', status:'H', category:'Colour', source:'Synthetic', desc:'Synthetic cherry-red dye. Halal.', brands:'Glacé cherries, tinned fruit.' },
    { code:'E129', name:'Allura Red AC', status:'H', category:'Colour', source:'Synthetic', desc:'Synthetic red dye. Halal.', brands:'Sweets, drinks, snacks.' },
    { code:'E131', name:'Patent Blue V', status:'H', category:'Colour', source:'Synthetic', desc:'Synthetic blue dye. Halal.', brands:'Scotch eggs, some drinks.' },
    { code:'E132', name:'Indigo Carmine', status:'H', category:'Colour', source:'Synthetic', desc:'Synthetic blue dye. Halal.', brands:'Sweets, confectionery.' },
    { code:'E133', name:'Brilliant Blue FCF', status:'H', category:'Colour', source:'Synthetic', desc:'Synthetic blue dye. Halal.', brands:'Ice cream, sweets, drinks.' },
    { code:'E140', name:'Chlorophylls', status:'H', category:'Colour', source:'Plant', desc:'Natural green colour from plants. Halal.', brands:'Processed peas, herbs, fats.' },
    { code:'E141', name:'Copper complexes of chlorophylls', status:'H', category:'Colour', source:'Plant', desc:'Plant-derived green colour. Halal.', brands:'Canned vegetables, preserved herbs.' },
    { code:'E150a', name:'Plain Caramel', status:'H', category:'Colour', source:'Sugar', desc:'Heated sugar. Halal.', brands:'Colas, sauces, bread.' },
    { code:'E160a', name:'Beta-carotene', status:'H', category:'Colour', source:'Plant or synthetic', desc:'Natural orange colour. Halal when plant-derived (most commercial forms are).', brands:'Margarine, juice, cheese.' },
    { code:'E160b', name:'Annatto', status:'H', category:'Colour', source:'Plant (annatto seed)', desc:'Natural orange-red colour from plant seeds. Halal.', brands:'Cheese, butter, cereals.' },
    // Preservatives
    { code:'E200', name:'Sorbic acid', status:'H', category:'Preservative', source:'Synthetic', desc:'Preservative. Halal.', brands:'Cheese, yoghurt, baked goods.' },
    { code:'E202', name:'Potassium sorbate', status:'H', category:'Preservative', source:'Synthetic', desc:'Preservative. Halal.', brands:'Wine, cheese, dried fruits.' },
    { code:'E210', name:'Benzoic acid', status:'H', category:'Preservative', source:'Synthetic', desc:'Preservative. Halal.', brands:'Soft drinks, pickles, sauces.' },
    { code:'E211', name:'Sodium benzoate', status:'H', category:'Preservative', source:'Synthetic', desc:'Preservative. Halal.', brands:'Fizzy drinks, jam, sauces.' },
    { code:'E220', name:'Sulphur dioxide', status:'H', category:'Preservative', source:'Synthetic', desc:'Preservative/antioxidant. Halal.', brands:'Dried fruits, wine, juices.' },
    { code:'E270', name:'Lactic acid', status:'M', category:'Preservative', source:'Fermentation or animal', desc:'Usually from plant fermentation but can be animal-derived. Verify source.', brands:'Bread, olives, salad dressings.' },
    { code:'E280', name:'Propionic acid', status:'H', category:'Preservative', source:'Synthetic', desc:'Preservative. Halal.', brands:'Bread, flour products.' },
    // Antioxidants
    { code:'E300', name:'Ascorbic acid (Vitamin C)', status:'H', category:'Antioxidant', source:'Synthetic/plant', desc:'Vitamin C. Always halal.', brands:'Juice, meat, baby food.' },
    { code:'E306', name:'Tocopherol (Vitamin E)', status:'H', category:'Antioxidant', source:'Plant', desc:'Natural Vitamin E from plants. Halal.', brands:'Oils, margarine, nuts.' },
    { code:'E322', name:'Lecithin', status:'M', category:'Emulsifier', source:'Soy (usually) or egg', desc:'Mostly from soy — halal. Egg lecithin — depends on source. Check label.', brands:'Chocolate, bread, margarine.' },
    // Emulsifiers
    { code:'E407', name:'Carrageenan', status:'H', category:'Emulsifier', source:'Seaweed', desc:'Extracted from red seaweed. Halal.', brands:'Ice cream, chocolate milk, deli meats.' },
    { code:'E410', name:'Locust Bean Gum', status:'H', category:'Emulsifier', source:'Plant (carob tree)', desc:'Plant-derived thickener. Halal.', brands:'Ice cream, sauces, baby food.' },
    { code:'E412', name:'Guar Gum', status:'H', category:'Emulsifier', source:'Plant (guar bean)', desc:'Plant-derived thickener. Halal.', brands:'Ice cream, sauces, gluten-free products.' },
    { code:'E414', name:'Acacia Gum (Gum Arabic)', status:'H', category:'Emulsifier', source:'Plant (acacia tree)', desc:'Plant sap extract. Halal.', brands:'Sweets, drinks, icing.' },
    { code:'E415', name:'Xanthan Gum', status:'H', category:'Emulsifier', source:'Microbial fermentation', desc:'Fermented from plant sugars. Halal.', brands:'Salad dressings, gluten-free baking, sauces.' },
    { code:'E420', name:'Sorbitol', status:'H', category:'Sweetener', source:'Synthetic/plant', desc:'Sugar alcohol, usually from corn or fruit. Halal.', brands:'Sugar-free products, toothpaste.' },
    { code:'E422', name:'Glycerol (Glycerine)', status:'M', category:'Humectant', source:'Animal or plant', desc:'Can be from animal fat (pork or beef) or plant (soy/palm). Must verify source. Widely Mashbooh.', brands:'Cakes, sweets, chewing gum.' },
    { code:'E430', name:'Polyoxyethylene stearate', status:'M', category:'Emulsifier', source:'Animal or plant', desc:'Stearate derived from stearic acid — could be pork or beef tallow. Verify.', brands:'Bread, bakery products.' },
    { code:'E431', name:'Polyoxyethylene (40) stearate', status:'M', category:'Emulsifier', source:'Animal or plant', desc:'Same concern as E430. Verify source.', brands:'Baked goods.' },
    { code:'E441', name:'Gelatine', status:'X', category:'Gelling Agent', source:'Animal (pig, cattle, fish, or mixed sources)', desc:'Source and processing affect its assessment. Check product-specific certification and guidance from a qualified scholar or trusted certifier.', brands:'Jelly sweets, marshmallows, yoghurt, capsules.' },
    { code:'E442', name:'Ammonium phosphatides', status:'H', category:'Emulsifier', source:'Plant (rapeseed oil)', desc:'From plant oil. Halal.', brands:'Chocolate.' },
    { code:'E450', name:'Diphosphates', status:'H', category:'Raising agent', source:'Mineral', desc:'Mineral salts. Halal.', brands:'Processed cheese, meat products, baking powder.' },
    { code:'E471', name:'Mono and diglycerides of fatty acids', status:'M', category:'Emulsifier', source:'Animal or plant', desc:'The most common E-number query. CAN be from pork fat, beef fat, or plant oils. No way to tell from label alone. Look for halal certification or "plant-based" claim.', brands:'Bread, margarine, ice cream, biscuits, chocolate.' },
    { code:'E472a', name:'Acetic acid esters of mono/diglycerides', status:'M', category:'Emulsifier', source:'Animal or plant', desc:'Same animal/plant uncertainty as E471. Requires certification to confirm.', brands:'Bread, whipped toppings.' },
    { code:'E472b', name:'Lactic acid esters of mono/diglycerides', status:'M', category:'Emulsifier', source:'Animal or plant', desc:'Same concern as E471. Verify halal certification.', brands:'Baked goods, margarine.' },
    { code:'E472e', name:'Diacetyl tartaric acid esters (DATEM)', status:'M', category:'Emulsifier', source:'Animal or plant', desc:'Fatty acid derivative — same concern as E471.', brands:'Bread, bagels.' },
    { code:'E473', name:'Sucrose esters of fatty acids', status:'M', category:'Emulsifier', source:'Animal or plant fatty acids', desc:'Same animal origin concern. Verify.', brands:'Ice cream, coffee whiteners.' },
    { code:'E476', name:'Polyglycerol polyricinoleate (PGPR)', status:'H', category:'Emulsifier', source:'Castor oil (plant)', desc:'Derived from castor oil. Halal.', brands:'Chocolate (reduces cocoa butter needed).' },
    { code:'E481', name:'Sodium stearoyl-2-lactylate (SSL)', status:'M', category:'Emulsifier', source:'Animal or plant stearic acid', desc:'Stearic acid source may be animal. Mashbooh without certification.', brands:'Bread, cakes.' },
    { code:'E482', name:'Calcium stearoyl-2-lactylate (CSL)', status:'M', category:'Emulsifier', source:'Animal or plant', desc:'Same concern as E481.', brands:'Bread, pastry.' },
    // Flavour enhancers
    { code:'E621', name:'Monosodium glutamate (MSG)', status:'H', category:'Flavour Enhancer', source:'Fermentation (plant sugars)', desc:'Produced by fermentation of plant-based sugars. Halal.', brands:'Savoury snacks, ready meals, soups.' },
    { code:'E627', name:'Disodium guanylate', status:'M', category:'Flavour Enhancer', source:'Animal or plant', desc:'May be produced from sardines or yeast. Verify for fish/animal source.', brands:'Crisps, instant noodles.' },
    { code:'E631', name:'Disodium inosinate', status:'M', category:'Flavour Enhancer', source:'Animal (often pork or fish)', desc:'Often derived from pork or fish. Haram if from pork. Mashbooh.', brands:'Crisps, snacks, instant noodles.' },
    // Sweeteners
    { code:'E951', name:'Aspartame', status:'H', category:'Sweetener', source:'Synthetic', desc:'Artificial sweetener. Halal.', brands:'Diet drinks, sugar-free gum, sweeteners.' },
    { code:'E952', name:'Cyclamate', status:'H', category:'Sweetener', source:'Synthetic', desc:'Artificial sweetener. Halal.', brands:'Low-calorie foods (banned in US, used in UAE/EU).' },
    { code:'E954', name:'Saccharin', status:'H', category:'Sweetener', source:'Synthetic', desc:'Artificial sweetener. Halal.', brands:'Tabletop sweeteners, diet foods.' },
    { code:'E960', name:'Steviol glycosides (Stevia)', status:'H', category:'Sweetener', source:'Plant (stevia leaf)', desc:'Natural plant sweetener. Halal.', brands:'Diet drinks, low-calorie foods.' },
    { code:'E965', name:'Maltitol', status:'H', category:'Sweetener', source:'Starch (plant)', desc:'Sugar alcohol from corn or wheat starch. Halal.', brands:'Sugar-free chocolate, sweets.' },

    // ── BATCH 3: From GSC query data July 2026 ───────────────
    { code:'E250', name:'Sodium Nitrite', status:'H', category:'Preservative', source:'Synthetic', desc:'Preservative used in cured meats. Synthetic — no animal origin. Halal.', brands:'Bacon, ham, sausages, hot dogs.' },
    { code:'E251', name:'Sodium Nitrate', status:'H', category:'Preservative', source:'Synthetic', desc:'Preservative in cured and smoked meats. Synthetic. Halal.', brands:'Smoked salmon, cured meats, cheese.' },
    { code:'E330', name:'Citric Acid', status:'H', category:'Acidity Regulator', source:'Fermentation of plant sugars', desc:'Natural acid from citrus fermentation. Always halal.', brands:'Soft drinks, jams, sweets, tinned foods.' },
    { code:'E338', name:'Phosphoric Acid', status:'H', category:'Acidity Regulator', source:'Mineral/Synthetic', desc:'Mineral acid. Halal — no animal origin.', brands:'Cola drinks, processed cheese.' },
    { code:'E340', name:'Potassium Phosphates', status:'H', category:'Acidity Regulator', source:'Mineral', desc:'Mineral salts. Halal.', brands:'Processed cheese, bread, meat products.' },
    { code:'E385', name:'Calcium Disodium EDTA', status:'H', category:'Preservative', source:'Synthetic', desc:'Chelating agent. Synthetic. Halal.', brands:'Canned shellfish, margarine, salad dressings.' },
    { code:'E404', name:'Calcium Alginate', status:'H', category:'Thickener', source:'Seaweed', desc:'Seaweed-derived thickener/gelling agent. Always halal.', brands:'Restructured fish, artificial fruit.' },
    { code:'E418', name:'Gellan Gum', status:'H', category:'Thickener', source:'Microbial fermentation', desc:'Produced by bacterial fermentation of plant sugars. Halal.', brands:'Dairy alternatives, jams, sweets.' },
    { code:'E460', name:'Microcrystalline Cellulose', status:'H', category:'Anti-caking Agent', source:'Plant (wood pulp)', desc:'Plant fibre. Always halal.', brands:'Grated cheese, diet foods, tablets.' },
    { code:'E461', name:'Methyl Cellulose', status:'H', category:'Thickener', source:'Plant (cellulose)', desc:'Plant cellulose derivative. Halal.', brands:'Diet foods, baked goods, ice cream.' },
    { code:'E491', name:'Sorbitan Monostearate', status:'M', category:'Emulsifier', source:'Stearic acid — animal or plant', desc:'Stearic acid may be from pork or beef tallow. Mashbooh unless certified halal.', brands:'Yeast preparations, cake mixes.' },
    { code:'E500', name:'Sodium Carbonates', status:'H', category:'Raising Agent', source:'Mineral/Synthetic', desc:'Baking soda base. Mineral origin. Always halal.', brands:'Baking powder, cocoa, bread.' },
    { code:'E516', name:'Calcium Sulphate (Gypsum)', status:'H', category:'Firming Agent', source:'Mineral', desc:'Natural mineral. Always halal.', brands:'Tofu, beer, flour, bread.' },
    { code:'E901', name:'Beeswax', status:'M', category:'Glazing Agent', source:'Insect (bees)', desc:'Produced by bees. Most scholars consider beeswax halal as it is secreted rather than from the bee body. Mashbooh — some scholars differ.', brands:'Confectionery glaze, chocolate, fruit polish.' },
    { code:'E903', name:'Carnauba Wax', status:'H', category:'Glazing Agent', source:'Plant (carnauba palm)', desc:'Plant wax from Brazilian palm leaves. Always halal.', brands:'Sweets, gum, pharmaceutical tablets.' },
    { code:'E904', name:'Shellac', status:'M', category:'Glazing Agent', source:'Insect (lac bug)', desc:'Resin secreted by the female lac bug. Mashbooh — derived from insect secretion. Many scholars consider it haram.', brands:'Confectionery glaze, fruit coatings, pharmaceutical capsules.' },
    { code:'E920', name:'L-Cysteine', status:'M', category:'Flour Treatment Agent', source:'Animal (often duck feathers or human hair) or synthetic', desc:'Can be derived from duck feathers, human hair, or pig bristles. Mashbooh — always check source. Synthetic L-Cysteine (E920) is halal.', brands:'Bread, rolls, baked goods.' },
    { code:'E955', name:'Sucralose (Splenda)', status:'H', category:'Sweetener', source:'Synthetic (from sugar)', desc:'Artificial sweetener made from sugar. Halal — no animal origin.', brands:'Diet drinks, sugar-free products, protein bars.' },
    { code:'E1412', name:'Distarch Phosphate', status:'H', category:'Thickener', source:'Modified starch (plant)', desc:'Modified plant starch. Always halal.', brands:'Sauces, soups, ready meals.' },
    { code:'E1420', name:'Acetylated Starch', status:'H', category:'Thickener', source:'Modified starch (plant)', desc:'Modified plant starch. Halal.', brands:'Frozen foods, sauces, gravies.' },
    { code:'E1442', name:'Hydroxypropyl Distarch Phosphate', status:'H', category:'Thickener', source:'Modified starch (plant)', desc:'Modified plant starch. Always halal.', brands:'Sauces, ready meals, dairy products.' },
  ];

  /* ── Search Function ── */
  window.searchENumber = function () {
    const query = (document.getElementById('enumber-search')?.value || '').toLowerCase().trim();
    const categoryFilter = document.getElementById('category-filter')?.value || '';
    const statusFilter = document.getElementById('status-filter')?.value || '';

    const results = ENUMBERS.filter(e => {
      const matchQuery = !query ||
        e.code.toLowerCase().includes(query) ||
        e.name.toLowerCase().includes(query) ||
        e.desc.toLowerCase().includes(query) ||
        e.brands.toLowerCase().includes(query);
      const matchCat = !categoryFilter || e.category === categoryFilter;
      const matchStatus = !statusFilter || e.status === statusFilter;
      return matchQuery && matchCat && matchStatus;
    });

    renderResults(results, query);
  };

  function renderResults(results, query, showAll = false) {
    const container = document.getElementById('enumber-results');
    if (!container) return;

    if (results.length === 0) {
      const noResults = document.createElement('div');
      const message = document.createElement('p');
      noResults.className = 'no-results';
      message.textContent = `No results found for "${query}". Try searching by E-number (e.g. E471) or ingredient name.`;
      noResults.appendChild(message);
      container.replaceChildren(noResults);
      return;
    }

    const visibleResults = showAll ? results : results.slice(0, MAX_VISIBLE_RESULTS);
    container.innerHTML = visibleResults.map(e => `
      <div class="enumber-card">
        <div class="enumber-card-header">
          <div>
            <span class="enumber-code">${e.code}</span>
            <span class="enumber-name">${e.name}</span>
          </div>
          <span class="verdict ${STATUS_CLASS[e.status]}">${STATUS_ICON[e.status]} ${STATUS[e.status]}</span>
        </div>
        <div class="enumber-meta">
          <span class="meta-tag">${e.category}</span>
          <span class="meta-tag">Source: ${e.source}</span>
        </div>
        <p class="enumber-desc">${e.desc}</p>
        <p class="enumber-brands"><strong>Found in:</strong> ${e.brands}</p>
      </div>`).join('');

    if (results.length > MAX_VISIBLE_RESULTS && !showAll) {
      const showAllButton = document.createElement('button');
      showAllButton.type = 'button';
      showAllButton.className = 'btn btn-outline';
      showAllButton.textContent = `Show all ${results.length} results`;
      showAllButton.addEventListener('click', () => renderResults(results, query, true));
      container.appendChild(showAllButton);
    }
  }

  /* ── Get single E-number by code (for individual pages) ── */
  window.getENumber = function (code) {
    return ENUMBERS.find(e => e.code === code.toUpperCase()) || null;
  };

  /* ── Stats ── */
  window.getENumberStats = function () {
    return {
      total: ENUMBERS.length,
      halal: ENUMBERS.filter(e => e.status === 'H').length,
      haram: ENUMBERS.filter(e => e.status === 'X').length,
      mashbooh: ENUMBERS.filter(e => e.status === 'M').length
    };
  };

  const ADDITIONAL_ENUMBERS = [
    { code:'E150b', name:'Caustic Sulphite Caramel', status:'H', category:'Colour', source:'Sugar/Sulphite process', desc:'Caramel colour made with sulphite. Halal — no animal derivatives.', brands:'Beers, spirits, vinegar.' },
    { code:'E150c', name:'Ammonia Caramel', status:'H', category:'Colour', source:'Sugar/Ammonia process', desc:'Caramel colour using ammonia. Halal — no animal derivatives.', brands:'Soy sauce, bread, beer.' },
    { code:'E150d', name:'Sulphite Ammonia Caramel', status:'H', category:'Colour', source:'Sugar process', desc:'Most common caramel colour (Cola colour). Halal.', brands:'Cola drinks, sauces, soups.' },
    { code:'E153', name:'Vegetable Carbon (Carbon Black)', status:'H', category:'Colour', source:'Charred plant material', desc:'Black colour from charred vegetable matter. Halal when plant-sourced.', brands:'Liquorice, jams, biscuits.' },
    { code:'E160c', name:'Paprika Extract (Capsanthin)', status:'H', category:'Colour', source:'Plant (red peppers)', desc:'Natural red-orange colour from paprika. Always halal.', brands:'Cheese, sauces, snacks.' },
    { code:'E161b', name:'Lutein', status:'H', category:'Colour', source:'Plant (marigold flowers)', desc:'Natural yellow colour from marigold. Halal.', brands:'Margarine, pastries, soups.' },
    { code:'E162', name:'Beetroot Red (Betanin)', status:'H', category:'Colour', source:'Plant (beetroot)', desc:'Natural red-purple from beetroot. Always halal.', brands:'Sweets, ice cream, yoghurt.' },
    { code:'E163', name:'Anthocyanins', status:'H', category:'Colour', source:'Plant (berries, grapes)', desc:'Natural colours from fruit skins. Always halal.', brands:'Drinks, jams, confectionery.' },
    { code:'E170', name:'Calcium Carbonate (Chalk)', status:'H', category:'Colour', source:'Mineral', desc:'Mineral-based white colour. Always halal.', brands:'Bread, sweets, wine.' },
    { code:'E171', name:'Titanium Dioxide', status:'H', category:'Colour', source:'Mineral', desc:'White colour from mineral titanium. Halal — though banned in EU food from 2022.', brands:'Sweets, chewing gum, medicines.' },
    { code:'E296', name:'Malic Acid', status:'H', category:'Preservative', source:'Synthetic/plant', desc:'Acid found naturally in fruit. Halal.', brands:'Sweets, soft drinks, chewing gum.' },
    { code:'E321', name:'Butylated Hydroxytoluene (BHT)', status:'H', category:'Antioxidant', source:'Synthetic', desc:'Synthetic antioxidant. Halal — no animal origin.', brands:'Crisps, cereals, chewing gum.' },
    { code:'E341', name:'Calcium Phosphates', status:'H', category:'Stabiliser', source:'Mineral', desc:'Mineral-derived raising agent and stabiliser. Halal.', brands:'Baking powder, cheese, cereals.' },
    { code:'E401', name:'Sodium Alginate', status:'H', category:'Thickener', source:'Seaweed (brown algae)', desc:'Extracted from brown seaweed. Always halal.', brands:'Ice cream, sauces, noodles.' },
    { code:'E417', name:'Tara Gum', status:'H', category:'Thickener', source:'Plant (tara tree seeds)', desc:'Plant-derived thickener. Halal.', brands:'Ice cream, sauces, dressings.' },
    { code:'E433', name:'Polysorbate 80', status:'M', category:'Emulsifier', source:'Synthetic (may use animal-derived sorbitol)', desc:'Emulsifier that may use animal-derived sorbitol in processing. Mashbooh — source varies.', brands:'Ice cream, medicines, vitamins.' },
    { code:'E440', name:'Pectins', status:'H', category:'Thickener', source:'Plant (fruit peels)', desc:'Natural gelling agent from citrus/apple peels. Always halal.', brands:'Jams, jellies, sweets, yoghurt.' },
    { code:'E451', name:'Triphosphates', status:'H', category:'Stabiliser', source:'Mineral/Synthetic', desc:'Mineral-based stabiliser. Halal.', brands:'Processed meat, fish products, bread.' },
    { code:'E466', name:'Carboxymethyl Cellulose (CMC)', status:'H', category:'Thickener', source:'Plant (cellulose)', desc:'Plant cellulose derivative. Always halal.', brands:'Ice cream, sauces, diet foods.' },
    { code:'E472', name:'Esters of Mono- and Diglycerides', status:'M', category:'Emulsifier', source:'Animal or plant fat', desc:'Esters of E471 — same concern. Can be pork-derived. Mashbooh unless certified.', brands:'Bread, cakes, pastries.' },
    { code:'E483', name:'Stearyl Tartrate', status:'M', category:'Emulsifier', source:'Animal fat or plant', desc:'Tartrate ester of stearic acid. Stearic acid may be animal-derived. Mashbooh.', brands:'Bread improvers, pastries.' },
    { code:'E492', name:'Sorbitan Tristearate', status:'M', category:'Emulsifier', source:'Stearic acid (may be animal)', desc:'Stearic acid can come from pork or beef tallow. Mashbooh unless plant-certified.', brands:'Chocolate, confectionery.' },
    { code:'E501', name:'Potassium Carbonates', status:'H', category:'Raising Agent', source:'Mineral', desc:'Mineral-based raising agent. Always halal.', brands:'Cocoa, biscuits, bread.' },
    { code:'E551', name:'Silicon Dioxide (Silica)', status:'H', category:'Anti-caking Agent', source:'Mineral', desc:'Sand/quartz mineral. Always halal.', brands:'Salt, dried spices, coffee creamers.' },
    { code:'E635', name:'Disodium 5-Ribonucleotides', status:'M', category:'Flavour Enhancer', source:'Animal or yeast', desc:'Blend of E627 and E631. Same concerns — may be from pork or fish. Mashbooh.', brands:'Crisps, snacks, instant noodles.' },
    { code:'E950', name:'Acesulfame K', status:'H', category:'Sweetener', source:'Synthetic', desc:'Artificial sweetener. Halal — no animal origin.', brands:'Diet drinks, sugar-free sweets, gum.' },
    { code:'E1422', name:'Acetylated Distarch Adipate', status:'H', category:'Thickener', source:'Modified starch (plant)', desc:'Modified corn or potato starch. Always halal.', brands:'Sauces, puddings, processed foods.' },
  ];
  ENUMBERS.push(...ADDITIONAL_ENUMBERS);

  /* ── Auto-search on input ── */
  document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('enumber-search');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');

    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(window.searchENumber, 250);
      });
    }
    if (categoryFilter) categoryFilter.addEventListener('change', window.searchENumber);
    if (statusFilter) statusFilter.addEventListener('change', window.searchENumber);

    const initialQuery = new URLSearchParams(window.location.search).get('q');
    if (searchInput && initialQuery) searchInput.value = initialQuery;
    if (searchInput && initialQuery) window.searchENumber();
    else renderResults(ENUMBERS, '');

    if (categoryFilter) {
      const categories = [...new Set(ENUMBERS.map((entry) => entry.category))].sort();
      categoryFilter.options.length = 1;
      categories.forEach((category) => categoryFilter.add(new Option(category, category)));
    }

    // Update stats display
    const stats = window.getENumberStats();
    const totalEl = document.getElementById('stat-total');
    const halalEl = document.getElementById('stat-halal');
    const haramEl = document.getElementById('stat-haram');
    const mashboohEl = document.getElementById('stat-mashbooh');
    if (totalEl) totalEl.textContent = stats.total + '+';
    if (halalEl) halalEl.textContent = stats.halal;
    if (haramEl) haramEl.textContent = stats.haram;
    if (mashboohEl) mashboohEl.textContent = stats.mashbooh;
  });

})();

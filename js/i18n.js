/* ================================================================
   QuantixTools — i18n Translation System
   9 languages · RTL support · localStorage persistence
   ================================================================ */

const QT_LANGS = {

  en: {
    code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr', font: 'Inter',
    t: {
      // Nav
      nav_zakat:  'Zakat Calculator',
      nav_halal:  'Halal Checker',
      nav_about:  'About',

      // Hero
      hero_eyebrow: 'Free · Practical · Islamic',
      hero_h1:      'Zakat Calculator & Halal Food Checker',
      hero_sub:     'Practical Islamic reference tools for Muslims worldwide. Calculate Zakat on gold, crypto & savings — and check food E-numbers instantly.',
      hero_cta1:    'Calculate Zakat →',
      hero_cta2:    'Check E-Numbers →',
      trust_2: '🌍 9 Languages',
      trust_3: '⚡ Always free',
      trust_4: '🔒 No sign-up needed',

      // Stats
      stat1_label: 'E-Numbers Checked',
      stat2_label: 'Zakat Categories',
      stat3_label: 'Languages',
      stat4_label: 'Forever',

      // Tools section
      tools_heading: 'Our Islamic Tools',
      tools_sub:     'Simple, reliable tools — built for everyday Muslim life.',
      zakat_title:   'Zakat Calculator',
      zakat_desc:    'Calculate your annual Zakat on gold, silver, cash, savings and cryptocurrency. Nisab threshold automatically applied.',
      zakat_arrow:   'Open calculator →',
      halal_title:   'Halal E-Number Checker',
      halal_desc:    'Instantly check if food additives (E-numbers) are Halal, Haram, or Mashbooh. Database of 104+ common food additives.',
      halal_arrow:   'Check E-numbers →',

      // E-Numbers
      enumbers_heading: 'Common E-Numbers',
      enumbers_sub:     'Browse food additives by E-number.',
      e471_name:  'Mono & Diglycerides',
      e441_name:  'Gelatine',
      e120_name:  'Carmine / Cochineal',
      all_label:  'All →',
      all_sub:    '104+ additives',
      all_verdict:'Full database',
      mashbooh:   '⚠ Mashbooh',
      often_haram:'✗ Often Haram',
      haram:      '✗ Haram',
      halal:      '✓ Halal',

      // Why
      why_heading: 'Why QuantixTools?',
      why_sub:     'Practical reference tools for everyday use.',
      why1_title:  'Always Free',
      why1_desc:   'No account, no subscription, no hidden fees — ever.',
      why2_title:  'Multi-Language',
      why2_desc:   'Available in 9 languages for Muslims worldwide.',
      why4_title:  'Instant Results',
      why4_desc:   'No loading spinners, no waiting — answers in seconds.',

      // Footer
      footer_desc:    'Free Islamic tools. Halal Food Checker and Zakat Calculator, available in 9 languages.',
      footer_zakat:   'Zakat',
      footer_halal:   'Halal Checker',
      footer_info:    'Info',
      footer_about:   'About Us',
      footer_privacy: 'Privacy Policy',
      footer_terms:   'Terms',
      footer_bottom:  'For informational purposes only. Consult a qualified Islamic scholar for personal rulings.',
      zakat_gold:     'Zakat on Gold',
      zakat_crypto:   'Zakat on Crypto',
      zakat_nisab:    'Nisab Threshold',
      halal_e471:     'Is E471 Halal?',
      halal_e441:     'Is E441 Halal?',
      halal_e120:     'Is E120 Halal?',
      halal_scanner:  'Barcode Scanner',

      // Language picker
      lang_label: 'Language',
    }
  },

  ar: {
    code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl', font: 'Cairo',
    t: {
      nav_zakat:  'حاسبة الزكاة',
      nav_halal:  'مدقق الحلال',
      nav_about:  'من نحن',
      hero_eyebrow: 'مجاني · عملي · إسلامي',
      hero_h1:    'حاسبة الزكاة ومدقق الغذاء الحلال',
      hero_sub:   'أدوات مرجعية إسلامية للمسلمين حول العالم. احسب الزكاة على الذهب والعملات المشفرة والمدخرات — وابحث عن أرقام E الغذائية.',
      hero_cta1:  'احسب الزكاة ←',
      hero_cta2:  'تحقق من أرقام E ←',
      trust_2: '🌍 ٩ لغات',
      trust_3: '⚡ مجاني دائمًا',
      trust_4: '🔒 بدون تسجيل',
      stat1_label: 'أرقام E المفحوصة',
      stat2_label: 'فئات الزكاة',
      stat3_label: 'لغات',
      stat4_label: 'إلى الأبد',
      tools_heading: 'أدواتنا الإسلامية',
      tools_sub:     'أدوات بسيطة وموثوقة — مصممة للحياة اليومية للمسلم.',
      zakat_title:   'حاسبة الزكاة',
      zakat_desc:    'احسب زكاتك السنوية على الذهب والفضة والنقود والمدخرات والعملات المشفرة. يُطبَّق نصاب الزكاة تلقائيًا.',
      zakat_arrow:   'افتح الحاسبة ←',
      halal_title:   'مدقق أرقام E الحلال',
      halal_desc:    'تحقق فورًا مما إذا كانت إضافات الطعام (أرقام E) حلالاً أو حرامًا أو مشبوهة. قاعدة بيانات تضم أكثر من ٨٠ مادة إضافية شائعة.',
      halal_arrow:   'تحقق من أرقام E ←',
      enumbers_heading: 'أرقام E الشائعة',
      enumbers_sub:     'تصفح المضافات الغذائية حسب رقم E.',
      e471_name:  'أحادي وثنائي الغليسريد',
      e441_name:  'جيلاتين',
      e120_name:  'كارمين / كوشينيل',
      all_label:  'الكل ←',
      all_sub:    'أكثر من ٨٠ مادة',
      all_verdict:'قاعدة البيانات الكاملة',
      mashbooh:   '⚠ مشبوه',
      often_haram:'✗ حرام في الغالب',
      haram:      '✗ حرام',
      halal:      '✓ حلال',
      why_heading: 'لماذا QuantixTools؟',
      why_sub:     'أدوات مرجعية عملية للاستخدام اليومي.',
      why1_title:  'مجاني دائمًا',
      why1_desc:   'لا حساب، لا اشتراك، لا رسوم خفية — أبدًا.',
      why2_title:  'متعدد اللغات',
      why2_desc:   'متاح بـ٩ لغات للمسلمين في جميع أنحاء العالم.',
      why4_title:  'نتائج فورية',
      why4_desc:   'بدون انتظار — إجابات في ثوانٍ.',
      footer_desc:    'أدوات إسلامية مجانية. مدقق الطعام الحلال وحاسبة الزكاة، متاحة بـ٩ لغات.',
      footer_zakat:   'الزكاة',
      footer_halal:   'مدقق الحلال',
      footer_info:    'معلومات',
      footer_about:   'من نحن',
      footer_privacy: 'سياسة الخصوصية',
      footer_terms:   'الشروط',
      footer_bottom:  'للأغراض الإعلامية فقط. استشر عالمًا إسلاميًا مؤهلاً للأحكام الشخصية.',
      zakat_gold:   'زكاة الذهب',
      zakat_crypto: 'زكاة العملات المشفرة',
      zakat_nisab:  'نصاب الزكاة',
      halal_e471:   'هل E471 حلال؟',
      halal_e441:   'هل E441 حلال؟',
      halal_e120:   'هل E120 حلال؟',
      halal_scanner:'ماسح الباركود',
      lang_label:   'اللغة',
    }
  },

  ur: {
    code: 'ur', name: 'اردو', flag: '🇵🇰', dir: 'rtl', font: 'Noto Nastaliq Urdu',
    t: {
      nav_zakat:  'زکوٰۃ کیلکولیٹر',
      nav_halal:  'حلال چیکر',
      nav_about:  'ہمارے بارے میں',
      hero_eyebrow: 'مفت · عملی · اسلامی',
      hero_h1:    'زکوٰۃ کیلکولیٹر اور حلال فوڈ چیکر',
      hero_sub:   'دنیا بھر کے مسلمانوں کے لیے اسلامی معلوماتی ٹولز۔ سونے، کرپٹو اور بچتوں پر زکوٰۃ حساب کریں — اور کھانے کے E-نمبر تلاش کریں۔',
      hero_cta1:  'زکوٰۃ حساب کریں ←',
      hero_cta2:  'E-نمبر چیک کریں ←',
      trust_2: '🌍 ۹ زبانیں',
      trust_3: '⚡ ہمیشہ مفت',
      trust_4: '🔒 رجسٹریشن نہیں',
      stat1_label: 'E-نمبر چیک شدہ',
      stat2_label: 'زکوٰۃ کی اقسام',
      stat3_label: 'زبانیں',
      stat4_label: 'ہمیشہ کے لیے',
      tools_heading: 'ہمارے اسلامی ٹولز',
      tools_sub:     'سادہ، قابل اعتماد ٹولز — روزمرہ مسلم زندگی کے لیے۔',
      zakat_title:   'زکوٰۃ کیلکولیٹر',
      zakat_desc:    'سونے، چاندی، نقد، بچتوں اور کرپٹو کرنسی پر سالانہ زکوٰۃ حساب کریں۔ نصاب خودکار طریقے سے لاگو ہوتا ہے۔',
      zakat_arrow:   'کیلکولیٹر کھولیں ←',
      halal_title:   'حلال E-نمبر چیکر',
      halal_desc:    'فوری طور پر چیک کریں کہ آیا کھانے کی اضافی اشیاء (E-نمبر) حلال، حرام یا مشبوہ ہیں۔',
      halal_arrow:   'E-نمبر چیک کریں ←',
      enumbers_heading: 'عام E-نمبر',
      enumbers_sub:     'غذائی اضافوں کو E-نمبر کے مطابق دیکھیں۔',
      e471_name:  'مونو اور ڈائی گلیسرائیڈز',
      e441_name:  'جیلاٹن',
      e120_name:  'کارمین / کوچنیل',
      all_label:  'سب ←',
      all_sub:    '۸۰+ اشیاء',
      all_verdict:'مکمل ڈیٹا بیس',
      mashbooh:   '⚠ مشبوہ',
      often_haram:'✗ اکثر حرام',
      haram:      '✗ حرام',
      halal:      '✓ حلال',
      why_heading: 'QuantixTools کیوں؟',
      why_sub:     'روزمرہ استعمال کے لیے عملی معلوماتی ٹولز۔',
      why1_title:  'ہمیشہ مفت',
      why1_desc:   'کوئی اکاؤنٹ نہیں، کوئی سبسکرپشن نہیں، کوئی چھپی ہوئی فیس نہیں۔',
      why2_title:  'کثیر زبان',
      why2_desc:   'دنیا بھر کے مسلمانوں کے لیے ۹ زبانوں میں دستیاب۔',
      why4_title:  'فوری نتائج',
      why4_desc:   'کوئی انتظار نہیں — سیکنڈوں میں جواب۔',
      footer_desc:    'مفت اسلامی ٹولز۔ حلال فوڈ چیکر اور زکوٰۃ کیلکولیٹر، ۹ زبانوں میں دستیاب۔',
      footer_zakat:   'زکوٰۃ',
      footer_halal:   'حلال چیکر',
      footer_info:    'معلومات',
      footer_about:   'ہمارے بارے میں',
      footer_privacy: 'رازداری کی پالیسی',
      footer_terms:   'شرائط',
      footer_bottom:  'صرف معلوماتی مقاصد کے لیے۔ ذاتی احکام کے لیے کسی مستند عالم سے رجوع کریں۔',
      zakat_gold:   'سونے کی زکوٰۃ',
      zakat_crypto: 'کرپٹو کی زکوٰۃ',
      zakat_nisab:  'نصاب',
      halal_e471:   'کیا E471 حلال ہے؟',
      halal_e441:   'کیا E441 حلال ہے؟',
      halal_e120:   'کیا E120 حلال ہے؟',
      halal_scanner:'بارکوڈ اسکینر',
      lang_label:   'زبان',
    }
  },

  tr: {
    code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr', font: 'Inter',
    t: {
      nav_zakat:  'Zekat Hesaplayıcı',
      nav_halal:  'Helal Denetleyici',
      nav_about:  'Hakkımızda',
      hero_eyebrow: 'Ücretsiz · Kullanışlı · İslami',
      hero_h1:    'Zekat Hesaplayıcı ve Helal Gıda Denetleyici',
      hero_sub:   'Dünya genelindeki Müslümanlar için İslami başvuru araçları. Altın, kripto ve birikimler üzerinden zekatınızı hesaplayın — gıda E-numaralarını arayın.',
      hero_cta1:  'Zekat Hesapla →',
      hero_cta2:  'E-Numara Kontrol →',
      trust_2: '🌍 9 Dil',
      trust_3: '⚡ Her zaman ücretsiz',
      trust_4: '🔒 Kayıt gerekmez',
      stat1_label: 'E-Numara Kontrol',
      stat2_label: 'Zekat Kategorisi',
      stat3_label: 'Dil',
      stat4_label: 'Sonsuza kadar',
      tools_heading: 'İslami Araçlarımız',
      tools_sub:     'Günlük Müslüman yaşamı için sade ve güvenilir araçlar.',
      zakat_title:   'Zekat Hesaplayıcı',
      zakat_desc:    'Altın, gümüş, nakit, birikim ve kripto para üzerindeki yıllık zekatınızı hesaplayın. Nisap otomatik uygulanır.',
      zakat_arrow:   'Hesaplayıcıyı Aç →',
      halal_title:   'Helal E-Numara Denetleyici',
      halal_desc:    'Gıda katkı maddelerinin (E-numaralar) helal, haram veya meşkûk olup olmadığını anında kontrol edin.',
      halal_arrow:   'E-Numara Kontrol Et →',
      enumbers_heading: 'Yaygın E-Numaralar',
      enumbers_sub:     'Gıda katkı maddelerine E-numarasına göre göz atın.',
      e471_name:  'Mono ve Digliseritler',
      e441_name:  'Jelatin',
      e120_name:  'Karmin / Koşnil',
      all_label:  'Tümü →',
      all_sub:    '104+ madde',
      all_verdict:'Tam veritabanı',
      mashbooh:   '⚠ Meşkûk',
      often_haram:'✗ Çoğunlukla Haram',
      haram:      '✗ Haram',
      halal:      '✓ Helal',
      why_heading: 'Neden QuantixTools?',
      why_sub:     'Günlük kullanım için pratik başvuru araçları.',
      why1_title:  'Her Zaman Ücretsiz',
      why1_desc:   'Hesap, abonelik, gizli ücret yok — hiçbir zaman.',
      why2_title:  'Çok Dilli',
      why2_desc:   'Dünya genelindeki Müslümanlar için 9 dilde mevcut.',
      why4_title:  'Anında Sonuç',
      why4_desc:   'Bekleme yok — saniyeler içinde cevap.',
      footer_desc:    'Ücretsiz İslami araçlar. Helal Gıda Denetleyici ve Zekat Hesaplayıcı, 9 dilde mevcut.',
      footer_zakat:   'Zekat',
      footer_halal:   'Helal Denetleyici',
      footer_info:    'Bilgi',
      footer_about:   'Hakkımızda',
      footer_privacy: 'Gizlilik Politikası',
      footer_terms:   'Şartlar',
      footer_bottom:  'Yalnızca bilgilendirme amaçlıdır. Kişisel hükümler için nitelikli bir İslam aliminden görüş alın.',
      zakat_gold:   'Altın Zekatı',
      zakat_crypto: 'Kripto Zekatı',
      zakat_nisab:  'Nisap Eşiği',
      halal_e471:   'E471 Helal mi?',
      halal_e441:   'E441 Helal mi?',
      halal_e120:   'E120 Helal mi?',
      halal_scanner:'Barkod Tarayıcı',
      lang_label:   'Dil',
    }
  },

  id: {
    code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr', font: 'Inter',
    t: {
      nav_zakat:  'Kalkulator Zakat',
      nav_halal:  'Pemeriksa Halal',
      nav_about:  'Tentang Kami',
      hero_eyebrow: 'Gratis · Praktis · Islami',
      hero_h1:    'Kalkulator Zakat & Pemeriksa Makanan Halal',
      hero_sub:   'Alat referensi Islam untuk Muslim di seluruh dunia. Hitung Zakat atas emas, kripto & tabungan — dan cari nomor-E bahan tambahan makanan.',
      hero_cta1:  'Hitung Zakat →',
      hero_cta2:  'Periksa Nomor-E →',
      trust_2: '🌍 9 Bahasa',
      trust_3: '⚡ Selalu gratis',
      trust_4: '🔒 Tanpa daftar',
      stat1_label: 'Nomor E Diperiksa',
      stat2_label: 'Kategori Zakat',
      stat3_label: 'Bahasa',
      stat4_label: 'Selamanya',
      tools_heading: 'Alat Islam Kami',
      tools_sub:     'Alat yang sederhana dan andal — dibuat untuk kehidupan Muslim sehari-hari.',
      zakat_title:   'Kalkulator Zakat',
      zakat_desc:    'Hitung Zakat tahunan Anda atas emas, perak, uang tunai, tabungan, dan mata uang kripto. Ambang batas Nisab otomatis diterapkan.',
      zakat_arrow:   'Buka Kalkulator →',
      halal_title:   'Pemeriksa Nomor-E Halal',
      halal_desc:    'Periksa secara instan apakah aditif makanan (nomor E) Halal, Haram, atau Masybooh. Database 104+ aditif makanan umum.',
      halal_arrow:   'Periksa Nomor-E →',
      enumbers_heading: 'Nomor-E Umum',
      enumbers_sub:     'Telusuri bahan tambahan makanan berdasarkan nomor-E.',
      e471_name:  'Mono & Digliserida',
      e441_name:  'Gelatin',
      e120_name:  'Karmin / Cochineal',
      all_label:  'Semua →',
      all_sub:    '104+ aditif',
      all_verdict:'Database lengkap',
      mashbooh:   '⚠ Masybooh',
      often_haram:'✗ Sering Haram',
      haram:      '✗ Haram',
      halal:      '✓ Halal',
      why_heading: 'Mengapa QuantixTools?',
      why_sub:     'Alat referensi praktis untuk penggunaan sehari-hari.',
      why1_title:  'Selalu Gratis',
      why1_desc:   'Tanpa akun, tanpa langganan, tanpa biaya tersembunyi — selamanya.',
      why2_title:  'Multi-Bahasa',
      why2_desc:   'Tersedia dalam 9 bahasa untuk Muslim di seluruh dunia.',
      why4_title:  'Hasil Instan',
      why4_desc:   'Tanpa menunggu — jawaban dalam hitungan detik.',
      footer_desc:    'Alat Islam gratis. Pemeriksa Makanan Halal dan Kalkulator Zakat, tersedia dalam 9 bahasa.',
      footer_zakat:   'Zakat',
      footer_halal:   'Pemeriksa Halal',
      footer_info:    'Info',
      footer_about:   'Tentang Kami',
      footer_privacy: 'Kebijakan Privasi',
      footer_terms:   'Ketentuan',
      footer_bottom:  'Hanya untuk tujuan informasi. Konsultasikan dengan ulama Islam yang berkualifikasi untuk hukum pribadi.',
      zakat_gold:   'Zakat Emas',
      zakat_crypto: 'Zakat Kripto',
      zakat_nisab:  'Ambang Nisab',
      halal_e471:   'Apakah E471 Halal?',
      halal_e441:   'Apakah E441 Halal?',
      halal_e120:   'Apakah E120 Halal?',
      halal_scanner:'Pemindai Barcode',
      lang_label:   'Bahasa',
    }
  },

  bn: {
    code: 'bn', name: 'বাংলা', flag: '🇧🇩', dir: 'ltr', font: 'Hind Siliguri',
    t: {
      nav_zakat:  'যাকাত ক্যালকুলেটর',
      nav_halal:  'হালাল চেকার',
      nav_about:  'আমাদের সম্পর্কে',
      hero_eyebrow: 'বিনামূল্যে · ব্যবহারিক · ইসলামিক',
      hero_h1:    'যাকাত ক্যালকুলেটর ও হালাল ফুড চেকার',
      hero_sub:   'বিশ্বজুড়ে মুসলমানদের জন্য ইসলামিক তথ্যসূত্রের সরঞ্জাম। সোনা, ক্রিপ্টো ও সঞ্চয়ে যাকাত হিসাব করুন — এবং খাদ্য সংযোজনীর ই-নম্বর খুঁজুন।',
      hero_cta1:  'যাকাত হিসাব করুন →',
      hero_cta2:  'ই-নম্বর চেক করুন →',
      trust_2: '🌍 ৯টি ভাষা',
      trust_3: '⚡ সর্বদা বিনামূল্যে',
      trust_4: '🔒 নিবন্ধন নেই',
      stat1_label: 'ই-নম্বর যাচাই',
      stat2_label: 'যাকাতের বিভাগ',
      stat3_label: 'ভাষা',
      stat4_label: 'চিরকালের জন্য',
      tools_heading: 'আমাদের ইসলামিক টুলস',
      tools_sub:     'সহজ, নির্ভরযোগ্য টুলস — মুসলমানদের দৈনন্দিন জীবনের জন্য।',
      zakat_title:   'যাকাত ক্যালকুলেটর',
      zakat_desc:    'সোনা, রূপা, নগদ, সঞ্চয় ও ক্রিপ্টোকারেন্সিতে বার্ষিক যাকাত হিসাব করুন। নিসাব স্বয়ংক্রিয়ভাবে প্রয়োগ হয়।',
      zakat_arrow:   'ক্যালকুলেটর খুলুন →',
      halal_title:   'হালাল ই-নম্বর চেকার',
      halal_desc:    'খাদ্য সংযোজন (ই-নম্বর) হালাল, হারাম বা মাশবুহ কিনা তাৎক্ষণিকভাবে যাচাই করুন।',
      halal_arrow:   'ই-নম্বর চেক করুন →',
      enumbers_heading: 'সাধারণ ই-নম্বর',
      enumbers_sub:     'ই-নম্বর অনুযায়ী খাদ্য সংযোজনীগুলো দেখুন।',
      e471_name:  'মনো ও ডিগ্লিসারাইড',
      e441_name:  'জেলাটিন',
      e120_name:  'কারমিন / কোচিনিল',
      all_label:  'সব →',
      all_sub:    '৮০+ উপাদান',
      all_verdict:'সম্পূর্ণ ডেটাবেস',
      mashbooh:   '⚠ মাশবুহ',
      often_haram:'✗ প্রায়ই হারাম',
      haram:      '✗ হারাম',
      halal:      '✓ হালাল',
      why_heading: 'কেন QuantixTools?',
      why_sub:     'দৈনন্দিন ব্যবহারের জন্য ব্যবহারিক রেফারেন্স টুল।',
      why1_title:  'সর্বদা বিনামূল্যে',
      why1_desc:   'কোনো অ্যাকাউন্ট নেই, সাবস্ক্রিপশন নেই, লুকানো ফি নেই — কখনোই।',
      why2_title:  'বহুভাষিক',
      why2_desc:   'বিশ্বজুড়ে মুসলমানদের জন্য ৯টি ভাষায় পাওয়া যায়।',
      why4_title:  'তাৎক্ষণিক ফলাফল',
      why4_desc:   'অপেক্ষা নেই — সেকেন্ডের মধ্যে উত্তর।',
      footer_desc:    'বিনামূল্যে ইসলামিক টুলস। হালাল ফুড চেকার ও যাকাত ক্যালকুলেটর, ৯টি ভাষায়।',
      footer_zakat:   'যাকাত',
      footer_halal:   'হালাল চেকার',
      footer_info:    'তথ্য',
      footer_about:   'আমাদের সম্পর্কে',
      footer_privacy: 'গোপনীয়তা নীতি',
      footer_terms:   'শর্তাবলী',
      footer_bottom:  'শুধুমাত্র তথ্যমূলক উদ্দেশ্যে। ব্যক্তিগত বিধানের জন্য একজন যোগ্য ইসলামি আলেমের সাথে পরামর্শ করুন।',
      zakat_gold:   'সোনার যাকাত',
      zakat_crypto: 'ক্রিপ্টো যাকাত',
      zakat_nisab:  'নিসাব সীমা',
      halal_e471:   'E471 কি হালাল?',
      halal_e441:   'E441 কি হালাল?',
      halal_e120:   'E120 কি হালাল?',
      halal_scanner:'বারকোড স্ক্যানার',
      lang_label:   'ভাষা',
    }
  },

  fr: {
    code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr', font: 'Inter',
    t: {
      nav_zakat:  'Calculateur de Zakat',
      nav_halal:  'Vérificateur Halal',
      nav_about:  'À propos',
      hero_eyebrow: 'Gratuit · Pratique · Islamique',
      hero_h1:    'Calculateur de Zakat & Vérificateur Halal',
      hero_sub:   'Outils de référence islamique pour les musulmans du monde entier. Estimez la Zakat sur l\'or, la crypto et l\'épargne — recherchez les numéros E alimentaires.',
      hero_cta1:  'Calculer la Zakat →',
      hero_cta2:  'Vérifier les N° E →',
      trust_2: '🌍 9 Langues',
      trust_3: '⚡ Toujours gratuit',
      trust_4: '🔒 Sans inscription',
      stat1_label: 'Numéros E vérifiés',
      stat2_label: 'Catégories Zakat',
      stat3_label: 'Langues',
      stat4_label: 'Pour toujours',
      tools_heading: 'Nos Outils Islamiques',
      tools_sub:     'Des outils simples et fiables — conçus pour la vie quotidienne du musulman.',
      zakat_title:   'Calculateur de Zakat',
      zakat_desc:    'Calculez votre Zakat annuelle sur l\'or, l\'argent, les liquidités, l\'épargne et les cryptomonnaies. Seuil Nisab appliqué automatiquement.',
      zakat_arrow:   'Ouvrir le calculateur →',
      halal_title:   'Vérificateur de Numéros E Halal',
      halal_desc:    'Vérifiez instantanément si les additifs alimentaires (numéros E) sont Halal, Haram ou Mashbooh. Base de données de 104+ additifs.',
      halal_arrow:   'Vérifier les Numéros E →',
      enumbers_heading: 'Numéros E Courants',
      enumbers_sub:     'Parcourez les additifs alimentaires par numéro E.',
      e471_name:  'Mono et Diglycérides',
      e441_name:  'Gélatine',
      e120_name:  'Carmin / Cochenille',
      all_label:  'Tout →',
      all_sub:    '104+ additifs',
      all_verdict:'Base complète',
      mashbooh:   '⚠ Mashbooh',
      often_haram:'✗ Souvent Haram',
      haram:      '✗ Haram',
      halal:      '✓ Halal',
      why_heading: 'Pourquoi QuantixTools?',
      why_sub:     'Des outils de référence pratiques pour le quotidien.',
      why1_title:  'Toujours Gratuit',
      why1_desc:   'Pas de compte, d\'abonnement ni de frais cachés — jamais.',
      why2_title:  'Multilingue',
      why2_desc:   'Disponible en 9 langues pour les musulmans du monde entier.',
      why4_title:  'Résultats Instantanés',
      why4_desc:   'Pas d\'attente — des réponses en quelques secondes.',
      footer_desc:    'Outils islamiques gratuits. Vérificateur Halal et Calculateur de Zakat, disponibles en 9 langues.',
      footer_zakat:   'Zakat',
      footer_halal:   'Vérificateur Halal',
      footer_info:    'Info',
      footer_about:   'À propos',
      footer_privacy: 'Politique de confidentialité',
      footer_terms:   'Conditions',
      footer_bottom:  'À titre informatif uniquement. Consultez un érudit islamique qualifié pour des jugements personnels.',
      zakat_gold:   'Zakat sur l\'Or',
      zakat_crypto: 'Zakat sur la Crypto',
      zakat_nisab:  'Seuil Nisab',
      halal_e471:   'E471 est-il Halal?',
      halal_e441:   'E441 est-il Halal?',
      halal_e120:   'E120 est-il Halal?',
      halal_scanner:'Scanner de Code-barres',
      lang_label:   'Langue',
    }
  },

  ms: {
    code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr', font: 'Inter',
    t: {
      nav_zakat:  'Kalkulator Zakat',
      nav_halal:  'Pemeriksa Halal',
      nav_about:  'Tentang Kami',
      hero_eyebrow: 'Percuma · Praktikal · Islamik',
      hero_h1:    'Kalkulator Zakat & Pemeriksa Makanan Halal',
      hero_sub:   'Alat rujukan Islam untuk Muslim di seluruh dunia. Anggarkan Zakat ke atas emas, kripto & simpanan — dan cari nombor-E bahan tambahan makanan.',
      hero_cta1:  'Kira Zakat →',
      hero_cta2:  'Semak Nombor-E →',
      trust_2: '🌍 9 Bahasa',
      trust_3: '⚡ Sentiasa percuma',
      trust_4: '🔒 Tanpa daftar',
      stat1_label: 'Nombor E Disemak',
      stat2_label: 'Kategori Zakat',
      stat3_label: 'Bahasa',
      stat4_label: 'Selama-lamanya',
      tools_heading: 'Alat Islam Kami',
      tools_sub:     'Alat yang mudah dan boleh dipercayai — dibina untuk kehidupan Muslim seharian.',
      zakat_title:   'Kalkulator Zakat',
      zakat_desc:    'Kira Zakat tahunan anda ke atas emas, perak, wang tunai, simpanan dan mata wang kripto. Ambang Nisab digunakan secara automatik.',
      zakat_arrow:   'Buka Kalkulator →',
      halal_title:   'Pemeriksa Nombor-E Halal',
      halal_desc:    'Semak dengan serta-merta sama ada bahan tambah makanan (nombor E) adalah Halal, Haram atau Mashbooh.',
      halal_arrow:   'Semak Nombor-E →',
      enumbers_heading: 'Nombor-E Biasa',
      enumbers_sub:     'Lihat bahan tambahan makanan mengikut nombor-E.',
      e471_name:  'Mono & Digliserida',
      e441_name:  'Gelatin',
      e120_name:  'Karmin / Cochineal',
      all_label:  'Semua →',
      all_sub:    '104+ bahan',
      all_verdict:'Pangkalan data penuh',
      mashbooh:   '⚠ Mashbooh',
      often_haram:'✗ Kerap Haram',
      haram:      '✗ Haram',
      halal:      '✓ Halal',
      why_heading: 'Kenapa QuantixTools?',
      why_sub:     'Alat rujukan praktikal untuk kegunaan harian.',
      why1_title:  'Sentiasa Percuma',
      why1_desc:   'Tiada akaun, tiada langganan, tiada bayaran tersembunyi — selamanya.',
      why2_title:  'Pelbagai Bahasa',
      why2_desc:   'Tersedia dalam 9 bahasa untuk Muslim di seluruh dunia.',
      why4_title:  'Keputusan Segera',
      why4_desc:   'Tiada menunggu — jawapan dalam beberapa saat.',
      footer_desc:    'Alat Islam percuma. Pemeriksa Makanan Halal dan Kalkulator Zakat, tersedia dalam 9 bahasa.',
      footer_zakat:   'Zakat',
      footer_halal:   'Pemeriksa Halal',
      footer_info:    'Maklumat',
      footer_about:   'Tentang Kami',
      footer_privacy: 'Dasar Privasi',
      footer_terms:   'Terma',
      footer_bottom:  'Untuk tujuan maklumat sahaja. Rujuk ulama Islam yang berkelayakan untuk hukum peribadi.',
      zakat_gold:   'Zakat Emas',
      zakat_crypto: 'Zakat Kripto',
      zakat_nisab:  'Ambang Nisab',
      halal_e471:   'Adakah E471 Halal?',
      halal_e441:   'Adakah E441 Halal?',
      halal_e120:   'Adakah E120 Halal?',
      halal_scanner:'Pengimbas Kod Bar',
      lang_label:   'Bahasa',
    }
  },

  fa: {
    code: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl', font: 'Vazirmatn',
    t: {
      nav_zakat:  'ماشین‌حساب زکات',
      nav_halal:  'بررسی‌کننده حلال',
      nav_about:  'درباره ما',
      hero_eyebrow: 'رایگان · کاربردی · اسلامی',
      hero_h1:    'ماشین‌حساب زکات و بررسی‌کننده غذای حلال',
      hero_sub:   'ابزارهای مرجع اسلامی برای مسلمانان سراسر جهان. زکات طلا، ارز دیجیتال و پس‌انداز را برآورد کنید — و شماره‌های E مواد غذایی را جست‌وجو کنید.',
      hero_cta1:  'محاسبه زکات ←',
      hero_cta2:  'بررسی شماره‌های E ←',
      trust_2: '🌍 ۹ زبان',
      trust_3: '⚡ همیشه رایگان',
      trust_4: '🔒 بدون ثبت‌نام',
      stat1_label: 'شماره‌های E بررسی شده',
      stat2_label: 'دسته‌های زکات',
      stat3_label: 'زبان',
      stat4_label: 'برای همیشه',
      tools_heading: 'ابزارهای اسلامی ما',
      tools_sub:     'ابزارهای ساده و قابل اعتماد — ساخته شده برای زندگی روزمره مسلمانان.',
      zakat_title:   'ماشین‌حساب زکات',
      zakat_desc:    'زکات سالانه خود را بر روی طلا، نقره، پول نقد، پس‌انداز و ارز دیجیتال محاسبه کنید. آستانه نصاب به‌طور خودکار اعمال می‌شود.',
      zakat_arrow:   'باز کردن ماشین‌حساب ←',
      halal_title:   'بررسی‌کننده شماره‌های E حلال',
      halal_desc:    'فوری بررسی کنید که آیا افزودنی‌های غذایی (شماره‌های E) حلال، حرام یا مشبوه هستند.',
      halal_arrow:   'بررسی شماره‌های E ←',
      enumbers_heading: 'شماره‌های E رایج',
      enumbers_sub:     'افزودنی‌های غذایی را بر اساس شماره E مرور کنید.',
      e471_name:  'مونو و دی‌گلیسریدها',
      e441_name:  'ژلاتین',
      e120_name:  'کارمین / کوشنیل',
      all_label:  'همه ←',
      all_sub:    '۸۰+ ماده',
      all_verdict:'پایگاه داده کامل',
      mashbooh:   '⚠ مشبوه',
      often_haram:'✗ اغلب حرام',
      haram:      '✗ حرام',
      halal:      '✓ حلال',
      why_heading: 'چرا QuantixTools؟',
      why_sub:     'ابزارهای مرجع کاربردی برای استفاده روزمره.',
      why1_title:  'همیشه رایگان',
      why1_desc:   'بدون حساب، بدون اشتراک، بدون هزینه پنهان — هرگز.',
      why2_title:  'چندزبانه',
      why2_desc:   'در ۹ زبان برای مسلمانان سراسر جهان موجود است.',
      why4_title:  'نتایج فوری',
      why4_desc:   'بدون انتظار — پاسخ در چند ثانیه.',
      footer_desc:    'ابزارهای اسلامی رایگان. بررسی‌کننده غذای حلال و ماشین‌حساب زکات، در ۹ زبان موجود است.',
      footer_zakat:   'زکات',
      footer_halal:   'بررسی‌کننده حلال',
      footer_info:    'اطلاعات',
      footer_about:   'درباره ما',
      footer_privacy: 'سیاست حریم خصوصی',
      footer_terms:   'شرایط',
      footer_bottom:  'فقط برای اهداف اطلاع‌رسانی. برای احکام شخصی با یک عالم اسلامی واجد شرایط مشورت کنید.',
      zakat_gold:   'زکات طلا',
      zakat_crypto: 'زکات ارز دیجیتال',
      zakat_nisab:  'آستانه نصاب',
      halal_e471:   'آیا E471 حلال است؟',
      halal_e441:   'آیا E441 حلال است؟',
      halal_e120:   'آیا E120 حلال است؟',
      halal_scanner:'اسکنر بارکد',
      lang_label:   'زبان',
    }
  }

};

/* ── Font map ─────────────────────────────────────────────────── */
const QT_FONTS = {
  'Inter':              'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'Cairo':              'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap',
  'Noto Nastaliq Urdu': 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap',
  'Hind Siliguri':      'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap',
  'Vazirmatn':          'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap',
};

/* ── Core i18n engine ─────────────────────────────────────────── */
const QTi18n = {

  currentLang: 'en',

  init() {
    const saved = localStorage.getItem('qt_lang') || navigator.language.split('-')[0];
    const lang  = QT_LANGS[saved] ? saved : 'en';
    this.apply(lang, false);
    this.buildDropdown();
  },

  apply(code, animate = true) {
    const lang = QT_LANGS[code];
    if (!lang) return;

    this.currentLang = code;
    localStorage.setItem('qt_lang', code);

    // Direction + lang attr
    document.documentElement.lang = code;
    document.documentElement.dir  = lang.dir;
    document.body.classList.toggle('rtl', lang.dir === 'rtl');

    // Font
    this.loadFont(lang.font, code);

    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (lang.t[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = lang.t[key];
        } else {
          el.innerHTML = lang.t[key];
        }
      }
    });

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === code);
    });

    // Update the trigger button label
    const trigger = document.getElementById('lang-trigger');
    if (trigger) {
      trigger.innerHTML = `${lang.flag} <span>${lang.name}</span> <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
    }

    // Animate page content on language change
    if (animate) {
      document.body.style.opacity = '0.6';
      document.body.style.transition = 'opacity 0.15s';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 150);
    }

    // Close dropdown
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.remove('open');
  },

  loadFont(fontName, langCode) {
    if (fontName === 'Inter') {
      return;
    }

    const url = QT_FONTS[fontName];
    if (!url) return;
    const existingId = `qt-font-${langCode}`;
    if (document.getElementById(existingId)) return;
    const link = document.createElement('link');
    link.id   = existingId;
    link.rel  = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
    // Apply font to body
    document.body.style.fontFamily = `'${fontName}', system-ui, sans-serif`;
  },

  buildDropdown() {
    const wrapper = document.getElementById('lang-switcher');
    if (!wrapper) return;

    const current = QT_LANGS[this.currentLang];

    wrapper.innerHTML = `
      <button class="lang-trigger" id="lang-trigger" aria-haspopup="listbox" aria-expanded="false"
        aria-label="Select language">
        ${current.flag} <span>${current.name}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="lang-dropdown" id="lang-dropdown" role="listbox" aria-label="Language">
        <div class="lang-dropdown-header" data-i18n="lang_label">Language</div>
        <div class="lang-grid">
          ${Object.values(QT_LANGS).map(l => `
            <button class="lang-option ${l.code === this.currentLang ? 'active' : ''}"
              data-lang="${l.code}" role="option"
              aria-selected="${l.code === this.currentLang}">
              <span class="lang-flag">${l.flag}</span>
              <span class="lang-name">${l.name}</span>
              ${l.dir === 'rtl' ? '<span class="lang-rtl-badge">RTL</span>' : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Toggle dropdown
    const trigger  = document.getElementById('lang-trigger');
    const dropdown = document.getElementById('lang-dropdown');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open);
    });

    // Select language
    dropdown.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        this.apply(btn.dataset.lang);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', false);
      }
    });

    // Keyboard nav
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', false);
      }
    });
  }
};

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', () => QTi18n.init());

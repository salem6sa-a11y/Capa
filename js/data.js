/**
 * CAPTURHA | كبتشرها - Data Store & LocalStorage Manager
 */

const DEFAULT_PORTFOLIO = [
  {
    id: 'p_nature_fog_mountains',
    title: 'سحر تضاريس الطبيعة والضباب فوق القمم',
    category: 'nature',
    categoryName: '🏞️ طبيعة',
    image: 'assets/images/nature_fog_mountains.jpg',
    location: 'المملكة العربية السعودية',
    date: '2026-08-05'
  },
  {
    id: 'p_nature_sunstar_peaks',
    title: 'شعاع الشمس الدافئ بين قمم الجبال والنباتات البرية',
    category: 'nature',
    categoryName: '🏞️ طبيعة',
    image: 'assets/images/nature_sunstar_peaks.jpg',
    location: 'المملكة العربية السعودية',
    date: '2026-08-05'
  },
  {
    id: 'v_mobily_drone_1vicFji',
    title: 'تصوير جوي سينمائي (درون) - لشركة موبايلي Mobily',
    category: 'videos',
    categoryName: '🎬 الفيديوهات السينمائية',
    image: 'https://lh3.googleusercontent.com/d/1vicFjiHVvfJOl_6TicvT7y-wa7x1Zvq0=w1000',
    isVideo: true,
    isDriveVideo: true,
    driveId: '1vicFjiHVvfJOl_6TicvT7y-wa7x1Zvq0',
    duration: 'تصوير جوي',
    location: 'المملكة العربية السعودية',
    date: '2026-08-05'
  },
  {
    id: 'v_riyadh_trips_1wMNORh6',
    title: 'تصوير فيديو شركة Riyadh Trips لتنظيم الرحلات',
    category: 'videos',
    categoryName: '🎬 الفيديوهات السينمائية',
    image: 'https://lh3.googleusercontent.com/d/1wMNORh6-VltUKUYRrkNhbO4S6K0HdV3U=w1000',
    isVideo: true,
    isDriveVideo: true,
    driveId: '1wMNORh6-VltUKUYRrkNhbO4S6K0HdV3U',
    duration: 'توثيق رحلات',
    location: 'الرياض، المملكة العربية السعودية',
    date: '2026-08-05'
  },
  {
    id: 'v_apt_1bEgQx7',
    title: 'تصوير شقة تصميم معماري مودرن',
    category: 'videos',
    categoryName: '🎬 الفيديوهات السينمائية',
    image: 'https://lh3.googleusercontent.com/d/1bEgQx7KVUS4XtTEzlHfKNEL3pJOPOmy1=w1000',
    isVideo: true,
    isDriveVideo: true,
    driveId: '1bEgQx7KVUS4XtTEzlHfKNEL3pJOPOmy1',
    duration: 'تصوير معماري',
    location: 'الرياض، المملكة العربية السعودية',
    date: '2026-08-05'
  },
  {
    id: 'v_pOg-Lwk-HN0',
    title: 'عرض كبتشرها السينمائي الخاص | CAPTURHA Showreel',
    category: 'videos',
    categoryName: '🎬 الفيديوهات السينمائية',
    image: 'https://img.youtube.com/vi/pOg-Lwk-HN0/hqdefault.jpg',
    isVideo: true,
    youtubeId: 'pOg-Lwk-HN0',
    duration: 'عرض سينمائي',
    location: 'الرياض، المملكة العربية السعودية',
    date: '2026-08-05'
  }
];

const DEFAULT_VIDEOS = [
  {
    id: 'v1',
    title: 'فيلم وثائقي: أسرار السماء الليلية في صحاري المملكة',
    category: 'أفلام سينمائية',
    duration: '08:45',
    thumbnail: 'assets/images/hero_milkyway.jpg',
    youtubeId: 'L_LUpnjgPso',
    views: '124K'
  },
  {
    id: 'v2',
    title: 'إعلان تجاري سينمائي: رحلة اكتشاف الطبيعة بالدرون',
    category: 'تصوير جوي بالدرون',
    duration: '02:30',
    thumbnail: 'assets/images/landscape_nature.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    views: '89K'
  },
  {
    id: 'v3',
    title: 'تايم لابس سينمائي 8K: حركة النجوم فوق جبال العُلا',
    category: 'تايم لابس',
    duration: '04:15',
    thumbnail: 'assets/images/about_photographer.jpg',
    youtubeId: 'L_LUpnjgPso',
    views: '215K'
  },
  {
    id: 'v4',
    title: 'فخامة السيارات: تصوير ليلي سينمائي مع الإضاءة التفاعلية',
    category: 'إعلانات',
    duration: '03:10',
    thumbnail: 'assets/images/commercial_automotive.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    views: '96K'
  }
];

const DEFAULT_GEAR = [
  { name: 'كاميرات Sony Cinema & Alpha', type: 'Sony FX6 / FX3 / α7R V', icon: 'camera', desc: 'أحدث حساسات الإطار الكامل لتصوير سينمائي وفلكي فائق الدقة.' },
  { name: 'عدسات سينمائية وفاخرة', type: 'Sony GM & G Lenses', icon: 'disc', desc: 'فتحات عدسة واسعة f/1.2 و f/1.4 لالتقاط أدق تفاصيل المجرات والبورتريه.' },
  { name: 'طائرات بدون طيار (DJI Drone)', type: 'DJI Mavic 3 Cine & Inspire 3', icon: 'wind', desc: 'تصوير جوي بدقة 5.1K Raw وزوايا سينمائية استثنائية.' },
  { name: 'كاميرات المغامرات GoPro', type: 'GoPro HERO12 Black', icon: 'video', desc: 'لتوثيق اللحظات الحماسية والرياضات والظروف الصعبة بدقة 5.3K.' },
  { name: 'أنظمة الإضاءة الاحترافية', type: 'Aputure & Nanlite Studio Lights', icon: 'sun', desc: 'إضاءة سينمائية متكاملة للمناطق الخارجية والاستوديو.' },
  { name: 'معدات تسجيل الصوت', type: 'Sennheiser & Rode Wireless Pro', icon: 'mic', desc: 'نقاء صوتي عالي الدقة بدون ضوضاء مع عزل احترافي.' },
  { name: 'معدات التخييم الفاخرة', type: 'Expedition & Camping Tools', icon: 'compass', desc: 'معدات رحلات استكشافية متكاملة للوصول إلى أبعد النقاط الفلكية.' }
];

const DEFAULT_TESTIMONIALS = [
  {
    name: 'عبدالله السبيعي',
    role: 'رئيس قسم التسويق - شركة طويق',
    rating: 5,
    comment: 'تجربة العمل مع فريق كبتشرها كانت فوق التوقعات. احترافية عالية في تصوير الفيديو التجاري والاهتمام بأدق التفاصيل السينمائية.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'م. سارة العتيبي',
    role: 'مديرة مشروع - هيئة تطوير محمية الملك سلمان',
    rating: 5,
    comment: 'لقطات درب التبانة والتصوير الجوي بالدرون التي نفذها كبتشرها أضافت بعدًا جماليًا ساحرًا لحملتنا التعريفية بالثروات الطبيعية.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'خالد الهاجري',
    role: 'مؤسس براند سرمد للرحلات',
    rating: 5,
    comment: 'شغف حقيقي وتفانٍ في العمل. التايم لابس وتصحيح الألوان في الفيديوهات يعكس جودة تضاهي أكبر الاستوديوهات العالمية.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

const DEFAULT_ARTICLES = [
  {
    id: 'a1',
    title: 'دليل التصوير الفلكي: كيف تلتقط درب التبانة بأعلى دقة؟',
    category: 'مقالات تعليمية',
    date: '2025-07-15',
    readTime: '5 دقائق',
    image: 'assets/images/hero_milkyway.jpg',
    excerpt: 'تأريض الكاميرا، ضبط الـ ISO، واختيار الموقع الخالي من التلوث الضوئي... أسرار التقاط صور فلكية مبهرة.'
  },
  {
    id: 'a2',
    title: 'فن صناعة الأفلام الوثائقية في الصحراء',
    category: 'صناعة الأفلام',
    date: '2025-06-28',
    readTime: '7 دقائق',
    image: 'assets/images/about_photographer.jpg',
    excerpt: 'التعامل مع الإضاءة الطبيعية في الصحراء وحماية المعدات من الأتربة للحصول على مشهد سينمائي فاخر.'
  }
];

const DEFAULT_PARTNERS = [
  { id: 'pr1', icon: '🏛️', name: 'هيئة تطوير محمية الملك سلمان', category: 'قطاع التوثيق البيئي والفلكي' },
  { id: 'pr2', icon: '🏢', name: 'شركة طويق للإنتاج والتسويق', category: 'إنتاج الإعلانات والأفلام التجاري' },
  { id: 'pr3', icon: '🚀', name: 'مؤسسة مسك المبدعة', category: 'صناعة المحتوى والمشاريع الشبابية' },
  { id: 'pr4', icon: '🌐', name: 'مجموعة نيوم للابتكار', category: 'التغطيات الجوية والوثائقية' },
  { id: 'pr5', icon: '🏔️', name: 'شركة العُلا للسياحة والاستكشاف', category: 'توثيق المناظر والرحلات' },
  { id: 'pr6', icon: '🎥', name: 'استوديو سوني السينمائي', category: 'شريك المعدات والتقنيات الرسمية' },
  { id: 'pr7', icon: '📸', name: 'الجمعية السعودية للتصوير', category: 'شريك الورش والتدريب الفوتوغرافي' },
  { id: 'pr8', icon: '🎬', name: 'نادي صُنّاع المحتوى والسينما', category: 'مجتمع الإنتاج البصري الاحترافي' }
];

class DataStore {
  constructor() {
    this.init();
  }

  init() {
    let items = JSON.parse(localStorage.getItem('capturha_portfolio')) || [];
    const sampleIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p_v1', 'p_v2', 'p_v3', 'n1_1lQqox', 'n2_1lQqox', 'n3_1lQqox'];
    items = items.filter(item => item && !sampleIds.includes(item.id));

    DEFAULT_PORTFOLIO.forEach(defItem => {
      if (!items.find(i => i.id === defItem.id)) {
        items.unshift(defItem);
      }
    });

    localStorage.setItem('capturha_portfolio', JSON.stringify(items));
    if (!localStorage.getItem('capturha_partners')) {
      localStorage.setItem('capturha_partners', JSON.stringify(DEFAULT_PARTNERS));
    }
    if (!localStorage.getItem('capturha_videos')) {
      localStorage.setItem('capturha_videos', JSON.stringify(DEFAULT_VIDEOS));
    }
    if (!localStorage.getItem('capturha_gear')) {
      localStorage.setItem('capturha_gear', JSON.stringify(DEFAULT_GEAR));
    }
    if (!localStorage.getItem('capturha_testimonials')) {
      localStorage.setItem('capturha_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
    }
    if (!localStorage.getItem('capturha_articles')) {
      localStorage.setItem('capturha_articles', JSON.stringify(DEFAULT_ARTICLES));
    }
    if (!localStorage.getItem('capturha_hero_title')) {
      localStorage.setItem('capturha_hero_title', 'كبتشرها');
    }
    if (!localStorage.getItem('capturha_hero_subtitle')) {
      localStorage.setItem('capturha_hero_subtitle', 'نلتقط اللحظات... ونروي القصة.');
    }
    if (!localStorage.getItem('capturha_about_text')) {
      localStorage.setItem('capturha_about_text', 'كبتشرها علامة متخصصة في التصوير الفوتوغرافي وصناعة الأفلام، نقدم حلولًا بصرية احترافية تجمع بين الإبداع والدقة لنروي القصص بأعلى جودة، سواء للأفراد أو الشركات.');
    }
    const defaultCategories = [
      { id: 'all', name: '✨ الكل', type: 'all', visible: true, locked: true },
      { id: 'nature', name: '🏞️ طبيعة', type: 'photo', visible: true },
      { id: 'products', name: '📦 منتجات', type: 'photo', visible: true },
      { id: 'outdoor_trips', name: '🏕️ رحلات وتوثيق خارجي', type: 'photo', visible: true },
      { id: 'events', name: '🎉 مناسبات', type: 'photo', visible: true },
      { id: 'coverage', name: '📸 تغطيات', type: 'photo', visible: true },
      { id: 'videos', name: '🎬 الفيديوهات السينمائية', type: 'video', visible: true }
    ];
    if (!localStorage.getItem('capturha_portfolio_categories') || true) {
      localStorage.setItem('capturha_portfolio_categories', JSON.stringify(defaultCategories));
    }
    if (!localStorage.getItem('capturha_messages')) {
      localStorage.setItem('capturha_messages', JSON.stringify([
        { id: 'm1', name: 'أحمد الغامدي', email: 'ahmed@example.com', phone: '0501234567', message: 'مرحباً، نرغب في طلب عرض سعر لتصوير فيلم وثائقي لرحلة استكشافية.', date: '2025-08-01' }
      ]));
    }
    if (!localStorage.getItem('capturha_visibility')) {
      localStorage.setItem('capturha_visibility', JSON.stringify({
        identity: true,
        services: true,
        portfolio: true,
        videos: true,
        stats: true,
        gear: true,
        testimonials: true,
        social: true,
        futureFeatures: true
      }));
    }
  }

  getPortfolioCategories() {
    return JSON.parse(localStorage.getItem('capturha_portfolio_categories')) || [
      { id: 'all', name: '✨ الكل', type: 'all', visible: true, locked: true },
      { id: 'nature', name: '🏞️ طبيعة', type: 'photo', visible: true },
      { id: 'products', name: '📦 منتجات', type: 'photo', visible: true },
      { id: 'outdoor_trips', name: '🏕️ رحلات وتوثيق خارجي', type: 'photo', visible: true },
      { id: 'events', name: '🎉 مناسبات', type: 'photo', visible: true },
      { id: 'coverage', name: '📸 تغطيات', type: 'photo', visible: true },
      { id: 'videos', name: '🎬 الفيديوهات السينمائية', type: 'video', visible: true }
    ];
  }

  savePortfolioCategories(data) {
    localStorage.setItem('capturha_portfolio_categories', JSON.stringify(data));
  }

  getSectionVisibility() {
    const vis = JSON.parse(localStorage.getItem('capturha_visibility')) || {};
    if (vis.services === undefined || vis.services === false) {
      vis.services = true;
      localStorage.setItem('capturha_visibility', JSON.stringify(vis));
    }
    return vis;
  }

  saveSectionVisibility(data) {
    localStorage.setItem('capturha_visibility', JSON.stringify(data));
  }

  getPartners() {
    return JSON.parse(localStorage.getItem('capturha_partners')) || DEFAULT_PARTNERS;
  }
  savePartners(data) {
    localStorage.setItem('capturha_partners', JSON.stringify(data));
  }

  getPortfolio() {
    return JSON.parse(localStorage.getItem('capturha_portfolio'));
  }
  savePortfolio(data) {
    localStorage.setItem('capturha_portfolio', JSON.stringify(data));
  }

  getVideos() {
    return JSON.parse(localStorage.getItem('capturha_videos'));
  }
  saveVideos(data) {
    localStorage.setItem('capturha_videos', JSON.stringify(data));
  }

  getGear() {
    return JSON.parse(localStorage.getItem('capturha_gear'));
  }

  getTestimonials() {
    return JSON.parse(localStorage.getItem('capturha_testimonials'));
  }

  getArticles() {
    return JSON.parse(localStorage.getItem('capturha_articles'));
  }
  saveArticles(data) {
    localStorage.setItem('capturha_articles', JSON.stringify(data));
  }

  getHeroTitle() { return localStorage.getItem('capturha_hero_title'); }
  setHeroTitle(val) { localStorage.setItem('capturha_hero_title', val); }

  getHeroSubtitle() { return localStorage.getItem('capturha_hero_subtitle'); }
  setHeroSubtitle(val) { localStorage.setItem('capturha_hero_subtitle', val); }

  getAboutText() { return localStorage.getItem('capturha_about_text'); }
  setAboutText(val) { localStorage.setItem('capturha_about_text', val); }

  getMessages() {
    return JSON.parse(localStorage.getItem('capturha_messages'));
  }
  addMessage(msg) {
    const list = this.getMessages();
    list.unshift({ ...msg, id: 'm_' + Date.now(), date: new Date().toISOString().split('T')[0] });
    localStorage.setItem('capturha_messages', JSON.stringify(list));
  }
}

window.appStore = new DataStore();

/**
 * CAPTURHA | كبتشرها - Data Store & LocalStorage Manager
 */

const DEFAULT_PORTFOLIO = [
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
  },
  {
    id: 'p1',
    title: 'سحر مجرة درب التبانة',
    category: 'milkyway',
    categoryName: 'درب التبانة',
    image: 'assets/images/hero_milkyway.jpg',
    exif: { camera: 'Sony α7R V', lens: 'FE 14mm F1.8 GM', iso: '3200', shutter: '15s', aperture: 'f/1.8' },
    location: 'صحراء الربع الخالي',
    date: '2025-05-12'
  },
  {
    id: 'p2',
    title: 'قمم الجبال عند الغروب السينمائي',
    category: 'nature',
    categoryName: 'الطبيعة',
    image: 'assets/images/landscape_nature.jpg',
    exif: { camera: 'Sony FX6', lens: 'FE 24-70mm F2.8 GM II', iso: '100', shutter: '1/250s', aperture: 'f/8.0' },
    location: 'جبال العُلا',
    date: '2025-03-20'
  },
  {
    id: 'p3',
    title: 'ليلة تخييم تحت السماء الفلكية',
    category: 'camping',
    categoryName: 'التخييم',
    image: 'assets/images/hero_milkyway.jpg',
    exif: { camera: 'Sony α1', lens: 'FE 24mm F1.4 GM', iso: '2500', shutter: '20s', aperture: 'f/1.4' },
    location: 'وادي الديسة',
    date: '2025-04-10'
  },
  {
    id: 'p4',
    title: 'فخامة السيارات بين أضواء الليل',
    category: 'automotive',
    categoryName: 'السيارات',
    image: 'assets/images/commercial_automotive.jpg',
    exif: { camera: 'Sony α7 IV', lens: 'FE 50mm F1.2 GM', iso: '400', shutter: '1/60s', aperture: 'f/1.8' },
    location: 'طريق الرياض الهدا',
    date: '2025-06-01'
  },
  {
    id: 'p5',
    title: 'صانع المحتوى وسط الطبيعة العذراء',
    category: 'travel',
    categoryName: 'الرحلات',
    image: 'assets/images/about_photographer.jpg',
    exif: { camera: 'Sony FX3', lens: 'FE 16-35mm F2.8 GM II', iso: '200', shutter: '1/500s', aperture: 'f/2.8' },
    location: 'مرتفعات السودة',
    date: '2025-02-18'
  },
  {
    id: 'p6',
    title: 'أضواء النجوم والشهب المتساقطة',
    category: 'stars',
    categoryName: 'النجوم',
    image: 'assets/images/hero_milkyway.jpg',
    exif: { camera: 'Sony α7S III', lens: 'FE 20mm F1.8 G', iso: '6400', shutter: '10s', aperture: 'f/1.8' },
    location: 'حائل - جبال أجا',
    date: '2025-07-04'
  },
  {
    id: 'p7',
    title: 'حملة إعلانية سينمائية تجارية',
    category: 'commercial',
    categoryName: 'الأعمال التجارية',
    image: 'assets/images/commercial_automotive.jpg',
    exif: { camera: 'Sony FX6 Cinema', lens: 'Leica Summicron-C', iso: '800', shutter: '1/50s', aperture: 'f/2.0' },
    location: 'استوديو كبتشرها - الرياض',
    date: '2025-07-22'
  },
  {
    id: 'p_v1',
    title: 'فيلم وثائقي: أسرار السماء الليلية في صحاري المملكة',
    category: 'videos',
    categoryName: 'الفيديوهات السينمائية',
    image: 'assets/images/hero_milkyway.jpg',
    isVideo: true,
    youtubeId: 'L_LUpnjgPso',
    duration: '08:45',
    exif: { camera: 'Sony FX6 Cinema', lens: 'FE 14mm F1.8 GM', iso: '3200', shutter: '1/50s', aperture: 'f/1.8' },
    location: 'صحراء الربع الخالي',
    date: '2025-08-01'
  },
  {
    id: 'p_v2',
    title: 'إعلان تجاري سينمائي: رحلة اكتشاف الطبيعة بالدرون 5K',
    category: 'videos',
    categoryName: 'الفيديوهات السينمائية',
    image: 'assets/images/drone_aerial_coastal.jpg',
    isVideo: true,
    youtubeId: 'dQw4w9WgXcQ',
    duration: '02:30',
    exif: { camera: 'DJI Mavic 3 Cine', lens: 'Hasselblad 24mm', iso: '400', shutter: '1/200s', aperture: 'f/2.8' },
    location: 'شواطئ نيوم',
    date: '2025-07-28'
  },
  {
    id: 'p_v3',
    title: 'تايم لابس سينمائي 8K: حركة النجوم فوق جبال العُلا',
    category: 'videos',
    categoryName: 'الفيديوهات السينمائية',
    image: 'assets/images/landscape_nature.jpg',
    isVideo: true,
    youtubeId: 'L_LUpnjgPso',
    duration: '04:15',
    exif: { camera: 'Sony α7R V', lens: 'FE 24mm F1.4 GM', iso: '1600', shutter: '25s', aperture: 'f/1.4' },
    location: 'جبال العُلا',
    date: '2025-06-15'
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
    if (!localStorage.getItem('capturha_portfolio')) {
      localStorage.setItem('capturha_portfolio', JSON.stringify(DEFAULT_PORTFOLIO));
    } else {
      const items = JSON.parse(localStorage.getItem('capturha_portfolio')) || [];
      if (!items.find(i => i.driveId === '1bEgQx7KVUS4XtTEzlHfKNEL3pJOPOmy1')) {
        items.unshift({
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
        });
      }
      if (!items.find(i => i.youtubeId === 'pOg-Lwk-HN0')) {
        items.unshift({
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
        });
      }
      localStorage.setItem('capturha_portfolio', JSON.stringify(items));
    }
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
    if (!localStorage.getItem('capturha_portfolio_categories')) {
      localStorage.setItem('capturha_portfolio_categories', JSON.stringify([
        { id: 'all', name: 'الكل (صور وفيديوهات)', type: 'all', visible: true, locked: true },
        { id: 'videos', name: '🎬 الفيديوهات السينمائية', type: 'video', visible: true },
        { id: 'nature', name: 'الطبيعة', type: 'photo', visible: true },
        { id: 'stars', name: 'النجوم', type: 'photo', visible: true },
        { id: 'milkyway', name: 'درب التبانة', type: 'photo', visible: true },
        { id: 'camping', name: 'التخييم', type: 'photo', visible: true },
        { id: 'travel', name: 'الرحلات', type: 'photo', visible: true },
        { id: 'automotive', name: 'السيارات', type: 'photo', visible: true },
        { id: 'commercial', name: 'الأعمال التجارية', type: 'photo', visible: true }
      ]));
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
      { id: 'all', name: 'الكل (صور وفيديوهات)', type: 'all', visible: true, locked: true },
      { id: 'videos', name: '🎬 الفيديوهات السينمائية', type: 'video', visible: true },
      { id: 'nature', name: 'الطبيعة', type: 'photo', visible: true },
      { id: 'stars', name: 'النجوم', type: 'photo', visible: true },
      { id: 'milkyway', name: 'درب التبانة', type: 'photo', visible: true },
      { id: 'camping', name: 'التخييم', type: 'photo', visible: true },
      { id: 'travel', name: 'الرحلات', type: 'photo', visible: true },
      { id: 'automotive', name: 'السيارات', type: 'photo', visible: true },
      { id: 'commercial', name: 'الأعمال التجارية', type: 'photo', visible: true }
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

/**
 * CAPTURHA | كبتشرها - Admin Dashboard Logic & Content Management
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminDashboard();
});

function initAdminDashboard() {
  window.isAdminLoggedIn = function() {
    return localStorage.getItem('capturha_admin_session') === 'true';
  };

  window.openAdminModal = function() {
    if (!window.isAdminLoggedIn()) {
      window.openAdminLoginModal();
      return;
    }
    const modal = document.getElementById('admin-modal');
    if (modal) {
      modal.classList.add('active');
      const userSpan = document.getElementById('admin-session-user');
      if (userSpan) userSpan.textContent = localStorage.getItem('capturha_admin_username') || 'المدير العام';
      switchAdminTab('portfolio');
    }
  };

  window.closeAdminModal = function() {
    const modal = document.getElementById('admin-modal');
    if (modal) modal.classList.remove('active');
  };

  window.openAdminLoginModal = function() {
    const loginModal = document.getElementById('admin-login-modal');
    if (loginModal) loginModal.classList.add('active');
  };

  window.closeAdminLoginModal = function() {
    const loginModal = document.getElementById('admin-login-modal');
    if (loginModal) loginModal.classList.remove('active');
  };

  window.logoutAdminSession = function() {
    localStorage.removeItem('capturha_admin_session');
    localStorage.removeItem('capturha_admin_username');
    window.closeAdminModal();
    alert('تم تسجيل الخروج بنجاح من لوحة التحكم.');
  };

  // Login Form Handler
  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const uInput = document.getElementById('admin-user-input').value.trim();
      const pInput = document.getElementById('admin-pass-input').value.trim();
      const errEl = document.getElementById('admin-login-error');

      if ((uInput === 'admin' && pInput === 'capturha') || (uInput === 'كبتشرها' && pInput === '123456')) {
        if (errEl) errEl.style.display = 'none';
        localStorage.setItem('capturha_admin_session', 'true');
        localStorage.setItem('capturha_admin_username', uInput === 'admin' ? 'المدير العام (Admin)' : 'كبتشرها المبدع');
        window.closeAdminLoginModal();
        window.openAdminModal();
        loginForm.reset();
      } else {
        if (errEl) errEl.style.display = 'block';
      }
    });
  }

  window.switchAdminTab = function(tabName) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`admin-tab-btn-${tabName}`);
    if (activeBtn) activeBtn.classList.add('active');

    const contentArea = document.getElementById('admin-tab-content');
    if (!contentArea) return;

    switch (tabName) {
      case 'portfolio':
        renderAdminPortfolio(contentArea);
        break;
      case 'categories':
        renderAdminCategories(contentArea);
        break;
      case 'videos':
        renderAdminVideos(contentArea);
        break;
      case 'homepage':
        renderAdminHomepage(contentArea);
        break;
      case 'articles':
        renderAdminArticles(contentArea);
        break;
      case 'messages':
        renderAdminMessages(contentArea);
        break;
      case 'visibility':
        renderAdminVisibility(contentArea);
        break;
      case 'partners':
        renderAdminPartners(contentArea);
        break;
    }
  };
}

// Helper: Auto-convert Google Drive share link to direct embeddable image URL
window.formatDirectImageUrl = function(url) {
  if (!url) return 'assets/images/landscape_nature.jpg';
  url = url.trim();
  if (url.includes('drive.google.com/file/d/')) {
    const parts = url.split('/file/d/');
    if (parts[1]) {
      const id = parts[1].split('/')[0];
      return `https://lh3.googleusercontent.com/d/${id}=w1000`;
    }
  }
  if (url.includes('drive.google.com/uc?') && url.includes('id=')) {
    const id = url.split('id=')[1].split('&')[0];
    return `https://lh3.googleusercontent.com/d/${id}=w1000`;
  }
  return url;
};

// Helper: Extract YouTube ID from full URL or ID
window.extractYoutubeId = function(input) {
  if (!input) return 'L_LUpnjgPso';
  input = input.trim();
  if (input.includes('v=')) {
    return input.split('v=')[1].split('&')[0];
  }
  if (input.includes('youtu.be/')) {
    return input.split('youtu.be/')[1].split('?')[0];
  }
  if (input.includes('embed/')) {
    return input.split('embed/')[1].split('?')[0];
  }
  return input;
};

// Portfolio Tab Admin
function renderAdminPortfolio(container) {
  const items = window.appStore.getPortfolio();
  container.innerHTML = `
    <div class="admin-content-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
      <div>
        <h3 style="font-size: 1.3rem; font-weight: 800;">📷 إدارة محتوى معرض الأعمال (${items.length})</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">إضافة، تعديل، أو حذف الصور والفيديوهات السينمائية مع دعم كامل لروابط YouTube و Google Drive.</p>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-primary" onclick="openAddPhotoForm(true)">+ 🎬 إضافة فيديو سينمائي</button>
        <button class="btn btn-secondary" onclick="openAddPhotoForm(false)">+ 📸 إضافة صورة جديدة</button>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1.25rem;">
      ${items.map(item => `
        <div class="glass-panel" style="padding: 1rem; border-radius: var(--radius-sm); position: relative; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <img src="${item.image}" style="width: 100%; height: 130px; object-fit: cover; border-radius: 6px; margin-bottom: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span style="font-size: 0.7rem; padding: 0.15rem 0.55rem; border-radius: 10px; font-weight: 700; ${item.isVideo ? 'background: rgba(239,68,68,0.2); color: #f87171;' : 'background: rgba(53,94,168,0.2); color: #60a5fa;'}">
                ${item.isVideo ? '🎬 فيديو سينمائي' : '📸 صورة'}
              </span>
              <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600;">${item.categoryName || item.category}</span>
            </div>
            <div style="font-weight: 800; font-size: 1rem; line-height: 1.35; margin-bottom: 0.35rem;">${item.title}</div>
            ${item.isVideo ? `<div style="font-size: 0.75rem; color: #ff4d4d; margin-bottom: 0.25rem;">▶ YouTube: <code>${item.youtubeId}</code></div>` : ''}
            <div style="font-size: 0.75rem; color: var(--text-muted);">📍 ${item.location || 'الرياض'}</div>
          </div>

          <div style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); margin-top: 0.75rem; padding-top: 0.65rem;">
            <button onclick="openEditPhotoForm('${item.id}')" class="btn btn-outline" style="padding: 0.35rem 0.85rem; font-size: 0.8rem; width: 48%;">✏️ تعديل</button>
            <button onclick="deletePhoto('${item.id}')" class="btn btn-outline" style="padding: 0.35rem 0.85rem; font-size: 0.8rem; border-color: rgba(239,68,68,0.4); color: #fca5a5; width: 48%;">🗑️ حذف</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

window.openAddPhotoForm = function(forceVideo = false) {
  const isVideo = forceVideo || confirm('هل تريد إضافة فيديو سينمائي إلى المعرض؟\n(انقر OK لإضافة فيديو 🎬، أو Cancel لإضافة صورة 📸)');

  if (isVideo) {
    const title = prompt('اسم الفيديو السينمائي:');
    if (!title) return;
    let youtubeInput = prompt('رابط الفيديو على YouTube أو معرّف الفيديو (مثال: https://www.youtube.com/watch?v=L_LUpnjgPso):', 'L_LUpnjgPso');
    if (!youtubeInput) return;

    const youtubeId = window.extractYoutubeId(youtubeInput);
    let imageInput = prompt('رابط صورة الغلاف للفيلم (Thumbnail) - يدعم روابط Google Drive أو الروابط المباشرة:', 'assets/images/about_photographer.jpg');
    const image = window.formatDirectImageUrl(imageInput);
    const duration = prompt('المدة الزمنية للفيديو (مثال: 03:45):', '03:45');
    const location = prompt('موقع التصوير:', 'الرياض، المملكة العربية السعودية');

    const items = window.appStore.getPortfolio();
    items.unshift({
      id: 'v_' + Date.now(),
      title: title.trim(),
      category: 'videos',
      categoryName: '🎬 الفيديوهات السينمائية',
      image: image,
      isVideo: true,
      youtubeId: youtubeId,
      duration: duration || 'فيديو سينمائي',
      location: location || 'الرياض، المملكة العربية السعودية',
      date: new Date().toISOString().split('T')[0]
    });

    window.appStore.savePortfolio(items);
    alert(`تمت إضافة الفيديو السينمائي (${title}) بنجاح إلى المعرض!`);
    window.switchAdminTab('portfolio');
    if (window.renderPortfolioCategoriesTabs) window.renderPortfolioCategoriesTabs();
    if (window.renderPortfolioGrid) window.renderPortfolioGrid('all');
  } else {
    const title = prompt('عنوان الصورة:');
    if (!title) return;
    const categoryName = prompt('اسم التصنيف (مثال: الطبيعة، النجوم، التخييم، الرحلات، السيارات):', 'الطبيعة');
    let imageInput = prompt('رابط الصورة (يدعم روابط Google Drive أو الروابط المباشرة):', 'assets/images/landscape_nature.jpg');
    const image = window.formatDirectImageUrl(imageInput);
    const location = prompt('الموقع:', 'الرياض، المملكة العربية السعودية');

    const items = window.appStore.getPortfolio();
    items.unshift({
      id: 'p_' + Date.now(),
      title: title.trim(),
      category: 'nature',
      categoryName: categoryName || 'الطبيعة',
      image: image,
      exif: { camera: 'Sony α7R V', lens: 'FE 24-70mm GM II', iso: '400', shutter: '1/125s', aperture: 'f/4.0' },
      location: location || 'المملكة العربية السعودية',
      date: new Date().toISOString().split('T')[0]
    });

    window.appStore.savePortfolio(items);
    alert(`تمت إضافة الصورة (${title}) بنجاح إلى المعرض!`);
    window.switchAdminTab('portfolio');
    if (window.renderPortfolioCategoriesTabs) window.renderPortfolioCategoriesTabs();
    if (window.renderPortfolioGrid) window.renderPortfolioGrid('all');
  }
};

window.openEditPhotoForm = function(id) {
  const items = window.appStore.getPortfolio();
  const item = items.find(i => i.id === id);
  if (!item) return;

  const newTitle = prompt('تعديل اسم أو عنوان العمل / الفيديو:', item.title);
  if (!newTitle) return;

  if (item.isVideo) {
    const currentYoutube = item.youtubeId ? `https://www.youtube.com/watch?v=${item.youtubeId}` : 'L_LUpnjgPso';
    const newYoutubeInput = prompt('رابط الفيديو على يوتيوب أو معرّف الفيديو (YouTube Link/ID):', currentYoutube);
    const newImageInput = prompt('رابط صورة غلاف الفيلم (يدعم روابط Google Drive أو الروابط المباشرة):', item.image);
    const newCategoryName = prompt('اسم التصنيف / القسم (مثال: 🎬 الفيديوهات السينمائية):', item.categoryName || '🎬 الفيديوهات السينمائية');
    const newDuration = prompt('المدة الزمنية للفيديو (مثال: 03:45):', item.duration || '03:45');
    const newLocation = prompt('موقع وتفاصيل مكان التصوير:', item.location || 'الرياض، المملكة العربية السعودية');

    item.title = newTitle.trim();
    if (newYoutubeInput) item.youtubeId = window.extractYoutubeId(newYoutubeInput);
    if (newImageInput) item.image = window.formatDirectImageUrl(newImageInput);
    if (newCategoryName) item.categoryName = newCategoryName.trim();
    if (newDuration) item.duration = newDuration.trim();
    if (newLocation) item.location = newLocation.trim();
  } else {
    const newCategoryName = prompt('اسم التصنيف / القسم (مثال: الطبيعة، النجوم، التخييم، الرحلات، السيارات):', item.categoryName || 'الطبيعة');
    const newImageInput = prompt('رابط أو مسار الصورة (يدعم روابط Google Drive أو الروابط المباشرة):', item.image);
    const newLocation = prompt('موقع وتفاصيل مكان التصوير:', item.location || 'الرياض، المملكة العربية السعودية');

    const currentCam = item.exif ? `${item.exif.camera || 'Sony α7R V'} | ${item.exif.lens || 'FE 24-70mm GM II'}` : 'Sony α7R V';
    const newCamDetails = prompt('تفاصيل المعدات والكاميرا (EXIF Data):', currentCam);

    item.title = newTitle.trim();
    if (newCategoryName) item.categoryName = newCategoryName.trim();
    if (newImageInput) item.image = window.formatDirectImageUrl(newImageInput);
    if (newLocation) item.location = newLocation.trim();

    if (newCamDetails) {
      const parts = newCamDetails.split('|');
      item.exif = item.exif || {};
      item.exif.camera = parts[0] ? parts[0].trim() : 'Sony α7R V';
      if (parts[1]) item.exif.lens = parts[1].trim();
    }
  }

  window.appStore.savePortfolio(items);
  alert(`تم تحديث جميع بيانات وتفاصيل (${newTitle}) بنجاح!`);
  window.switchAdminTab('portfolio');
  if (window.renderPortfolioCategoriesTabs) window.renderPortfolioCategoriesTabs();
  if (window.renderPortfolioGrid) window.renderPortfolioGrid('all');
};

window.deletePhoto = function(id) {
  if (!confirm('هل أنت تأكد من حذف هذا العنصر من المعرض؟')) return;
  let items = window.appStore.getPortfolio();
  items = items.filter(i => i.id !== id);
  window.appStore.savePortfolio(items);
  window.switchAdminTab('portfolio');
  if (window.renderPortfolioCategoriesTabs) window.renderPortfolioCategoriesTabs();
  if (window.renderPortfolioGrid) window.renderPortfolioGrid('all');
};

// Videos Tab Admin
function renderAdminVideos(container) {
  const videos = window.appStore.getVideos();
  container.innerHTML = `
    <div class="admin-content-header">
      <h3>إدارة قسم الفيديوهات السينمائية (${videos.length})</h3>
      <button class="btn btn-primary" onclick="openAddVideoForm()">+ إضافة فيديو جديد</button>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;">
      ${videos.map(vid => `
        <div class="glass-panel" style="padding: 1rem; border-radius: var(--radius-sm);">
          <img src="${vid.thumbnail}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 0.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.25rem;">${vid.title}</h4>
          <p style="font-size: 0.8rem; color: var(--text-dim);">YouTube ID: ${vid.youtubeId}</p>
        </div>
      `).join('')}
    </div>
  `;
}

window.openAddVideoForm = function() {
  const title = prompt('عنوان الفيديو السينمائي:');
  if (!title) return;
  const youtubeId = prompt('معرف فيديو يوتيوب (YouTube Video ID):', 'dQw4w9WgXcQ');
  const category = prompt('التصنيف (مثال: أفلام سينمائية، إعلانات، تصوير جوي):', 'أفلام سينمائية');

  const videos = window.appStore.getVideos();
  videos.unshift({
    id: 'v_' + Date.now(),
    title,
    category: category || 'أفلام سينمائية',
    duration: '03:45',
    thumbnail: 'assets/images/hero_milkyway.jpg',
    youtubeId: youtubeId || 'dQw4w9WgXcQ',
    views: '1K'
  });

  window.appStore.saveVideos(videos);
  window.switchAdminTab('videos');
  if (window.renderVideosGrid) window.renderVideosGrid();
};

// Homepage Content Tab Admin
function renderAdminHomepage(container) {
  const currentTitle = window.appStore.getHeroTitle();
  const currentSubtitle = window.appStore.getHeroSubtitle();
  const currentAbout = window.appStore.getAboutText();

  container.innerHTML = `
    <div class="admin-content-header">
      <h3>تعديل محتوى الصفحة الرئيسية</h3>
    </div>
    <form id="admin-homepage-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="form-group">
        <label>عنوان الهيرو الرئيسي:</label>
        <input type="text" id="edit-hero-title" class="form-control" value="${currentTitle}">
      </div>
      <div class="form-group">
        <label>العبارة الترحيبية الفرعية:</label>
        <input type="text" id="edit-hero-subtitle" class="form-control" value="${currentSubtitle}">
      </div>
      <div class="form-group">
        <label>نص قسم "من نحن":</label>
        <textarea id="edit-about-text" class="form-control" rows="5">${currentAbout}</textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="width: fit-content;">حفظ التغييرات</button>
    </form>
  `;

  document.getElementById('admin-homepage-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const t = document.getElementById('edit-hero-title').value;
    const s = document.getElementById('edit-hero-subtitle').value;
    const a = document.getElementById('edit-about-text').value;

    window.appStore.setHeroTitle(t);
    window.appStore.setHeroSubtitle(s);
    window.appStore.setAboutText(a);

    alert('تم حفظ التعديلات بنجاح!');
    location.reload();
  });
}

// Articles Tab Admin
function renderAdminArticles(container) {
  const articles = window.appStore.getArticles();
  container.innerHTML = `
    <div class="admin-content-header">
      <h3>إدارة مقالات المدونة (${articles.length})</h3>
      <button class="btn btn-primary" onclick="openAddArticleForm()">+ إضافة مقال جديد</button>
    </div>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${articles.map(art => `
        <div class="glass-panel" style="padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem;">${art.title}</h4>
            <span style="font-size: 0.85rem; color: var(--color-primary);">${art.category} • ${art.date}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

window.openAddArticleForm = function() {
  const title = prompt('عنوان المقال:');
  if (!title) return;
  const excerpt = prompt('الملخص:');

  const articles = window.appStore.getArticles();
  articles.unshift({
    id: 'a_' + Date.now(),
    title,
    category: 'تصوير فلكي',
    date: new Date().toISOString().split('T')[0],
    readTime: '4 دقائق',
    image: 'assets/images/hero_milkyway.jpg',
    excerpt: excerpt || 'نص المقال التعليمي الجديد.'
  });

  window.appStore.saveArticles(articles);
  window.switchAdminTab('articles');
};

// Messages Inbox Tab Admin
function renderAdminMessages(container) {
  const msgs = window.appStore.getMessages();
  container.innerHTML = `
    <div class="admin-content-header">
      <h3>صندوق رسائل "تواصل معنا" (${msgs.length})</h3>
    </div>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${msgs.map(m => `
        <div class="glass-panel" style="padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <strong>${m.name} (${m.email} - ${m.phone})</strong>
            <span style="color: var(--text-dim); font-size: 0.85rem;">${m.date}</span>
          </div>
          <p style="color: var(--text-muted); line-height: 1.6;">${m.message}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// Section Visibility Tab Admin
function renderAdminVisibility(container) {
  const vis = window.appStore.getSectionVisibility();

  const sectionsList = [
    { key: 'hero', title: '🌌 قسم الواجهة الرئيسية والخلفية الفلكية (Hero)' },
    { key: 'about', title: '📖 قسم من نحن ورؤية كبتشرها (About Us)' },
    { key: 'services', title: '💼 قسم خدماتنا الـ 7 الاحترافية (Services)' },
    { key: 'portfolio', title: '🖼️ قسم معرض الأعمال والفيديوهات (Portfolio)' },
    { key: 'videos', title: '🎬 قسم شبكة الأفلام السينمائية (Netflix Videos)' },
    { key: 'stats', title: '📊 قسم الأرقام والإحصائيات وتعداد الانجازات (Stats)' },
    { key: 'gear', title: '📷 قسم المعدات والتقنيات (الكاميرات والعدسات والدرون)' },
    { key: 'testimonials', title: '🏛️ قسم شركاء النجاح والعلامات التجارية (Partners & Brands)' },
    { key: 'social', title: '📲 قسم منشورات وقنوات الشبكات الاجتماعية (Social Feeds)' },
    { key: 'futureFeatures', title: '🚀 قسم المنظومة والخدمات المستقبلية (Future Features)' }
  ];

  container.innerHTML = `
    <div class="admin-content-header">
      <h3>👁️ تخصيص إظهار وإخفاء أقسام وقوائم الموقع بالكامل</h3>
    </div>
    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">بصفتك مدير النظام، يمكنك تفعيل أو إخفاء أي قسم أو قائمة في كامل الموقع بنقرة واحدة وحفظ الإعدادات مباشرة.</p>
    
    <form id="admin-visibility-form" style="display: flex; flex-direction: column; gap: 1rem;">
      ${sectionsList.map(sec => `
        <div class="glass-panel" style="padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <span style="font-weight: 700; font-size: 1.05rem;">${sec.title}</span>
          <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
            <input type="checkbox" id="vis-chk-${sec.key}" ${vis[sec.key] !== false ? 'checked' : ''} style="width: 22px; height: 22px; accent-color: var(--color-primary); cursor: pointer;">
            <span style="font-weight: 700; font-size: 0.95rem; color: ${vis[sec.key] !== false ? '#10b981' : '#ef4444'};">${vis[sec.key] !== false ? '✅ ظاهر' : '❌ مخفي'}</span>
          </label>
        </div>
      `).join('')}
      
      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <button type="submit" class="btn btn-primary" style="padding: 0.75rem 2rem;">💾 حفظ التغييرات وتطبيقها فوراً</button>
      </div>
    </form>
  `;

  document.getElementById('admin-visibility-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedVis = {};
    sectionsList.forEach(sec => {
      const chk = document.getElementById(`vis-chk-${sec.key}`);
      updatedVis[sec.key] = chk ? chk.checked : true;
    });

    window.appStore.saveSectionVisibility(updatedVis);
    if (window.applySectionVisibility) window.applySectionVisibility();
    alert('تم حفظ خصائص إظهار وإخفاء القوائم وتطبيقها مباشرة على كافة أقسام الموقع!');
    renderAdminVisibility(container);
  });
}

// Partners Admin Management
function renderAdminPartners(container) {
  const partners = window.appStore.getPartners();
  container.innerHTML = `
    <div class="admin-content-header">
      <h3>🏛️ إدارة شركاء النجاح والعلامات التجارية (${partners.length})</h3>
      <button class="btn btn-primary" onclick="openAddPartnerForm()">+ إضافة شريك / علامة جديدة</button>
    </div>
    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">يمكنك من هنا إضافة أو تعديل أو حذف العلامات التجارية وإضافة شعار بصري (صورة PNG/JPG) أو أيقونة لكل شريك.</p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem;">
      ${partners.map(p => {
        const hasImageLogo = p.logo && (p.logo.startsWith('http') || p.logo.startsWith('data:') || p.logo.startsWith('assets/') || p.logo.includes('.png') || p.logo.includes('.jpg') || p.logo.includes('.svg'));
        const logoPreview = hasImageLogo
          ? `<img src="${p.logo}" alt="${p.name}" style="width: 48px; height: 48px; object-fit: contain; border-radius: 6px;">`
          : `<div style="font-size: 2.2rem;">${p.icon || '🏛️'}</div>`;

        return `
          <div class="glass-panel" style="padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              ${logoPreview}
              <div>
                <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.2rem;">${p.name}</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem;">${p.category}</p>
                ${p.logo ? `<div style="font-size: 0.75rem; color: #34d399; margin-top: 0.2rem;">🖼️ شعار صورة مخصص</div>` : ''}
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
              <button onclick="openEditPartnerForm('${p.id}')" class="btn btn-outline" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">✏️ تعديل</button>
              <button onclick="deletePartner('${p.id}')" class="btn btn-outline" style="padding: 0.35rem 0.85rem; font-size: 0.8rem; border-color: rgba(239,68,68,0.4); color: #fca5a5;">🗑️ حذف</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

window.openAddPartnerForm = function() {
  const name = prompt('اسم الشريك / العلامة التجارية:');
  if (!name) return;
  const category = prompt('القطاع / وصف الشراكة:', 'قطاع التوثيق والإنتاج البصري');
  const logo = prompt('رابط أو مسار صورة الشعار PNG/JPG (مثال: assets/images/whatsapp_icon.png أو رابط صورة دقيقة):\n(اتركه فارغاً في حال استخدام الأيقونة التعبيرية)', '');
  const icon = prompt('الأيقونة أو التعبير الاحتياطي (مثال: 🏛️, 🏢, 🚀, 🌐, 🎥):', '🏛️');

  const partners = window.appStore.getPartners();
  partners.push({
    id: 'pr_' + Date.now(),
    name: name.trim(),
    category: category ? category.trim() : 'شريك رسمي',
    logo: logo ? logo.trim() : '',
    icon: icon ? icon.trim() : '🏛️'
  });

  window.appStore.savePartners(partners);
  if (window.renderPartnersGrid) window.renderPartnersGrid();
  alert('تمت إضافة شريك النجاح بنجاح وتم تحديث الواجهة الرئيسية!');
  window.switchAdminTab('partners');
};

window.openEditPartnerForm = function(id) {
  const partners = window.appStore.getPartners();
  const partner = partners.find(p => p.id === id);
  if (!partner) return;

  const newName = prompt('اسم الشريك / العلامة التجارية:', partner.name);
  if (!newName) return;
  const newCategory = prompt('القطاع / وصف الشراكة:', partner.category);
  const newLogo = prompt('رابط أو مسار صورة الشعار PNG/JPG:', partner.logo || '');
  const newIcon = prompt('الأيقونة الاحتياطية:', partner.icon || '🏛️');

  partner.name = newName.trim();
  partner.category = newCategory ? newCategory.trim() : partner.category;
  partner.logo = newLogo ? newLogo.trim() : '';
  partner.icon = newIcon ? newIcon.trim() : '🏛️';

  window.appStore.savePartners(partners);
  if (window.renderPartnersGrid) window.renderPartnersGrid();
  alert('تم تحديث بيانات شريك النجاح وبصمة الشعار بنجاح!');
  window.switchAdminTab('partners');
};

window.deletePartner = function(id) {
  if (!confirm('هل أنت تأكد من رغبتك في حذف هذا الشريك من القائمة؟')) return;
  let partners = window.appStore.getPartners();
  partners = partners.filter(p => p.id !== id);

  window.appStore.savePartners(partners);
  if (window.renderPartnersGrid) window.renderPartnersGrid();
  alert('تم حذف الشريك بنجاح!');
  window.switchAdminTab('partners');
};

// Portfolio Categories Manager (إدارة أقسام وتصنيفات معرض الأعمال)
function renderAdminCategories(container) {
  const categories = window.appStore.getPortfolioCategories();
  container.innerHTML = `
    <div class="admin-content-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
      <div>
        <h3 style="font-size: 1.3rem; font-weight: 800;">🖼️ أقسام وتصنيفات معرض الأعمال (${categories.length})</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">إضافة أقسام جديدة، تعديل المسميات، أو التحكم بإخفاء وإظهار الأقسام في المعرض التفاعلي.</p>
      </div>
      <button class="btn btn-primary" onclick="openAddCategoryModal()">+ إضافة قسم جديد</button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${categories.map(cat => {
        const isVisible = cat.visible !== false;
        const typeBadge = cat.type === 'video' ? '🎬 فيديوهات' : cat.type === 'photo' ? '📸 صور' : '🌐 شمولية';
        const typeColor = cat.type === 'video' ? '#f87171' : '#60a5fa';
        return `
          <div class="glass-panel" style="padding: 1.25rem; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; background: var(--bg-glass);">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="font-size: 1.5rem;">${cat.type === 'video' ? '🎬' : '📸'}</div>
              <div>
                <div style="font-weight: 800; font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem;">
                  ${cat.name}
                  <span style="font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); background: rgba(53,94,168,0.15); color: ${typeColor}; font-weight: 700;">${typeBadge}</span>
                  ${cat.locked ? '<span style="font-size: 0.7rem; color: #a1a1aa;">(ثابت)</span>' : ''}
                </div>
                <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.2rem;">معرف القسم: <code>${cat.id}</code></div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 0.85rem; font-weight: 700; color: ${isVisible ? '#34d399' : '#f87171'};">
                ${isVisible ? '🟢 معروض بالموقع' : '🔴 مخفي'}
              </span>

              <button class="btn btn-outline" onclick="toggleCategoryVisibility('${cat.id}')" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;">
                ${isVisible ? '🙈 إخفاء القسم' : '👁️ إظهار القسم'}
              </button>

              ${!cat.locked ? `
                <button class="btn btn-outline" onclick="openEditCategoryModal('${cat.id}')" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; border-color: var(--color-primary); color: var(--color-primary);">✏️ تعديل</button>
                <button class="btn btn-outline" onclick="deleteCategory('${cat.id}')" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; border-color: rgba(239,68,68,0.4); color: #fca5a5;">🗑️ حذف</button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

window.toggleCategoryVisibility = function(catId) {
  let categories = window.appStore.getPortfolioCategories();
  const cat = categories.find(c => c.id === catId);
  if (cat) {
    cat.visible = !(cat.visible !== false);
    window.appStore.savePortfolioCategories(categories);
    if (window.renderPortfolioCategoriesTabs) window.renderPortfolioCategoriesTabs();
    alert(`تم ${cat.visible ? 'إظهار' : 'إخفاء'} قسم (${cat.name}) في معرض الأعمال بنجاح!`);
    window.switchAdminTab('categories');
  }
};

window.openAddCategoryModal = function() {
  const name = prompt('اسم القسم الجديد (مثال: تصوير المنتجات، المعارض، الهندسية):');
  if (!name || !name.trim()) return;

  const isVideo = confirm('هل هذا القسم خاص بالفيديوهات السينمائية؟\n(انقر OK للفيديوهات 🎬، أو Cancel للصور 📸)');
  const type = isVideo ? 'video' : 'photo';
  const id = 'cat_' + Date.now();

  let categories = window.appStore.getPortfolioCategories();
  categories.push({
    id: id,
    name: name.trim(),
    type: type,
    visible: true
  });

  window.appStore.savePortfolioCategories(categories);
  if (window.renderPortfolioCategoriesTabs) window.renderPortfolioCategoriesTabs();
  alert(`تمت إضافة قسم المعرض الجديد (${name}) بنجاح!`);
  window.switchAdminTab('categories');
};

window.openEditCategoryModal = function(catId) {
  let categories = window.appStore.getPortfolioCategories();
  const cat = categories.find(c => c.id === catId);
  if (!cat) return;

  const newName = prompt('تعديل اسم القسم:', cat.name);
  if (!newName || !newName.trim()) return;

  cat.name = newName.trim();
  window.appStore.savePortfolioCategories(categories);
  if (window.renderPortfolioCategoriesTabs) window.renderPortfolioCategoriesTabs();
  alert('تم تحديث اسم القسم بنجاح!');
  window.switchAdminTab('categories');
};

window.deleteCategory = function(catId) {
  if (!confirm('هل أنت تأكد من رغبتك في حذف هذا القسم من المعرض؟')) return;
  let categories = window.appStore.getPortfolioCategories();
  categories = categories.filter(c => c.id !== catId);

  window.appStore.savePortfolioCategories(categories);
  if (window.renderPortfolioCategoriesTabs) window.renderPortfolioCategoriesTabs();
  alert('تم حذف القسم بنجاح!');
  window.switchAdminTab('categories');
};

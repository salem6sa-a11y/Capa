/**
 * CAPTURHA | كبتشرها - Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  const progress = document.querySelector('.loader-progress');
  let width = 0;
  const interval = setInterval(() => {
    width += 20;
    if (progress) progress.style.width = width + '%';
    if (width >= 100) {
      clearInterval(interval);
      if (preloader) preloader.classList.add('hidden');
    }
  }, 40);

  // Safety fallback preloader hide
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }, 800);

  // Smooth Anchor Navigation Controller for all nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer && drawer.classList.contains('active')) {
          drawer.classList.remove('active');
        }
      }
    });
  });

  // Initialize Modules
  initThemeToggle();
  initNavbarScroll();
  renderHeroContent();
  renderAboutContent();
  renderPortfolioCategoriesTabs();
  renderPortfolioGrid('all');
  renderVideosGrid();
  renderStatsAndGear();
  renderPartnersGrid();
  initContactForm();
  initFutureFeatureDrawers();
  applySectionVisibility();
  initScrollReveal();
});

// Squarespace Photography Showcase Slider Controller
let sqCurrentIndex = 0;

function initSquarespaceSlider() {
  const track = document.getElementById('sq-slider-track');
  const dotsContainer = document.getElementById('sq-slider-dots');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.sq-slide-card');
  if (!slides.length) return;

  // Create dot indicators
  dotsContainer.innerHTML = Array.from(slides).map((_, i) => `
    <div class="sq-dot ${i === 0 ? 'active' : ''}" onclick="goToSqSlide(${i})"></div>
  `).join('');

  updateSqSlider();

  // Auto slide interval (Smooth Squarespace style auto-advance)
  setInterval(() => {
    nextSqSlide();
  }, 5000);
}

window.goToSqSlide = function(index) {
  const track = document.getElementById('sq-slider-track');
  if (!track) return;
  const slides = track.querySelectorAll('.sq-slide-card');
  if (!slides.length) return;

  const visibleCards = window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, slides.length - visibleCards);
  if (index > maxIndex) index = 0;
  if (index < 0) index = maxIndex;

  sqCurrentIndex = index;
  updateSqSlider();
};

window.nextSqSlide = function() {
  window.goToSqSlide(sqCurrentIndex + 1);
};

window.prevSqSlide = function() {
  window.goToSqSlide(sqCurrentIndex - 1);
};

function updateSqSlider() {
  const track = document.getElementById('sq-slider-track');
  if (!track) return;
  const slides = track.querySelectorAll('.sq-slide-card');
  if (!slides.length) return;

  const slideWidth = slides[0].offsetWidth + 28;
  track.style.transform = `translateX(${sqCurrentIndex * slideWidth}px)`;

  const dots = document.querySelectorAll('.sq-dot');
  dots.forEach((dot, idx) => {
    if (idx === sqCurrentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// IntersectionObserver Scroll Reveal Animations (Subtle Smooth Entrance)
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  const revealElements = document.querySelectorAll('.section-title, .about-section, .services-section, .portfolio-section, .videos-section, .stats-section, .testimonials-section, .social-feeds-section, .contact-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.05 });

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

window.applySectionVisibility = function() {
  const vis = window.appStore.getSectionVisibility();
  const toggleEl = (id, visible) => {
    const el = document.getElementById(id);
    if (el) el.style.display = visible ? 'block' : 'none';
  };

  toggleEl('hero', vis.hero !== false);
  toggleEl('about', vis.about !== false);
  toggleEl('services-section', true);
  toggleEl('portfolio-section', vis.portfolio !== false);
  toggleEl('videos-section', vis.videos !== false);
  toggleEl('stats', vis.stats !== false);
  toggleEl('stats-counters-container', vis.stats !== false);
  toggleEl('gear-showcase-container', vis.gear !== false);
  toggleEl('testimonials-section', vis.testimonials !== false);
  toggleEl('social-feeds-section', vis.social !== false);
  toggleEl('future-features-section', vis.futureFeatures !== false);
};

// Theme Switcher
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('capturha_theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('capturha_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  themeBtn.innerHTML = theme === 'dark'
    ? `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
}

// Navbar Scroll Blur & Active Links
function initNavbarScroll() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Dynamic Hero Render
function renderHeroContent() {
  const titleEl = document.getElementById('hero-title-text');
  const subEl = document.getElementById('hero-subtitle-text');
  if (titleEl) titleEl.textContent = window.appStore.getHeroTitle();
  if (subEl) subEl.textContent = window.appStore.getHeroSubtitle();
}

// Dynamic About Render
function renderAboutContent() {
  const aboutTextEl = document.getElementById('about-text-content');
  if (aboutTextEl) aboutTextEl.textContent = window.appStore.getAboutText();
}

window.renderPortfolioCategoriesTabs = function() {
  const container = document.getElementById('portfolio-filter-tabs');
  if (!container) return;

  const categories = window.appStore.getPortfolioCategories().filter(c => c.visible !== false);
  container.innerHTML = categories.map((cat, idx) => {
    const isVideo = cat.type === 'video';
    const activeClass = idx === 0 ? 'active' : '';
    const extraStyle = isVideo ? 'background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.4); color: #f87171;' : '';
    return `<button class="filter-btn ${activeClass}" onclick="filterPortfolio('${cat.id}', this)" style="${extraStyle}">${cat.name}</button>`;
  }).join('');
};

// Render Portfolio Gallery Masonry Grid (صور وفيديوهات سينمائية)
function renderPortfolioGrid(filter = 'all') {
  const grid = document.getElementById('portfolio-masonry-grid');
  if (!grid) return;

  const items = window.appStore.getPortfolio();
  const filtered = filter === 'all' ? items : items.filter(item => item.category === filter);

  grid.innerHTML = filtered.map(item => {
    if (item.isVideo) {
      return `
        <div class="portfolio-item glass-panel portfolio-video-item" onclick="openVideoPlayer('${item.youtubeId}')" style="cursor: pointer;">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="video-play-badge" style="position: absolute; top: 1rem; right: 1rem; background: rgba(239, 68, 68, 0.9); color: #ffffff; padding: 0.35rem 0.85rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; z-index: 5; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);">
            ▶ ${item.duration || 'فيديو سينمائي'}
          </div>
          <div class="portfolio-overlay">
            <span class="portfolio-tag" style="background: #ef4444; color: #fff;">🎬 فيديو سينمائي</span>
            <h4 class="portfolio-title">${item.title}</h4>
            <div class="portfolio-meta">
              <span>📍 ${item.location}</span>
              <span>🎥 ${item.exif ? item.exif.camera : 'Sony Cinema'}</span>
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div class="portfolio-item glass-panel" onclick="openLightbox('${item.id}')">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="portfolio-overlay">
          <span class="portfolio-tag">${item.categoryName}</span>
          <h4 class="portfolio-title">${item.title}</h4>
          <div class="portfolio-meta">
            <span>📍 ${item.location}</span>
            <span>📷 ${item.exif ? item.exif.camera : ''}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Portfolio Filter Tabs Listener
window.filterPortfolio = function(category, btnEl) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  btnEl.classList.add('active');
  renderPortfolioGrid(category);
};

// Lightbox Modal
window.openLightbox = function(id) {
  const items = window.appStore.getPortfolio();
  const item = items.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const locEl = document.getElementById('lightbox-location');
  const exifGrid = document.getElementById('lightbox-exif-grid');

  if (imgEl) imgEl.src = item.image;
  if (titleEl) titleEl.textContent = item.title;
  if (locEl) locEl.textContent = `موقع الالتقاط: ${item.location} | التاريخ: ${item.date}`;
  if (exifGrid) {
    exifGrid.innerHTML = `
      <div class="exif-item"><span class="exif-label">الكاميرا</span><span class="exif-val">${item.exif.camera}</span></div>
      <div class="exif-item"><span class="exif-label">العدسة</span><span class="exif-val">${item.exif.lens}</span></div>
      <div class="exif-item"><span class="exif-label">ISO</span><span class="exif-val">${item.exif.iso}</span></div>
      <div class="exif-item"><span class="exif-label">سرعة الغالق</span><span class="exif-val">${item.exif.shutter}</span></div>
      <div class="exif-item"><span class="exif-label">فتحة العدسة</span><span class="exif-val">${item.exif.aperture}</span></div>
    `;
  }

  if (modal) modal.classList.add('active');
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
};

// Netflix-Style Videos Grid
function renderVideosGrid() {
  const grid = document.getElementById('netflix-video-grid');
  if (!grid) return;

  const videos = window.appStore.getVideos();
  grid.innerHTML = videos.map(video => `
    <div class="video-card glass-panel" onclick="openVideoPlayer('${video.youtubeId}')">
      <div class="video-thumb-wrap">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="play-btn-overlay">
          <div class="play-icon-pulse">▶</div>
        </div>
      </div>
      <div class="video-details">
        <div class="video-category">${video.category}</div>
        <h4 class="video-title">${video.title}</h4>
        <div class="video-info-footer">
          <span>⏱️ ${video.duration}</span>
          <span>👁️ ${video.views} مشاهدة</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Video Player Modal
window.openVideoPlayer = function(youtubeId) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('youtube-iframe');
  if (iframe) {
    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  }
  if (modal) modal.classList.add('active');
};

window.closeVideoPlayer = function() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('youtube-iframe');
  if (iframe) iframe.src = '';
  if (modal) modal.classList.remove('active');
};

// Stats & Equipment Render
function renderStatsAndGear() {
  const gearGrid = document.getElementById('gear-grid');
  if (!gearGrid) return;

  const gearList = window.appStore.getGear();
  gearGrid.innerHTML = gearList.map(item => `
    <div class="gear-card glass-panel">
      <div class="gear-icon">📷</div>
      <h4>${item.name}</h4>
      <p style="color: var(--color-primary); font-weight: 600; font-size: 0.9rem;">${item.type}</p>
      <p>${item.desc}</p>
    </div>
  `).join('');

  // Counter Animations
  initCounters();
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
          } else {
            el.textContent = count;
          }
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// Partners Grid Render
window.renderPartnersGrid = function() {
  const container = document.getElementById('partners-grid-container');
  if (!container) return;

  const partners = window.appStore.getPartners();
  container.innerHTML = partners.map(p => {
    const hasImageLogo = p.logo && (p.logo.startsWith('http') || p.logo.startsWith('data:') || p.logo.startsWith('assets/') || p.logo.includes('.png') || p.logo.includes('.jpg') || p.logo.includes('.svg'));
    const logoElement = hasImageLogo
      ? `<img src="${p.logo}" alt="${p.name}" style="width: 60px; height: 60px; object-fit: contain; margin: 0 auto 0.85rem auto; display: block; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15));">`
      : `<div style="font-size: 2.5rem; margin-bottom: 0.75rem;">${p.icon || '🏛️'}</div>`;

    return `
      <div class="partner-card glass-panel" style="padding: 2rem; text-align: center; border-radius: var(--radius-md); transition: transform 0.3s ease; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        ${logoElement}
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.25rem;">${p.name}</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem;">${p.category}</p>
      </div>
    `;
  }).join('');
};

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;

    window.appStore.addMessage({ name, email, phone, message });

    alert('شكراً لتواصلك مع كبتشرها! تم استلام رسالتك وسنقوم بالرد عليك في أقرب وقت.');
    form.reset();
  });
}

// Future Feature Drawers & Modals
function initFutureFeatureDrawers() {
  window.openFeatureModal = function(featureId) {
    const modal = document.getElementById(`feature-modal-${featureId}`);
    if (modal) modal.classList.add('active');
  };

  window.closeFeatureModal = function(featureId) {
    const modal = document.getElementById(`feature-modal-${featureId}`);
    if (modal) modal.classList.remove('active');
  };
}

window.toggleMobileMenu = function() {
  const drawer = document.getElementById('mobile-nav-drawer');
  if (drawer) drawer.classList.toggle('active');
};

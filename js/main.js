// =============================================
// HariOM Hotel - Main JS (shared across pages)
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Page Loader ----
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1800);
  }

  // ---- AOS Init ----
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });
  }

  // ---- Navbar Scroll ----
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 60);

    // Scroll progress bar
    if (scrollProgress) {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = `${(scrollY / total) * 100}%`;
    }

    // Back to top
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('visible', scrollY > 400);
  });

  // ---- Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const overlay = document.getElementById('mobile-overlay');

  function closeMenu() {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));

  // ---- Theme Toggle ----
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('hariom_theme') || 'dark-theme';
  document.body.className = document.body.className.replace(/dark-theme|light-theme/, '') + ' ' + savedTheme;
  updateThemeIcon(savedTheme);

  themeBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light-theme' : 'dark-theme';
    document.body.classList.replace(isDark ? 'dark-theme' : 'light-theme', newTheme);
    localStorage.setItem('hariom_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeBtn?.querySelector('i');
    if (icon) icon.className = theme === 'dark-theme' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // ---- Back to Top ----
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    link.classList.toggle('active', href === currentPage);
  });

  // ---- Reservation Modal ----
  const modal = document.getElementById('reservation-modal');
  const modalClose = document.getElementById('modal-close');
  modalClose?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

  document.getElementById('reservation-form')?.addEventListener('submit', e => {
    e.preventDefault();
    modal?.classList.remove('active');
    showToast('Table reserved successfully! We\'ll confirm via SMS.');
  });

  // ---- Booking Form ----
  document.getElementById('booking-form')?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Booking request sent! We\'ll confirm shortly.');
    e.target.reset();
  });

  // ---- Newsletter Form ----
  document.getElementById('newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Subscribed! Check your email for exclusive offers.');
    e.target.reset();
  });

  // ---- Newsletter Popup ----
  const popup = document.getElementById('newsletter-popup');
  const popupClose = document.getElementById('popup-close');
  const popupForm = document.getElementById('popup-form');

  if (popup && !localStorage.getItem('hariom_popup_shown')) {
    setTimeout(() => popup.classList.add('show'), 5000);
  }
  popupClose?.addEventListener('click', () => {
    popup.classList.remove('show');
    localStorage.setItem('hariom_popup_shown', '1');
  });
  popupForm?.addEventListener('submit', e => {
    e.preventDefault();
    popup.classList.remove('show');
    localStorage.setItem('hariom_popup_shown', '1');
    showToast('Welcome! You\'ll receive 15% off on your first order.');
  });

  // ---- Gallery Lightbox ----
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const lightbox = document.getElementById('lightbox');
      const lbImg = document.getElementById('lightbox-img');
      if (lightbox && lbImg && img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  function closeLightbox() {
    document.getElementById('lightbox')?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Cart badge bounce CSS ----
  const style = document.createElement('style');
  style.textContent = `
    @keyframes badgeBounce { 0%{transform:scale(1)} 50%{transform:scale(1.5)} 100%{transform:scale(1)} }
    .cart-badge.bounce { animation: badgeBounce 0.4s ease; }
  `;
  document.head.appendChild(style);
});

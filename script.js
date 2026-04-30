/* ============================================================
   朱樹 音々 | Inner Vision Photography
   script.js
   ============================================================ */
(function () {
  'use strict';

  /* ── NAV スクロール切替 ── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── ハンバーガーメニュー ── */
  const hamburger     = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose   = document.getElementById('mobileClose');
  const mobLinks      = document.querySelectorAll('.mob-link');

  function openMenu() {
    mobileOverlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileOverlay.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ── スムーズスクロール（nav高さ補正） ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = a.getAttribute('href') === '#home'
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ── TOPセクション：スクロールでフェードアウト ── */
  const homeSection = document.getElementById('home');
  const homeText    = document.getElementById('homeText');
  const scrollHint  = document.getElementById('scrollHint');
  const homeImg     = document.getElementById('homeImg');

  function onScroll() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    if (scrollY < vh) {
      const progress = scrollY / (vh * 0.7);
      const fade = Math.max(0, 1 - progress);

      if (homeText)   homeText.style.opacity   = fade;
      if (scrollHint) scrollHint.style.opacity = fade * 0.8;

      if (homeImg) {
        homeImg.style.transform = `translateY(${scrollY * 0.22}px)`;
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── スクロールリビール ── */
  const revealSections = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      entry.target.querySelectorAll('.reveal-child').forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 130);
      });
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

  revealSections.forEach(el => observer.observe(el));

  /* ── FULLSCREEN IMAGE MODAL ── */
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalBg = document.getElementById('modalBg');
  const zoomImgs = document.querySelectorAll('.zoom-img');

  function openModal(src) {
    if (!imageModal) return;
    modalImg.src = src;
    imageModal.classList.add('open');
    imageModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent underlying scroll
  }

  function closeModal() {
    if (!imageModal) return;
    imageModal.classList.remove('open');
    imageModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  zoomImgs.forEach(img => {
    img.addEventListener('click', () => {
      openModal(img.src);
    });
  });

  if (modalBg) {
    modalBg.addEventListener('click', closeModal);
  }
  if (modalImg) {
    modalImg.addEventListener('click', closeModal); // Click image to close too
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('open')) {
      closeModal();
    }
  });

})();

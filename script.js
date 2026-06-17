// ─── Nav: hide on scroll down, show on scroll up ───────────────
function initNavScroll() {
  let lastY = window.scrollY;
  let ticking = false;
  const THRESHOLD = 10;
  const MIN_DELTA = 4;

  function update() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const y = window.scrollY;
    const menuOpen = document.getElementById('navDrawer')?.classList.contains('is-open');

    nav.classList.toggle('scrolled', y > THRESHOLD);

    if (menuOpen || y <= THRESHOLD) {
      nav.classList.remove('menu--hidden');
    } else if (y - lastY > MIN_DELTA) {
      nav.classList.add('menu--hidden');
    } else if (lastY - y > MIN_DELTA) {
      nav.classList.remove('menu--hidden');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

// ─── Mobile burger ────────────────────────────────────────────
function initMenu() {
  const nav = document.getElementById('nav');
  const drawer = document.getElementById('navDrawer');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const MOBILE_NAV_MQ = window.matchMedia('(max-width: 768px)');
  const drawerTrap = drawer ? window.createFocusTrap?.(drawer) : null;

  function menuLabel(key, fallback) {
    const lang = window.I18n?.getLang?.() || 'es';
    if (lang === 'en') {
      const translated = window.I18n?.t(key);
      if (translated) return translated;
    }
    return fallback;
  }

  function setMenuOpen(open) {
    if (!drawer || !burger || !navLinks) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open
      ? menuLabel('menu.close', 'Cerrar menú')
      : menuLabel('menu.open', 'Abrir menú'));
    document.body.classList.toggle('menu-nav-open', open);
    if (open) {
      nav?.classList.remove('menu--hidden');
      drawerTrap?.activate();
      drawer.querySelector('a, button')?.focus({ preventScroll: true });
    } else {
      drawerTrap?.deactivate();
      burger?.focus({ preventScroll: true });
    }
  }

  burger?.addEventListener('click', () => {
    setMenuOpen(!drawer.classList.contains('is-open'));
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      setMenuOpen(false);
    }
  });

  MOBILE_NAV_MQ.addEventListener('change', e => {
    if (!e.matches) setMenuOpen(false);
  });

  window.addEventListener('languagechange', () => {
    if (!burger) return;
    const open = drawer?.classList.contains('is-open');
    burger.setAttribute('aria-label', open
      ? menuLabel('menu.close', 'Cerrar menú')
      : menuLabel('menu.open', 'Abrir menú'));
  });
}

// ─── Smooth scroll to footer ──────────────────────────────────
function initFooterScroll() {
  document.querySelectorAll('a[href="#footer"]').forEach(link => {
    link.addEventListener('click', e => {
      const footer = document.getElementById('footer');
      if (!footer) return;
      e.preventDefault();
      footer.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ─── Fade-up on scroll ────────────────────────────────────────
function initFadeObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-fade]').forEach(el => observer.observe(el));
}

// ─── Locked case study ───────────────────────────────────────
function initLockedCaseModal() {
  const trigger = document.getElementById('lockedCaseTrigger');
  const modal = document.getElementById('lockedCaseModal');
  const closeBtn = document.getElementById('lockedCaseClose');
  const backdrop = modal?.querySelector('.project-modal__backdrop');
  const panel = modal?.querySelector('.project-modal__panel');
  const stage = modal?.querySelector('.project-modal__stage');
  if (!trigger || !modal || !panel) return;

  let lastFocus = null;
  let isClosing = false;
  let closeTimer = null;
  const focusTrap = window.createFocusTrap?.(panel);

  function openModal() {
    if (isClosing) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    stage?.scrollTo(0, 0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => modal.classList.add('is-open'));
    });
    focusTrap?.activate();
    closeBtn?.focus({ preventScroll: true });
  }

  function closeModal() {
    if (!modal.classList.contains('is-open') || isClosing) return;
    isClosing = true;
    focusTrap?.deactivate();
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');

    const finishClose = () => {
      if (!isClosing) return;
      isClosing = false;
      clearTimeout(closeTimer);
      panel.removeEventListener('transitionend', onTransitionEnd);
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      lastFocus?.focus();
    };

    const onTransitionEnd = (e) => {
      if (e.target !== panel || e.propertyName !== 'opacity') return;
      finishClose();
    };

    panel.addEventListener('transitionend', onTransitionEnd);
    closeTimer = window.setTimeout(finishClose, 700);
  }

  trigger.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target === backdrop || e.target === stage) closeModal();
  });
  panel.addEventListener('click', e => e.stopPropagation());

  modal.querySelector('a[href="#footer"]')?.addEventListener('click', () => {
    closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

// ─── Cursor blob ──────────────────────────────────────────────
function initCursorBlob() {
  const blob = document.getElementById('cursorBlob');
  const cards = document.querySelectorAll('.proj-item__link:not(.proj-item__link--locked)');

  if (!blob || !cards.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let blobX = 0, blobY = 0;
  let mouseX = 0, mouseY = 0;
  let raf = null;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateBlob() {
    blobX = lerp(blobX, mouseX, 0.12);
    blobY = lerp(blobY, mouseY, 0.12);
    blob.style.left = blobX + 'px';
    blob.style.top  = blobY + 'px';
    raf = requestAnimationFrame(animateBlob);
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      blob.classList.add('visible');
      if (!raf) raf = requestAnimationFrame(animateBlob);
    });

    card.addEventListener('mouseleave', () => {
      blob.classList.remove('visible');
      cancelAnimationFrame(raf);
      raf = null;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMenu();
  initFooterScroll();
  initFadeObserver();
  initLockedCaseModal();
  initCursorBlob();
  initAccessibleVideos?.();
  initOtherProjects?.();
  initToolsCarousel?.();
});

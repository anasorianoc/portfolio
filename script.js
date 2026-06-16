// ─── Nav scroll border ───────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ─── Mobile burger ────────────────────────────────────────────
function initMenu() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
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

  let isClosing = false;
  let closeTimer = null;

  function openModal() {
    if (isClosing) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    stage?.scrollTo(0, 0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => modal.classList.add('is-open'));
    });
    closeBtn?.focus({ preventScroll: true });
  }

  function closeModal() {
    if (!modal.classList.contains('is-open') || isClosing) return;
    isClosing = true;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');

    const finishClose = () => {
      if (!isClosing) return;
      isClosing = false;
      clearTimeout(closeTimer);
      panel.removeEventListener('transitionend', onTransitionEnd);
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
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
  const cards = document.querySelectorAll('.proj-item__img-wrap:not(.proj-item__img-wrap--locked)');

  if (!blob || !cards.length) return;

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
  initMenu();
  initFooterScroll();
  initFadeObserver();
  initLockedCaseModal();
  initCursorBlob();
  initOtherProjects?.();
});

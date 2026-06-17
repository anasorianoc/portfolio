function getFocusableElements(container) {
  return [...container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(el => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true');
}

function createFocusTrap(container) {
  function handleKeyDown(e) {
    if (e.key !== 'Tab') return;
    const focusables = getFocusableElements(container);
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return {
    activate() {
      container.addEventListener('keydown', handleKeyDown);
    },
    deactivate() {
      container.removeEventListener('keydown', handleKeyDown);
    },
  };
}

function initAccessibleVideos() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function apply() {
    document.querySelectorAll('video').forEach(video => {
      video.controls = true;

      if (reduceMotion.matches) {
        video.autoplay = false;
        video.loop = false;
        video.pause();
      }
    });
  }

  apply();
  reduceMotion.addEventListener('change', apply);
}

window.createFocusTrap = createFocusTrap;
window.initAccessibleVideos = initAccessibleVideos;

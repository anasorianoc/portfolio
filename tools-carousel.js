const TOOLS = [
  { id: 'web-basics', src: 'assets/tools/web-basics.png', altKey: 'home.tools.web', alt: 'HTML, CSS y JavaScript' },
  { id: 'cursor', src: 'assets/tools/cursor.png', altKey: 'home.tools.cursor', alt: 'Cursor' },
  { id: 'claude', src: 'assets/tools/claude.png', altKey: 'home.tools.claude', alt: 'Claude' },
  { id: 'figma', src: 'assets/tools/figma.png', altKey: 'home.tools.figma', alt: 'Figma' },
  { id: 'notion', src: 'assets/tools/notion.png', altKey: 'home.tools.notion', alt: 'Notion' },
  { id: 'miro', src: 'assets/tools/miro.png', altKey: 'home.tools.miro', alt: 'Miro' },
  { id: 'github', src: 'assets/tools/github.png', altKey: 'home.tools.github', alt: 'GitHub' },
  { id: 'adobe', src: 'assets/tools/adobe.png', altKey: 'home.tools.adobe', alt: 'Adobe' },
];

function tr(key, fallback = '') {
  const lang = window.I18n?.getLang?.() || 'es';
  if (lang === 'en') {
    const value = window.I18n?.t(key);
    if (value != null) return value;
  }
  return fallback;
}

function renderToolItem(tool, hidden = false) {
  const alt = tr(tool.altKey, tool.alt);
  return `
    <li class="tools-carousel__item"${hidden ? ' aria-hidden="true"' : ''}>
      <img src="${tool.src}" alt="${alt}" width="200" height="56" loading="lazy" data-i18n-alt="${tool.altKey}" />
    </li>
  `;
}

function renderToolsCarousel() {
  const track = document.getElementById('toolsCarouselTrack');
  if (!track) return;

  const items = TOOLS.map(tool => renderToolItem(tool)).join('');
  track.innerHTML = items + TOOLS.map(tool => renderToolItem(tool, true)).join('');
}

function initToolsCarousel() {
  const section = document.querySelector('.tools-carousel');
  const track = document.getElementById('toolsCarouselTrack');
  const viewport = document.getElementById('toolsCarouselViewport');
  if (!section || !track || !viewport) return;

  renderToolsCarousel();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyMotionPreference() {
    section.classList.toggle('tools-carousel--static', reduceMotion.matches);
    track.style.animationPlayState = 'running';
  }

  applyMotionPreference();
  reduceMotion.addEventListener('change', applyMotionPreference);

  viewport.addEventListener('mouseenter', () => {
    if (!reduceMotion.matches) track.style.animationPlayState = 'paused';
  });

  viewport.addEventListener('mouseleave', () => {
    if (!reduceMotion.matches) track.style.animationPlayState = 'running';
  });

  viewport.addEventListener('focusin', () => {
    if (!reduceMotion.matches) track.style.animationPlayState = 'paused';
  });

  viewport.addEventListener('focusout', () => {
    if (!reduceMotion.matches) track.style.animationPlayState = 'running';
  });

  window.addEventListener('languagechange', renderToolsCarousel);
}

if (typeof window !== 'undefined') {
  window.initToolsCarousel = initToolsCarousel;
}

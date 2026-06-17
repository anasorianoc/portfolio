/* Shared Menu & Footer — mirrors Figma components */

const CV_PATH = 'assets/cv ana soriano 2026.pdf';

const NAV_ITEMS = [
  { id: 'work', i18n: 'nav.work', label: 'Proyectos', href: 'index.html' },
  { id: 'fun', i18n: 'nav.fun', label: 'Fun', href: 'fun.html', hidden: true },
  { id: 'about', i18n: 'nav.about', label: 'Sobre mi', href: 'about.html' },
  { id: 'cv', i18n: 'nav.cv', label: 'CV', href: CV_PATH, external: true },
].filter(item => !item.hidden);

function renderLangSwitcher() {
  const lang = window.I18n?.getLang?.() || 'es';
  return `
    <div class="menu__lang" role="group" aria-label="Language">
      <button type="button" class="menu__lang-btn${lang === 'es' ? ' is-active' : ''}" data-lang="es" aria-pressed="${lang === 'es'}">ES</button>
      <span class="menu__lang-sep" aria-hidden="true">/</span>
      <button type="button" class="menu__lang-btn${lang === 'en' ? ' is-active' : ''}" data-lang="en" aria-pressed="${lang === 'en'}">EN</button>
    </div>`;
}

function renderMenu() {
  const el = document.getElementById('site-menu');
  if (!el) return;

  const active = el.dataset.active || '';
  const links = NAV_ITEMS.map(item => {
    const isActive = item.id === active;
    const cls = isActive ? ' class="active"' : '';
    const ext = item.external ? ' target="_blank" rel="noopener"' : '';
    return `<li><a href="${item.href}"${cls}${ext} data-i18n="${item.i18n}">${item.label}</a></li>`;
  }).join('');

  el.innerHTML = `
    <a href="#main" class="skip-link" data-i18n="skip.main">Saltar al contenido principal</a>
    <nav class="menu" id="nav" aria-label="Principal" data-i18n-aria="nav.aria">
      <div class="menu__inner wrap">
        <div class="menu__brand">
          <a href="index.html" class="menu__name">Ana Soriano C</a>
          <span class="menu__tagline">Product Designer UX / UI · Barcelona</span>
        </div>
        <div class="menu__actions">
          <ul class="menu__links" id="navLinksDesktop">
            ${links}
          </ul>
          <a href="#footer" class="btn btn--primary menu__cta" data-i18n="nav.cta">¿Hablamos?</a>
          ${renderLangSwitcher()}
          <button class="menu__burger" id="burger" type="button" data-i18n-aria="menu.open" aria-label="Abrir menú" aria-expanded="false" aria-controls="navDrawer">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="menu__drawer" id="navDrawer" aria-hidden="true">
      <ul class="menu__drawer-links" id="navLinks">
        ${links}
        <li class="menu__links-cta"><a href="#footer" class="btn btn--primary" data-i18n="nav.cta">¿Hablamos?</a></li>
      </ul>
    </div>`;
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  el.innerHTML = `
    <footer class="site-footer" id="footer" data-fade aria-labelledby="footer-cta-title">
      <div class="site-footer__cta wrap">
        <h2 class="site-footer__title" id="footer-cta-title" data-i18n="footer.title">¿Hablamos? :)</h2>
        <p class="site-footer__sub" data-i18n="footer.sub">
          Actualmente estoy abierta a nuevas oportunidades, tanto de proyectos puntuales
          de diseño como posiciones en equipos de producto.
        </p>
        <div class="site-footer__links">
          <a href="https://www.linkedin.com/in/anasorianocabello/" target="_blank" rel="noopener" class="site-footer__link">${phIcon('arrow-right')} Linkedin</a>
          <a href="mailto:asorianocabello@gmail.com" class="site-footer__link">${phIcon('arrow-right')} asorianocabello@gmail.com</a>
        </div>
      </div>
      <div class="site-footer__bar wrap">
        <span class="site-footer__copy">ANA SORIANO © 2026</span>
      </div>
    </footer>`;
}

function bindLangSwitcher() {
  document.getElementById('site-menu')?.addEventListener('click', e => {
    const btn = e.target.closest('.menu__lang-btn');
    if (!btn || !window.I18n) return;
    const lang = btn.dataset.lang;
    if (lang && lang !== I18n.getLang()) I18n.setLang(lang);
  });
}

function initSiteChrome() {
  renderMenu();
  renderFooter();
  bindLangSwitcher();
  if (window.I18n) I18n.init();
}

document.addEventListener('DOMContentLoaded', initSiteChrome);

window.addEventListener('languagechange', () => {
  if (window.I18n) I18n.apply(I18n.getLang());
  window.initOtherProjects?.();
});

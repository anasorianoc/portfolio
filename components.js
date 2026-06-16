/* Shared Menu & Footer — mirrors Figma components */

const CV_PATH = 'assets/cv ana soriano 2026.pdf';

const NAV_ITEMS = [
  { id: 'work', label: 'Proyectos', href: 'index.html' },
  { id: 'fun', label: 'Fun', href: 'fun.html', hidden: true },
  { id: 'about', label: 'Sobre mi', href: 'about.html' },
  { id: 'cv', label: 'CV', href: CV_PATH, external: true },
].filter(item => !item.hidden);

function renderMenu() {
  const el = document.getElementById('site-menu');
  if (!el) return;

  const active = el.dataset.active || '';
  const links = NAV_ITEMS.map(item => {
    const isActive = item.id === active;
    const cls = isActive ? ' class="active"' : '';
    const ext = item.external ? ' target="_blank" rel="noopener"' : '';
    return `<li><a href="${item.href}"${cls}${ext}>${item.label}</a></li>`;
  }).join('');

  el.innerHTML = `
    <nav class="menu" id="nav" aria-label="Principal">
      <div class="menu__inner wrap">
        <div class="menu__brand">
          <a href="index.html" class="menu__name">Ana Soriano C</a>
          <span class="menu__tagline">Product Designer UX / UI · Barcelona</span>
        </div>
        <div class="menu__actions">
          <ul class="menu__links" id="navLinks">
            ${links}
            <li class="menu__links-cta"><a href="#footer" class="btn btn--primary">¿Hablamos?</a></li>
          </ul>
          <a href="#footer" class="btn btn--primary menu__cta">¿Hablamos?</a>
          <button class="menu__burger" id="burger" type="button" aria-label="Abrir menú" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>`;
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  el.innerHTML = `
    <footer class="site-footer" id="footer" data-fade aria-labelledby="footer-cta-title">
      <div class="site-footer__cta wrap">
        <h2 class="site-footer__title" id="footer-cta-title">¿Hablamos? :)</h2>
        <p class="site-footer__sub">
          Actualmente estoy abierta a nuevas oportunidades, tanto de proyectos puntuales
          de diseño como posiciones en equipos de producto.
        </p>
        <div class="site-footer__links">
          <a href="https://linkedin.com/in/asorianocabello" target="_blank" rel="noopener" class="site-footer__link">${phIcon('arrow-right')} Linkedin</a>
          <a href="mailto:asorianocabello@gmail.com" class="site-footer__link">${phIcon('arrow-right')} asorianocabello@gmail.com</a>
        </div>
      </div>
      <div class="site-footer__bar wrap">
        <span class="site-footer__copy">ANA SORIANO © 2026</span>
      </div>
    </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderFooter();
});

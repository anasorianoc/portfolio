const I18N_STORAGE_KEY = 'portfolio-lang';

const I18n = {
  getLang() {
    const stored = localStorage.getItem(I18N_STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
    return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
  },

  setLang(lang) {
    if (lang !== 'en' && lang !== 'es') return;
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    this.apply(lang);
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  },

  t(key, lang = this.getLang()) {
    if (lang === 'es') return null;
    return window.I18N_EN?.[key] ?? null;
  },

  storeDefaults() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.dataset.i18nDefault !== undefined) return;
      el.dataset.i18nDefault = el.hasAttribute('data-i18n-html')
        ? el.innerHTML.trim()
        : el.textContent.trim();
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      if (el.dataset.i18nPlaceholderDefault !== undefined) return;
      el.dataset.i18nPlaceholderDefault = el.getAttribute('placeholder') || '';
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      if (el.dataset.i18nAriaDefault !== undefined) return;
      el.dataset.i18nAriaDefault = el.getAttribute('aria-label') || '';
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      if (el.dataset.i18nAltDefault !== undefined) return;
      el.dataset.i18nAltDefault = el.getAttribute('alt') || '';
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      if (el.dataset.i18nTitleDefault !== undefined) return;
      el.dataset.i18nTitleDefault = el.getAttribute('title') || '';
    });

    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && titleEl.dataset.i18nTitleDefault === undefined) {
      titleEl.dataset.i18nTitleDefault = titleEl.textContent.trim();
    }
  },

  apply(lang = this.getLang()) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translated = lang === 'en' ? this.t(key, lang) : null;
      const value = translated ?? el.dataset.i18nDefault;
      if (value == null) return;
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = value;
      else el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const translated = lang === 'en' ? this.t(key, lang) : null;
      el.setAttribute('placeholder', translated ?? el.dataset.i18nPlaceholderDefault ?? '');
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      const translated = lang === 'en' ? this.t(key, lang) : null;
      const value = translated ?? el.dataset.i18nAriaDefault;
      if (value) el.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.dataset.i18nAlt;
      const translated = lang === 'en' ? this.t(key, lang) : null;
      el.setAttribute('alt', translated ?? el.dataset.i18nAltDefault ?? '');
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      const translated = lang === 'en' ? this.t(key, lang) : null;
      el.setAttribute('title', translated ?? el.dataset.i18nTitleDefault ?? '');
    });

    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const translated = lang === 'en' ? this.t(titleEl.dataset.i18n, lang) : null;
      document.title = translated ?? titleEl.dataset.i18nTitleDefault ?? document.title;
    }

    document.querySelectorAll('.menu__lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  },

  init() {
    this.storeDefaults();
    this.apply(this.getLang());
  },
};

window.I18n = I18n;

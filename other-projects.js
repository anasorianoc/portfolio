const PROJECT_I18N = {
  'ilustracion-1': 'ilustracion',
  'fotografia-producto': 'fotografia',
  'catalogo-redes': 'catalogo',
  'pintura-reformas': 'pintura',
  'video-vfx': 'video',
};

function tr(key, fallback = '') {
  const lang = window.I18n?.getLang?.() || 'es';
  if (lang === 'en') {
    const value = window.I18n?.t(key);
    if (value != null) return value;
  }
  return fallback;
}

function localizedProject(project) {
  const slug = PROJECT_I18N[project.id];
  if (!slug) return project;

  const prefix = `other.${slug}`;
  const copy = {
    ...project,
    title: tr(`${prefix}.title`, project.title),
    titleHtml: tr(`${prefix}.titleHtml`, project.titleHtml || project.title),
    intro: project.intro ? tr(`${prefix}.intro`, project.intro) : project.intro,
  };

  if (project.meta?.length) {
    copy.meta = project.meta.map((item, index) => {
      const labelKey = `${prefix}.meta.${index === 0 ? 'tasksLabel' : 'contextLabel'}`;
      const valueKey = `${prefix}.meta.${index === 0 ? 'tasksValue' : 'contextValue'}`;
      return {
        label: tr(labelKey, item.label),
        value: tr(valueKey, item.value).replace(/\\n/g, '\n'),
      };
    });
  }

  if (project.sections?.length) {
    const sectionKeys = ['context', 'role', 'solution', 'learning'];
    copy.sections = project.sections.map((section, index) => {
      const sectionKey = sectionKeys[index];
      if (!sectionKey) return section;
      const sp = `${prefix}.sections.${sectionKey}`;
      return {
        ...section,
        heading: tr(`${sp}.heading`, section.heading),
        paragraphs: (section.paragraphs || []).map((text, pi) => tr(`${sp}.p${pi + 1}`, text)),
        list: (section.list || []).map((item, li) => tr(`${sp}.l${li + 1}`, item)),
        image: section.image
          ? { ...section.image, alt: tr(`${sp}.imageAlt`, section.image.alt || '') }
          : section.image,
      };
    });
  }

  return copy;
}

function getLocalizedProject(projectId) {
  const project = getVisibleProjects().find(p => p.id === projectId);
  return project ? localizedProject(project) : null;
}

const OTHER_PROJECTS = [
  {
    id: 'ilustracion-1',
    title: 'Ilustración',
    titleHtml: 'Proyectos personales<br>de ilustración',
    image: 'assets/otros/ilustracion-1.jpg',
    cover: 'assets/otros/ilustracion/espejo.jpg',
    intro:
      'Me gusta explorar el mundo visual a través de la ilustración, combinando intuición, forma y color. Aquí puedes ver algunos proyectos personales donde he experimentado con ideas, estilos y narrativas propias.',
    gallery: [
      {
        cols: 3,
        images: [
          { src: 'assets/otros/ilustracion/espejo.jpg', alt: 'Ilustración — Espejo' },
          { src: 'assets/otros/ilustracion/luces.jpg', alt: 'Ilustración — Luces' },
          { src: 'assets/otros/ilustracion/conejo.jpg', alt: 'Ilustración — Conejo' },
          { src: 'assets/otros/ilustracion/ultima3.jpg', alt: 'Ilustración — Paisaje onírico' },
          { src: 'assets/otros/ilustracion/mariposas.jpg', alt: 'Ilustración — Mariposas' },
          { src: 'assets/otros/ilustracion/casa.jpg', alt: 'Ilustración — Casa' },
          { src: 'assets/otros/ilustracion/face.jpg', alt: 'Ilustración — Retrato' },
          { src: 'assets/otros/ilustracion/narracion.jpg', alt: 'Ilustración editorial' },
          { src: 'assets/otros/ilustracion/rosa.jpg', alt: 'Ilustración — Rosa' },
        ],
      },
    ],
  },
  {
    id: 'fotografia-producto',
    title: 'Fotografía de producto y edición',
    titleHtml: 'Fotografía de producto<br>y edición',
    image: 'assets/otros/fotografia-producto.jpg',
    cover: 'assets/otros/fotografia/hero.jpg',
    intro:
      'Realicé la producción fotográfica de los nuevos productos de esta empresa farmacéutica. Me encargué de capturar imágenes individuales del packaging y los frascos desde distintas perspectivas, con el objetivo de contar con material visual versátil para futuras aplicaciones de diseño gráfico.',
    meta: [
      {
        label: 'Tareas',
        value: 'Iluminación\nFotografía de producto\nEdición fotográfica',
      },
      {
        label: 'Contexto',
        value: 'Empresa farmacéutica',
      },
    ],
    gallery: [
      {
        cols: 2,
        images: [
          { src: 'assets/otros/fotografia/pastilla2.jpg', alt: 'Fotografía de pastillas — composición 1' },
          { src: 'assets/otros/fotografia/pastilla1.jpg', alt: 'Fotografía de pastillas — composición 2' },
        ],
      },
      {
        cols: 4,
        images: [
          { src: 'assets/otros/fotografia/frente.png', alt: 'Packaging — vista frontal' },
          { src: 'assets/otros/fotografia/lado.png', alt: 'Packaging — vista lateral' },
          { src: 'assets/otros/fotografia/lado2.png', alt: 'Packaging — vista lateral 2' },
          { src: 'assets/otros/fotografia/frasco.png', alt: 'Frasco de producto' },
        ],
      },
      {
        cols: 1,
        images: [
          { src: 'assets/otros/fotografia/hero.jpg', alt: 'Fotografía de producto Plusviti' },
        ],
      },
    ],
  },
  {
    id: 'catalogo-redes',
    title: 'Catálogo y redes sociales',
    titleHtml: 'Diseño de catálogo<br>y redes sociales',
    image: 'assets/otros/catalogo-redes.jpg',
    cover: 'assets/otros/catalogo/post-84.jpg',
    intro:
      'Diseñé materiales gráficos para distintas aplicaciones, como catálogos de productos y publicaciones para redes sociales.',
    meta: [
      {
        label: 'Tareas',
        value: 'Diseño gráfico\nMaquetación catálogo de producto\nDiseño de publicaciones para redes sociales',
      },
      {
        label: 'Contexto',
        value: 'Empresa tecnológica',
      },
    ],
    gallery: [
      {
        cols: 3,
        images: [
          { src: 'assets/otros/catalogo/post-84.jpg', alt: 'Publicación para redes sociales' },
          { src: 'assets/otros/catalogo/post-50.jpg', alt: 'Publicación para redes sociales' },
          { src: 'assets/otros/catalogo/post-27.jpg', alt: 'Publicación para redes sociales' },
          { src: 'assets/otros/catalogo/post-52.jpg', alt: 'Publicación para redes sociales' },
          { src: 'assets/otros/catalogo/post-51.jpg', alt: 'Publicación para redes sociales' },
          { src: 'assets/otros/catalogo/post-53.jpg', alt: 'Publicación para redes sociales' },
          { src: 'assets/otros/catalogo/post-54.jpg', alt: 'Publicación para redes sociales' },
          { src: 'assets/otros/catalogo/post-55.jpg', alt: 'Publicación para redes sociales' },
          { src: 'assets/otros/catalogo/post-73.jpg', alt: 'Publicación para redes sociales' },
        ],
      },
    ],
  },
  {
    id: 'pintura-reformas',
    title: 'Diseño web para una empresa de pintura y reformas',
    titleHtml: 'Diseño web para una empresa<br>de pintura y reformas',
    image: 'assets/otros/pintura-reformas.jpg',
    cover: 'assets/otros/pintura/intro.jpg',
    intro:
      'Se desarrolló una página web para presentar los servicios y proyectos de la empresa, con un enfoque en maximizar la conversión de clientes y optimizar el SEO.',
    meta: [
      {
        label: 'Tareas',
        value: 'Optimización SEO\nArquitectura de la información\nDiseño de la interfaz',
      },
    ],
    gallery: [
      {
        cols: 1,
        images: [
          { src: 'assets/otros/pintura/mockup.jpg', alt: 'Mockup de la web Pigmenta' },
        ],
      },
    ],
    sections: [
      {
        heading: 'Contexto y objetivos',
        paragraphs: [
          'El cliente, una empresa local especializada en reformas y pintura, tenía una web antigua, poco usable y difícil de encontrar en buscadores. No recibían contactos desde la web y dependían exclusivamente de recomendaciones.',
          'Los objetivos eran claros:',
        ],
        list: [
          'Generar más solicitudes de presupuesto desde la web.',
          'Mejorar el posicionamiento orgánico en Google (SEO local).',
          'Dar una imagen más profesional y alineada con sus servicios.',
        ],
      },
      {
        heading: 'Mi rol y proceso de trabajo',
        paragraphs: ['Como diseñadora UX/UI, me encargué de:'],
        list: [
          'Redefinir la arquitectura de la información y los flujos de navegación.',
          'Diseñar una nueva identidad visual coherente con el sector.',
          'Crear una estructura clara orientada a la conversión (CTA visibles, formularios sencillos, testimonios, antes/después).',
          'Optimizar los textos y metadatos (keywords locales, títulos, descripciones) para el SEO.',
          'Asegurar que el diseño fuese responsive y con tiempos de carga rápidos.',
        ],
      },
      {
        heading: 'Solución de diseño',
        paragraphs: [
          'La nueva web se estructura en torno a <strong>servicios bien diferenciados</strong> (reformas, pintura, fachadas, interiores…), y cada uno tiene su propia landing page con contenido optimizado.',
          'Incluí elementos de confianza como:',
        ],
        list: [
          'Testimonios de clientes.',
          'Proyectos anteriores con fotos del antes y después.',
          'CTA persistentes como “Pide presupuesto gratuito”.',
        ],
        image: { src: 'assets/otros/pintura/home.jpg', alt: 'Home de la web Pigmenta' },
      },
      {
        heading: 'Aprendizajes',
        paragraphs: [
          'Este proyecto me confirmó la importancia de combinar diseño visual, UX y SEO desde el inicio. También fue clave entender al cliente final (personas buscando confianza, precios y rapidez) y reflejarlo en el diseño.',
        ],
      },
    ],
  },
  {
    id: 'video-vfx',
    title: 'Grabación, edición y vfx de vídeos',
    titleHtml: 'Grabación, edición<br>y vfx de vídeos',
    image: 'assets/otros/video-vfx/thumbnail.jpg',
    youtubeId: '1Hag1-ISNJI',
  },
  {
    id: 'animacion-webgl',
    title: 'Animación WebGl',
    image: 'assets/otros/animacion-webgl.jpg',
    cover: 'assets/otros/animacion-webgl.jpg',
    hidden: true,
  },
];

function getVisibleProjects() {
  return OTHER_PROJECTS.filter(project => !project.hidden);
}

function renderGallery(gallery) {
  return gallery.map(row => {
    const imgs = row.images.map(img => `
      <img src="${img.src}" alt="${img.alt || ''}" loading="lazy" />
    `).join('');

    return `
      <div class="project-modal__gallery-row project-modal__gallery-row--${row.cols}">
        ${imgs}
      </div>
    `;
  }).join('');
}

function renderSections(sections) {
  if (!sections?.length) return '';

  return sections.map(section => {
    const paragraphs = (section.paragraphs || [])
      .map(text => `<p>${text}</p>`)
      .join('');

    const list = section.list?.length
      ? `<ul class="project-modal__list">${section.list.map(item => `<li>${item}</li>`).join('')}</ul>`
      : '';

    const image = section.image
      ? `<div class="project-modal__section-img"><img src="${section.image.src}" alt="${section.image.alt || ''}" loading="lazy" /></div>`
      : '';

    return `
      <section class="project-modal__section">
        <h3 class="project-modal__section-title">${section.heading}</h3>
        ${paragraphs}
        ${list}
        ${image}
      </section>
    `;
  }).join('');
}

function renderModalContent(project) {
  const titleHtml = project.titleHtml || project.title;
  const coverSrc = !project.youtubeId ? (project.cover || project.image) : null;

  let coverContent = '';
  if (project.youtubeId) {
    const videoTitle = tr('other.video.iframeTitle', project.title);
    coverContent = `
      <div class="project-modal__video">
        <iframe
          src="https://www.youtube.com/embed/${project.youtubeId}?rel=0"
          title="${videoTitle}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    `;
  } else if (coverSrc) {
    coverContent = `<img src="${coverSrc}" alt="" loading="lazy" />`;
  }

  let extra = '';

  if (project.intro) {
    const metaHtml = (project.meta || []).map(item => `
      <div class="project-modal__meta-group">
        <span class="project-modal__meta-label">${item.label}</span>
        <div class="project-modal__meta-value">${item.value.replace(/\n/g, '<br>')}</div>
      </div>
    `).join('');

    extra += `
      <div class="project-modal__intro${metaHtml ? '' : ' project-modal__intro--solo'}">
        <p class="project-modal__intro-text">${project.intro}</p>
        ${metaHtml ? `<div class="project-modal__meta">${metaHtml}</div>` : ''}
      </div>
    `;
  }

  if (project.gallery?.length) {
    extra += `<div class="project-modal__gallery">${renderGallery(project.gallery)}</div>`;
  }

  if (project.sections?.length) {
    extra += `<div class="project-modal__sections">${renderSections(project.sections)}</div>`;
  }

  return `
    <div class="project-modal__inner">
      <h2 class="project-modal__title" id="projectModalTitle">${titleHtml}</h2>
      <div class="project-modal__cover${project.youtubeId ? ' project-modal__cover--video' : coverSrc ? '' : ' project-modal__cover--empty'}">
        ${coverContent}
      </div>
      ${extra}
    </div>
  `;
}

function renderOtherProjectCards() {
  const track = document.getElementById('otherProjectsTrack');
  if (!track) return;

  track.innerHTML = getVisibleProjects().map(project => {
    const localized = localizedProject(project);
    const media = project.image
      ? `<img src="${project.image}" alt="" loading="lazy" />`
      : '';
    const viewLabel = tr('other.viewProject', 'Ver proyecto: {title}').replace('{title}', localized.title);

    return `
      <li class="other-projects__item">
        <button
          type="button"
          class="other-card"
          data-project-id="${project.id}"
          aria-label="${viewLabel}"
        >
          <div class="other-card__media${project.image ? '' : ' other-card__media--empty'}">
            ${media}
          </div>
          <h3 class="other-card__title">${localized.title}</h3>
        </button>
      </li>
    `;
  }).join('');
}

function initOtherProjectsCarousel() {
  const track = document.getElementById('otherProjectsTrack');
  if (!track) return;

  const cards = () => track.querySelectorAll('.other-card');

  track.addEventListener('mouseleave', () => {
    cards().forEach(card => card.classList.remove('is-active'));
  });

  cards().forEach(card => {
    card.addEventListener('mouseenter', () => {
      cards().forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');
    });
  });
}

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const content = document.getElementById('projectModalContent');
  const closeBtn = document.getElementById('projectModalClose');
  const backdrop = modal?.querySelector('.project-modal__backdrop');
  const panel = modal?.querySelector('.project-modal__panel');
  const stage = modal?.querySelector('.project-modal__stage');
  if (!modal || !content || !panel) return;

  let lastFocus = null;
  let isClosing = false;
  let closeTimer = null;
  const focusTrap = window.createFocusTrap?.(panel);

  function openModal(projectId) {
    const project = getLocalizedProject(projectId);
    if (!project || isClosing) return;

    content.innerHTML = renderModalContent(project);
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    stage?.scrollTo(0, 0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-open');
      });
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
      content.innerHTML = '';
      lastFocus?.focus();
    };

    const onTransitionEnd = (e) => {
      if (e.target !== panel || e.propertyName !== 'opacity') return;
      finishClose();
    };

    panel.addEventListener('transitionend', onTransitionEnd);
    closeTimer = window.setTimeout(finishClose, 700);
  }

  document.getElementById('otherProjectsTrack')?.addEventListener('click', e => {
    const card = e.target.closest('.other-card');
    if (!card) return;
    openModal(card.dataset.projectId);
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target === backdrop || e.target === stage) closeModal();
  });

  panel.addEventListener('click', e => e.stopPropagation());

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

function initOtherProjects() {
  renderOtherProjectCards();
  initOtherProjectsCarousel();
  initProjectModal();
}

if (typeof window !== 'undefined') {
  window.initOtherProjects = initOtherProjects;
}

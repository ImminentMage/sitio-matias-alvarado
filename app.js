document.documentElement.classList.add('js');
document.querySelectorAll('.footer-links').forEach((links) => {
  if (!links.querySelector('a[href="privacidad.html"]')) {
    links.insertAdjacentHTML('beforeend', '<a href="privacidad.html">Privacidad y datos</a>');
  }
});
const menuButton = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');

const progress = document.createElement('div');
progress.className = 'reading-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.prepend(progress);

const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Volver al inicio');
backToTop.textContent = '↑';
document.body.append(backToTop);

const updateScrollUI = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
  backToTop.classList.toggle('is-visible', window.scrollY > 520);
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('is-open', !expanded);
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// Las cabeceras heredadas siguen teniendo rutas absolutas del sitio antiguo.
// Dentro de esta versión se resuelven hacia sus páginas rediseñadas locales.
const redesignedRoutes = {
  'curriculum.html': 'curriculum.html',
  'temas.html': 'temas.html',
  'publicaciones.html': 'publicaciones.html',
  'estudiantes doctorado.html': 'Estudiantes%20doctorado.html',
  'colaboradorespostdoctorales.html': 'Colaboradorespostdoctorales.html'
};
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const url = new URL(link.href, window.location.href);
  if (url.hostname !== 'delta.cs.cinvestav.mx') return;
  const lastSegment = decodeURIComponent(url.pathname.split('/').pop() || '').toLowerCase();
  const localRoute = redesignedRoutes[lastSegment];
  if (!localRoute) return;
  event.preventDefault();
  window.location.href = localRoute;
});

const citationMetadata = [
  {
    match: 'modeling cancer immunoediting',
    text: 'A. Rojas-Domínguez · R. Arroyo-Duarte · F. Rincón-Vieyra · M. Alvarado-Mentado'
  },
  {
    match: 'systematic segmentation method',
    text: 'F. Garcia-Lamont · M. Alvarado · J. Cervantes'
  },
  {
    match: 'cancer metastasis as a metaphor',
    text: 'D. Barradas-Bautista · M. Alvarado-Mentado · M. Agostino · G. Cocho'
  }
];

document.querySelectorAll('.publication h4, .record h3').forEach((title) => {
  const metadata = citationMetadata.find((item) => title.textContent.toLowerCase().includes(item.match));
  if (metadata) title.insertAdjacentHTML('afterend', `<p class="publication-meta">${metadata.text}</p>`);
});

const signal = document.querySelector('.signal-card');
if (signal) {
  const heading = signal.querySelector('strong');
  const description = signal.querySelector('p');
  if (heading) heading.textContent = 'Cáncer · Estrategia · Robótica';
  if (description) description.textContent = 'Líneas de investigación conectadas por modelación y cómputo.';
}

const profileFrame = document.querySelector('.network-wrap');
if (profileFrame && location.pathname.endsWith('index.html')) {
  profileFrame.classList.add('profile-frame');
  profileFrame.removeAttribute('aria-hidden');
  profileFrame.innerHTML = '<img src="assets/matias-alvarado.jpg" alt="Dr. José Matías Alvarado Mentado">';
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.setProperty('--delay', `${Math.min(index % 4, 3) * 75}ms`);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

if (location.pathname.includes('Organizacioneventos.html')) {
  document.querySelector('.dark-lab')?.remove();
  const script = document.createElement('script');
  script.src = 'events.js';
  document.body.append(script);
}

if (location.pathname.endsWith('index.html')) {
  document.querySelectorAll('.research-card').forEach((card, index) => {
    card.href = ['temas.html#cancer', 'temas.html#emociones', 'temas.html#estrategia', 'temas.html#robotica'][index];
  });
}

if (location.pathname.endsWith('temas.html')) {
  document.querySelectorAll('.record').forEach((record, index) => {
    record.id = ['cancer', 'emociones', 'estrategia', 'robotica'][index] || '';
  });
  const references = {
    emociones: 'https://link.springer.com/chapter/10.1007/978-3-319-57351-9_41',
    estrategia: 'https://doi.org/10.1016/j.eswa.2012.03.050',
    robotica: 'https://doi.org/10.1007/s00521-010-0429-x'
  };
  Object.entries(references).forEach(([id, href]) => {
    const link = document.querySelector(`#${id} .links a`);
    if (link) link.href = href;
  });
}

if (location.pathname.endsWith('Colaboradorespostdoctorales.html')) {
  const postdoctoralProfiles = {
    'Dra. Maria Elena Sanchez Bello': 'https://mx.linkedin.com/in/maria-elena-sanchez-bello-46976b264?trk=people_directory',
    'Dr. Irving Ulises Martinez Vargas': 'https://mx.linkedin.com/in/irvingumartinez',
    'Dr. Didier Barradas Bautista': 'https://www.researchgate.net/profile/Didier_Barradas',
    'Dr. Ansel Rodriguez': 'http://www.researchgate.net/profile/Ansel_Rodriguez_Gonzalez',
    'Dra. Maricela Bravo': 'https://www.researchgate.net/profile/Maricela_Bravo',
    'Dr. Christian Sanchez Sanchez': 'http://www.cua.uam.mx/directorio-institucional-de-la-uam-cuajimalpa/detalle/315'
  };
  document.querySelectorAll('.record .links a').forEach((link) => {
    const href = postdoctoralProfiles[link.textContent.trim()];
    if (href) link.href = href;
  });
}

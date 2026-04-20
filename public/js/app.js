

// ============================================================
//  app.js  –  Portafolio Ramiro Marca Sarzuri
//  Sesión 3: JavaScript Esencial (ES6+, DOM, Eventos, Storage)
//  Sesión 4: JavaScript Asíncrono y APIs (Fetch, Promesas, async/await)
// ============================================================
 
 
// ============================================================
// SESIÓN 3 – BLOQUE A: VARIABLES let & const
// ============================================================
const SITE_AUTHOR   = 'Ramiro Marca Sarzuri';       // const: valor fijo
const API_BASE      = 'https://jsonplaceholder.typicode.com';
const POKE_API      = 'https://pokeapi.co/api/v2';
const COUNTRIES_API = 'https://restcountries.com/v3.1';
 
let currentFilter = 'all';    // let: cambia según filtro activo
let pokemonPage   = 0;        // se incrementa al pedir más pokémon
let projectsData  = [];       // se llenará combinando locales + API
 
 
// ============================================================
// SESIÓN 3 – BLOQUE B: MÓDULOS ES6
//   → Este archivo es importado como type="module" desde index.html
//   → Cada función que se usa en otro archivo se exporta con export
//   ⚠️ Requiere servidor HTTP (Live Server / npx serve .)
// ============================================================
/* export { renderProjects, initContactForm, fetchProjects }; */
 
 
// ============================================================
// SESIÓN 3 – BLOQUE C: ARROW FUNCTIONS + TEMPLATE LITERALS
// ============================================================
 
/** Saludo dinámico en la consola usando template literals */
const greet = (name) => `¡Hola desde el portafolio de ${name}! 🔬`;
console.log(greet(SITE_AUTHOR));
 
/** Formatea precio con template literal + toLocaleString */
const formatPrice = (amount) => `$${Number(amount).toLocaleString('es-BO')}`;
 
 
// ============================================================
// SESIÓN 3 – BLOQUE D: DESTRUCTURING + SPREAD & REST
// ============================================================
 
// Destructuring de objeto — perfil profesional de Ramiro
const devProfile = {
  name:     'Ramiro Marca Sarzuri',
  role:     'Ingeniero Electrónico / Analista Programador',
  location: 'La Paz, Bolivia',
  skills:   ['C# .NET', 'Python', 'Node.js', 'React'],
};
 
const { name, role, skills } = devProfile;            // object destructuring
const [mainSkill, ...otherSkills] = skills;            // array destructuring + rest
 
console.log(`${name} – ${role}`);
console.log('Skill principal:', mainSkill);            // 'C# .NET'
console.log('Otras skills:', otherSkills);             // ['Python', 'Node.js', 'React']
 
// Spread: combinar arrays de tecnologías
const techMetrology = ['EURAMET', 'GUM', 'Trazabilidad'];
const techSoftware  = ['C# .NET', 'Python', 'Node.js', 'React'];
const allTechs      = [...techMetrology, ...techSoftware];   // spread operator
console.log('Stack completo:', allTechs);
 
// Spread: clonar y extender un objeto sin mutarlo
const updatedProfile = { ...devProfile, available: true };
console.log('Perfil actualizado:', updatedProfile);
 
 
// ============================================================
// SESIÓN 3 – BLOQUE E: CLASES ES6 + OBJETOS
// ============================================================
 
class Project {
  #id;                                      // campo privado ES2022
 
  constructor({ id, title, description, techs, emoji, category }) {
    this.#id         = id;
    this.title       = title;
    this.description = description;
    this.techs       = techs;
    this.emoji       = emoji;
    this.category    = category;
  }
 
  get id() { return this.#id; }
 
  // Template literal en método: genera HTML de la tarjeta
  toHTML() {
    const badges = this.techs
      .map(t => `<span class="tech-badge">${t}</span>`)
      .join('');
 
    return `
      <article class="project-card" data-id="${this.#id}" data-category="${this.category}">
        <div class="project-img" aria-hidden="true">${this.emoji}</div>
        <div class="project-info">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <footer class="project-tags">${badges}</footer>
        </div>
      </article>`;
  }
}
 
// Datos locales — proyectos reales de Ramiro con objetos literales
const localProjects = [
  new Project({
    id: 1, category: 'software', emoji: '⏱️',
    title: 'Software para Calibración de Cronómetros',
    description: 'Aplicación en Visual Studio C# .NET para toma y análisis automatizado de datos de frecuencia. Optimiza la precisión en metrología del tiempo, reduciendo errores humanos.',
    techs: ['C# .NET', 'Visual Studio', 'Metrología'],
  }),
  new Project({
    id: 2, category: 'metrology', emoji: '📡',
    title: 'Procedimiento para Calibración de Osciloscopios',
    description: 'Implementación técnica bajo guía EURAMET cg-7. Asegura trazabilidad en mediciones de señales eléctricas con evaluación de incertidumbre conforme al GUM.',
    techs: ['EURAMET', 'GUM', 'Señales eléctricas'],
  }),
  new Project({
    id: 3, category: 'metrology', emoji: '🔄',
    title: 'Calibración de Tacómetros Ópticos',
    description: 'Desarrollo e implementación de métodos de verificación y validación para tacómetros ópticos. Garantiza mediciones confiables de velocidad angular con trazabilidad a patrones nacionales.',
    techs: ['Velocidad angular', 'Óptica', 'Trazabilidad'],
  }),
];
 
 
// ============================================================
// SESIÓN 3 – BLOQUE F: MÉTODOS DE ARRAY
// ============================================================
 
/** Filtra proyectos por categoría */
const filterProjects = (category) => {
  const source = projectsData.length ? projectsData : localProjects;
  return category === 'all'
    ? source
    : source.filter(p => p.category === category);       // .filter()
};
 
/** Extrae solo los títulos */
const getTitles = () => localProjects.map(p => p.title); // .map()
 
/** Cuenta proyectos por categoría */
const countByCategory = localProjects.reduce((acc, p) => { // .reduce()
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});
 
/** Busca proyecto por ID */
const findProject = (id) => localProjects.find(p => p.id === id); // .find()
 
console.log('Títulos:', getTitles());
console.log('Por categoría:', countByCategory);
 
 
// ============================================================
// SESIÓN 3 – BLOQUE G: SELECCIÓN DOM
// ============================================================
 
const projectsGrid  = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle   = document.getElementById('theme-toggle');
const pokeSection   = document.getElementById('poke-section');
const pokeGrid      = document.getElementById('poke-grid');
const pokeBtnNext   = document.getElementById('poke-next');
const countryInput  = document.getElementById('country-search');
const countryResult = document.getElementById('country-result');
const contactForm   = document.querySelector('#contacto form');
const toastEl       = document.getElementById('toast');
 
 
// ============================================================
// SESIÓN 3 – BLOQUE H: RENDERIZADO DOM
// ============================================================
 
/** Renderiza los proyectos en el grid del DOM */
function renderProjects(category = 'all') {
  if (!projectsGrid) return;
 
  const filtered = filterProjects(category);
 
  // innerHTML: reconstruye el grid con template literals
  projectsGrid.innerHTML = filtered
    .map(p => p.toHTML())
    .join('');
 
  // classList: activa estado visual del filtro seleccionado
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
 
  // textContent: actualiza el contador visible sin riesgo XSS
  const counter = document.getElementById('project-count');
  if (counter) counter.textContent = `${filtered.length} proyecto${filtered.length !== 1 ? 's' : ''}`;
}
 
// Renderizado inicial
renderProjects('all');
 
 
// ============================================================
// SESIÓN 3 – BLOQUE I: EVENTOS
// ============================================================
 
/** Delegación de eventos en los filtros */
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentFilter = e.currentTarget.dataset.filter;
    renderProjects(currentFilter);
  });
});
 
/** Evento: tema oscuro / claro con classList.toggle */
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
 
    themeToggle.setAttribute('aria-label', isDark ? 'Modo claro' : 'Modo oscuro');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
 
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}
 
/** Scroll suave para todos los enlaces internos */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();                               // preventDefault
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
 
 
// ============================================================
// SESIÓN 3 – BLOQUE J: LOCAL STORAGE
// ============================================================
 
/** Inicializa el tema desde localStorage */
function initTheme() {
  const saved = localStorage.getItem('theme');       // getItem
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
}
initTheme();
 
/** Guarda el borrador del formulario */
function saveFormDraft(data) {
  localStorage.setItem('form-draft', JSON.stringify(data));  // stringify
}
 
/** Recupera el borrador guardado */
function loadFormDraft() {
  const raw = localStorage.getItem('form-draft');
  return raw ? JSON.parse(raw) : null;               // parse
}
 
 
// ============================================================
// SESIÓN 4 – BLOQUE A: PROMESAS (Promise)
// ============================================================
 
/**
 * Simula validación asíncrona del email con Promise
 * Estado: pending → fulfilled / rejected
 */
function validateEmail(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (valid) resolve({ ok: true, email });
      else reject(new Error(`Email inválido: ${email}`));
    }, 500);
  });
}
 
// .then() y .catch() — demostración de encadenamiento
validateEmail('ramiro.marca@ibmetro.gob.bo')
  .then(({ email }) => console.log(`✅ Email válido: ${email}`))
  .catch(err => console.error('❌', err.message));
 
 
// ============================================================
// SESIÓN 4 – BLOQUE B: async / await + try / catch / finally
// ============================================================
 
/**
 * Wrapper genérico para fetch GET con manejo de errores
 * Usamos async/await en lugar de .then() encadenado
 */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`);
  return await res.json();              // res.json() devuelve una Promesa
}
 
 
// ============================================================
// SESIÓN 4 – BLOQUE C: FETCH GET – JSONPlaceholder
//   API Pública: https://jsonplaceholder.typicode.com
// ============================================================
 
async function fetchProjects() {
  const loader = document.getElementById('projects-loader');
  if (loader) loader.classList.remove('hidden');
 
  try {
    // Fetch GET: obtiene posts como "proyectos extra de API"
    const posts = await fetchJSON(`${API_BASE}/posts?_limit=3`);
 
    // Destructuring en el map + template literal
    const extra = posts.map(({ id, title, body }) => new Project({
      id: id + 100,
      category: 'api',
      emoji: '🌐',
      title: title.slice(0, 40) + '…',
      description: body.slice(0, 100) + '…',
      techs: ['Fetch API', 'JSONPlaceholder', 'REST'],
    }));
 
    // Spread: combinar proyectos locales + los de la API
    projectsData = [...localProjects, ...extra];
    renderProjects('all');
 
    showToast('Proyectos de API cargados ✅');
 
  } catch (err) {
    console.error('Error al cargar proyectos:', err);
    showToast(`Error: ${err.message}`, 'error');
  } finally {
    // finally: se ejecuta SIEMPRE, haya error o no
    if (loader) loader.classList.add('hidden');
  }
}
 
 
// ============================================================
// SESIÓN 4 – BLOQUE D: FETCH GET – PokeAPI
//   API Pública: https://pokeapi.co
// ============================================================
 
async function fetchPokemons(offset = 0) {
  if (!pokeGrid) return;
 
  pokeGrid.innerHTML = '<p class="loading-text">Cargando Pokémon...</p>';
 
  try {
    // Fetch GET con parámetros en la URL
    const data = await fetchJSON(`${POKE_API}/pokemon?limit=6&offset=${offset}`);
 
    // Promise.all: carga los detalles de 6 pokémon EN PARALELO
    const details = await Promise.all(
      data.results.map(p => fetchJSON(p.url))        // map() + Promise.all
    );
 
    // Manipulación DOM: construir tarjetas con innerHTML
    pokeGrid.innerHTML = details.map(({ name, sprites, types }) => {
      const type = types[0].type.name;
      const img  = sprites.other['official-artwork'].front_default
                || sprites.front_default;
      return `
        <div class="poke-card poke--${type}">
          <img src="${img}" alt="${name}" loading="lazy" />
          <p class="poke-name">${name}</p>
          <span class="poke-type">${type}</span>
        </div>`;
    }).join('');
 
  } catch (err) {
    pokeGrid.innerHTML = `<p class="error-text">Error: ${err.message}</p>`;
  }
}
 
// Evento: cargar siguiente página de pokémon
if (pokeBtnNext) {
  pokeBtnNext.addEventListener('click', () => {
    pokemonPage += 6;
    fetchPokemons(pokemonPage);
  });
}
 
 
// ============================================================
// SESIÓN 4 – BLOQUE E: FETCH GET – REST Countries
//   API Pública: https://restcountries.com
// ============================================================
 
/** Busca información de un país por nombre */
async function fetchCountry(query) {
  if (!countryResult || !query.trim()) return;
  countryResult.innerHTML = '<p class="loading-text">Buscando...</p>';
 
  try {
    const [country] = await fetchJSON(
      `${COUNTRIES_API}/name/${encodeURIComponent(query)}?fields=name,capital,population,flags,languages,region`
    );
 
    // Destructuring del objeto country
    const {
      name:    { common },
      capital: [capital] = ['N/A'],
      population,
      flags:   { svg: flag },
      region,
    } = country;
 
    // Template literal para construir el HTML
    countryResult.innerHTML = `
      <div class="country-card">
        <img src="${flag}" alt="Bandera de ${common}" class="country-flag" />
        <div class="country-info">
          <h4>${common}</h4>
          <p>🏛 Capital: <strong>${capital}</strong></p>
          <p>🌍 Región: <strong>${region}</strong></p>
          <p>👥 Población: <strong>${population.toLocaleString('es-BO')}</strong></p>
        </div>
      </div>`;
 
  } catch {
    countryResult.innerHTML = `<p class="error-text">País no encontrado.</p>`;
  }
}
 
// Evento: buscar país al escribir (debounce simple 600ms)
let searchTimer;
if (countryInput) {
  countryInput.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fetchCountry(e.target.value), 600);
  });
}
 
 
// ============================================================
// SESIÓN 4 – BLOQUE F: FETCH POST – JSONPlaceholder
//   Envío del formulario de contacto
// ============================================================
 
async function initContactForm() {
  if (!contactForm) return;
 
  // Cargar borrador guardado en localStorage
  const draft = loadFormDraft();
  if (draft) {
    const msgEl = contactForm.querySelector('#mensaje');
    if (msgEl && draft.mensaje) msgEl.value = draft.mensaje;
  }
 
  // Guardar borrador mientras se escribe
  contactForm.addEventListener('input', () => {
    const formData = new FormData(contactForm);
    saveFormDraft(Object.fromEntries(formData));
  });
 
  // Envío del formulario con Fetch POST
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();                                   // evita recarga
 
    const btnSubmit = contactForm.querySelector('.btn-submit');
    btnSubmit.textContent = 'Enviando...';
    btnSubmit.disabled    = true;
 
    // Destructuring de FormData
    const { nombre, email, mensaje } = Object.fromEntries(
      new FormData(contactForm)
    );
 
    try {
      // Validar email con Promesa
      await validateEmail(email);
 
      // Fetch POST: envía los datos como JSON
      const res = await fetch(`${API_BASE}/posts`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, mensaje, title: nombre, body: mensaje }),
      });
 
      if (!res.ok) throw new Error('No se pudo enviar el mensaje');
 
      const data = await res.json();   // JSON.parse automático
 
      // Limpiar borrador del localStorage tras envío exitoso
      localStorage.removeItem('form-draft');
      contactForm.reset();
      showToast(`✅ Mensaje enviado, ${nombre}! (ID: ${data.id})`);
 
    } catch (err) {
      showToast(`❌ ${err.message}`, 'error');
    } finally {
      // finally: restaura el botón SIEMPRE
      btnSubmit.textContent = 'Enviar mensaje →';
      btnSubmit.disabled    = false;
    }
  });
}
 
 
// ============================================================
// SESIÓN 4 – BLOQUE G: Promise.all – carga paralela de APIs
// ============================================================
 
/**
 * Carga datos del dashboard desde múltiples APIs en paralelo.
 * Promise.all espera que TODAS las promesas se resuelvan.
 */
async function loadDashboardData() {
  const statsEl = document.getElementById('dashboard-stats');
  if (!statsEl) return;
 
  statsEl.innerHTML = '<p class="loading-text">Cargando estadísticas...</p>';
 
  try {
    // Promise.all: las 3 peticiones corren al mismo tiempo
    const [posts, users, todos] = await Promise.all([
      fetchJSON(`${API_BASE}/posts?_limit=100`),    // promesa 1
      fetchJSON(`${API_BASE}/users`),               // promesa 2
      fetchJSON(`${API_BASE}/todos`),               // promesa 3
    ]);
 
    // Spread: construye las stats del hero
    const stats = [
      { label: 'Proyectos',    value: localProjects.length, icon: '🔬' },
      { label: 'Tecnologías',  value: `${allTechs.length}`, icon: '⚙️' },
      { label: 'APIs usadas',  value: '3+',                 icon: '🌐' },
      { label: 'Tareas API',   value: todos.filter(t => t.completed).length, icon: '✅' },
    ];
 
    statsEl.innerHTML = stats
      .map(({ label, value, icon }) => `
        <div class="stat-item">
          <span class="stat-icon">${icon}</span>
          <strong class="stat-value">${value}</strong>
          <span class="stat-label">${label}</span>
        </div>`)
      .join('');
 
    console.log('Dashboard cargado:', { posts, users, todos });
 
  } catch (err) {
    statsEl.innerHTML = `<p class="error-text">No se pudieron cargar las estadísticas.</p>`;
    console.warn('Error cargando dashboard:', err.message);
  }
}
 
 
// ============================================================
// UTILIDAD: Toast de notificaciones (DOM + CSS classes)
// ============================================================
 
function showToast(msg, type = 'success') {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.className = `toast toast--${type} toast--show`;
 
  // Remover clase después de 3s con setTimeout (Event Loop)
  setTimeout(() => {
    toastEl.classList.remove('toast--show');
  }, 3000);
}
 
 
// ============================================================
// MÓDULOS ES6: exportar funciones para otros archivos
// ============================================================
export { renderProjects, initContactForm, fetchProjects, fetchCountry };
 
 
// ============================================================
// INICIALIZACIÓN: punto de entrada cuando carga el DOM
// ============================================================
 
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  loadDashboardData();
 
  // Cargar sección Pokémon solo si existe en el HTML
  if (pokeSection) fetchPokemons(0);
 
  // Precargar Bolivia en el buscador de países
  if (countryInput) {
    countryInput.value = 'Bolivia';
    fetchCountry('Bolivia');
  }
 
  // Range de presupuesto
  const rangeInput = document.getElementById('presupuesto');
  const rangeVal   = document.getElementById('presupuesto-val');
  if (rangeInput && rangeVal) {
    rangeInput.addEventListener('input', () => {
      rangeVal.textContent = `$${Number(rangeInput.value).toLocaleString('es-BO')}`;
    });
  }
 
  console.log(`%c${greet(SITE_AUTHOR)}`, 'color: #b5722a; font-weight: bold;');
});
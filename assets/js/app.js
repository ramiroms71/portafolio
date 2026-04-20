const SITE_AUTOR = 'Ramiro Marca';
const API_BASE = 'https://jsonplaceholder.typicode.com';
const POKE_API = 'https://pokeapi.co/api/v2';
const WEATHER_API = 'https://restcountries.com/v3.1';

let currentFilter = 'all';
let pokemonPage = 1;
let projectsData = [];

const greet = (name) => `Hola desde el portafolio de ${name}`;
console.log(greet(SITE_AUTOR));

const formatPrice = (amount) => `$${Number(amount).toLocaleString('en-BO')}`;

const devProfile = {
    name: 'Ramiro Marca',
    role: 'Desarrollador de Software',
    skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js'],
    location: 'La Paz, Bolivia',
};

const { name, role, skills } = devProfile;           // object destructuring
const [mainSkill, ...otherSkills] = skills;          // array destructuring + rest

console.log(`${name} - ${role}`);
console.log(`Habilidades principales: ${mainSkill}`);
console.log(`Otras habilidades: ${otherSkills}`);

const frontEnd = ['React', 'Vue', 'Angular'];
const backEnd = ['Node.js', 'Django', 'Ruby on Rails'];
const allTechnologies = [...frontEnd, ...backEnd];

console.log('Todas las tecnologías:', allTechnologies);

const UpdateProfile = { ...devProfile, available: true };
console.log('Perfil actualizado:', UpdateProfile);

/*
Clases E6 + objetos
*/

class Project {
    #id;
    constructor(id, title, description, techs, emoji, categy){
        This.#id=id;
        this.title=title;
        this.description=description;
        this.techs=techs;
        this.emoji=emoji;
        this.categy=categy;
    }
    get id(){
        return this.#id;
    }
    toHtml() {
    const badges = this.techs
        .map(tech => `<span class="tech-badge">${tech}</span>`)
        .join(' ');

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

const localProjects = [
  new Project({
    id: 1, category: 'frontend', emoji: '📱',
    title: 'App de Tareas',
    description: 'Aplicación web con drag & drop, almacenamiento local y modo oscuro.',
    techs: ['React', 'CSS Modules', 'Flexbox'],
  }),
  new Project({
    id: 2, category: 'frontend', emoji: '🌿',
    title: 'EcoShop',
    description: 'E-commerce sostenible con sistema de filtros y carrito de compras.',
    techs: ['HTML5', 'CSS Grid', 'JavaScript'],
  }),
  new Project({
    id: 3, category: 'fullstack', emoji: '📊',
    title: 'Dashboard Analytics',
    description: 'Panel con gráficas en tiempo real, filtros dinámicos y exportación.',
    techs: ['Node.js', 'PostgreSQL', 'Chart.js'],
  }),
  new Project({
    id: 4, category: 'backend', emoji: '🔧',
    title: 'REST API – Inventario',
    description: 'API REST completa con autenticación JWT y documentación Swagger.',
    techs: ['Express', 'MySQL', 'JWT'],
  }),
  new Project({
    id: 5, category: 'fullstack', emoji: '🌍',
    title: 'GeoWeather App',
    description: 'Consulta clima en tiempo real usando la API de OpenWeather y países.',
    techs: ['React', 'Fetch API', 'OpenWeather'],
  }),
];
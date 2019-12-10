/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCProjects extends HTMLElement {
  constructor () {
    super();
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data; }
  set data (value) {
    this.__data = value;
    this.render();
  }

  get template () { return this.__template; }
  set template (value) {
    this.__template = value;
  }

  async render () {
    const tags = { projects: this.__data };
    if (!this.__template) {
      this.__template = WCProjects.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ projects }) {
    return `
      <section id="projects">
        ${projects.map(project => `
          <div>
            <h3><a href="${project.url}">${project.name}</a> (${project.type})</h3>
            <div>${project.startDate} - ${project.endDate}</div>
            <div>${project.description}</div>
            <div>${project.entity}</div>
            <div>${project.roles.join(', ')}</div>
            <ul>
              ${project.highlights.map(highlight => `
                <li>${highlight}</li>
              `).join('\n')}
            </ul>
          </div>
          <div>${project.keywords.join(', ')}</div>
        `).join('\n')}
    </section>
    <hr>`;
  }
}

customElements.define('wc-projects', WCProjects);

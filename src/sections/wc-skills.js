/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCSkills extends HTMLElement {
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
    const tags = { skills: this.__data };
    if (!this.__template) {
      this.__template = WCSkills.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ skills }) {
    return `
      <section id="skills">
        ${skills.map(skill => `
          <div>
            <span style="font-weight: bold">${skill.name} (${skill.level}): </span>
            <span>${skill.keywords.join(', ')}</span>
          </div>
        `).join('\n')}

      </section>
      <hr>`;
  }
}

customElements.define('wc-skills', WCSkills);

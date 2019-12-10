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
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Level</th>
              <th>Keywords</th>
            </tr>
          </thead>
          <tbody>
            ${skills.map(skill => {
              return `
              <tr>
                <td>${skill.name}</td>
                <td>${skill.level}</td>
                <td>${skill.keywords.join(', ')}</td>
              </tr>`;
            }).join('\n')}
          </tbody>
        </table>
      </section>
      <hr>`;
  }
}

customElements.define('wc-skills', WCSkills);

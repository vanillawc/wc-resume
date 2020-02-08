/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';

export class WCEducation extends HTMLElement {
  constructor () {
    super();
    this.id = 'education';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data; }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template; }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { schools: this.__data };
    if (!this.__template) {
      this.__template = WCEducation.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ schools }) {
    return `
      ${schools.map(school => `
        <div>
          <div style="float:left; font-weight: bold">${school.institution}</div>
          <div style="float:right;">${school.startDate} - ${school.endDate}</div>
          <div style="clear: both">${school.studyType} - ${school.area}
            ${school.gpa ? `(${school.gpa} GPA)` : ''}
          </div>
          ${school.courses ? `
            <ul>
              ${school.courses.map(course => `
                <li>${course}</li>
              `).join('\n')}
            </ul>
          ` : ''}
        </div>
      `).join('\n')}
      <hr>`;
  }
}

customElements.define('wc-education', WCEducation);

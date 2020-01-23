/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';

export class WCVolunteer extends HTMLElement {
  constructor () {
    super();
    this.id = 'volunteer';
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
    const tags = { roles: this.__data };
    if (!this.__template) {
      this.__template = WCVolunteer.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ roles }) {
    return `
      ${roles.map(role => `
        <div>
          <div style="float:left; font-weight: bold">${role.organization}${role.position ? `, ${role.position}` : ''}</div>
          <div style="float:right;">${role.startDate} - ${role.endDate}</div>
          <div style="clear:both"></div>
          ${role.url ? `<div><a href="${role.url}">${role.url}</a></div>` : ''}
          ${role.summary ? `<div>${role.summary}</div>` : ''}
          ${role.highlights ? `
            <ul>
              ${role.highlights.map(highlight => `
                <li>${highlight}</li>
              `).join('\n')}
            </ul>
          ` : ''}
        </div>
      `).join('\n')}
      <hr>`;
  }
}

customElements.define('wc-volunteer', WCVolunteer);

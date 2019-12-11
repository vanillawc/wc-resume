/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCInterests extends HTMLElement {
  constructor () {
    super();
    this.id = 'interests';
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
    const tags = { interests: this.__data };
    if (!this.__template) {
      this.__template = WCInterests.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ interests }) {
    return `
      ${interests.map(interest => `
        <div>
          <span style="font-weight: bold">${interest.name}:</span>
          <span>[ ${interest.keywords.join(', ')} ]</span>
        </div>
      `).join('\n')}
      <hr>`;
  }
}

customElements.define('wc-interests', WCInterests);
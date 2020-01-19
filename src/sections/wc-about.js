/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';

export class WCAbout extends HTMLElement {
  constructor () {
    super();
    this.id = 'about';
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
    const tags = { summary: this.__data.summary };
    if (!this.__template) {
      this.__template = WCAbout.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ summary }) {
    return `
      <div>${summary}</div>
      <hr>`;
  }
}

customElements.define('wc-about', WCAbout);

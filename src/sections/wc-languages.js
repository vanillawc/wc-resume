/* eslint no-undef: 0 */
import Interpolate from '../node_modules/interpolate-es/index.js';

export class WCLanguages extends HTMLElement {
  constructor () {
    super();
    this.id = 'languages';
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
    const tags = { languages: this.__data };
    if (!this.__template) {
      this.__template = WCLanguages.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ languages }) {
    return `
      ${languages.map(language => `
        <div><span style="font-weight: bold">${language.language} (${language.fluency})</div>
      `).join('\n')}
      <hr>`;
  }
}

customElements.define('wc-languages', WCLanguages);

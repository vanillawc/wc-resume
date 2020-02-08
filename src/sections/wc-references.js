/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';

export class WCReferences extends HTMLElement {
  constructor () {
    super();
    this.id = 'references';
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
    const tags = { references: this.__data };
    if (!this.__template) {
      this.__template = WCReferences.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ references }) {
    return `
      ${references.map(reference => `
        <blockquote>
          <p>${reference.reference}</p>
          <footer>— <cite>${reference.name}</cite></footer>
        </blockquote>
      `).join('\n')}
      <hr>`;
  }
}

customElements.define('wc-references', WCReferences);

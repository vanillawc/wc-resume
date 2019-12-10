/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCReferences extends HTMLElement {
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
    const tags = { references: this.__data };
    if (!this.__template) {
      this.__template = WCReferences.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ references }) {
    return `
      <section id="references">
        ${references.map(reference => `
          <blockquote>
            <p>${reference.reference}</p>
            <footer>— <cite>${reference.name}</cite></footer>
          </blockquote>
        `).join('\n')}
      </section>
      <hr>`;
  }
}

customElements.define('wc-references', WCReferences);

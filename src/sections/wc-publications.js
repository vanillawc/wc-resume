/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCPublications extends HTMLElement {
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
    const tags = { publications: this.__data };
    if (!this.__template) {
      this.__template = WCPublications.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ publications }) {
    return `
      <section id="publications">
        ${publications.map(publication => `
          <div style="float:left; font-weight: bold">${publication.name}, ${publication.publisher}</div>
          <div style="float:right;">${publication.releaseDate}</div>
          <div style="clear:both"><a href="${publication.url}">${publication.url}</a></div>
          <div>${publication.summary}</div>
        `)}
      </section>
      <hr>`;
  }
}

customElements.define('wc-publications', WCPublications);

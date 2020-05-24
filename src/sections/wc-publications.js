/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/@vanillaes/interpolate/index.js';

export class WCPublications extends HTMLElement {
  constructor () {
    super();
    this.id = 'publications';
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
    const tags = { publications: this.__data };
    if (!this.__template) {
      this.__template = WCPublications.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ publications }) {
    return `
      ${publications.map(publication => `
        <div>
          <div style="float:left; font-weight: bold">${publication.name}${publication.publisher ? `, ${publication.publisher}` : ''}</div>
          ${publication.releaseDate ? `<div style="float:right;">${publication.releaseDate}</div>` : ''}
          <div style="clear:both"></div>
          ${publication.url ? `<div<a href="${publication.url}">${publication.url}</a></div>` : ''}
          ${publication.summary ? `<div>${publication.summary}</div>` : ''}
        </div>
      `).join('\n')}
      <hr>`;
  }
}

customElements.define('wc-publications', WCPublications);

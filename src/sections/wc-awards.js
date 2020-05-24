/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/@vanillaes/interpolate/index.js';

export class WCAwards extends HTMLElement {
  constructor () {
    super();
    this.id = 'awards';
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
    const tags = { awards: this.__data };
    if (!this.__template) {
      this.__template = WCAwards.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ awards }) {
    return `
      ${awards.map(award => `
        <div>
          <div style="float:left; font-weight: bold">${award.title}
            ${award.awarder ? `, ${award.awarder}` : ''}
          </div>
          ${award.date ? `<div style="float:right;">${award.date}</div>` : ''}
          <div style="clear:both"></div>
          ${award.summary ? `<div>${award.summary}</div>` : ''}
        </div>
      `).join('\n')}
      <hr>`;
  }
}

customElements.define('wc-awards', WCAwards);

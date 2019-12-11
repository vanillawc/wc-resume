/* eslint no-undef: 0 */
import Interpolate from '../util/interpolate.js';

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
    this.render();
  }

  get template () { return this.__template; }
  set template (value) {
    this.__template = value;
  }

  async render () {
    const tags = { awards: this.__data };
    if (!this.__template) {
      this.__template = WCAwards.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ awards }) {
    return `
      ${awards.map(award => `
        <div>
          <div style="float:left; font-weight: bold">${award.title}, ${award.awarder}</div>
          <div style="float:right;">${award.date}</div>
          <div style="clear:both">${award.summary}</div>
        </div>
      `)}
      <hr>`;
  }
}

customElements.define('wc-awards', WCAwards);

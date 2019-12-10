/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCAwards extends HTMLElement {
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
    const tags = { awards: this.__data };
    if (!this.__template) {
      this.__template = WCAwards.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ awards }) {
    return `
      <section id="awards">
        ${awards.map(award => `
          <div style="float:left; font-weight: bold">${award.title}, ${award.awarder}</div>
          <div style="float:right;">${award.date}</div>
          <div style="clear:both">${award.summary}</div>
        `)}
      </section>
      <hr>`;
  }
}

customElements.define('wc-awards', WCAwards);

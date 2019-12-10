/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCContact extends HTMLElement {
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
    const tags = {
      name: this.__data.name,
      email: this.__data.email,
      phone: this.__data.phone,
      website: this.__data.url
    };
    if (!this.__template) {
      this.__template = WCContact.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ name, email, phone, website }) {
    return `
      <section id="contact">
        <h1>${name}</h1>
        <div class="email"><a href="mailto:${email}">${email}</a></div>
        <div class="phone">${phone}</div>
        <div class="website"><a href="${website}">${website}</a></div>
      </section>
      <hr>`;
  }
}

customElements.define('wc-contact', WCContact);

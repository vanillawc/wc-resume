/* eslint no-undef: 0 */
import Interpolate from '../util/interpolate.js';

export class WCContact extends HTMLElement {
  constructor () {
    super();
    this.id = 'contact';
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
      label: this.__data.label,
      image: this.__data.image,
      email: this.__data.email,
      phone: this.__data.phone,
      url: this.__data.url,
      location: this.__data.location
    };
    if (!this.__template) {
      this.__template = WCContact.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ name, label, image, email, phone, url, location }) {
    return `
      <h1>${name}, ${label}</h1>
      <div><a href="mailto:${email}">${email}</a></div>
      <div>${phone}</div>
      <div>${location.city}, ${location.region}, ${location.countryCode}</div>
      <div><a href="${url}">${url}</a></div>
      <hr>`;
  }
}

customElements.define('wc-contact', WCContact);

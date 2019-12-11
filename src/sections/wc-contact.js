/* eslint no-undef: 0 */
import Interpolate from '../util/interpolate';

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
      email: this.__data.email,
      phone: this.__data.phone,
      website: this.__data.url,
      location: this.__data.location
    };
    if (!this.__template) {
      this.__template = WCContact.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ name, label, email, phone, website, location }) {
    return `
      <h1>${name}, ${label}</h1>
      <div class="email"><a href="mailto:${email}">${email}</a></div>
      <div class="phone">${phone}</div>
      <div class="location">${location.city}, ${location.region}, ${location.countryCode}</div>
      <div class="website"><a href="${website}">${website}</a></div>
      <hr>`;
  }
}

customElements.define('wc-contact', WCContact);

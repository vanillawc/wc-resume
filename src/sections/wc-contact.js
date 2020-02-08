/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';

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

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ name, label, image, email, phone, url, location }) {
    return `
      <h1>${name}${label ? `, ${label}` : ''}</h1>
      ${email ? `<div><a href="mailto:${email}">${email}</a></div>` : ''}
      ${phone ? `<div>${phone}</div>` : ''}
      ${location ? `
        <div> 
        <div>${location.address}</div>
        <div>${location.city}, ${location.postalCode}</div>
        ${location.region ? `<div>${location.region}</div>` : ''}
        ${location.countryCode ? `<div>${location.countryCode}</div>` : ''}
      ` : ''}
      ${url ? `<div><a href="${url}">${url}</a></div>` : ''}
      <hr>`;
  }
}

customElements.define('wc-contact', WCContact);

/* eslint no-undef: 0 */
import './sections/wc-contact.js';
import './sections/wc-about.js';
import './sections/wc-profiles.js';
const defaultTemplate = document.createElement('template');
defaultTemplate.innerHTML = `
<wc-contact></wc-contact>
<wc-about></wc-about>
<wc-profiles></wc-profiles>
<wc-skills></wc-skills>
<wc-work></wc-work>
<wc-projects></wc-projects>
<wc-education></wc-education>
<wc-publications></wc-publications>
<wc-awards></wc-awards>
<wc-volunteer></wc-volunteer>
<wc-languages></wc-languages>
<wc-interests></wc-interests>
<wc-references></wc-references>
<wc-meta></wc-meta>
`;

export class WCResume extends HTMLElement {
  constructor () {
    super();
    this.__data = null;
  }

  connectedCallback () {
    if (this.innerHTML === '') {
      this.appendChild(defaultTemplate.content.cloneNode(true));
    }
  }

  static get observedAttributes () {
    return ['src', 'data'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  get src () { return this.getAttribute('src'); }
  set src (value) {
    this.setAttribute('src', value);
    this.setSrc();
  }

  get data () { return this.__data; }
  set data (value) {
    this.__data = value;
    this.render();
  }

  async setSrc () {
    const response = await fetch(this.src);
    const contents = await response.json();
    this.__data = contents;
    this.render();
  }

  render () {
    const data = this.__data;
    this.querySelector('wc-contact').data = data.basics;
    this.querySelector('wc-about').data = data.basics;
    this.querySelector('wc-profiles').data = data.basics;
  }
}

customElements.define('wc-resume', WCResume);

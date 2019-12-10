/* eslint no-undef: 0 */
import './sections/wc-contact.js';
import './sections/wc-about.js';
import './sections/wc-profiles.js';
import './sections/wc-skills.js';
import './sections/wc-work.js';
import './sections/wc-projects.js';
import './sections/wc-education.js';
import './sections/wc-publications.js';
import './sections/wc-awards.js';
import './sections/wc-volunteer.js';
import './sections/wc-languages.js';
import './sections/wc-interests.js';
import './sections/wc-references.js';

export class WCResume extends HTMLElement {
  constructor () {
    super();
    this.__data = null;
  }

  connectedCallback () {
    if (this.innerHTML === '') {
      const template = document.createElement('template');
      template.innerHTML = WCResume.default();
      this.appendChild(template.content.cloneNode(true));
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
    this.querySelector('wc-skills').data = data.skills;
    this.querySelector('wc-work').data = data.work;
    this.querySelector('wc-projects').data = data.projects;
    this.querySelector('wc-education').data = data.education;
    this.querySelector('wc-publications').data = data.publications;
    this.querySelector('wc-awards').data = data.awards;
    this.querySelector('wc-volunteer').data = data.volunteer;
    this.querySelector('wc-languages').data = data.languages;
    this.querySelector('wc-interests').data = data.interests;
    this.querySelector('wc-references').data = data.references;
  }

  static default () {
    return `
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
      <wc-references></wc-references>`;
  }
}

customElements.define('wc-resume', WCResume);

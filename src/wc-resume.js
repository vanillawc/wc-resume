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

export default class WCResume extends HTMLElement {
  static get observedAttributes () {
    return ['src', 'data'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return; }
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  get src () { return this.getAttribute('src'); }
  set src (value) {
    this.setAttribute('src', value);
    this.setSrc();
    this.render();
  }

  get data () { return this.__data; }
  set data (value) {
    this.__data = value;
    this.render();
  }

  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.__data = null;
    this.__style = null;
    this.__contact = null;
    this.__about = null;
    this.__profiles = null;
    this.__skills = null;
    this.__work = null;
    this.__projects = null;
    this.__education = null;
    this.__publications = null;
    this.__awards = null;
    this.__volunteer = null;
    this.__languages = null;
    this.__interests = null;
    this.__references = null;
    this.__initialized = false;
  }

  async connectedCallback () {
    const template = document.createElement('template');
    template.innerHTML = (this.innerHTML === '')
      ? WCResume.default()
      : this.innerHTML;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (this.querySelector('style') === null) {
      const styleElement = document.createElement('style');
      this.shadowRoot.insertBefore(styleElement, this.firstChild);
    }

    await this.setSrc();

    this.init();

    if (this.hasAttribute('theme')) {
      await this.setTheme();
    }

    this.render();
  }

  init () {
    this.__style = this.shadowRoot.querySelector('style');
    this.__contact = this.shadowRoot.querySelector('wc-contact');
    this.__about = this.shadowRoot.querySelector('wc-about');
    this.__profiles = this.shadowRoot.querySelector('wc-profiles');
    this.__skills = this.shadowRoot.querySelector('wc-skills');
    this.__work = this.shadowRoot.querySelector('wc-work');
    this.__projects = this.shadowRoot.querySelector('wc-projects');
    this.__education = this.shadowRoot.querySelector('wc-education');
    this.__publications = this.shadowRoot.querySelector('wc-publications');
    this.__awards = this.shadowRoot.querySelector('wc-awards');
    this.__volunteer = this.shadowRoot.querySelector('wc-volunteer');
    this.__languages = this.shadowRoot.querySelector('wc-languages');
    this.__interests = this.shadowRoot.querySelector('wc-interests');
    this.__references = this.shadowRoot.querySelector('wc-references');
    this.__initialized = true;
  }

  async setTheme () {
    let path = this.getAttribute('theme');
    if (!(/\/$/.test(path))) { path = path + '/'; }

    this.__style.innerHTML = await this.fetchTheme(path, 'style.css');
    if (this.__contact) { this.__contact.template = await this.fetchTheme(path, 'contact.html'); }
    if (this.__about) { this.__about.template = await this.fetchTheme(path, 'about.html'); }
    if (this.__profiles) { this.__profiles.template = await this.fetchTheme(path, 'profiles.html'); }
    if (this.__skills) { this.__skills.template = await this.fetchTheme(path, 'skills.html'); }
    if (this.__work) { this.__work.template = await this.fetchTheme(path, 'work.html'); }
    if (this.__projects) { this.__projects.template = await this.fetchTheme(path, 'projects.html'); }
    if (this.__education) { this.__education.template = await this.fetchTheme(path, 'education.html'); }
    if (this.__publications) { this.__publications.template = await this.fetchTheme(path, 'publications.html'); }
    if (this.__awards) { this.__awards.template = await this.fetchTheme(path, 'awards.html'); }
    if (this.__volunteer) { this.__volunteer.template = await this.fetchTheme(path, 'volunteer.html'); }
    if (this.__languages) { this.__languages.template = await this.fetchTheme(path, 'languages.html'); }
    if (this.__interests) { this.__interests.template = await this.fetchTheme(path, 'interests.html'); }
    if (this.__references) { this.__references.template = await this.fetchTheme(path, 'references.html'); }
  }

  async fetchTheme (path, partial) {
    const response = await fetch(path + partial);
    if (response.status !== 200) return '';
    return response.text();
  }

  async setSrc () {
    const contents = await this.fetchSrc();
    this.__data = contents;
  }

  async fetchSrc () {
    const response = await fetch(this.src);
    if (response.status !== 200) throw Error(`ERR ${response.status}: ${response.statusText}`);
    return response.json();
  }

  render () {
    if (this.__contact) { this.__contact.data = this.__data.basics; }
    if (this.__about) { this.__about.data = this.__data.basics; }
    if (this.__profiles) { this.__profiles.data = this.__data.basics; }
    if (this.__skills) { this.__skills.data = this.__data.skills; }
    if (this.__work) { this.__work.data = this.__data.work; }
    if (this.__projects) { this.__projects.data = this.__data.projects; }
    if (this.__education) { this.__education.data = this.__data.education; }
    if (this.__publications) { this.__publications.data = this.__data.publications; }
    if (this.__awards) { this.__awards.data = this.__data.awards; }
    if (this.__volunteer) { this.__volunteer.data = this.__data.volunteer; }
    if (this.__languages) { this.__languages.data = this.__data.languages; }
    if (this.__interests) { this.__interests.data = this.__data.interests; }
    if (this.__references) { this.__references.data = this.__data.references; }
  }

  static default () {
    return `
      <style></style>
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

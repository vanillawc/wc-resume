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
  constructor () {
    super();
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
  }

  async connectedCallback () {
    if (this.innerHTML === '') {
      const template = document.createElement('template');
      template.innerHTML = WCResume.default();
      this.appendChild(template.content.cloneNode(true));
    }

    if (this.querySelector('style') === null) {
      const styleElement = document.createElement('style');
      this.insertBefore(styleElement, this.firstChild);
    }

    this.init();

    if (this.hasAttribute('template')) {
      await this.setTemplate();
    }

    this.render();
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

  init () {
    this.__style = this.querySelector('style');
    this.__contact = this.querySelector('wc-contact');
    this.__about = this.querySelector('wc-about');
    this.__profiles = this.querySelector('wc-profiles');
    this.__skills = this.querySelector('wc-skills');
    this.__work = this.querySelector('wc-work');
    this.__projects = this.querySelector('wc-projects');
    this.__education = this.querySelector('wc-education');
    this.__publications = this.querySelector('wc-publications');
    this.__awards = this.querySelector('wc-awards');
    this.__volunteer = this.querySelector('wc-volunteer');
    this.__languages = this.querySelector('wc-languages');
    this.__interests = this.querySelector('wc-interests');
    this.__references = this.querySelector('wc-references');
  }

  async setTemplate () {
    const path = this.getAttribute('template');
    this.__style.innerHTML = await this.getTemplate(path, 'style.css');
    if (this.__contact) { this.__contact.template = await this.getTemplate(path, 'contact.html'); }
    if (this.__about) { this.__about.template = await this.getTemplate(path, 'about.html'); }
    if (this.__profiles) { this.__profiles.template = await this.getTemplate(path, 'profiles.html'); }
    if (this.__skills) { this.__skills.template = await this.getTemplate(path, 'skills.html'); }
    if (this.__work) { this.__work.template = await this.getTemplate(path, 'work.html'); }
    if (this.__projects) { this.__projects.template = await this.getTemplate(path, 'projects.html'); }
    if (this.__education) { this.__education.template = await this.getTemplate(path, 'education.html'); }
    if (this.__publications) { this.__publications.template = await this.getTemplate(path, 'publications.html'); }
    if (this.__awards) { this.__awards.template = await this.getTemplate(path, 'awards.html'); }
    if (this.__volunteer) { this.__volunteer.template = await this.getTemplate(path, 'volunteer.html'); }
    if (this.__languages) { this.__languages.template = await this.getTemplate(path, 'languages.html'); }
    if (this.__interests) { this.__interests.template = await this.getTemplate(path, 'interests.html'); }
  }

  async getTemplate (path, partial) {
    const response = await fetch(`${path}/${partial}`);
    return await response.text();
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

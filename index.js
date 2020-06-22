/* eslint-disable no-new-func */
/**
 * Interpolate a tagged template literal from the inputs
 *
 * @param {*} template the template literal string
 * @param {*} [tags] the tagged values in the template
 * @returns the template output with the tagged literals applied
 */
function interpolate (template, tags = {}) {
  const keys = Object.keys(tags);
  const values = Object.values(tags);
  try {
    return new Function(...keys, `return \`${template}\`;`)(...values);
  } catch (e) {
    throw new TemplateException(template, tags, e);
  }
}

/**
 * @private
 */
class TemplateException extends Error {
  constructor (template, tags, message) {
    super();
    this.name = 'TemplateError';
    let msg = '\n------------------\n';
    msg += `Template: \`${template}\``;
    msg += '\n------------------\n';
    msg += `Tags: ${JSON.stringify(tags, null, 2)}`;
    msg += '\n------------------\n';
    msg += message;
    this.message = msg;
  }
}

/* eslint no-undef: 0 */

class WCContact extends HTMLElement {
  constructor () {
    super();
    this.id = 'contact';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
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
    this.innerHTML = interpolate(this.__template, tags);
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
      <hr>`
  }
}

customElements.define('wc-contact', WCContact);

/* eslint no-undef: 0 */

class WCAbout extends HTMLElement {
  constructor () {
    super();
    this.id = 'about';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { summary: this.__data.summary };
    if (!this.__template) {
      this.__template = WCAbout.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ summary }) {
    return `
      ${summary ? `<div>${summary}</div>` : ''}
      <hr>`
  }
}

customElements.define('wc-about', WCAbout);

/* eslint no-undef: 0 */

class WCProfiles extends HTMLElement {
  constructor () {
    super();
    this.id = 'profiles';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { profiles: this.__data.profiles };
    if (!this.__template) {
      this.__template = WCProfiles.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ profiles }) {
    return `
      ${profiles.map(profile => `
        <div>
          <span>${profile.network}:</span>
          ${profile.url ? `<span><a href="${profile.url}">${profile.username}</a></span>` : ''}
          ${!profile.url ? `<span>${profile.username}</span>` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-profiles', WCProfiles);

/* eslint no-undef: 0 */

class WCSkills extends HTMLElement {
  constructor () {
    super();
    this.id = 'skills';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { skills: this.__data };
    if (!this.__template) {
      this.__template = WCSkills.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ skills }) {
    return `
      ${skills.map(skill => `
        <div>
          <span style="font-weight: bold">${skill.name}${skill.level ? ` (${skill.level})` : ''}: </span>
          ${skill.keywords ? `
            <span>${skill.keywords.join(', ')}</span>
          ` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-skills', WCSkills);

/* eslint no-undef: 0 */

class WCWork extends HTMLElement {
  constructor () {
    super();
    this.id = 'work';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { jobs: this.__data };
    if (!this.__template) {
      this.__template = WCWork.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ jobs }) {
    return `
      ${jobs.map(job => `
        <div>
          <div style="float:left; font-weight: bold">${job.name}${job.position ? `, ${job.position}` : ''}</div>
          <div style="float:right;">
            ${job.startDate}${job.endDate ? ` - ${job.endDate}` : ''}
          </div>
          <div style="clear:both;"></div>
          ${job.url ? `<div><a href="${job.url}">${job.url}</a></div>` : ''}
          ${job.url ? `<div>${job.location}</div>` : ''}
          ${job.description ? `<div>${job.description}</div>` : ''}
          ${job.summary ? `<div>${job.summary}</div>` : ''}
          ${job.highlights ? `
            <ul>
              ${job.highlights.map(highlight => `
                <li>${highlight}</li>
              `).join('\n')}
            </ul>`
          : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-work', WCWork);

/* eslint no-undef: 0 */

class WCProjects extends HTMLElement {
  constructor () {
    super();
    this.id = 'projects';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { projects: this.__data };
    if (!this.__template) {
      this.__template = WCProjects.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ projects }) {
    return `
      ${projects.map(project => `
        <div>
          <div style="float:left; font-weight: bold">${project.name}
            ${project.type ? `(${project.type})` : ''}
          </div>
          ${project.startDate && project.endDate ? `
            <div style="float:right;">${project.startDate} - ${project.endDate}</div>
          ` : ''}
          <div style="clear:both"></div>
          ${project.url ? `<div><a href="${project.url}">${project.url}</a></div>` : ''}
          ${project.description ? `<div>${project.description}</div>` : ''}
          ${project.entity ? `<div>${project.entity}</div>` : ''}
          ${project.roles ? `
            <div>${project.roles.join(', ')}</div>
          ` : ''}
          ${project.highlights ? `
            <ul>
              ${project.highlights.map(highlight => `
                <li>${highlight}</li>
              `).join('\n')}
            </ul>
          ` : ''}
          ${projects.keywords ? `
            <div>${project.keywords.join(', ')}</div>
          ` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-projects', WCProjects);

/* eslint no-undef: 0 */

class WCEducation extends HTMLElement {
  constructor () {
    super();
    this.id = 'education';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { schools: this.__data };
    if (!this.__template) {
      this.__template = WCEducation.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ schools }) {
    return `
      ${schools.map(school => `
        <div>
          <div style="float:left; font-weight: bold">${school.institution}</div>
          <div style="float:right;">${school.startDate} - ${school.endDate}</div>
          <div style="clear: both">${school.studyType} - ${school.area}
            ${school.gpa ? `(${school.gpa} GPA)` : ''}
          </div>
          ${school.courses ? `
            <ul>
              ${school.courses.map(course => `
                <li>${course}</li>
              `).join('\n')}
            </ul>
          ` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-education', WCEducation);

/* eslint no-undef: 0 */

class WCPublications extends HTMLElement {
  constructor () {
    super();
    this.id = 'publications';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { publications: this.__data };
    if (!this.__template) {
      this.__template = WCPublications.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ publications }) {
    return `
      ${publications.map(publication => `
        <div>
          <div style="float:left; font-weight: bold">${publication.name}${publication.publisher ? `, ${publication.publisher}` : ''}</div>
          ${publication.releaseDate ? `<div style="float:right;">${publication.releaseDate}</div>` : ''}
          <div style="clear:both"></div>
          ${publication.url ? `<div<a href="${publication.url}">${publication.url}</a></div>` : ''}
          ${publication.summary ? `<div>${publication.summary}</div>` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-publications', WCPublications);

/* eslint no-undef: 0 */

class WCAwards extends HTMLElement {
  constructor () {
    super();
    this.id = 'awards';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { awards: this.__data };
    if (!this.__template) {
      this.__template = WCAwards.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ awards }) {
    return `
      ${awards.map(award => `
        <div>
          <div style="float:left; font-weight: bold">${award.title}
            ${award.awarder ? `, ${award.awarder}` : ''}
          </div>
          ${award.date ? `<div style="float:right;">${award.date}</div>` : ''}
          <div style="clear:both"></div>
          ${award.summary ? `<div>${award.summary}</div>` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-awards', WCAwards);

/* eslint no-undef: 0 */

class WCVolunteer extends HTMLElement {
  constructor () {
    super();
    this.id = 'volunteer';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { roles: this.__data };
    if (!this.__template) {
      this.__template = WCVolunteer.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ roles }) {
    return `
      ${roles.map(role => `
        <div>
          <div style="float:left; font-weight: bold">${role.organization}${role.position ? `, ${role.position}` : ''}</div>
          <div style="float:right;">${role.startDate} - ${role.endDate}</div>
          <div style="clear:both"></div>
          ${role.url ? `<div><a href="${role.url}">${role.url}</a></div>` : ''}
          ${role.summary ? `<div>${role.summary}</div>` : ''}
          ${role.highlights ? `
            <ul>
              ${role.highlights.map(highlight => `
                <li>${highlight}</li>
              `).join('\n')}
            </ul>
          ` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-volunteer', WCVolunteer);

/* eslint no-undef: 0 */

class WCLanguages extends HTMLElement {
  constructor () {
    super();
    this.id = 'languages';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { languages: this.__data };
    if (!this.__template) {
      this.__template = WCLanguages.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ languages }) {
    return `
      ${languages.map(language => `
        <div><span style="font-weight: bold">${language.language}
          ${language.fluency ? `(${language.fluency})` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-languages', WCLanguages);

/* eslint no-undef: 0 */

class WCInterests extends HTMLElement {
  constructor () {
    super();
    this.id = 'interests';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { interests: this.__data };
    if (!this.__template) {
      this.__template = WCInterests.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ interests }) {
    return `
      ${interests.map(interest => `
        <div>
          <span style="font-weight: bold">${interest.name}:</span>
          ${interest.keywords ? `
            <span>[ ${interest.keywords.join(', ')} ]</span>
          ` : ''}
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-interests', WCInterests);

/* eslint no-undef: 0 */

class WCReferences extends HTMLElement {
  constructor () {
    super();
    this.id = 'references';
    this.__data = null;
    this.__template = null;
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value;
    if (value) {
      this.render();
    } else {
      this.renderNull();
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value;
  }

  async render () {
    this.style.display = '';
    const tags = { references: this.__data };
    if (!this.__template) {
      this.__template = WCReferences.default(tags);
    }
    this.innerHTML = interpolate(this.__template, tags);
  }

  renderNull () {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  static default ({ references }) {
    return `
      ${references.map(reference => `
        <blockquote>
          <p>${reference.reference}</p>
          <footer>— <cite>${reference.name}</cite></footer>
        </blockquote>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-references', WCReferences);

/* eslint no-undef: 0 */

class WCResume extends HTMLElement {
  static get observedAttributes () {
    return ['src', 'data']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return }
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  get src () { return this.getAttribute('src') }
  set src (value) {
    this.setAttribute('src', value);
    this.setSrc();
    this.render();
  }

  get data () { return this.__data }
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
    if (response.status !== 200) return ''
    return response.text()
  }

  async setSrc () {
    const contents = await this.fetchSrc();
    this.__data = contents;
  }

  async fetchSrc () {
    const response = await fetch(this.src);
    if (response.status !== 200) throw Error(`ERR ${response.status}: ${response.statusText}`)
    return response.json()
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
      <wc-references></wc-references>`
  }
}

customElements.define('wc-resume', WCResume);

export default WCResume;

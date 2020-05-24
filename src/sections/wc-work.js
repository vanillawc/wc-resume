/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/@vanillaes/interpolate/index.js';

export class WCWork extends HTMLElement {
  constructor () {
    super();
    this.id = 'work';
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
    const tags = { jobs: this.__data };
    if (!this.__template) {
      this.__template = WCWork.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
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
      <hr>`;
  }
}

customElements.define('wc-work', WCWork);

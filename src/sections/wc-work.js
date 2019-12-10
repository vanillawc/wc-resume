/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCWork extends HTMLElement {
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
    const tags = { jobs: this.__data };
    if (!this.__template) {
      this.__template = WCWork.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ jobs }) {
    return `
      <section id="work">
      <div>
        ${jobs.map(job => `
          <div>
            <div style="float:left; font-weight: bold">${job.name}, ${job.position}</div>
            <div style="float:right;">${job.startDate} - ${job.endDate}</div>
            <div style="clear:both"><a href="${job.url}">${job.url}</a></div>
            <div>${job.location}</div>
            <div>${job.description}</div>      
            <div>${job.summary}</div>
            <ul>
              ${job.highlights.map(highlight => `
                <li>${highlight}</li>
              `).join('\n')}
            </ul>
          </div>
        `).join('\n')}
      </div>
    </section>
    <hr>`;
  }
}

customElements.define('wc-work', WCWork);

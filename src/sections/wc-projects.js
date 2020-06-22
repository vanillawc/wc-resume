/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/@vanillaes/interpolate/index.js'

export class WCProjects extends HTMLElement {
  constructor () {
    super()
    this.id = 'projects'
    this.__data = null
    this.__template = null
  }

  get data () { return this.__data }
  set data (value) {
    this.__data = value
    if (value) {
      this.render()
    } else {
      this.renderNull()
    }
  }

  get template () { return this.__template }
  set template (value) {
    this.__template = value
  }

  async render () {
    this.style.display = ''
    const tags = { projects: this.__data }
    if (!this.__template) {
      this.__template = WCProjects.default(tags)
    }
    this.innerHTML = Interpolate(this.__template, tags)
  }

  renderNull () {
    this.style.display = 'none'
    this.innerHTML = ''
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

customElements.define('wc-projects', WCProjects)

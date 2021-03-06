/* eslint no-undef: 0 */
import { interpolate } from '../../node_modules/@vanillaes/interpolate/index.js'

export class WCSkills extends HTMLElement {
  constructor () {
    super()
    this.id = 'skills'
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
    const tags = { skills: this.__data }
    if (!this.__template) {
      this.__template = WCSkills.default(tags)
    }
    this.innerHTML = interpolate(this.__template, tags)
  }

  renderNull () {
    this.style.display = 'none'
    this.innerHTML = ''
  }

  static default ({ skills }) {
    return `
      ${skills.map(skill => `
        <div>
          <span style="font-weight: bold">${skill.name}${skill.level ? ` (${skill.level})` : ''}: </span>
          ${skill.keywords
            ? `<span>${skill.keywords.join(', ')}</span>`
            : ''
          }
        </div>
      `).join('\n')}
      <hr>`
  }
}

customElements.define('wc-skills', WCSkills)

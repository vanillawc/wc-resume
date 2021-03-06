/* eslint no-undef: 0 */
import { interpolate } from '../../node_modules/@vanillaes/interpolate/index.js'

export class WCLanguages extends HTMLElement {
  constructor () {
    super()
    this.id = 'languages'
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
    const tags = { languages: this.__data }
    if (!this.__template) {
      this.__template = WCLanguages.default(tags)
    }
    this.innerHTML = interpolate(this.__template, tags)
  }

  renderNull () {
    this.style.display = 'none'
    this.innerHTML = ''
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

customElements.define('wc-languages', WCLanguages)

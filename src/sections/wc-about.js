/* eslint no-undef: 0 */
import { interpolate } from '../../node_modules/@vanillaes/interpolate/index.js'

export class WCAbout extends HTMLElement {
  constructor () {
    super()
    this.id = 'about'
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
    const tags = { summary: this.__data.summary }
    if (!this.__template) {
      this.__template = WCAbout.default(tags)
    }
    this.innerHTML = interpolate(this.__template, tags)
  }

  renderNull () {
    this.style.display = 'none'
    this.innerHTML = ''
  }

  static default ({ summary }) {
    return `
      ${summary ? `<div>${summary}</div>` : ''}
      <hr>`
  }
}

customElements.define('wc-about', WCAbout)

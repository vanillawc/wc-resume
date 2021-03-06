/* eslint no-undef: 0 */
import { interpolate } from '../../node_modules/@vanillaes/interpolate/index.js'

export class WCProfiles extends HTMLElement {
  constructor () {
    super()
    this.id = 'profiles'
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
    const tags = { profiles: this.__data.profiles }
    if (!this.__template) {
      this.__template = WCProfiles.default(tags)
    }
    this.innerHTML = interpolate(this.__template, tags)
  }

  renderNull () {
    this.style.display = 'none'
    this.innerHTML = ''
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

customElements.define('wc-profiles', WCProfiles)

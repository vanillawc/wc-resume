/* eslint no-undef: 0 */
import Interpolate from '../../node_modules/interpolate-es/index.js';
export class WCProfiles extends HTMLElement {
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
    const tags = { profiles: this.__data.profiles };
    if (!this.__template) {
      this.__template = WCProfiles.default(tags);
    }
    this.innerHTML = Interpolate(this.__template, tags);
  }

  static default ({ profiles }) {
    return `
      <section id="social">
        ${profiles.map(profile => {
          return `<div>${profile.network}: <a href="${profile.url}">${profile.username}</a></div>`;
        }).join('\n')}
      </section>
      <hr>`;
  }
}

customElements.define('wc-profiles', WCProfiles);

/* eslint no-undef: 0 */
const defaultTemplate = document.createElement('template');
defaultTemplate.innerHTML = `
<contact></contact>
<about></about>
<profiles></profiles>
<skills></skills>
<work></work>
<projects></projects>
<education></education>
<publications></publications>
<awards></awards>
<volunteer></volunteer>
<languages></languages>
<interests></interests>
<references></references>
<meta></meta>
`;

export class WCResume extends HTMLElement {
  constructor () {
    super();
    this.__data = null;
  }

  connectedCallback () {
    if (this.innerHTML === '') {
      this.appendChild(defaultTemplate.content.cloneNode(true));
    };
  }

  static get observedAttributes () {
    return ['src', 'value'];
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

  get value () { return this.__value; }
  set value (value) {
    this.__value = value;
    this.render();
  }

  async setSrc () {
    const response = await fetch(this.src);
    const contents = await response.json();
    this.__value = contents;
    this.render();
  }

  render () {
    console.log(this.__value);
  }
}

customElements.define('wc-resume', WCResume);

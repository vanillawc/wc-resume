/* eslint no-undef: 0 */
const template = document.createElement('template');
template.innerHTML = `
<basics></basics>
<work></work>
<volunteer></volunteer>
<education></education>
<awards></awards>
<publications></publications>
<skills></skills>
<languages</languages>
<interests></interests>
<references></references>
<projects></projects>
<meta></meta>
`;

export class WCResume extends HTMLElement {
  constructor () {
    super();
    this.appendChild(template.content.cloneNode(true));
    this.__data = null;
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

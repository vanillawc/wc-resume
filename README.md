[![GitHub Releases](https://img.shields.io/github/release/vanillawc/wc-readme.svg)](https://github.com/vanillawc/wc-readme/releases)
[![NPM Release](https://badgen.net/npm/v/@vanillawc/wc-readme)](https://www.npmjs.com/package/@vanillawc/wc-readme)
[![Downloads](https://badgen.net/npm/dt/@vanillawc/wc-readme)](https://www.npmjs.com/package/@vanillawc/wc-readme)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/vanillawc/wc-readme/master/LICENSE)
[![Published on WebComponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@vanillawc/wc-readme)
[![Latest Status](https://github.com/vanillawc/wc-readme/workflows/Latest/badge.svg)](https://github.com/vanillawc/wc-readme/actions)
[![Release Status](https://github.com/vanillawc/wc-readme/workflows/Release/badge.svg)](https://github.com/vanillawc/wc-readme/actions)

A Vanilla Web Component to Resume.json content in a styled template

## Installation

```sh
npm i @vanillawc/wc-readme
```

Then import the `index.js` file at the root of the package.

-----

## Usage

### Load the `resume.json` file from an external source

```html
<wc-readme src="assets/sample.md"></wc-readme>
```

***Demo: [WC-Readme - Demo][]***

### Customizing the Content Order

Customize the sections and their order by adding them inline.

```html
<wc-readme src="assets/sample.md">
  <wc-contact>
  <wc-summary>
  <wc-work>
  <wc-skills>
</wc-readme>
```

### Style the Resume with an External Template

A template is defined as a collection of partials. To include a template, define a link to the template's directory.

```html
<wc-resume src="sample.json" template="../templates/test/"></wc-resume>
```

Templates can be found in the `templates/` directory.

## Building Custom Templates

Templates are defined as a collection of partials written in [tagged template literal][] syntax

A complete template is defined as a directory of the following files

template
├── about.html
├── awards.html
├── contact.html
├── education.html
├── interests.html
├── languages.html
├── profiles.html
├── projects.html
├── publications.html
├── references.html
├── skills.html
├── style.css
├── volunteer.html
└── work.html

`styles.css` is where global CSS styling for the template is defined

Sections can be conveniently selected using `element` CSS selectors

```css
wc-work .content {
  /* css definitions */
}
```

[tagged template literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[WC-Readme - Demo]: https://vanillawc.github.io/wc-readme/demos/index.html

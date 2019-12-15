[![GitHub Releases](https://img.shields.io/github/release/vanillawc/wc-resume.svg)](https://github.com/vanillawc/wc-resume/releases)
[![NPM Release](https://badgen.net/npm/v/@vanillawc/wc-resume)](https://www.npmjs.com/package/@vanillawc/wc-resume)
[![Downloads](https://badgen.net/npm/dt/@vanillawc/wc-resume)](https://www.npmjs.com/package/@vanillawc/wc-resume)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/vanillawc/wc-resume/master/LICENSE)
[![Published on WebComponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vanillawc/wc-resume)
[![Latest Status](https://github.com/vanillawc/wc-resume/workflows/Latest/badge.svg)](https://github.com/vanillawc/wc-resume/actions)
[![Release Status](https://github.com/vanillawc/wc-resume/workflows/Release/badge.svg)](https://github.com/vanillawc/wc-resume/actions)

A Vanilla Web Component to Resume.json content in a styled theme

## Installation

```sh
npm i @vanillawc/wc-resume
```

Then import the `index.js` file at the root of the package.

-----

## Usage

### Load `resume.json`

```html
<wc-resume src="assets/sample.md"></wc-resume>
```

***Demo: [WC-Resume - Demo][]***

### Customizing Content

Customize the sections and their order by adding them inline.

```html
<wc-resume src="assets/sample.md">
  <wc-contact>
  <wc-summary>
  <wc-work>
  <wc-skills>
</wc-resume>
```

### Use a Theme

Resume themes are made up of a collection of partials and a `styles.css` file. To select a theme point to its directory using the `theme` attribute.

```html
<wc-resume src="sample.json" theme="../themes/test/"></wc-resume>
```

Themes can be found in the `themes/` directory.

## Building Custom Theme

Themes are defined as a collection of partials written in [tagged template literal][] syntax

A complete theme is defined as a directory of the following files

```sh
theme
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
```

`styles.css` is where the theme's CSS styling is defined

[tagged template literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[WC-Resume - Demo]: https://vanillawc.github.io/wc-resume/demo/index.html

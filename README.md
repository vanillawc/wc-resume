<h1 align="center">&lt;wc-resume&gt;: Embed a JSONResume</h1>

<div align="center">
  <a href="https://github.com/vanillawc/wc-resume/releases"><img src="https://badgen.net/github/tag/vanillawc/wc-resume" alt="GitHub Releases"></a>
  <a href="https://www.npmjs.com/package/@vanillawc/wc-resume"><img src="https://badgen.net/npm/v/@vanillawc/wc-resume" alt="NPM Releases"></a>
  <a href="https://bundlephobia.com/result?p=@vanillawc/wc-resume"><img src="https://badgen.net/bundlephobia/minzip/@vanillawc/wc-resume" alt="Bundlephobia"></a>
  <a href="https://raw.githubusercontent.com/vanillawc/wc-resume/master/LICENSE"><img src="https://badgen.net/github/license/vanillawc/wc-resume" alt="MIT License"></a>
  <a href="https://www.webcomponents.org/element/vanillawc/wc-resume"><img src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" alt="Published on WebComponents.org"></a>
  <a href="https://github.com/vanillawc/wc-resume/actions"><img src="https://github.com/vanillawc/wc-resume/workflows/Latest/badge.svg" alt="Latest Status"></a>
  <a href="https://github.com/vanillawc/wc-resume/actions"><img src="https://github.com/vanillawc/wc-resume/workflows/Release/badge.svg" alt="Release Status"></a>
</div>

## Installation

*Installation*
```sh
npm i @vanillawc/wc-resume
```

*Import from NPM*
```html
<script type="module" src="node_modules/@vanillawc/wc-resume/index.js"></script>
```

*Import from CDN*
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/vanillawc/wc-resume/index.js"></script>
```

## Demo

Try it on [WebComponents.dev](https://webcomponents.dev/edit/DUcJnEutaKbTPYqkcuYX?sv=1&pm=1)

## Usage

**Attributes**

- `src` - The source resume.json file
- `theme` - Path to a resume theme directory

### Load `resume.json`

```html
<wc-resume src="resume.json"></wc-resume>
```

### Theming

Resume themes are made up of a collection of partials and a `styles.css` file. To select a theme point to its directory using the `theme` attribute.

```html
<wc-resume src="resume.json" theme="/path/to/theme/"></wc-resume>
```

Themes can be found in the `themes/` directory.

**Themes**
- Default
- Compact
- Positive

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

# Pedram Khatibi — Portfolio

Personal portfolio built with React, Vite, styled-components, and Markdown content.

## Development

Use the Node version declared in `.nvmrc`, then install dependencies and start Vite:

```sh
nvm use
npm install
npm start
```

The development site is available at the URL printed by Vite (normally `http://localhost:5173`).

## Production

```sh
npm run build
npm run serve
```

The production output is written to `dist/`. The included Netlify `_redirects` rule supports direct navigation to client-side routes.

## Content

Portfolio content lives in `content/` as Markdown with YAML frontmatter. Vite imports and renders it at build time.

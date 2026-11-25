# Personal works

A small, static React + Vite portfolio. Project cards live in `src/data/projects.js`; each project's longer writeup is a Markdown file in `src/content/projects/`.

## Add a project

1. Add an entry to `src/data/projects.js`. Set `writeup` to the matching Markdown filename, choose one or more tags, and use an existing `art-*` class or add a new artwork style in `src/styles.css`.
2. Add the writeup under `src/content/projects/`. Markdown supports headings, lists, links, images, and trusted raw HTML such as iframe embeds.
3. Put local images, Godot HTML exports, and PDFs in `public/`; refer to them from Markdown by their site path (for example `/exports/my-game/index.html` or `/papers/my-paper.pdf`). For interactive exports and PDFs, use an iframe with a descriptive `title` and provide a direct link as a fallback.

The project metadata and cover assets are based on the `new-start` branch. Music Memory Mayhem includes its existing project notes; add more process details to the Overworked and Maestri 2025 writeups as desired. Update the contact links and site copy in `src/App.jsx` before publishing.

## Local development

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm run test -- --run
npm run build
```

GitHub Actions runs lint, tests, and the production build on pushes to `main`, then deploys the build artifact to GitHub Pages. The workflow expects GitHub Pages to use **GitHub Actions** as its build and deployment source.

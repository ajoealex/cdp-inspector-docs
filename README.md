# CDP Inspector documentation

The product guide uses Astro and Starlight. Pages are Markdown files in `src/content/docs/`, with search, navigation, code highlighting, and light/dark themes.

- [Product guide](https://ajoealex.github.io/cdp-inspector-docs/)
- [Release notes](https://ajoealex.github.io/cdp-inspector-docs/release-notes/)
- [Release notes using the page query](https://ajoealex.github.io/cdp-inspector-docs/?page=release-notes)

## Development

Use Node.js 24 LTS (or a compatible version at least 22.23.4).

```sh
npm ci
npm run dev
```

Open the printed local URL. To build and preview production output:

```sh
npm run build
npm run preview
```

The build output is `dist/`. Asset and navigation URLs use `./` and `../` relative to each HTML file. Upload the same folder to any domain root or subdirectory; no hosting URL or deployment prefix is required. Search and legacy redirects discover the build root from the relative script URL.

For a complete build that installs dependencies from the lockfile first, run the script for your platform. Both scripts work from any working directory and stop if installation or building fails.

Windows:

```bat
.\build.bat
```

macOS/Linux:

```sh
sh ./build.sh
```

## Content and routes

- Edit pages in `src/content/docs/` and navigation in `astro.config.mjs`.
- Add release entries to `src/content/docs/release-notes.md`.
- `/release-notes/` opens release notes. `?page=release-notes` and `?page=/release-notes` also open that page.
- Existing links such as `/#custom-headers` and `/#release-2-1-0` redirect to their new pages and anchors. The mapping is in `src/data/legacy-routes.json`.

## Screenshots and Google verification

Keep screenshots in `images/` and retain `googlea34850c66d258141.html` unchanged at the repository root. The preparation script copies them into `public/` before development and production builds; Astro then copies them into `dist/`.

Every production build checks links under three different deployment paths, rejects root-relative asset/navigation URLs, and checks that `dist/googlea34850c66d258141.html` exactly matches the original. It also verifies all images remain unchanged and legacy links, release notes, and search output exist. Generated copies under `public/` are ignored by Git.

## GitHub Pages

In **Settings → Pages**, choose **GitHub Actions** as the deployment source. `.github/workflows/deploy.yml` builds and deploys pushes to `main` and supports manual runs. The build also works on other static hosts without changing `astro.config.mjs`. Host-specific canonical URLs and a sitemap are omitted from the portable build.

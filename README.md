# CDP Inspector Docs

User guide for [CDP Inspector](https://github.com/ajoealex/remote-dev-tools-inspector-chrome-plugin), a Chrome extension that launches and remotely controls Chrome tabs over the Chrome DevTools Protocol (CDP) - screencast, raw CDP commands, live network inspection, device/location emulation, and JS execution on pages you don't have local access to.

**Live page:** https://ajoealex.github.io/cdp-inspector-docs/

This repo contains only the static docs site (`index.html` + `images/`) published via GitHub Pages - it is not the extension itself.

## Contents

The guide covers:

- Installation & quick start
- The popup (launch command generator, tab list)
- The inspector panel (screencast, CDP command sender, presets, Network tab)
- Dialogs & prompts, reconnection & error handling
- AI & automation use cases
- Keyboard shortcuts, CLI flags, troubleshooting

## Local preview

No build step - just open `index.html` in a browser, or serve the directory:

```sh
npx serve .
```

## Publishing

To enable the live page above: push this repo to `main`, then in **Settings → Pages → Build and deployment**, set the source to the `main` branch, root folder. GitHub rebuilds the site automatically on every push to `main`.

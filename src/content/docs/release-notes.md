---
title: "Release notes"
description: "Release history starting with CDP Inspector 2.1.0."
---

Changes to CDP Inspector, starting with version 2.1.0.

<span class="legacy-anchor" id="release-2-1-0"></span>

## Version 2.1.0

Interface refresh, a redesigned custom headers editor, and cross-platform source builds.

### Changed

-   **Refreshed interface:** Rebuilt the popup and CDP Inspector as separate React applications with Tailwind CSS styling, retaining the existing launch, tab discovery, screencast, CDP command, preset, and network workflows.
-   **Custom headers in Network:** Moved custom HTTP header controls from Presets to the [Network tab](/inspector/network/#custom-headers), available after enabling network logging.
-   **Table and JSON editing:** Replaced the JSON-only preset card with a dialog for adding, editing, and removing name/value rows, plus a **Bulk edit (JSON)** mode with validation and conversion back to table view. Closing and reopening the dialog preserves its draft.
-   **Header status and actions:** Added the **Custom headers set** indicator, **Edit custom headers**, and **Clear headers** controls, plus sent-command feedback and a **View response** shortcut.

### Fixed

-   **Clear headers resets the editor:** Clearing now removes both table and JSON drafts. Reopening **Add custom headers** starts with one blank row and Set headers disabled until valid input is entered.
-   **Network domain activation:** Applying custom headers enables the Network domain when needed before sending `Network.setExtraHTTPHeaders`.

### Source builds

-   **Cross-platform source builds:** Added a Node.js/Vite build pipeline for Windows, macOS, and Linux. Run `npm install` and `npm run build`, or use the platform's build script.
-   **Packaged output:** Builds now retain the unpacked extension in `build/CDP-Inspector/` alongside the distribution archive at `build/CDP-Inspector.zip`. Load the built folder through Chrome's Load unpacked control.
-   **Shared extension assets:** Moved the manifest, background service worker, CDP method catalog, and icons into `public/`, shared by the popup and inspector builds.

### Documentation

-   Updated setup and feature documentation, and added Chrome Web Store description copy with AI workflow examples and a link to the product guide.

[View the source comparison: main → rel\_2.1](https://github.com/ajoealex/CDP-Inspector-chrome-plugin/compare/414829d00e0993015301a2e1b1f85103ab40d591...aa211634af705eaa6ff7f7cea909f2fd0d7abeda)

:::note
Refresh open inspector tabs after updating. For local builds, rebuild and reload the unpacked extension on `chrome://extensions/` first.
:::

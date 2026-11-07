---
title: "Binary paths and custom arguments"
description: "Save custom Chromium executables and launch arguments."
---

Every OS ships with a sensible default Chrome path pre-selected (shown as **"Default (…)"** in the dropdown), but you can point the generator at any other Chromium-based build.

-   Click the **+** button to reveal a text field, paste or type a binary path, and click **Add** (or press Enter) - paths that aren't already quoted get wrapped in double quotes automatically.
-   The dropdown remembers every custom path you add, **per OS**. Switching the OS selector swaps the whole list.
-   The trash icon removes the currently-selected custom path (after a confirmation prompt) - it's disabled whenever the default path is selected, since that one can't be removed.
-   **Custom arguments** (e.g. `--disable-web-security`) are scoped to whichever binary path is currently selected, not the OS as a whole - so a "debug build" path can carry different flags than your default one. Each argument becomes a removable chip; add as many as you need.

:::note
All of this is saved automatically ([see what gets saved](/reference/saved-settings/)) and restored the next time you open the popup - including which binary path and arguments were selected per OS.
:::

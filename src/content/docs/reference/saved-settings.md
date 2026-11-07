---
title: "Saved settings and exports"
description: "Learn which settings persist and what each export contains."
---

**Popup** (via `chrome.storage.local`): the last generated command and port, recent-ports history, headless/%random% toggle states, OS selection, custom Chromium binary paths and arguments (per OS / per path), and whether you were connected (to auto-reconnect next time you open the popup).

**Inspector panel**: only your custom [device profiles](/inspector/device-profiles/) persist (also via `chrome.storage.local`, synced live across open panel windows). Everything else - scale mode, mouse/touch mode, split position, message filters, the max-messages limit, Network tab contents, and custom header drafts - lives only in memory for that tab and resets when you close or reload it.

Custom header drafts survive closing and reopening their dialog within the same inspector page. [Clear headers](/inspector/network/#custom-headers) explicitly discards both table and JSON drafts; they are not stored in `chrome.storage.local`.

| Export | What it produces |
| --- | --- |
| Message tab → Export logs | Combined sent/received history (oldest-first) as `cdp-messages-<time>.json` |
| Network tab → Export logs | Captured requests - headers, redirects, timing, errors - as `cdp-network-<time>.json` |
| Screencast → screenshot button | The last received frame, saved as `frame.jpg` |
| Presets → Capture screenshot | A fresh `Page.captureScreenshot` call, PNG/JPEG/WebP |

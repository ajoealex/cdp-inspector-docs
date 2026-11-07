---
title: "Troubleshooting"
description: "Resolve connection, network, header, script, and input problems."
---

## Can't connect to the debugging port

-   Confirm the Chrome instance launched from the generated command is still running.
-   Double-check the port in the popup matches `--remote-debugging-port` in the command you ran.
-   Only one process can bind a given port - generate a new one if it's already taken.

## No tabs show up after Fetch tabs

-   The tab list only includes `page` and `iframe` types - background/service-worker targets are filtered out.
-   Open at least one regular tab in the remote instance (or use [New tab](/popup/new-tab/)), then fetch again.

## New tab fails to create

-   Check the inline error under the URL field - it surfaces either an extension error or whatever the remote instance's `/json/new` endpoint reported.
-   Make sure the port is still valid (1–65535) and the remote instance is still reachable.

## Network tab stays empty after enabling

-   Make sure the attached page actually makes HTTP(S) requests after you flip the switch - requests that already completed before enabling won't appear retroactively.
-   WebSocket traffic is intentionally excluded from this tab.

## Can't find the custom headers editor

Open the **Network** tab and turn on **Enable network logging**. The **Add custom headers** or **Edit custom headers** button appears beside the toggle. Custom headers are managed there rather than in Presets.

## Checking whether custom headers were cleared

-   Closing the editor preserves its draft. Close it, then use **Clear headers** in the Network toolbar to remove the applied header set and reset both editor modes.
-   After clearing, **Add custom headers** should open with one blank row and empty JSON. If an older editor still appears, reload the updated extension and refresh the inspector page.
-   Inspect a new request after clearing. Earlier captured requests retain the headers they were sent with.

## Execute JavaScript returns "unparsable object"

This is expected for values JSON can't represent cleanly - functions, `Map`/`Set`, `NodeList`, `NaN`/`Infinity`. Convert the value to a plain object/array/string before returning it.

## Keyboard input isn't reaching the remote page

Make sure your mouse is actually hovering the screencast frame - keyboard forwarding is gated on hover, not on having clicked into it, and a green ring around the frame confirms it's active.

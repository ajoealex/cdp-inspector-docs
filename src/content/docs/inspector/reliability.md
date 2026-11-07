---
title: "Connection and error handling"
description: "Understand connection status, reconnection, and protocol error handling."
---

-   A **Live/Offline** badge reflects both the WebSocket's own state and an independent 5-second poll of `/json/version` on the debugging port - so it catches the whole remote browser dying, not just this one tab's connection dropping.
-   There's **no automatic reconnect**. If the WebSocket closes, all pending request/response bookkeeping is cleared, open dialogs are force-closed, and the Network tab's "enabled" state resets to off (since `Network.enable` doesn't survive a new CDP session) - you reconnect manually by reopening the tab card from the popup, or refreshing.
-   Navigation history lookups retry automatically (up to 3 times, backing off) if the page was just restored from the back/forward cache and briefly has no active document - back/forward buttons stay disabled while a retry is pending rather than appearing clickable and failing.
-   Message/request IDs cycle from 1 to 50,000 and wrap around; if all 50,000 are genuinely still awaiting a response (essentially never in practice), new sends are blocked with a clear log message rather than silently colliding with an in-flight ID.

---
title: "Tab actions"
description: "Attach, open Chrome DevTools, and close remote tabs."
---

Every tab card in the list has three buttons, left to right:

1.  **Attach via CDP** (plug icon) - brings that tab to the front in the remote instance, then opens CDP Inspector's own inspector panel (`attach.html`) in a *new tab of your local browser*, pre-wired to that target's CDP WebSocket. This is the extension's custom UI - see [The inspector panel](/inspector/overview/).
2.  **Open DevTools** (external-link icon) - opens the real, full Chrome DevTools frontend (served by the remote instance itself at `/devtools/inspector.html`) against that tab, in a normal new tab of your local browser. Use this when you want the actual DevTools Elements/Sources/Performance panels rather than CDP Inspector's own UI.
3.  **Close tab** (red X) - closes that tab in the remote instance and refreshes the list. The button disables itself while the request is in flight.

Both "Attach via CDP" and "Open DevTools" open in *your own, local* browser - not inside the remote throwaway instance.

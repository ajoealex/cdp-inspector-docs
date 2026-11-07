---
title: "Dialogs and authentication"
description: "Handle JavaScript dialogs and HTTP authentication challenges."
---

A few interactions on the remote page surface as dialogs in the inspector panel, since they can't be shown inside the screencast image itself:

## JavaScript dialogs (alert / confirm / prompt / beforeunload)

When the page calls `alert()`, `confirm()`, `prompt()`, or triggers a `beforeunload` warning, CDP Inspector intercepts it (`Page.javascriptDialogOpening`) and shows its own dialog instead of letting it block invisibly. `prompt()` gets a text field pre-filled with the page's default value; the Cancel button is hidden for a plain `alert` (there's nothing to decline); and for `beforeunload` the buttons relabel to "Leave"/"Stay". Screencast input is paused while a dialog is open.

## HTTP authentication

If the page hits a resource requiring HTTP Basic/Digest auth, a credentials dialog appears (origin, scheme, and realm shown) backed by `Fetch.continueWithAuth`. Multiple simultaneous challenges queue up and are shown one at a time. Credentials you enter are redacted to `[redacted]` before being written into the visible Message log, so they're never accidentally exposed there or in an exported log file.

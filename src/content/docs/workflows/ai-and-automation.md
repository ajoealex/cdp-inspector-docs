---
title: "AI and automation workflows"
description: "Use a live CDP endpoint for AI debugging, reports, research, and automation."
---

Because every Chrome instance CDP Inspector launches is disposable and isolated - its own profile, its own debugging port, nothing shared with your real browser session - it's a safe sandbox to hand to an AI agent. The panel's header already generates the exact prompt an agent needs to connect directly to the same CDP WebSocket your screencast is using.

:::note
**Every use case below starts the same way:**

1.  Launch the throwaway Chrome from the popup's generated command (headless or not).
2.  Attach to the target tab and load the application URL - either open [New tab](/popup/new-tab/) and type the URL directly, or attach to a blank tab and navigate there from the screencast's address bar.
3.  Copy the AI prompt from the panel header - it already names the tab and its exact CDP WebSocket URL.

Then paste that prompt into your AI agent, followed by the task-specific instructions below.
:::

🤖 Use case

<span class="legacy-anchor" id="ai-debugging-inner"></span>

## Let an AI drive and debug a live app like a human

4.  Paste it into Claude Code (or any CDP-capable AI agent/MCP tool), followed by what you actually want done - reproduce a bug, click through a signup flow, check what a specific page state looks like. The agent connects to the *same* WebSocket your panel is using and can now: read the DOM, take its own screenshots, dispatch real mouse/keyboard input to click and type like a human (not just call JS functions), watch console logs and network traffic as it acts, and navigate between screens - a full interactive debugging loop.
5.  Keep your own inspector panel open on that tab in parallel: the Message and Network tabs update live as the agent acts, giving you a real-time audit trail of exactly what it did.

This turns the throwaway instance into observable "hands" for an agent to reproduce a bug, poke around a staging environment, or verify a fix interactively - without writing any Selenium/Playwright automation code, and without touching your real, logged-in browser.

<span class="legacy-anchor" id="ai-excel"></span>

📊 Use case

<span class="legacy-anchor" id="ai-excel-inner"></span>

## Load an app, have AI analyze it, write the results to Excel

Turn a manual "open the app, click around, copy numbers into a spreadsheet" chore into a request. The target here is the internal dashboard, report, or page you need data from:

4.  Paste it into Claude Code (or any CDP-capable AI agent), followed by the specific task, e.g. *"log in, open the Q3 report, apply the region filter, and extract the revenue-by-country table."* If you'd rather pull the data from the app's own API responses than scraped HTML, turn on the [Network tab](/inspector/network/) first - every call the app makes while the agent works is captured alongside it.
5.  Ask the agent to return the data as structured JSON - either by reading the rendered DOM (e.g. a results table) via `Runtime.evaluate`, or from the Network tab's captured responses (**Export logs**), which is often cleaner since it's already the app's own structured JSON rather than something scraped off the page.
6.  Have the agent convert that JSON into rows and write an `.xlsx` file - e.g. with `openpyxl`/`pandas` in Python, or an equivalent Node library.

<span class="legacy-anchor" id="ai-shopping"></span>

🛒 Use case

<span class="legacy-anchor" id="ai-shopping-inner"></span>

## Research products across sites, compare, and export to Excel

The same pattern works just as well for consumer research as it does for internal tools - for example: *"log into Amazon, search for gaming laptops currently on sale, and for each one list the pros and cons, cross-checked against general user reviews from outside Amazon, in a spreadsheet."* The target tab here is `amazon.com`.

4.  Paste it into the AI agent with the research task: log in, search "gaming laptops", filter to the sale/deals section, and open each result. For every laptop, capture its title, price, discount, rating, and spec highlights from the listing and product page, then write a short pros/cons summary from that information.
5.  Ask the agent to go further than Amazon itself: search the open web (or specific sites like Reddit, RTings, Tom's Hardware) for independent reviews of each model, and note the general consensus alongside Amazon's own star rating - this is how you catch a laptop that's well-rated on-platform but poorly regarded everywhere else.
6.  Have the agent compile everything - name, price, Amazon rating, pros, cons, external review summary, and source links - into rows and write an `.xlsx` file.

:::note
Any login credentials you give the agent for a step like this stay inside your own agent session - CDP Inspector itself never sees or stores them, it's only relaying input and network events over the WebSocket, the same as a human typing into the screencast would.
:::

<span class="legacy-anchor" id="more-use-cases-inner"></span>

## More use cases

### Visual regression checks

Use the screenshot preset before and after a deploy or code change, and diff the images - no separate headless-browser tooling to set up.

### Responsive QA sweep

Cycle through device emulation profiles (or your own custom ones) and screenshot each, compiling a one-page visual report across breakpoints.

### Geolocation-gated features

Test maps, store locators, or region-locked content with the Location preset, without physically traveling or spoofing your real machine's location.

### Clean bug reproduction

Reproduce a user-reported issue in an isolated profile matching their exact conditions (headers, user agent, viewport) without touching your personal, logged-in browser.

### Third-party API inspection

Use the Network tab's full headers (including real cookies via `*ExtraInfo`) to understand exactly what a third-party integration sends and returns before you write code against it.

### Authenticated-flow testing

Use [custom HTTP headers in the Network tab](/inspector/network/#custom-headers) to set a bearer token, then inspect a new request's headers and response status to validate the authentication flow.

### Remote CI triage

If your CI exposes the debugging port of its headless Chrome, attach the inspector panel from your machine and watch exactly what happened during a failing test run - no local repro needed.

### Live walkthroughs

Keep the Network/Message tabs open while narrating (or having an AI narrate) what's happening on a customer's exact page state, for support or training.

### Competitor price tracking

Point the AI at a list of competitor product pages on a schedule, have it extract price/stock/promo text each run, and append the results to a spreadsheet over time.

### Job or listing aggregation

Search multiple job boards or marketplaces for the same query, have the AI read each listing's details, and compile a deduplicated shortlist with links.

### Form-fill & checkout testing

Have the AI complete a multi-step signup or checkout flow end to end on a throwaway profile, watching the Network tab for failed or unexpected calls along the way.

### Content/SEO audits

Crawl a set of your own pages, have the AI check titles, headings, and meta tags via Execute JavaScript, and export a pass/fail report per page.

<span class="legacy-anchor" id="attach-existing-session"></span>

🔌 Use case

<span class="legacy-anchor" id="attach-existing-session-inner"></span>

## Attach a Selenium or Playwright script to an already-running Chrome

Normally Selenium and Playwright each launch and own their own browser process. Both can instead **attach to a browser that's already running** via its remote-debugging port - exactly the kind of throwaway instance CDP Inspector's popup launches - and continue automating from whatever state that session is already in, instead of starting fresh.

This is useful when:

-   You've manually navigated, logged in, or worked through a 2FA/captcha step by hand in the throwaway browser (via the inspector panel's screencast), and want a script to take over from there without re-authenticating.
-   You're debugging a flaky automated test interactively: launch the same browser your test suite would use, drive it manually or with the [Presets tab](/inspector/presets/) to a specific state, then attach a script to poke at it live.
-   You want to watch, in CDP Inspector's screencast and [Network tab](/inspector/network/), exactly what a Selenium/Playwright script is doing to a page in real time, side by side with the automation itself.

1.  Launch the throwaway Chrome from the popup's generated command and note its port (e.g. `9420`). The command already includes `--remote-allow-origins=*`, which newer Chrome versions require for a script to attach this way.
2.  Optionally, use the inspector panel to get the browser into whatever starting state you want first - navigate, log in, apply device/location emulation.
3.  Point your script at that port instead of letting it launch its own browser:

### Selenium

Set the Chrome-specific `debuggerAddress` capability instead of letting Selenium launch a new browser:

```python
## Python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_experimental_option("debuggerAddress", "localhost:9420")
driver = webdriver.Chrome(options=options)

driver.find_element("css selector", "#submit").click()
```

```java
// Java
ChromeOptions options = new ChromeOptions();
options.setExperimentalOption("debuggerAddress", "localhost:9420");
WebDriver driver = new ChromeDriver(options);

driver.findElement(By.cssSelector("#submit")).click();
```

```js
// Node.js (selenium-webdriver)
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options().debuggerAddress("localhost:9420");
const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

await driver.findElement({ css: "#submit" }).click();
```

`driver` is now attached to the live tab(s) in that instance - if more than one is open, use `driver.window_handles` / `switch_to.window(...)` (Python), the equivalent `getWindowHandles()` (Java), or `driver.getAllWindowHandles()` (Node) to pick the one you want.

### Playwright

Playwright has a dedicated API for this - `connect_over_cdp()` - which connects to the browser's CDP endpoint directly rather than the WebDriver layer Selenium uses:

```python
# Python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.connect_over_cdp("http://localhost:9420")
    context = browser.contexts[0]
    page = context.pages[0]  # or context.new_page()
    page.click("#submit")
```

```js
// Node.js
const { chromium } = require("playwright");

const browser = await chromium.connectOverCDP("http://localhost:9420");
const context = browser.contexts()[0];
const page = context.pages()[0];
await page.click("#submit");
```

Same idea as Selenium: `context.pages()` lists every tab already open in that instance (including ones you navigated manually via the inspector panel), so you can pick the right one instead of always taking the first.

:::note
Keep the inspector panel's Message or Network tab open on that same tab while the script runs - you get a live, human-readable view of exactly what the automation is doing, for free, without adding any logging to the script itself.
:::

<span class="legacy-anchor" id="selenium-playwright"></span>

🧪 Use case

<span class="legacy-anchor" id="selenium-playwright-inner"></span>

## A live CDP reference for Selenium & Playwright developers

Both Selenium and Playwright expose a raw CDP escape hatch for capabilities their high-level APIs don't cover - Selenium 4's `driver.execute_cdp_cmd(cmd, params)` (Python) / `((HasCdp) driver).executeCdpCommand(...)` (Java), and Playwright's `context.new_cdp_session(page).send(method, params)`. Neither ships a discoverable reference for what you can actually call - you find out whether your method name and params shape were right at runtime, inside your test.

CDP Inspector's [Message tab](/inspector/message-tab/) is exactly that missing reference, live:

1.  Launch a throwaway Chrome via the popup (or point it at whatever Chrome your test suite already launches, if its debugging port is reachable).
2.  Open the page under test and attach the inspector panel.
3.  Type a domain prefix in the Method field - `Network.`, `Emulation.`, `Page.`, `Accessibility.`, `Animation.`, `CSS.` - to browse every method in that domain, with an inline "CDP docs" link and a deprecation badge where relevant.
4.  Select a method to get a pre-filled params skeleton; edit it and hit Send to see the *exact* live response shape, before writing a single line of driver code.
5.  Once it behaves the way you want, copy the method name and JSON params straight into `execute_cdp_cmd()` / `cdp_session.send()`.

Concrete gaps this is useful for - all testable live in the Message tab first:

-   `Network.emulateNetworkConditions` / `Network.setExtraHTTPHeaders` - throttling and header injection beyond what either framework wraps cleanly.
-   `Browser.setDownloadBehavior` / `Page.setDownloadBehavior` - reliable, scriptable download-directory control.
-   `Emulation.setGeolocationOverride` - Playwright wraps this as `context.set_geolocation()`, but Selenium users often need the raw call; the [Location preset](/inspector/presets/) shows you exactly what it sends.
-   `Accessibility.*` - a11y tree snapshots for accessibility-focused test assertions.
-   `Performance.*` / `Profiler.*` - capturing perf traces as part of a test run.
-   `Security.*` - handling certificate errors against self-signed staging environments.
-   `DOM.getBoxModel` - precise element geometry beyond what `getBoundingClientRect()` gives you from page-side JS.

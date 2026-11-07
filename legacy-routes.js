(() => {
  const base = new URL('.', document.currentScript.src);
  const routes = {"overview":"","installation":"installation/","quick-start":"installation/","launch-command":"popup/launch-command/","launch-command-inner":"popup/launch-command/","binary-path":"popup/binary-path/","binary-path-inner":"popup/binary-path/","connect-discover":"popup/connect/","connect-discover-inner":"popup/connect/","new-tab":"popup/new-tab/","new-tab-inner":"popup/new-tab/","tab-actions":"popup/tab-actions/","tab-actions-inner":"popup/tab-actions/","panel-overview":"inspector/overview/","screencast":"inspector/screencast/","screencast-inner":"inspector/screencast/","message-tab":"inspector/message-tab/","message-tab-inner":"inspector/message-tab/","presets-tab":"inspector/presets/","presets-tab-inner":"inspector/presets/","device-profiles":"inspector/device-profiles/","device-profiles-inner":"inspector/device-profiles/","network-tab":"inspector/network/","network-tab-inner":"inspector/network/","custom-headers":"inspector/network/#custom-headers","dialogs":"inspector/dialogs/","reliability":"inspector/reliability/","ai-debugging":"workflows/ai-and-automation/","ai-debugging-inner":"workflows/ai-and-automation/#ai-debugging-inner","ai-excel":"workflows/ai-and-automation/#ai-excel","ai-excel-inner":"workflows/ai-and-automation/#ai-excel-inner","ai-shopping":"workflows/ai-and-automation/#ai-shopping","ai-shopping-inner":"workflows/ai-and-automation/#ai-shopping-inner","more-use-cases-inner":"workflows/ai-and-automation/#more-use-cases-inner","more-use-cases":"workflows/ai-and-automation/#more-use-cases","attach-existing-session":"workflows/ai-and-automation/#attach-existing-session","attach-existing-session-inner":"workflows/ai-and-automation/#attach-existing-session-inner","selenium-playwright":"workflows/ai-and-automation/#selenium-playwright","selenium-playwright-inner":"workflows/ai-and-automation/#selenium-playwright-inner","keyboard-shortcuts":"reference/keyboard-shortcuts/","flags-explained":"reference/command-line-flags/","persisted-state":"reference/saved-settings/","troubleshooting":"reference/troubleshooting/","release-notes":"release-notes/","release-2-1-0":"release-notes/#release-2-1-0"};
  const redirect = () => {
    const current = new URL(window.location.href);
    const page = (current.searchParams.get('page') || '').trim().replace(/^\/+|\/+$/g, '').toLowerCase();
    const isHome = current.pathname === base.pathname || current.pathname === base.pathname + 'index.html';
    let fragment;
    try { fragment = decodeURIComponent(current.hash.slice(1)); } catch { return; }
    let destination;
    if (page === 'release-notes') {
      destination = new URL('release-notes/', base);
      destination.hash = current.hash;
    } else if (isHome && current.hash && Object.hasOwn(routes, fragment)) {
      destination = new URL(routes[fragment] || './', base);
    }
    if (!destination) return;
    destination.search = current.search;
    destination.searchParams.delete('page');
    if (destination.href !== current.href) window.location.replace(destination.href);
  };
  redirect();
  window.addEventListener('hashchange', redirect);
})();

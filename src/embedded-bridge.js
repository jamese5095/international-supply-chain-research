/* Keep the existing screens isolated while sharing one embedded data snapshot. */
(function () {
  'use strict';
  let current = new URL(/*__ATLAS_STATE__*/);
  const shell = parent.AtlasShell;
  const navigate = (value, replace = false, silent = false) => shell.navigate(value, {replace, silent, from: current.href});
  window.AtlasLocation = {
    get href() { return current.href; }, set href(value) { navigate(value); },
    get pathname() { return current.pathname; }, get search() { return current.search; },
    get hash() { return current.hash; }, set hash(value) { const u = new URL(current); u.hash = value; navigate(u.href); },
    get origin() { return current.origin; },
    assign: value => navigate(value), replace: value => navigate(value, true),
    reload: () => shell.reload(), toString: () => current.href
  };
  window.AtlasHistory = {
    get length() { return parent.history.length; }, get state() { return parent.history.state; },
    pushState: (state, title, value) => navigate(value || current.href, false, true),
    replaceState: (state, title, value) => navigate(value || current.href, true, true),
    back: () => parent.history.back(), forward: () => parent.history.forward(),
    go: delta => parent.history.go(delta)
  };
  window.__atlasSync = function (value, mode = 'hash') {
    const before = current; current = new URL(value);
    if (mode === 'silent') return;
    if (mode === 'pop') dispatchEvent(new PopStateEvent('popstate', {state: parent.history.state}));
    if (current.hash !== before.hash) dispatchEvent(new HashChangeEvent('hashchange', {oldURL: before.href, newURL: current.href}));
  };
  // A window listener runs after the screens' own click handlers, so disclosure
  // controls and source-number anchors keep their existing behaviour.
  addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    const anchor = event.target.closest?.('a[href]');
    if (!anchor || anchor.hasAttribute('download')) return;
    const raw = anchor.dataset.atlasHref || anchor.getAttribute('href');
    if (!raw || /^(?:https?:|mailto:|tel:|data:|blob:|javascript:)/i.test(raw)) return;
    const target = shell.resolve(raw, current.href);
    if (!target) return;
    event.preventDefault();
    if (target.resource) { shell.openResource(target.resource); return; }
    if (event.metaKey || event.ctrlKey || event.shiftKey || anchor.target === '_blank') {
      shell.open(target.href); return;
    }
    navigate(target.href);
  });
  // Real hrefs also point to the single entry point, supporting copied links,
  // middle-click and the browser's "open link in new tab" menu.
  function rewrite(anchor) {
    const raw = anchor.dataset.atlasHref || anchor.getAttribute('href');
    if (!raw || /^(?:https?:|mailto:|tel:|data:|blob:|javascript:)/i.test(raw)) return;
    if (anchor.matches('[data-open-basis],[data-evidence-basis],[data-anchor]')) return;
    const target = shell.resolve(raw, current.href);
    if (!target) return;
    const href = target.resource ? shell.resourceURL(target.resource) : shell.linkURL(target.href);
    anchor.dataset.atlasHref = raw;
    if (anchor.getAttribute('href') !== href) anchor.setAttribute('href', href);
    if (!target.resource && !anchor.target) anchor.target = '_top';
  }
  function rewriteTree(node) {
    if (node.nodeType !== 1) return;
    if (node.matches('a[href]')) rewrite(node);
    node.querySelectorAll('a[href]').forEach(rewrite);
  }
  function observeLinks() {
    const body = document.body;
    if (!body) return;
    new MutationObserver(records => records.forEach(record => {
      if (record.type === 'attributes') rewrite(record.target);
      else record.addedNodes.forEach(rewriteTree);
    })).observe(body, {childList: true, subtree: true, attributes: true, attributeFilter: ['href']});
    rewriteTree(body);
  }
  if (document.body) observeLinks();
  else addEventListener('DOMContentLoaded', observeLinks, {once: true});
  const title = document.querySelector('title');
  if (title) new MutationObserver(() => { parent.document.title = document.title; })
    .observe(title, {childList: true, subtree: true});
})();

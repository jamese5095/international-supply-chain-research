(function () {
  'use strict';
  const bundle = JSON.parse(document.getElementById('atlas-bundle').textContent);
  let frame = document.getElementById('atlas-view');
  const status = document.getElementById('atlas-status');
  const routes = AtlasRoutes;
  const resourceURLs = new Map();
  let current, ready = false;
  function data(path) {
    const key = new URL(path, routes.origin).pathname.slice(1);
    if (!Object.hasOwn(bundle.data, key)) throw Error('内置资料缺失：' + key);
    return bundle.data[key];
  }
  function mount(target) {
    ready = false; current = target;
    const key = routes.page(target);
    if (!bundle.pages[key]) throw Error('内置页面缺失：' + key);
    // Replace the frame instead of navigating it, keeping browser back/forward
    // in the outer page's history rather than adding subframe history entries.
    const next = document.createElement('iframe');
    next.id = 'atlas-view'; next.title = bundle.titles[key];
    next.addEventListener('load', () => {
      if (next !== frame || !next.contentWindow.__atlasSync) return;
      ready = true; status.hidden = true;
      document.title = next.contentDocument.title;
    });
    document.title = bundle.titles[key];
    next.srcdoc = bundle.pages[key].replace('/*__ATLAS_STATE__*/', () => JSON.stringify(target.href).replace(/</g, '\\u003c'));
    frame.replaceWith(next); frame = next;
  }
  function display(target, {silent = false, pop = false, force = false} = {}) {
    const samePage = current && routes.page(current) === routes.page(target);
    const sameQuery = current && current.search === target.search;
    const canSync = ready || silent && frame.contentWindow?.__atlasSync;
    if (!force && canSync && samePage && (sameQuery || silent || pop && routes.page(target) === 'enterprises')) {
      current = target;
      frame.contentWindow.__atlasSync(target.href, silent ? 'silent' : pop ? 'pop' : 'hash');
    } else mount(target);
  }
  function navigate(value, {replace = false, silent = false, from} = {}) {
    const target = routes.resolve(value, from || current.href);
    if (!routes.page(target)) throw Error('未知页面：' + target.pathname);
    // Version query strings belonged to separate files; the bundle is atomic.
    target.searchParams.delete('v');
    const hash = routes.encode(target);
    if (location.hash !== hash) history[replace ? 'replaceState' : 'pushState'](null, '', hash);
    display(target, {silent});
  }
  function resolve(value, base) {
    const target = routes.resolve(value, base);
    if (target.origin !== routes.origin) return null;
    const path = target.pathname.slice(1);
    if (Object.hasOwn(bundle.data, path)) return {resource: path};
    return routes.page(target) ? {href: target.href} : null;
  }
  function linkURL(value) {
    const u = new URL(location.href); u.hash = routes.encode(value); return u.href;
  }
  function resourceURL(path) {
    if (!resourceURLs.has(path)) resourceURLs.set(path, URL.createObjectURL(new Blob([JSON.stringify(data(path), null, 2)], {type: 'text/plain;charset=utf-8'})));
    return resourceURLs.get(path);
  }
  window.AtlasShell = {
    data, navigate, resolve, linkURL, resourceURL,
    reload: () => display(current, {force: true}),
    open(value) { window.open(linkURL(value), '_blank', 'noopener'); },
    openResource(path) { window.open(resourceURL(path), '_blank', 'noopener'); }
  };
  addEventListener('popstate', () => display(routes.decode(location.hash, location.search), {pop: true}));
  addEventListener('hashchange', () => {
    const target = routes.decode(location.hash, location.search);
    if (!current || routes.encode(target) !== routes.encode(current)) display(target, {pop: true});
  });
  const initial = routes.decode(location.hash, location.search);
  history.replaceState(null, '', routes.encode(initial));
  mount(initial);
})();

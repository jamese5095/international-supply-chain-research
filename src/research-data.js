'use strict';
// Read the published snapshot embedded in index.html; no network or browser cache.
window.ResearchData = (() => {
  const memory = new Map();
  function load(key, path) {
    try {
      if (!memory.has(key)) memory.set(key, parent.AtlasShell.data(path));
      return Promise.resolve(memory.get(key));
    } catch (error) { return Promise.reject(error); }
  }
  return {load, peek: key => memory.get(key)};
})();

'use strict';
// A versioned snapshot is reused across the main dashboard and regional pages.
window.ResearchData = (() => {
  const version = '20261103-import-atlas2';
  const prefix = 'sf-research:' + version + ':';
  const memory = new Map(), pending = new Map();
  function peek(key) {
    if (memory.has(key)) return memory.get(key);
    try {
      const raw = sessionStorage.getItem(prefix + key);
      if (raw) {
        const data = JSON.parse(raw);
        memory.set(key, data);
        return data;
      }
    } catch {}
    return undefined;
  }
  function load(key, url) {
    const cached = peek(key);
    if (cached !== undefined) return Promise.resolve(cached);
    if (pending.has(key)) return pending.get(key);
    const target = new URL(url, document.baseURI);
    target.searchParams.set('snapshot', version);
    const file = target.pathname.split('/').pop();
    const controller = new AbortController();
    let timer;
    const deadline = new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(Error(`读取 ${file} 超时，请检查云服务是否可访问该文件`));
        controller.abort();
      }, 20000);
    });
    const download = fetch(target.href, {cache: 'no-cache', signal: controller.signal})
      .then(async response => {
        if (!response.ok) throw Error(`${file} 返回 HTTP ${response.status}，请检查发布目录及文件是否完整`);
        const raw = await response.text();
        if (/^\s*</.test(raw)) throw Error(`${file} 返回了网页而非数据，请检查云服务的首页回退规则`);
        try { return JSON.parse(raw); }
        catch { throw Error(`${file} 不是有效的 JSON 数据，请检查上传文件`); }
      });
    const request = Promise.race([download, deadline])
      .then(data => {
        memory.set(key, data);
        try { sessionStorage.setItem(prefix + key, JSON.stringify(data)); } catch {}
        return data;
      })
      .finally(() => { clearTimeout(timer); pending.delete(key); });
    pending.set(key, request);
    return request;
  }
  return {peek, load};
})();

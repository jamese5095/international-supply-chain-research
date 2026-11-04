const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({URL, URLSearchParams});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../src/single-router.js'), 'utf8'), context);
const r = context.AtlasRoutes;
const scenarios = [
  ['#home', '/index.html#home'],
  ['#flows/12', '/index.html#flows/12'],
  ['#heatmaps', '/trade-heatmaps.html'],
  ['#heatmaps/region/europe/all/0/X', '/trade-heatmaps.html#region/europe/all/0/X'],
  ['#heatmaps?sub=26&focus=M', '/trade-heatmaps.html?sub=26&focus=M'],
  ['#enterprises/enterprise/test-id?flow=M&sub=1&region=east-asia', '/enterprises.html?flow=M&sub=1&region=east-asia#enterprise/test-id'],
  ['#capability-export/x-recommerce?sub=5', '/capability-export.html?sub=5#x-recommerce'],
  ['#capability-import/m-electronics?region=east-asia', '/capability-import.html?region=east-asia#m-electronics'],
  ['#focus', '/index.html#focus'],
  ['#enterprises?q=%E8%8D%AF%E5%93%81%26%E5%8E%9F%E6%96%99', '/enterprises.html?q=%E8%8D%AF%E5%93%81%26%E5%8E%9F%E6%96%99'],
];
for (const [route, expected] of scenarios) {
  assert.equal(r.decode(route).href, r.origin + expected);
  assert.equal(r.encode(r.decode(route)), route);
}
assert.equal(r.encode(r.origin+'/enterprises.html?v=old&flow=M#enterprise/abc'), '#enterprises/enterprise/abc?flow=M');
assert.equal(r.encode(r.resolve('./#flows/1', r.origin+'/enterprises.html?flow=M')), '#flows/1');
assert.equal(r.decode('#home', '?sub=2&v=old').search, '?sub=2');
console.log(`${scenarios.length * 2 + 3} route checks passed`);

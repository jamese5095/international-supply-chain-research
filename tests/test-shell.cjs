// Regression coverage for screen startup and history updates before frame load.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
let activeFrame, mounts = 0;
const syncs = [];
const listeners = {};
const status = {hidden:false};
const bundle = {pages:{home:'home /*__ATLAS_STATE__*/',enterprises:'firms /*__ATLAS_STATE__*/','capability-import':'import /*__ATLAS_STATE__*/'},titles:{home:'Home',enterprises:'Firms','capability-import':'Import'},data:{'downloads/example.json':{year:2025}}};
const location = {hash:'#home',search:'',href:'https://example.test/nested/index.html#home'};
const makeFrame = () => ({
  listeners:{},contentWindow:{__atlasSync:(...args)=>syncs.push(args)},contentDocument:{title:'Firms'},
  addEventListener(name,fn){this.listeners[name]=fn;},
  replaceWith(next){activeFrame=next;mounts++;}
});
activeFrame = makeFrame();
const document = {
  title:'',
  getElementById(id){return id==='atlas-bundle'?{textContent:JSON.stringify(bundle)}:id==='atlas-status'?status:activeFrame;},
  createElement(){return makeFrame();}
};
const history = {pushState(s,t,hash){location.hash=hash;},replaceState(s,t,hash){location.hash=hash;}};
const context = vm.createContext({URL,URLSearchParams,Blob,document,location,history,console,
  addEventListener:(name,fn)=>listeners[name]=fn});
context.window=context;
for(const file of ['single-router.js','single-shell.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../src',file),'utf8'),context);
assert.equal(mounts,1);
context.AtlasShell.navigate('/enterprises.html',{from:'https://atlas.internal/index.html#home'});
assert.equal(mounts,2);
// Enterprise startup normalises its query before the iframe's load event.
context.AtlasShell.navigate('/enterprises.html?flow=X',{silent:true,replace:true});
assert.equal(mounts,2,'Startup replaceState must not recursively remount the page');
assert.equal(syncs.at(-1)[1],'silent');
activeFrame.listeners.load();
assert.equal(status.hidden,true);
context.AtlasShell.navigate('#enterprise/example',{from:'https://atlas.internal/enterprises.html?flow=X'});
assert.equal(mounts,2,'Opening a drawer must keep its screen mounted');
assert.equal(location.hash,'#enterprises/enterprise/example?flow=X');
location.hash='#enterprises?flow=M';listeners.popstate();
assert.equal(mounts,2,'Enterprise filters restore in place on browser back');
assert.equal(syncs.at(-1)[1],'pop');
context.AtlasShell.navigate('/capability-import.html?sub=26#m-pharma');
assert.equal(mounts,3);
activeFrame.listeners.load();
context.AtlasShell.navigate('/capability-import.html?sub=27#m-pharma');
assert.equal(mounts,4,'Capability query changes must rerun its context initialisation');
assert.equal(context.AtlasShell.resolve('https://example.org/source','https://atlas.internal/index.html'),null);
assert.equal(context.AtlasShell.resolve('downloads/example.json','https://atlas.internal/index.html').resource,'downloads/example.json');
assert.equal(context.AtlasShell.data('downloads/example.json?v=old').year,2025);
assert.throws(()=>context.AtlasShell.data('downloads/missing.json'),/内置资料缺失/);
console.log('14 screen startup, history and embedded-data checks passed');

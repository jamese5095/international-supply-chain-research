/* Legacy project links now enter the industry/China-trade research layer. */
(() => {
 const beforeEnterpriseRender=render;
 render=function(){
  const p=location.hash.slice(1).split('/');
  if(['targets','target'].includes(p[0])){
   const sub=p[0]==='targets'&&p[1]==='sub'&&SELECTION.scaleFlows.includes(+p[2])?p[2]:'';
   location.replace('enterprises.html?v=20261103-provinces1'+(sub?'&sub='+sub:''));return;
  }
  if(['capability','planning'].includes(p[0])){location.replace('capability-export.html?v=20261103-provinces1');return;}
  beforeEnterpriseRender();
 };
 if(typeof D!=='undefined'&&D&&window.DIRECTION_READY)render();
})();

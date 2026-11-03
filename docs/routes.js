'use strict';
const heatmapURL=(sub=0)=>'trade-heatmaps.html?sub='+(SELECTION.scaleFlows.includes(+sub)?sub:'all');
function render(){
 if(!D)return;
 const r=route();
 if(['targets','target','library','client'].includes(r.page)){location.replace('enterprises.html');return}
 if(['capability','planning'].includes(r.page)){location.replace('capability-export.html');return}
 if(['explore','layout'].includes(r.page)){location.replace(heatmapURL());return}
 if(r.page==='sub'){location.replace('#flows/'+(SELECTION.scaleFlows.includes(r.id)?r.id:1));return}
 if(r.page==='flows'){
  document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav==='explore'));
  document.getElementById('crumbs').textContent='区域流向';flowPage();
 }else{
  layoutCrumbs({page:'home'});home();
  document.querySelector('#focus .panel-head').insertAdjacentHTML('afterend','<div class="selection-home"><strong>规模标准：进口或出口≥500亿美元</strong><span>13项商品／产业重点＋3项渠道观察；流向按单向占比≥60%确定主方向，均衡行业按产品或项目选择。</span><a href="#flows/1">筛选依据 →</a></div>');
 }
 document.title=(r.page==='flows'?'重点行业来源与去向研究 | ':'')+'国际供应链行业研究';
 requestAnimationFrame(()=>{const anchor=['net','focus'].includes(r.page)?document.getElementById(r.page):null;if(anchor)anchor.scrollIntoView();else window.scrollTo(0,scrolls.get(location.hash)||0)});
}
if(D)render();

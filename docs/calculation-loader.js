(() => {
 let pending;
 const base=home;
 home=function(){base();if(window.CALCULATION_DATA)return;for(const [id,label] of [['net','计算方式与来源'],['focus','本图数据与来源']]){
 const panel=document.getElementById(id);panel.insertAdjacentHTML('beforeend',`<section class="calculation-section calculation-footnote"><div class="calculation-note-line">注：2025年中国贸易，单位亿美元；商品、用途与渠道范围有交叉，29项不能直接加总。国别流向使用核心HS篮子。</div><details class="calculation-disclosure" data-lazy-calculation="${id}"><summary>${label} <span>原始金额、HS口径与计算记录</span></summary><p class="note">正在读取计算记录…</p></details></section>`);
 panel.querySelector('[data-lazy-calculation]').addEventListener('toggle',async e=>{if(!e.target.open)return;const id=e.target.dataset.lazyCalculation;try{if(!pending)pending=(async()=>{for(const file of ['calculation-data.js','calculation-evidence.js','calculation-ui.js'])await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=file+'?v=20261103-selectionproof1';script.onload=resolve;script.onerror=()=>{script.remove();reject(Error('计算记录读取失败，请重试'))};document.head.append(script)})})();await pending;document.querySelector('#'+id+' .calculation-disclosure').open=true;}catch(error){pending=null;e.target.querySelector('p').textContent=error.message;}});
 }};
 if(D)render();
})();

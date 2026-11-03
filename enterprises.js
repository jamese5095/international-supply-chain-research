(() => {
  'use strict';
  const VERSION = '20261103-enterprise55-2';
  const root = document.getElementById('enterpriseApp');
  const E = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = n => Number(n).toLocaleString('zh-CN', {maximumFractionDigits:1});
  const direction = flow => flow === 'M' ? '进口' : '出口';
  const colors = {'高科技':'#537ba8','汽车':'#7f69a8','工业设备':'#b18a4c','消费品':'#cc7a69','医药':'#5b9e91','餐饮':'#8e9c55'};
  const geoLabels = {trade:'贸易地域',market:'披露市场',contract:'供货合同',network:'业务节点'};
  const levelLabels = {A:'业务／出口统计',B:'贸易经营披露',C:'产品准入线索'};
  const levelLabel = c => c.evidenceLevel === 'A' ? c.flow === 'M' ? '进口业务披露' : '出口业务／统计' : levelLabels[c.evidenceLevel];
  let data, pending, state, legacyNotice = '', policyOpen = false;
  const load = () => data ? Promise.resolve(data) : pending || (pending = ResearchData.load('enterprise-samples-55-v2-final', 'downloads/enterprise-samples-2025.json?v=' + VERSION).then(d => {
    if (!Array.isArray(d.enterprises) || !Array.isArray(d.coverage)) throw Error('企业样本资料结构不完整');
    return (data = d);
  }).catch(error => {pending = null; throw error;}));
  const industry = sub => data.coverage.find(i => i.sub === +sub);
  const regionName = id => data.regions.find(r => r.id === id)?.name || '全部区域';
  function countryISO(value) {
    if (/^[A-Z]{2}$/.test(String(value))) return value;
    if (+value === 490) return 'TW';
    if (+value === 699) return 'IN';
    return data.partners[String(value)]?.iso || '';
  }
  function countryName(value) {
    const iso = countryISO(value);
    if (!iso) return '';
    const chineseRegions = {TW:'中国台湾',HK:'中国香港',MO:'中国澳门'};
    if (chineseRegions[iso]) return chineseRegions[iso];
    try { return new Intl.DisplayNames(['zh-CN'], {type:'region'}).of(iso); }
    catch { return iso; }
  }
  function countryParameter(value) {
    return data?.countryParameters?.[countryISO(value)] || value || 0;
  }
  function normalize(s) {
    const sub = industry(s.sub) ? String(s.sub) : 'all';
    const flow = s.view === 'international' ? 'M' : ['X','M'].includes(s.flow) ? s.flow : industry(sub)?.flow || 'X';
    return {flow,sub,region:data.regions.some(r => r.id === s.region) ? s.region : 'all',country:countryISO(s.country) ? String(s.country) : '',q:String(s.q || '').slice(0,160)};
  }
  function readState() {
    const p = new URLSearchParams(location.search);
    return normalize({flow:p.get('flow'),sub:p.get('sub'),region:p.get('region'),country:p.get('country'),q:p.get('q'),view:p.get('view')});
  }
  function pageURL(s = {}, hash = '') {
    const p = new URLSearchParams({v:VERSION});
    if (s.flow) p.set('flow',s.flow);
    if (s.sub && s.sub !== 'all') p.set('sub',s.sub);
    if (s.region && s.region !== 'all') p.set('region',s.region);
    if (s.country) p.set('country',countryParameter(s.country));
    if (s.q) p.set('q',s.q);
    return 'enterprises.html?' + p + (hash ? '#' + hash : '');
  }
  function mapURL(s) {
    return s.region !== 'all' ? `trade-heatmaps.html#region/${s.region}/${s.sub}/${countryParameter(s.country)}/${s.flow}` : `trade-heatmaps.html?sub=${s.sub}&focus=${s.flow}`;
  }
  function geoMatch(g,s) {
    return (s.region === 'all' || g.region === s.region) && (!s.country || g.countries.includes(countryISO(s.country)));
  }
  function matches(c,s,{location=true,search=true}={}) {
    if (c.flow !== s.flow || s.sub !== 'all' && c.sub !== +s.sub) return false;
    if (location && (s.region !== 'all' || s.country) && !c.geography.some(g => geoMatch(g,s))) return false;
    if (search && s.q.trim()) {
      const haystack = [c.name,c.product,c.fact,c.disclosedGeography,c.selectionReason,c.major,c.subindustry,
        ...Object.values(c.detail || {}).filter(v => v && typeof v.text === 'string').map(v => v.text),
        ...c.geography.flatMap(g => [regionName(g.region),g.label,...g.countries.map(countryName)])].join(' ').toLowerCase();
      if (!haystack.includes(s.q.trim().toLowerCase())) return false;
    }
    return true;
  }
  function selected(s) { return data.enterprises.filter(c => matches(c,s)); }
  function resolvedHash() {
    const hash = location.hash.slice(1);
    if (!hash) return null;
    const id = hash.startsWith('enterprise/') ? hash.slice(11) : data.legacyAliases[hash];
    return data.enterprises.find(c => c.id === id) || null;
  }
  function geoTags(c,s) {
    const relevant = c.geography.filter(g => s.region === 'all' && !s.country || geoMatch(g,s));
    const tags = relevant.length ? relevant : c.geography;
    if (!tags.length) return '<span class="es-geo-unknown">来源／去向未细分</span>';
    return tags.slice(0,3).map(g => `<span class="es-geo-tag" data-geo-kind="${E(g.kind)}" title="${E(g.label)}"><i>${geoLabels[g.kind]}</i>${E(g.countries.length ? g.countries.map(countryName).join('、') : regionName(g.region))}</span>`).join('') + (tags.length > 3 ? `<small class="es-more-regions">另${tags.length-3}个区域</small>` : '');
  }
  function sampleRow(c,s,preview=false) {
    return `<article class="es-sample" data-sample="${E(c.id)}" style="--sector:${colors[c.major] || '#70869b'}"><div class="es-company"><span class="es-sector">${E(c.major)} · ${E(c.subindustry)}</span><h3>${preview?`<a href="${E(pageURL(s,'enterprise/'+c.id))}">${E(c.name)}</a>`:`<button type="button" data-open-sample="${E(c.id)}">${E(c.name)}</button>`}</h3><p>${E(c.product)}</p><span class="es-level ${c.evidenceLevel==='C'?'is-lead':''}">${levelLabel(c)}</span></div><div class="es-business">${c.factPeriod?`<small class="es-fact-period">${E(c.factPeriod)}</small>`:""}<p>${E(c.fact)}</p><div class="es-geography">${geoTags(c,s)}</div></div><div class="es-reason"><small>入选理由</small><p>${E(c.selectionReason)}</p>${preview ? `<a href="${E(pageURL(s,'enterprise/'+c.id))}">业务与来源 ↗</a>` : `<button type="button" data-open-sample="${E(c.id)}">业务与来源 <span aria-hidden="true">↗</span></button>`}</div></article>`;
  }
  function policy(s) {
    const leads = data.enterprises.filter(c => c.flow === s.flow && c.evidenceLevel === 'C').length;
    return `<details class="es-policy" ${policyOpen?'open':''}><summary><span>企业如何入选</span><p>重点子行业贸易规模 · 来源／去向关联 · 公开业务依据</p><i aria-hidden="true">＋</i></summary><div class="es-policy-body"><div class="es-policy-grid"><article><span>01</span><h3>规模确定研究范围</h3><p>沿用13个重点子行业及其主研究方向，${s.flow==='X'?'出口覆盖9个':'进口覆盖4个'}子行业；以核心HS篮子识别区域需求。</p></article><article><span>02</span><h3>业务确定代表企业</h3><p>结合中国出口、境外对华供货或中国进口采购事实，以及产品和区域代表性选样；每行业没有固定配额。</p></article><article><span>03</span><h3>披露范围分别保留</h3><p>具体跨境业务、贸易经营披露${leads?'与产品准入线索':''}分列。实际货流、市场覆盖、供货合同与业务节点各有标识。</p></article></div><p class="es-policy-note">规模指标用于选择子行业，企业公开事实用于选样；企业海外收入、全球产量、签约额与海关贸易额采用各自口径。贸易统计为2025年，业务资料保留原始年份${leads?`；本页含${leads}家产品准入线索。`:'。'}</p></div></details>`;
  }
  function countryOptions(s) {
    const options = new Set(data.enterprises.filter(c => c.flow === s.flow && (s.sub === 'all' || c.sub === +s.sub)).flatMap(c => c.geography.filter(g => s.region === 'all' || g.region === s.region).flatMap(g => g.countries)));
    if (s.country) options.add(countryISO(s.country));
    return [...options].sort((a,b) => countryName(a).localeCompare(countryName(b),'zh-CN'));
  }
  function filters(s) {
    const inds = data.coverage.filter(c => c.flow === s.flow || c.sub === +s.sub);
    return `<section class="es-controls" aria-label="企业筛选"><div class="es-filter-row"><label class="es-search"><span>搜索</span><input type="search" id="esSearch" placeholder="企业、产品或业务关键词" value="${E(s.q)}"></label><label><span>重点子行业</span><select id="esIndustry"><option value="all">全部${s.flow==='X'?9:4}个子行业</option>${inds.map(i=>`<option value="${i.sub}" ${s.sub===String(i.sub)?'selected':''}>${E(i.name)} · ${data.enterprises.filter(c=>c.flow===s.flow&&c.sub===i.sub).length}家</option>`).join('')}</select></label><label><span>区域关联</span><select id="esRegion"><option value="all">全部区域</option>${data.regions.map(r => `<option value="${r.id}" ${s.region===r.id?'selected':''}>${E(r.name)}</option>`).join('')}</select></label><label><span>国家／地区</span><select id="esCountry"><option value="">全部／未细分到国家</option>${countryOptions(s).map(co => `<option value="${co}" ${countryISO(s.country)===co?'selected':''}>${E(countryName(co))}</option>`).join('')}</select></label><button class="es-reset" type="button" data-reset>清除筛选</button></div></section>`;
  }
  function contextualTrade(s) {
    if (s.region === 'all') return '';
    const subtitle = s.country ? `当前查看 ${countryName(s.country)} 的企业地域披露` : `当前查看 ${regionName(s.region)} 的企业地域披露`;
    return `<aside class="es-context"><div><strong>${E(subtitle)}</strong><span>按来源中的地域信息筛选；披露市场与实际贸易地域分别标记。</span></div><a href="${E(mapURL(s))}">对应贸易结构 →</a></aside>`;
  }
  function empty(s) {
    const i = industry(s.sub), alternate = i && i.flow !== s.flow;
    return `<div class="es-empty"><h2>${alternate ? `${E(i.name)}本轮按${direction(i.flow)}导向选样` : '当前条件下暂无已归属的企业样本'}</h2><p>${alternate ? '企业样本沿用重点子行业的主研究方向，区域热力图仍保留双向贸易数据。' : '现有资料未单列这一地域或关键词对应的业务；可查看更大地域范围的名录。企业总部不作为贸易来源或去向。'}</p><div>${alternate ? `<a href="${E(pageURL({...s,flow:i.flow,region:'all',country:'',q:''}))}">查看${E(i.name)}${direction(i.flow)}企业 →</a>` : ''}${s.country?`<button type="button" data-clear-country>查看本区企业</button>`:''}${s.region!=='all'?'<button type="button" data-clear-region>查看同方向全部区域</button>':''}<button type="button" data-reset>查看完整${direction(s.flow)}名录</button></div></div>`;
  }
  function results(s) {
    const rows = selected(s);
    const uncovered = data.enterprises.filter(c => matches(c,s,{location:false}) && !c.geography.length).length;
    const groups = data.coverage.filter(i => rows.some(c => c.sub === i.sub));
    const heading = `<div class="es-results-bar" aria-live="polite"><p><strong>${rows.length}</strong>家企业 <span>／ ${groups.length}个子行业</span></p>${(s.region!=='all'||s.country)&&uncovered?`<a href="${E(pageURL({...s,region:'all',country:''}))}">另有${uncovered}家地域未细分，保留于完整名录 ↗</a>`:'<small>按子行业组织，企业顺序不代表规模或商机排名</small>'}</div>`;
    if (!rows.length) return heading + empty(s);
    return heading + groups.map(i => `<section class="es-industry-group" data-industry-group="${i.sub}" style="--sector:${colors[i.major]}"><header class="es-group-head"><div><span>${E(i.major)}</span><h2>${E(i.name)}<small>${rows.filter(c=>c.sub===i.sub).length}家</small></h2></div><a href="./#flows/${i.sub}" title="查看该子行业的主研究方向">2025年核心篮子${direction(i.flow)} <strong>${fmt(i.coreBasketAmount)}</strong> 亿美元 <span aria-hidden="true">↗</span></a></header><div class="es-column-head" aria-hidden="true"><span>代表企业与产品</span><span>进出口业务与地域</span><span>选取依据</span></div><div class="es-sample-list">${rows.filter(c=>c.sub===i.sub).map(c=>sampleRow(c,s)).join('')}</div></section>`).join('');
  }
  function renderPage() {
    const s = state, all = data.enterprises.filter(c => c.flow === s.flow), n = new Set(all.map(c=>c.sub)).size;
    root.className = 'es-page';
    root.dataset.direction = s.flow;
    root.innerHTML = `<div class="es-crumb"><a href="${E(mapURL(s))}">← 区域热力图</a><span>／</span><span>${E(s.region==='all'?'全球':regionName(s.region))}${s.country?' · '+E(countryName(s.country)):''} · ${direction(s.flow)}导向</span></div><header class="es-hero"><div><h1>${direction(s.flow)}代表企业与业务</h1><p>${s.flow==='X'?'沿中国出口去向，识别重点子行业中具有代表性的制造、品牌与供货企业。':'沿中国进口来源，识别境外供货、中国采购及生产用料中的代表企业。'}</p><small>依据贸易关联、产品与地域代表性及公开业务资料选取，用于说明典型场景，非穷尽名录。</small></div><div class="es-totals"><div><strong>${all.length}</strong><span>样本企业</span></div><div><strong>${n}</strong><span>重点子行业</span></div></div></header><div class="es-direction-row"><nav class="es-directions" aria-label="进出口方向">${['X','M'].map(f=>`<a href="${E(pageURL({...s,flow:f,sub:industry(s.sub)?.flow===f?s.sub:'all',country:'',q:''}))}" ${s.flow===f?'aria-current="page"':''}>${direction(f)}导向 <span>${f==='X'?30:25}</span></a>`).join('')}</nav><a class="es-companion" href="${E(data.sourceProject.url)}" target="_blank" rel="noopener">国际大客户供应链图谱 <span>全球企业布局与项目补充 ↗</span></a></div>${policy(s)}${legacyNotice?`<div class="es-legacy-note" role="status">${E(legacyNotice)} <a href="${E(data.sourceProject.url)}" target="_blank" rel="noopener">原图谱 →</a></div>`:''}${filters(s)}${contextualTrade(s)}<div id="esResults">${results(s)}</div><footer class="es-footnote">注：行业金额来自2025年核心HS商品篮子；企业资料保留原披露年份。市场覆盖、供货合同与业务节点不直接视为当期中国国别贸易。企业级海关金额未披露的条目保持空值。</footer>`;
    document.title = direction(s.flow) + '代表企业与业务 · 国际供应链行业研究';
    bind();
    openHash();
  }
  function update(change) {
    policyOpen = root.querySelector('.es-policy')?.open || false;
    closeDrawer();
    state = normalize({...state,...change});
    legacyNotice = '';
    history.pushState(null,'',pageURL(state));
    renderPage();
  }
  function action(event) {
    const target = event.target;
    const sample = target.closest('[data-open-sample]');
    if (sample) { location.hash = 'enterprise/' + sample.dataset.openSample; return; }
    if (target.closest('[data-reset]')) update({sub:'all',region:'all',country:'',q:''});
    else if (target.closest('[data-clear-country]')) update({country:''});
    else if (target.closest('[data-clear-region]')) update({region:'all',country:''});
  }
  function bind() {
    root.querySelector('#esIndustry').onchange = e => update({sub:e.target.value,country:''});
    root.querySelector('#esRegion').onchange = e => update({region:e.target.value,country:''});
    root.querySelector('#esCountry').onchange = e => update({country:e.target.value});
    root.querySelector('#esSearch').oninput = e => {
      state.q = e.target.value;
      root.querySelector('#esResults').innerHTML = results(state);
      history.replaceState(null,'',pageURL(state));
    };
  }
  function safeURL(value) {
    try { const url = new URL(value); return ['https:','http:'].includes(url.protocol) ? url.href : '#'; }
    catch { return '#'; }
  }
  function sourceHTML(c) {
    return c.sourceIds.map((id,index) => {
      const s = data.sources[id];
      if (!s) return '';
      let url = safeURL(s.url);
      if (s.pdfPages?.length && !url.includes('#')) url += '#page=' + s.pdfPages[0];
      const pages = s.pdfPages?.length ? `<div class="es-pdf-pages"><span>PDF页码</span>${s.pdfPages.map(page=>`<a href="${E(url.split('#')[0]+'#page='+page)}" target="_blank" rel="noopener" aria-label="${E(s.title)}，PDF第${page}页">${page}</a>`).join('')}</div>` : '';
      return `<li id="esSource-${E(id)}"><span class="es-source-number">${index+1}</span><div><a href="${E(url)}" target="_blank" rel="noopener">${E(s.title)} ↗</a><small>${E(s.published || '来源未标日期')}</small>${pages}${s.supports?`<p>${E(s.supports)}</p>`:''}</div></li>`;
    }).join('');
  }
  function sourceRefs(c,field) {
    return (field?.sourceIds || []).filter(id => data.sources[id] && c.sourceIds.includes(id)).map(id => `<button class="es-cite" type="button" data-source-ref="${E(id)}" aria-label="查看来源${c.sourceIds.indexOf(id)+1}：${E(data.sources[id].title)}" title="${E(data.sources[id].title)}">[${c.sourceIds.indexOf(id)+1}]</button>`).join('');
  }
  function businessDetails(c) {
    const fields = [['entity','业务主体'],['products','产品范围'],['geography','来源与去向'],['scale','已披露规模'],['organization','交易与交付组织']];
    return `<dl class="es-fact-table">${fields.map(([key,label]) => {
      const f = c.detail?.[key];
      return `<div data-detail-field="${key}"><dt>${label}</dt><dd class="${f?'':'es-undisclosed'}">${f?E(f.text)+sourceRefs(c,f):'所选公开资料未单独披露'}</dd></div>`;
    }).join('')}</dl>${c.detail?.development?`<section class="es-development" data-detail-field="development"><h3>已披露发展动向</h3><p>${E(c.detail.development.text)}${sourceRefs(c,c.detail.development)}</p></section>`:''}`;
  }
  function showSample(c) {
    const d = document.getElementById('enterpriseDrawer'), i = industry(c.sub), trade = c.detail?.trade;
    document.getElementById('enterpriseDetail').innerHTML = `<header class="es-detail-head"><div><span>${direction(c.flow)}导向 · ${E(c.major)}／${E(c.subindustry)}</span><h2 id="esDetailTitle">${E(c.name)}</h2><p>${E(c.product)}</p></div><button type="button" data-close aria-label="关闭企业详情">×</button></header><div class="es-detail-body"><section class="es-detail-fact" data-detail-field="trade"><div class="es-fact-meta"><span>${levelLabel(c)}</span><time>${E(c.factPeriod || '')}</time></div><h3>贸易业务依据</h3><p>${E(trade?.text || c.fact)}${sourceRefs(c,trade)}</p></section>${businessDetails(c)}<section class="es-detail-selection"><h3>入选依据</h3><p>${E(c.selectionReason)}</p><div class="es-geography">${geoTags(c,{region:'all',country:''})}</div></section><details class="es-scope-detail"><summary>商品口径与资料边界 <span>展开说明</span></summary><p>${E(c.scopeNote)}</p>${c.detail?.evidenceGaps?.length?`<div><strong>所选资料尚未单列的信息</strong><ul>${c.detail.evidenceGaps.map(g=>`<li>${E(g)}</li>`).join('')}</ul></div>`:''}<div><strong>区域研究范围</strong><p>HS ${E(i.codes.join('、'))}。${E(i.scope)}</p><p>2025年${direction(i.flow)}核心篮子 ${fmt(i.coreBasketAmount)} 亿美元，为行业货值；企业经营数据采用各自原始口径。</p><a href="./#flows/${i.sub}">对应子行业流向 →</a></div></details><section class="es-detail-sources"><header><h3>公开来源</h3><span>${c.sourceIds.length}项 · 点击正文编号可定位</span></header><ul>${sourceHTML(c)}</ul></section></div>`;
    if (!d.open) d.showModal();
    d.scrollTop = 0;
    d.querySelector('[data-close]').onclick = () => d.close();
    d.querySelectorAll('[data-source-ref]').forEach(button => button.onclick = () => {
      d.querySelectorAll('.is-referenced').forEach(el => el.classList.remove('is-referenced'));
      const target = document.getElementById('esSource-' + button.dataset.sourceRef);
      if (target) {target.classList.add('is-referenced'); target.scrollIntoView({block:'center',behavior:'auto'}); target.querySelector('a')?.focus({preventScroll:true});}
    });
  }
  function closeDrawer() {
    const d = document.getElementById('enterpriseDrawer');
    if (d?.open) d.close();
  }
  function openHash() {
    const c = resolvedHash();
    if (c) {showSample(c);return;}
    closeDrawer();
  }
  async function preview(host,context) {
    host.className = 'es-preview';
    host.innerHTML = '';
    try {
      await load();
      if (!host.isConnected) return;
      const s = normalize(context), rows = selected(s), fallbackFlow = industry(s.sub)?.flow || s.flow;
      host.dataset.direction = s.flow;
      host.innerHTML = `<header class="es-preview-head"><div><span class="es-eyebrow">企业业务</span><h2>${direction(s.flow)}代表企业</h2><p>${rows.length?`${rows.length}家具有本区地域关联的样本；披露市场与实际货流分别保留。`:'当前国别或区域尚未单列对应企业，可查看完整研究名录。'}</p></div><a href="${E(pageURL(s))}">查看企业名录 →</a></header>${rows.slice(0,3).map(c=>sampleRow(c,s,true)).join('')}${!rows.length?`<a class="es-preview-fallback" href="${E(pageURL({...s,flow:fallbackFlow,region:'all',country:''}))}">查看${industry(s.sub)?E(industry(s.sub).name):'全部'}${direction(fallbackFlow)}样本 →</a>`:''}`;
    } catch (error) {
      if (host.isConnected) host.innerHTML = `<p class="es-footnote">${E(error.message)} <a href="enterprises.html">企业业务 →</a></p>`;
    }
  }
  window.EnterpriseResearch = {preview,url:pageURL};
  dispatchEvent(new Event('enterprise-research-ready'));
  if (root) {
    load().then(() => {
      state = readState();
      const c = resolvedHash();
      if (c) state.flow = c.flow;
      else if (/^#(?:case|profile|reference)\//.test(location.hash)) legacyNotice = '该历史条目未纳入本轮55家样本，当前展示本轮代表企业；完整国际项目仍保留在原图谱。';
      const hash = c ? 'enterprise/' + c.id : location.hash.slice(1);
      history.replaceState(null,'',pageURL(state,hash));
      renderPage();
      root.addEventListener('click',action);
      const dialog = document.getElementById('enterpriseDrawer');
      dialog.addEventListener('close',() => {
        if (location.hash) history.replaceState(null,'',pageURL(state));
      });
      addEventListener('hashchange',openHash);
      addEventListener('popstate',() => {
        const next = readState();
        if (JSON.stringify(next) !== JSON.stringify(state)) {state = next; renderPage();}
        else openHash();
      });
    }).catch(error => {
      root.innerHTML = `<div class="es-empty" role="alert"><h1>企业资料暂时未能读取</h1><p>${E(error.message)}</p><button type="button" onclick="location.reload()">重新读取</button><a href="trade-heatmaps.html">区域热力图 →</a></div>`;
    });
  }
})();

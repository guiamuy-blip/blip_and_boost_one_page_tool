(function(){
'use strict';
const CFG=Object.assign({owner:'',repo:'',branch:'main',dataPath:'content.json',originalPath:'original.json',versionsPath:'versions/'},window.CFG||{});
let ORIGINAL=null;
const ICONS=['bot','target','loop','callback','split','chat','door','megaphone','bell','team','catalog','card','users','filter','cart','star','chart','flag','bolt','link','store','shield'];
const LS={draft:'bb1p.draft',prefs:'bb1p.prefs',profile:'bb1p.profile',token:'bb1p.token',auth:'bb1p.auth',logos:'bb1p.logos'};
const PASS='blipandboost4ever';
const STR={
 en:{display:'Display',edit:'Edit',versions:'Versions',addInitiative:'Add initiative',saveVersion:'Save version',
  tabSI:'Strategic Initiatives',tabSIsub:'Initiatives, objectives and help needed',tabEX:'Executive One Page',tabEXsub:'Performance, roadmap and status',
  mapTitle:'Initiatives by business objective',mapLead:'Each initiative is mapped to the funnel stage it is expected to move. Select a tile to open its detail.',
  detailTitle:'Initiative detail',detailSub:'Full rationale, target KPI and the asks to Meta and Boost for each initiative.',
  show:'Show detail',hide:'Hide detail',helpTitle:'Help needed',helpLead:'Every ask consolidated by counterpart, ready to take into the Meta and Boost conversations.',
  objective:'Objective',ownership:'Ownership',helpNeeded:'Help needed',search:'Search',searchPh:'Initiative, KPI or ask',
  expandAll:'Expand all',collapseAll:'Collapse all',clearFilters:'Clear filters',blipLed:'Blip-led',needs:'Needs Meta / Boost',
  topPriority:'Top priority',metaAsk:'Meta ask',boostAsk:'Boost ask',eta:'ETA',kpiLine:'KPI we expect to move',why:'Why and how',
  helpMeta:'Help needed from Meta',helpBoost:'Help needed from Boost',noMeta:'No ask to Meta.',noBoost:'No ask to Boost.',noDesc:'No description yet.',
  asksAcross:function(a,b){return a+' asks across '+b+' initiatives'},noAsks:'No asks for the current filters.',
  initiatives:'Initiatives',needMB:'Need Meta / Boost',asksMeta:'Asks to Meta',asksBoost:'Asks to Boost',topPriorityKpi:'Top priority',
  objectivesCount:function(n){return n+' business objectives'},relyBlip:function(n){return n+' rely mostly on Blip'},
  initiativesWith:function(n){return n+' initiatives'},prerequisite:'Flagged as prerequisite',
  funnelTitle:'Channel funnel',ofPrevious:'of previous',ofUsers:'of unique users',
  original:'Original baseline',originalDesc:'Built from the source spreadsheet and dashboards. Always available, never overwritten.',
  viewOriginal:'View original',view:'View',loaded:'Loaded',readOnly:'is shown read-only. Your working copy is untouched.',
  loadEditor:'Load into editor',backWorking:'Back to working copy',savedVersion:'Saved version',
  noVersions:'No saved versions yet. Switch to Edit, make changes and select Save version.',
  storeShared:'Versions are stored with this page and shared with everyone who can open it.',
  storeLocal:'Versions are stored in this browser only.',versionsHint:'Load any version read-only, then bring it into the editor if needed.',
  unsaved:'Unsaved changes on',version:'Version',saved:'saved',viewing:'Viewing',source:'Source',
  fieldName:'Initiative',fieldEta:'Date / ETA',fieldShort:'Description, short',fieldKpi:'Target KPI',fieldObj:'Business objective',
  fieldOwner:'Ownership',fieldIcon:'Icon',fieldDetailed:'Description, detailed',oneBullet:'One bullet per line.',oneAsk:'One ask per line. Leave empty if none.',
  shortHint:'One line, up to 90 characters.',moveUp:'Move up',moveDown:'Move down',duplicate:'Duplicate',del:'Delete',newObjective:'New objective…',
  addObjective:'Add objective',objName:'Objective',whatMoves:'What it moves',langTip:'You are editing the English version. Switch to PT to edit the Portuguese text.',
  cancel:'Cancel',add:'Add',save:'Save version',versionName:'Version name',note:'Note (optional)',whatChanged:'What changed',
  noInitiatives:'No initiatives yet. Switch to Edit and select Add initiative.',noMatch:'No initiative matches these filters.',
  deleteTitle:'Delete initiative',deleteMsg:function(n){return 'Delete "'+n+'" from the working copy? Saved versions and the original are not affected.'},
  loadTitle:'Load into editor',loadMsg:'Replace your working copy with this version? Unsaved changes in the working copy will be lost.',
  newInitiative:'New initiative',objInUse:function(n,o){return 'Move the '+n+' initiative(s) in "'+o+'" to another objective first.'},
  logoTip:'Click to upload the official logo (PNG, SVG, JPG up to 180 KB). Shift+click to reset.',
  savedToast:'Version saved',thisBrowser:'this browser only',logoUpdated:'Logo updated.',logoReset:'Logo reset to wordmark.',
  splitOf:'of permalink clicks',
  tabHN:'Executive Help Needed',tabHNsub:'Consolidated asks, impact and proof points',
  hnTitle:'What we need from Meta and Boost',
  hnLead:'One consolidated list for the executive conversation: what we are asking, why it matters and the proof point that justifies it.',
  hnWhat:'What we are asking',hnWhy:'KPI this unlocks',hnProof:'Proof point / benchmark from other clients',
  hnProofPh:'Add the result or benchmark from another client that justifies this ask',hnNoProof:'No proof point added yet.',
  hnAsks:'asks',hnFor:'Asks to',hnBlocked:'Blocking initiative',hnWith:'with a proof point',
  loginTitle:'Boost \u00d7 Blip One Page',loginSub:'Shared workspace. Sign in to view and edit.',
  loginPass:'Access password',loginName:'Your name',loginToken:'Edit token (optional)',
  loginTokenHint:'Paste the GitHub token shared by your team if you will edit. Without it you can view and filter, but not save.',
  loginBtn:'Enter',loginErrPass:'Wrong password.',loginErrName:'Enter your name.',logout:'Sign out',
  viewerOnly:'View only \u2014 no edit token',editorAs:'Signed in as',
  syncing:'Saving\u2026',syncErr:'Save failed',lastEdit:'Last change by',
  remoteAhead:'Someone else saved a new version while you were editing.',reload:'Load latest',
  needToken:'You need the edit token to save. Sign out and enter it to continue.',
  loadErr:'Could not load the shared data. Check the connection and reload.'},
 pt:{display:'Visualização',edit:'Edição',versions:'Versões',addInitiative:'Adicionar iniciativa',saveVersion:'Salvar versão',
  tabSI:'Strategic Initiatives',tabSIsub:'Iniciativas, objetivos e pedidos de ajuda',tabEX:'Executive One Page',tabEXsub:'Performance, roadmap e status',
  mapTitle:'Iniciativas por objetivo de negócio',mapLead:'Cada iniciativa está mapeada na etapa do funil que deve mover. Clique em um card para abrir o detalhe.',
  detailTitle:'Detalhe das iniciativas',detailSub:'Racional completo, KPI-alvo e os pedidos para Meta e Boost de cada iniciativa.',
  show:'Ver detalhe',hide:'Ocultar detalhe',helpTitle:'Pedidos de ajuda',helpLead:'Todos os pedidos consolidados por contraparte, prontos para levar às conversas com Meta e Boost.',
  objective:'Objetivo',ownership:'Responsabilidade',helpNeeded:'Ajuda necessária',search:'Buscar',searchPh:'Iniciativa, KPI ou pedido',
  expandAll:'Expandir tudo',collapseAll:'Recolher tudo',clearFilters:'Limpar filtros',blipLed:'Conduzido pela Blip',needs:'Depende de Meta / Boost',
  topPriority:'Prioridade máxima',metaAsk:'Pedido à Meta',boostAsk:'Pedido à Boost',eta:'Prazo',kpiLine:'KPI que esperamos mover',why:'Por quê e como',
  helpMeta:'Ajuda necessária da Meta',helpBoost:'Ajuda necessária da Boost',noMeta:'Sem pedido à Meta.',noBoost:'Sem pedido à Boost.',noDesc:'Sem descrição ainda.',
  asksAcross:function(a,b){return a+' pedidos em '+b+' iniciativas'},noAsks:'Nenhum pedido para os filtros atuais.',
  initiatives:'Iniciativas',needMB:'Dependem de Meta / Boost',asksMeta:'Pedidos à Meta',asksBoost:'Pedidos à Boost',topPriorityKpi:'Prioridade máxima',
  objectivesCount:function(n){return n+' objetivos de negócio'},relyBlip:function(n){return n+' dependem só da Blip'},
  initiativesWith:function(n){return n+' iniciativas'},prerequisite:'Sinalizada como pré-requisito',
  funnelTitle:'Funil do canal',ofPrevious:'da etapa anterior',ofUsers:'dos usuários únicos',
  original:'Versão original',originalDesc:'Construída a partir da planilha e dos dashboards de origem. Sempre disponível, nunca sobrescrita.',
  viewOriginal:'Ver original',view:'Ver',loaded:'Carregada',readOnly:'está em modo somente leitura. Sua cópia de trabalho continua intacta.',
  loadEditor:'Carregar no editor',backWorking:'Voltar à cópia de trabalho',savedVersion:'Versão salva',
  noVersions:'Nenhuma versão salva ainda. Entre no modo Edição, altere o que quiser e clique em Salvar versão.',
  storeShared:'As versões ficam guardadas com esta página e são compartilhadas com quem abrir o link.',
  storeLocal:'As versões ficam guardadas apenas neste navegador.',versionsHint:'Abra qualquer versão em modo leitura e, se quiser, carregue-a no editor.',
  unsaved:'Alterações não salvas em',version:'Versão',saved:'salva em',viewing:'Visualizando',source:'Fonte',
  fieldName:'Iniciativa',fieldEta:'Data / prazo',fieldShort:'Descrição curta',fieldKpi:'KPI-alvo',fieldObj:'Objetivo de negócio',
  fieldOwner:'Responsabilidade',fieldIcon:'Ícone',fieldDetailed:'Descrição detalhada',oneBullet:'Um item por linha.',oneAsk:'Um pedido por linha. Deixe vazio se não houver.',
  shortHint:'Uma linha, até 90 caracteres.',moveUp:'Subir',moveDown:'Descer',duplicate:'Duplicar',del:'Excluir',newObjective:'Novo objetivo…',
  addObjective:'Adicionar objetivo',objName:'Objetivo',whatMoves:'O que ele move',langTip:'Você está editando a versão em português. Mude para EN para editar o texto em inglês.',
  cancel:'Cancelar',add:'Adicionar',save:'Salvar versão',versionName:'Nome da versão',note:'Observação (opcional)',whatChanged:'O que mudou',
  noInitiatives:'Nenhuma iniciativa ainda. Entre no modo Edição e clique em Adicionar iniciativa.',noMatch:'Nenhuma iniciativa corresponde a esses filtros.',
  deleteTitle:'Excluir iniciativa',deleteMsg:function(n){return 'Excluir "'+n+'" da cópia de trabalho? As versões salvas e a original não são afetadas.'},
  loadTitle:'Carregar no editor',loadMsg:'Substituir sua cópia de trabalho por esta versão? Alterações não salvas serão perdidas.',
  newInitiative:'Nova iniciativa',objInUse:function(n,o){return 'Mova antes as '+n+' iniciativa(s) de "'+o+'" para outro objetivo.'},
  logoTip:'Clique para enviar o logo oficial (PNG, SVG, JPG até 180 KB). Shift+clique para restaurar.',
  savedToast:'Versão salva',thisBrowser:'apenas neste navegador',logoUpdated:'Logo atualizado.',logoReset:'Logo restaurado para o texto.',
  splitOf:'dos cliques no permalink',
  tabHN:'Executive Help Needed',tabHNsub:'Pedidos consolidados, impacto e provas',
  hnTitle:'O que precisamos da Meta e da Boost',
  hnLead:'Uma lista consolidada para a conversa executiva: o que estamos pedindo, por que importa e a prova que justifica o pedido.',
  hnWhat:'O que estamos pedindo',hnWhy:'KPI que isso destrava',hnProof:'Prova / benchmark de outros clientes',
  hnProofPh:'Adicione o resultado ou benchmark de outro cliente que justifica este pedido',hnNoProof:'Nenhuma prova adicionada ainda.',
  hnAsks:'pedidos',hnFor:'Pedidos para',hnBlocked:'Iniciativa bloqueante',hnWith:'com prova registrada',
  loginTitle:'One Page Boost \u00d7 Blip',loginSub:'Espa\u00e7o compartilhado. Entre para visualizar e editar.',
  loginPass:'Senha de acesso',loginName:'Seu nome',loginToken:'Token de edi\u00e7\u00e3o (opcional)',
  loginTokenHint:'Cole o token do GitHub compartilhado pelo time se voc\u00ea for editar. Sem ele voc\u00ea visualiza e filtra, mas n\u00e3o salva.',
  loginBtn:'Entrar',loginErrPass:'Senha incorreta.',loginErrName:'Informe seu nome.',logout:'Sair',
  viewerOnly:'Somente leitura \u2014 sem token de edi\u00e7\u00e3o',editorAs:'Conectado como',
  syncing:'Salvando\u2026',syncErr:'Falha ao salvar',lastEdit:'\u00daltima altera\u00e7\u00e3o por',
  remoteAhead:'Outra pessoa salvou uma nova vers\u00e3o enquanto voc\u00ea editava.',reload:'Carregar a mais recente',
  needToken:'Voc\u00ea precisa do token de edi\u00e7\u00e3o para salvar. Saia e informe o token para continuar.',
  loadErr:'N\u00e3o foi poss\u00edvel carregar os dados compartilhados. Verifique a conex\u00e3o e recarregue.'}
};

let state=null, viewing=null, mode='display', lang='en', tab='si', dirty=false;
let profile=null, token=null, remoteMeta=null, remoteAhead=false, pollTimer=null, syncing=false;
let baseVersion=null, versions=[], logos={blip:null,boost:null}, detailOpen=false;
const open=new Set();
const filters={obj:new Set(),cluster:null,asks:new Set(),q:''};


function clone(o){return JSON.parse(JSON.stringify(o))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function icon(n){return '<svg class="i" aria-hidden="true"><use href="#ic-'+esc(n)+'"/></svg>'}
function $(id){return document.getElementById(id)}
function t(k){return STR[lang][k]}
function F(o){ if(o==null) return ''; if(typeof o==='string') return o; return o[lang]!=null&&o[lang]!==''?o[lang]:(o.en||''); }
function A(o){ if(!o) return []; if(Array.isArray(o)) return o; return (o[lang]&&o[lang].length)?o[lang]:(o.en||[]); }
function setF(o,v){ o[lang]=v; }
function setA(o,v){ o[lang]=v; }
function nf(n){ return Number(n).toLocaleString(lang==='pt'?'pt-BR':'en-US'); }
function pf(n){ const s=n.toFixed(1); return (lang==='pt'?s.replace('.',','):s)+'%'; }
function pi(n){ const s=Math.abs(n-Math.round(n))<0.05?String(Math.round(n)):n.toFixed(1); return (lang==='pt'?s.replace('.',','):s)+'%'; }
function view(){ return viewing? (viewing.kind==='original'?ORIGINAL:viewing.data) : state; }
function editable(){ return mode==='edit' && !viewing; }
function objOf(d,id){ return d.si.objectives.find(o=>o.id===id)||{id:id,name:{en:id,pt:id},goal:{en:'',pt:''},icon:'flag',color:'#6E6E6E'}; }
function fmtDate(x){ try{ return new Date(x).toLocaleString(lang==='pt'?'pt-BR':'en-US',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); }catch(e){ return ''; } }
function toast(m,err){ const el=document.createElement('div'); el.className='toast'+(err?' err':''); el.textContent=m; $('toast-wrap').appendChild(el); setTimeout(()=>el.remove(),3600); }
function lsGet(k){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):null; }catch(e){ return null; } }
function lsSet(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); return true; }catch(e){ return false; } }

/* ---------------- render ---------------- */
function renderAll(){
  document.documentElement.lang = lang==='pt'?'pt-BR':'en';
  document.body.classList.toggle('mode-edit', editable());
  document.body.classList.toggle('mode-display', !editable());
  $('mode-display').setAttribute('aria-pressed',String(mode==='display'));
  $('mode-edit').setAttribute('aria-pressed',String(mode==='edit'));
  $('lang-en').setAttribute('aria-pressed',String(lang==='en'));
  $('lang-pt').setAttribute('aria-pressed',String(lang==='pt'));
  document.querySelectorAll('[data-t]').forEach(el=>{ el.textContent=t(el.dataset.t); });
  $('page-si').classList.toggle('active',tab==='si');
  $('page-exec').classList.toggle('active',tab==='exec');
  $('page-help').classList.toggle('active',tab==='help');
  renderLogos(); renderTabs(); renderBanner();
  if(tab==='si'){ renderHero(); renderFbox(); renderObjEditor(); renderMap(); renderDetailHead(); renderFilters(); renderCards(); renderBoard(); }
  else if(tab==='exec') renderExec();
  else renderHelp();
  renderStatus();
}
function renderStatus(){
  const el=$('save-indicator'); el.classList.toggle('dirty',dirty);
  const where=baseVersion?baseVersion.label:t('original');
  el.textContent=dirty?(t('unsaved')+' '+where):where;
  $('foot-src').textContent=t('source')+': '+(tab==='exec'?F(view().exec.footer.src).replace(/^(Source|Fonte):\s*/,''):F(view().si.meta.source));
  const who=$('who');
  if(who) who.textContent=(profile?t('editorAs')+' '+profile.name+(token?'':' \u00b7 '+t('viewerOnly')):'')+
    (remoteMeta&&remoteMeta.updatedBy?' \u00b7 '+t('lastEdit')+' '+remoteMeta.updatedBy:'')+(syncing?' \u00b7 '+t('syncing'):'');
  $('foot-ver').textContent=viewing?(t('viewing')+': '+(viewing.kind==='original'?t('original'):viewing.label))
    :(baseVersion?(t('version')+': '+baseVersion.label+' — '+t('saved')+' '+fmtDate(baseVersion.savedAt)):t('original'));
}
function renderTabs(){
  const mk=(id,ic,tt,sb)=>'<button class="tab" role="tab" data-tab="'+id+'" aria-selected="'+(tab===id)+'"><span class="t-ic">'+icon(ic)+'</span><span><span class="t-tt">'+esc(tt)+'</span><span class="t-sb" style="display:block">'+esc(sb)+'</span></span></button>';
  $('tabbar').innerHTML=mk('si','flag',t('tabSI'),t('tabSIsub'))+mk('exec','dash',t('tabEX'),t('tabEXsub'))+mk('help','bolt',t('tabHN'),t('tabHNsub'));
}
function renderLogos(){
  [['blip','<span class="wm-blip">blip</span>'],['boost','<span class="wm-boost">Boost <span>Mobile</span></span>']].forEach(([k,wm])=>{
    const s=$('logo-'+k);
    s.innerHTML=logos[k]?'<img alt="'+(k==='blip'?'Blip':'Boost Mobile')+'" src="'+esc(logos[k])+'">':wm;
    s.title=editable()?t('logoTip'):(k==='blip'?'Blip':'Boost Mobile');
  });
}
function renderBanner(){
  const s=$('banner-slot');
  if(!viewing){
    s.innerHTML = remoteAhead ? '<div class="banner orig">'+icon('history')+'<span>'+esc(t('remoteAhead'))+'</span>'+
      '<div class="btn-row"><button class="btn sm" data-act="pull">'+icon('loop')+esc(t('reload'))+'</button></div></div>' : '';
    return; }
  const o=viewing.kind==='original';
  s.innerHTML='<div class="banner'+(o?' orig':'')+'">'+icon(o?'shield':'history')+
   '<span><b>'+(o?t('original'):t('savedVersion')+': '+esc(viewing.label))+'</b> '+t('readOnly')+'</span>'+
   '<div class="btn-row"><button class="btn ghost sm" data-act="restore">'+icon('copy')+t('loadEditor')+'</button><button class="btn sm" data-act="exit-view">'+t('backWorking')+'</button></div></div>';
}
function renderHero(){
  const d=view().si, ed=editable();
  [['h-kicker','kicker'],['h-title','title'],['h-sub','subtitle']].forEach(([id,k])=>{
    const el=$(id); if(document.activeElement!==el) el.textContent=F(d.meta[k]); el.contentEditable=ed?'true':'false';
  });
}
function renderFbox(){
  const d=view().si, ed=editable(), st=d.funnel, base=st[0].v||1;
  const H=84;
  let h='<div class="fb-head"><h3>'+esc(t('funnelTitle'))+'</h3><span class="fb-note">'+esc(F(st[0].note))+'</span></div><div class="fstrip">';
  st.forEach((s,i)=>{
    if(i>0){ const p=st[i-1].v? (s.v/st[i-1].v*100):0;
      h+='<div class="fdrop"><div class="fd-pct">'+pf(p)+'</div><div class="fd-lbl">'+esc(t('ofPrevious'))+'</div><div class="fd-arrow">'+icon('right')+'</div></div>'; }
    const share=s.v/base*100, bar=Math.max(8,Math.round(H*Math.max(share/100,0.06)));
    h+='<div class="fstage"><div><div class="fs-val">'+nf(s.v)+'</div><div class="fs-lbl">'+esc(F(s.label))+'</div>'+
      '<div class="fs-note">'+(i===0?esc(F(s.note)||''):pf(share)+' '+esc(t('ofUsers'))+(F(s.note)?' · '+esc(F(s.note)):''))+'</div>'+
      (ed?'<div style="margin-top:6px"><input type="number" data-fn="'+s.id+'" value="'+s.v+'" aria-label="value"></div>':'')+
      '</div><div class="fs-bar" style="height:'+bar+'px"></div></div>';
  });
  h+='</div>';
  const sp=d.split, a=sp.a.v, b=sp.b.v, tot=(a+b)||100;
  h+='<div class="split"><div class="sp-head"><h4>'+esc(F(sp.title))+'</h4><span class="sp-of">% '+esc(t('splitOf'))+'</span></div>'+
     '<div class="sp-bar"><div class="sp-a" style="width:'+(a/tot*100)+'%">'+pi(a)+'</div><div class="sp-b" style="width:'+(b/tot*100)+'%">'+pi(b)+'</div></div>'+
     '<div class="sp-legend"><span><span class="dot boost"></span> <b>'+pi(a)+'</b> '+esc(F(sp.a.label))+'</span><span>'+esc(F(sp.b.label))+' <b>'+pi(b)+'</b></span></div></div>'+
     '<div class="est-note"><span class="badge boost">Blip data</span><span>'+esc(F(d.signalNote))+'</span></div>';
  $('fbox').innerHTML=h;
}
function matches(x){
  if(filters.obj.size&&!filters.obj.has(x.impact)) return false;
  if(filters.cluster&&x.cluster!==filters.cluster) return false;
  if(filters.asks.has('meta')&&!A(x.helpMeta).length) return false;
  if(filters.asks.has('boost')&&!A(x.helpBoost).length) return false;
  if(filters.q){ const q=filters.q.toLowerCase();
    const hay=[F(x.name),F(x.short),F(x.kpi),F(x.eta)].concat(A(x.detailed),A(x.helpMeta),A(x.helpBoost)).join(' ').toLowerCase();
    if(!hay.includes(q)) return false; }
  return true;
}
function flags(x){
  let h='';
  if(x.top) h+='<span class="badge top">'+icon('star')+esc(t('topPriority'))+'</span>';
  if(A(x.helpMeta).length) h+='<span class="badge meta">'+esc(t('metaAsk'))+'</span>';
  if(A(x.helpBoost).length) h+='<span class="badge boost">'+esc(t('boostAsk'))+'</span>';
  return h;
}
function renderObjEditor(){
  if(!editable()){ $('obj-edit').innerHTML=''; return; }
  $('obj-edit').innerHTML=state.si.objectives.map((o,i)=>
    '<div class="obj-card"><div class="field"><label>'+esc(t('objName'))+' '+(i+1)+'</label><input type="text" data-obj="'+i+'" data-f="name" value="'+esc(F(o.name))+'"></div>'+
    '<div class="field"><label>'+esc(t('whatMoves'))+'</label><input type="text" data-obj="'+i+'" data-f="goal" value="'+esc(F(o.goal))+'"></div>'+
    '<div class="card-tools"><input type="color" data-obj="'+i+'" data-f="color" value="'+esc(o.color)+'" aria-label="color" style="width:34px;height:28px;padding:0;border:1px solid var(--border-input);background:none">'+
    '<button class="icon-btn" data-act="obj-left" data-i="'+i+'" aria-label="left">'+icon('up')+'</button>'+
    '<button class="icon-btn" data-act="obj-del" data-i="'+i+'" aria-label="delete">'+icon('trash')+'</button></div></div>').join('')+
    '<button class="obj-card btn ghost" data-act="obj-add" style="justify-content:center;min-height:110px">'+icon('plus')+esc(t('addObjective'))+'</button>';
}
function renderMap(){
  const d=view(), ini=d.si.initiatives;
  const lanes=d.si.objectives.slice();
  ini.forEach(x=>{ if(!lanes.find(o=>o.id===x.impact)) lanes.push(objOf(d,x.impact)); });
  $('funnel-map').style.gridTemplateColumns='repeat('+lanes.length+',minmax(0,1fr))';
  $('funnel-map').innerHTML=lanes.map((o,li)=>{
    const items=ini.filter(x=>x.impact===o.id), inset=Math.min(li*4,12);
    return '<div class="lane"><div class="lane-head" style="clip-path:polygon(0 0,100% 0,'+(100-inset/2)+'% 100%,'+(inset/2)+'% 100%)"><div class="band" style="background:'+esc(o.color)+'"></div>'+
      '<div class="inner"><div class="l-icon">'+icon(o.icon)+'</div><div><div class="l-step">'+(lang==='pt'?'Etapa ':'Stage ')+(li+1)+'</div><div class="l-name">'+esc(F(o.name))+'</div><div class="l-goal">'+esc(F(o.goal))+'</div></div><div class="l-count">'+items.length+'</div></div></div>'+
      '<div class="lane-body">'+(items.length?items.map(x=>
        '<button class="tile'+(matches(x)?'':' dim')+'" data-act="goto" data-id="'+esc(x.id)+'"><span class="t-icon">'+icon(x.icon)+'</span><span><span class="t-name">'+esc(F(x.short)||F(x.name))+'</span>'+
        '<span class="t-kpi" style="display:block">KPI: '+esc(F(x.kpi))+'</span><span class="t-flags">'+flags(x)+'</span></span></button>').join('')
        :'<div class="lane-empty">—</div>')+'</div></div>';
  }).join('');
}
function renderDetailHead(){
  const n=view().si.initiatives.length;
  $('detail-sub').textContent=t('detailSub');
  $('detail-cta').textContent=(detailOpen?t('hide'):t('show'))+' ('+n+')';
  $('detail-toggle').setAttribute('aria-expanded',String(detailOpen));
  $('detail-wrap').classList.toggle('open',detailOpen);
}
function renderFilters(){
  const d=view().si;
  const chip=(g,v,l,on,dot)=>'<button class="chip" data-fg="'+g+'" data-fv="'+esc(v)+'" aria-pressed="'+on+'">'+(dot?'<span class="dot" style="background:'+dot+'"></span>':'')+esc(l)+'</button>';
  const act=document.activeElement&&document.activeElement.id==='f-q';
  $('filters').innerHTML=
   '<div class="fgroup"><label>'+esc(t('objective'))+'</label><div class="chips">'+d.objectives.map(o=>chip('obj',o.id,F(o.name),filters.obj.has(o.id),o.color)).join('')+'</div></div>'+
   '<div class="fgroup"><label>'+esc(t('ownership'))+'</label><div class="chips">'+chip('cl','blip',t('blipLed'),filters.cluster==='blip','var(--status-positive)')+chip('cl','ext',t('needs'),filters.cluster==='ext','var(--boost)')+'</div></div>'+
   '<div class="fgroup"><label>'+esc(t('helpNeeded'))+'</label><div class="chips">'+chip('ask','meta','Meta',filters.asks.has('meta'),'var(--meta)')+chip('ask','boost','Boost',filters.asks.has('boost'),'var(--boost)')+'</div></div>'+
   '<div class="fgroup search"><label for="f-q">'+esc(t('search'))+'</label><input type="search" id="f-q" placeholder="'+esc(t('searchPh'))+'" value="'+esc(filters.q)+'"></div>'+
   '<div class="fgroup reset"><label>&nbsp;</label><div class="btn-row"><button class="btn ghost sm" data-act="expand-all">'+esc(t('expandAll'))+'</button><button class="btn ghost sm" data-act="collapse-all">'+esc(t('collapseAll'))+'</button><button class="btn ghost sm" data-act="clear-f">'+esc(t('clearFilters'))+'</button></div></div>';
  if(act){ const q=$('f-q'); q.focus(); q.setSelectionRange(q.value.length,q.value.length); }
}
function list(items,empty){ return items.length?'<ul class="bl">'+items.map(i=>'<li>'+esc(i)+'</li>').join('')+'</ul>':'<div class="none">'+esc(empty)+'</div>'; }
function renderCards(){
  const d=view(), ini=d.si.initiatives, ed=editable(), shown=ini.filter(matches);
  if(!ini.length){ $('cards').innerHTML='<div class="empty">'+esc(t('noInitiatives'))+'</div>'; return; }
  if(!shown.length){ $('cards').innerHTML='<div class="empty">'+esc(t('noMatch'))+' <button class="btn ghost sm" data-act="clear-f">'+esc(t('clearFilters'))+'</button></div>'; return; }
  $('cards').innerHTML=shown.map(x=>{
    const n=ini.indexOf(x)+1, o=objOf(d,x.impact), isOpen=open.has(x.id);
    let h='<article class="card'+(isOpen?' open':'')+'" id="card-'+esc(x.id)+'">'+
     '<div class="card-head" data-act="toggle" data-id="'+esc(x.id)+'" role="button" tabindex="0" aria-expanded="'+isOpen+'">'+
     '<span class="num">'+String(n).padStart(2,'0')+'</span><span class="c-icon" style="background:'+esc(o.color)+'">'+icon(x.icon)+'</span>'+
     '<div><div class="c-name">'+esc(F(x.name))+'</div><div class="c-short">'+esc(F(x.short))+'</div><div class="c-badges">'+
     '<span class="badge dim" style="color:'+esc(o.color)+';border-color:'+esc(o.color)+'">'+esc(F(o.name))+'</span>'+
     '<span class="badge '+(x.cluster==='blip'?'blip':'dim')+'">'+esc(x.cluster==='blip'?t('blipLed'):t('needs'))+'</span>'+
     '<span class="badge dim">'+esc(t('eta'))+': '+esc(F(x.eta))+'</span>'+flags(x)+'</div></div>'+
     '<div class="c-right"><div class="asks-mini"><span><span class="dot meta"></span>'+A(x.helpMeta).length+'</span><span><span class="dot boost"></span>'+A(x.helpBoost).length+'</span></div><span class="chev">'+icon('chev')+'</span></div></div><div class="card-body">';
    if(ed){
      const sel=(f,opts,val)=>'<select data-id="'+esc(x.id)+'" data-f="'+f+'">'+opts.map(([v,l])=>'<option value="'+esc(v)+'"'+(v===val?' selected':'')+'>'+esc(l)+'</option>').join('')+'</select>';
      h+='<div class="lang-tip">'+icon('globe')+esc(t('langTip'))+'</div><div class="editor">'+
       '<div class="field c8"><label>'+esc(t('fieldName'))+'</label><input type="text" data-id="'+esc(x.id)+'" data-f="name" value="'+esc(F(x.name))+'"></div>'+
       '<div class="field c4"><label>'+esc(t('fieldEta'))+'</label><input type="text" data-id="'+esc(x.id)+'" data-f="eta" value="'+esc(F(x.eta))+'"></div>'+
       '<div class="field c6"><label>'+esc(t('fieldShort'))+'</label><input type="text" data-id="'+esc(x.id)+'" data-f="short" maxlength="90" value="'+esc(F(x.short))+'"><span class="hint">'+esc(t('shortHint'))+'</span></div>'+
       '<div class="field c6"><label>'+esc(t('fieldKpi'))+'</label><input type="text" data-id="'+esc(x.id)+'" data-f="kpi" value="'+esc(F(x.kpi))+'"></div>'+
       '<div class="field c4"><label>'+esc(t('fieldObj'))+'</label>'+sel('impact',d.si.objectives.map(o2=>[o2.id,F(o2.name)]).concat([['__new',t('newObjective')]]),x.impact)+'</div>'+
       '<div class="field c4"><label>'+esc(t('fieldOwner'))+'</label>'+sel('cluster',[['blip',F(d.si.clusters.blip)],['ext',F(d.si.clusters.ext)]],x.cluster)+'</div>'+
       '<div class="field c4"><div class="checks"><label><input type="checkbox" data-id="'+esc(x.id)+'" data-f="top"'+(x.top?' checked':'')+'>'+esc(t('topPriority'))+'</label></div></div>'+
       '<div class="field c12"><label>'+esc(t('fieldIcon'))+'</label><div class="icon-pick">'+ICONS.map(ic=>'<button type="button" data-act="icon" data-id="'+esc(x.id)+'" data-ic="'+ic+'" aria-pressed="'+(ic===x.icon)+'" aria-label="'+ic+'">'+icon(ic)+'</button>').join('')+'</div></div>'+
       '<div class="field c12"><label>'+esc(t('fieldDetailed'))+'</label><textarea rows="6" data-id="'+esc(x.id)+'" data-f="detailed">'+esc(A(x.detailed).join('\n'))+'</textarea><span class="hint">'+esc(t('oneBullet'))+'</span></div>'+
       '<div class="field c6"><label>'+esc(t('helpMeta'))+'</label><textarea rows="4" data-id="'+esc(x.id)+'" data-f="helpMeta">'+esc(A(x.helpMeta).join('\n'))+'</textarea><span class="hint">'+esc(t('oneAsk'))+'</span></div>'+
       '<div class="field c6"><label>'+esc(t('helpBoost'))+'</label><textarea rows="4" data-id="'+esc(x.id)+'" data-f="helpBoost">'+esc(A(x.helpBoost).join('\n'))+'</textarea><span class="hint">'+esc(t('oneAsk'))+'</span></div>'+
       '<div class="c12 card-tools"><button class="btn ghost sm" data-act="up" data-id="'+esc(x.id)+'">'+icon('up')+esc(t('moveUp'))+'</button>'+
       '<button class="btn ghost sm" data-act="down" data-id="'+esc(x.id)+'">'+icon('down')+esc(t('moveDown'))+'</button>'+
       '<button class="btn ghost sm" data-act="dup" data-id="'+esc(x.id)+'">'+icon('copy')+esc(t('duplicate'))+'</button>'+
       '<button class="btn danger sm" data-act="del" data-id="'+esc(x.id)+'">'+icon('trash')+esc(t('del'))+'</button></div></div>';
    }
    h+='<div class="kpi-line">'+icon('target')+'<div><div class="kl-lbl">'+esc(t('kpiLine'))+'</div><div class="kl-val">'+esc(F(x.kpi))+'</div>'+
      '<div class="kl-obj">'+esc(t('objective'))+': '+esc(F(o.name))+(F(o.goal)?'. '+esc(F(o.goal)):'')+'</div></div></div>'+
      '<div class="body-grid"><div><h4 class="sub-h">'+icon('chat')+esc(t('why'))+'</h4>'+list(A(x.detailed),t('noDesc'))+'</div>'+
      '<div><div class="asks-box meta"><h4 class="sub-h"><span class="dot meta"></span>'+esc(t('helpMeta'))+'</h4>'+list(A(x.helpMeta),t('noMeta'))+'</div>'+
      '<div class="asks-box boost"><h4 class="sub-h"><span class="dot boost"></span>'+esc(t('helpBoost'))+'</h4>'+list(A(x.helpBoost),t('noBoost'))+'</div>'+
      '<div style="font-size:11px;color:var(--text-dim)">'+esc(t('ownership'))+': '+esc(F(d.si.clusters[x.cluster]))+'</div></div></div>';
    return h+'</div></article>';
  }).join('');
}
function renderBoard(){
  const d=view().si, shown=d.initiatives.filter(matches);
  const col=(k,label,key)=>{
    const g=shown.filter(x=>A(x[key]).length), total=g.reduce((a,x)=>a+A(x[key]).length,0);
    return '<div class="board-col '+k+'"><div class="bc-head"><span class="dot '+k+'"></span><h3>'+label+'</h3><span class="bc-count">'+esc(t('asksAcross')(total,g.length))+'</span></div><div class="bc-body">'+
     (g.length?g.map(x=>'<div class="ask-group"><div class="ag-head" data-act="goto" data-id="'+esc(x.id)+'">'+icon(x.icon)+'<span>'+esc(F(x.short)||F(x.name))+'</span></div>'+list(A(x[key]),'')+'</div>').join('')
      :'<div class="none" style="padding:10px 0">'+esc(t('noAsks'))+'</div>')+'</div></div>';
  };
  $('board').innerHTML=col('meta','Meta','helpMeta')+col('boost','Boost','helpBoost');
}
function renderExec(){
  const e=view().exec, ed=editable();
  const inp=(path,val,type)=>'<input type="'+(type||'text')+'" data-ex="'+path+'" value="'+esc(val)+'">';
  const base=e.funnel[0].v||1, maxAcq=Math.max.apply(null,e.acq.map(a=>a.v))||1;
  let h='<div class="ex-head"><div><h1>'+esc(F(e.meta.title))+'</h1></div><div class="ex-meta">'+esc(F(e.meta.period))+'<br>'+esc(F(e.meta.generated))+'</div></div>';
  if(ed) h+='<div class="editor" style="border:none"><div class="field c6"><label>'+esc(t('fieldName'))+'</label>'+inp('meta.title',F(e.meta.title))+'</div>'+
    '<div class="field c3"><label>'+esc(t('fieldEta'))+'</label>'+inp('meta.period',F(e.meta.period))+'</div>'+
    '<div class="field c3"><label>—</label>'+inp('meta.generated',F(e.meta.generated))+'</div></div>';
  h+='<div class="kpis" style="margin-bottom:18px">'+e.kpis.map(k=>'<div class="kpi"><div class="k-value'+(k.tone==='blue'?' blue':'')+'">'+(ed?inp('kpis.'+k.id+'.n',k.n):esc(k.n))+'</div>'+
    '<div class="k-label">'+(ed?inp('kpis.'+k.id+'.label',F(k.label)):esc(F(k.label)))+'</div>'+
    (F(k.delta)||ed?'<div class="k-context">'+(ed?inp('kpis.'+k.id+'.delta',F(k.delta)):esc(F(k.delta)))+'</div>':'')+'</div>').join('')+'</div>';
  h+='<div class="ex-grid"><div class="panel"><h3>'+esc(F(e.funnelTitle))+'</h3><div class="ex-funnel fstrip">';
  e.funnel.forEach((s,i)=>{
    if(i>0){ const p=e.funnel[i-1].v?(1-s.v/e.funnel[i-1].v)*100:0;
      h+='<div class="fdrop"><div class="fd-pct">▼ '+pf(p)+'</div><div class="fd-arrow">'+icon('right')+'</div></div>'; }
    const bar=Math.max(8,Math.round(84*Math.max(s.v/base,.08)));
    h+='<div class="fstage"><div><div class="fs-val">'+nf(s.v)+'</div><div class="fs-lbl">'+esc(F(s.label))+'</div>'+
      (ed?'<div style="margin-top:6px">'+inp('funnel.'+s.id+'.v',s.v,'number')+'</div>':'')+'</div><div class="fs-bar" style="height:'+bar+'px"></div></div>';
  });
  h+='</div><div style="margin-top:6px"><div class="sub-h">'+esc(F(e.acqTitle))+'</div>'+
    e.acq.map(a=>'<div class="bar-row"><span class="k">'+(ed?inp('acq.'+a.id+'.label',F(a.label)):esc(F(a.label)))+'</span>'+
      '<span class="track"><span class="fill" style="width:'+(a.v/maxAcq*100)+'%;background:'+esc(a.color)+'"></span></span>'+
      '<span class="v">'+(ed?inp('acq.'+a.id+'.v',a.v,'number'):nf(a.v))+'</span></div>').join('')+'</div></div>';
  h+='<div class="panel"><h3>'+esc(F(e.commTitle))+'</h3><table class="mini"><tr><th>'+(lang==='pt'?'Indicador':'Indicator')+'</th><th style="text-align:right">'+(lang==='pt'?'Semana 11':'Week 11')+'</th></tr>'+
    e.comm.map(c=>'<tr><td>'+(ed?inp('comm.'+c.id+'.label',F(c.label)):esc(F(c.label)))+'</td><td class="r '+esc(c.tone||'')+'">'+(ed?inp('comm.'+c.id+'.v',c.v):esc(c.v))+'</td></tr>').join('')+'</table></div></div>';
  h+='<div class="roadmap">'+e.roadmap.map(col=>'<div class="col-card '+esc(col.tone||'')+'"><h3><span>'+(ed?inp('roadmap.'+col.id+'.title',F(col.title)):esc(F(col.title)))+'</span><span class="c">'+(ed?inp('roadmap.'+col.id+'.count',col.count):esc(col.count))+'</span></h3><ul>'+
    col.items.map(it=>'<li>'+(ed?inp('rmitem.'+it.id+'.text',F(it.text)):esc(F(it.text)))+'<span class="d">'+(ed?inp('rmitem.'+it.id+'.date',F(it.date)):esc(F(it.date)))+'</span>'+
    (ed?'<div class="card-tools" style="margin-top:4px"><button class="btn danger sm" data-act="ex-del-item" data-col="'+col.id+'" data-id="'+it.id+'">'+icon('trash')+'</button></div>':'')+'</li>').join('')+
    (ed?'<li><button class="btn ghost sm" data-act="ex-add-item" data-col="'+col.id+'">'+icon('plus')+esc(t('add'))+'</button></li>':'')+'</ul></div>').join('')+'</div>';
  const bl=(g,key)=>'<div class="panel '+(key==='wins'?'win':'chg')+'"><h3>'+(ed?inp(key+'.title',F(g.title)):esc(F(g.title)))+'</h3><ul class="bl">'+
    g.items.map(it=>'<li>'+(ed?inp(key+'item.'+it.id,F(it.text)):esc(F(it.text)))+'</li>').join('')+'</ul></div>';
  h+='<div class="qual">'+bl(e.wins,'wins')+bl(e.challenges,'challenges')+'</div>';
  h+='<div class="ex-foot">'+(ed?'<div class="field"><label>'+esc(t('source'))+'</label><textarea rows="2" data-ex="footer.src">'+esc(F(e.footer.src))+'</textarea>'+
     '<label style="margin-top:8px">Notes</label><textarea rows="4" data-ex="footer.notes">'+esc(F(e.footer.notes))+'</textarea></div>'
     :esc(F(e.footer.src))+' '+esc(F(e.footer.notes)))+'</div>';
  $('page-exec').innerHTML=h;
}

function renderHelp(){
  const d=view().si, ed=editable();
  const gm=d.initiatives.filter(x=>A(x.helpMeta).length), gb=d.initiatives.filter(x=>A(x.helpBoost).length);
  const nm=gm.reduce((a,x)=>a+A(x.helpMeta).length,0), nb=gb.reduce((a,x)=>a+A(x.helpBoost).length,0);
  const card=(x,key,cls)=>{
    const o=objOf(view(),x.impact), bench=x.bench?F(x.bench):'';
    return '<article class="hn-card">'+
      '<header class="hn-head"><span class="hn-ic '+cls+'">'+icon(x.icon)+'</span>'+
      '<div><div class="hn-name">'+esc(F(x.name))+'</div><div class="hn-badges">'+
      '<span class="badge dim" style="color:'+esc(o.color)+';border-color:'+esc(o.color)+'">'+esc(F(o.name))+'</span>'+
      (x.top?'<span class="badge top">'+icon('star')+esc(t('hnBlocked'))+'</span>':'')+
      '<span class="badge dim">'+esc(t('eta'))+': '+esc(F(x.eta))+'</span></div></div>'+
      '<span class="hn-n">'+A(x[key]).length+' '+esc(t('hnAsks'))+'</span></header>'+
      '<div class="hn-body"><div><h4 class="sub-h">'+esc(t('hnWhat'))+'</h4>'+list(A(x[key]),'')+'</div>'+
      '<div class="hn-why"><h4 class="sub-h">'+icon('target')+esc(t('hnWhy'))+'</h4><p>'+esc(F(x.kpi))+'</p></div></div>'+
      '<div class="hn-proof"><h4 class="sub-h">'+icon('chart')+esc(t('hnProof'))+'</h4>'+
      (ed?'<textarea rows="3" data-bench="'+esc(x.id)+'" placeholder="'+esc(t('hnProofPh'))+'">'+esc(bench)+'</textarea>'
        :(bench?'<p class="hn-bench">'+esc(bench)+'</p>':'<p class="none">'+esc(t('hnNoProof'))+'</p>'))+'</div></article>';
  };
  const col=(g,key,label,cls,n)=>'<section class="hn-col"><div class="hn-col-head '+cls+'"><span class="dot '+cls+'"></span><h3>'+esc(t('hnFor'))+' '+label+'</h3>'+
    '<span class="hn-col-n">'+n+' '+esc(t('hnAsks'))+' \u00b7 '+g.length+' '+esc(t('initiatives')).toLowerCase()+'</span></div>'+
    (g.length?g.map(x=>card(x,key,cls)).join(''):'<div class="empty">'+esc(t('noAsks'))+'</div>')+'</section>';
  const withBench=d.initiatives.filter(x=>x.bench&&F(x.bench)).length;
  $('page-help').innerHTML='<section class="section"><h2 class="section-title">'+icon('bolt')+esc(t('hnTitle'))+'</h2>'+
    '<p class="section-lead">'+esc(t('hnLead'))+'</p>'+
    '<div class="kpis" style="margin-bottom:18px">'+
    '<div class="kpi"><div class="k-label"><span class="dot meta"></span>'+esc(t('asksMeta'))+'</div><div class="k-value">'+nm+'</div><div class="k-context">'+esc(t('initiativesWith')(gm.length))+'</div></div>'+
    '<div class="kpi"><div class="k-label"><span class="dot boost"></span>'+esc(t('asksBoost'))+'</div><div class="k-value">'+nb+'</div><div class="k-context">'+esc(t('initiativesWith')(gb.length))+'</div></div>'+
    '<div class="kpi"><div class="k-label">'+esc(t('topPriority'))+'</div><div class="k-value">'+d.initiatives.filter(x=>x.top).length+'</div><div class="k-context">'+esc(t('prerequisite'))+'</div></div>'+
    '<div class="kpi"><div class="k-label">'+esc(t('hnProof'))+'</div><div class="k-value">'+withBench+'</div><div class="k-context">'+esc(t('hnWith'))+'</div></div></div>'+
    '<div class="hn-grid">'+col(gm,'helpMeta','Meta','meta',nm)+col(gb,'helpBoost','Boost','boost',nb)+'</div></section>';
}

/* ---------------- mutations ---------------- */
let draftTimer=null,lightTimer=null;
function touch(heavy){
  dirty=true;
  clearTimeout(draftTimer); draftTimer=setTimeout(()=>lsSet(LS.draft,{data:state,base:baseVersion,dirty:true}),400);
  if(heavy){ renderAll(); return; }
  clearTimeout(lightTimer); lightTimer=setTimeout(()=>{ if(tab==='si'){ renderFbox(); renderMap(); renderBoard(); renderDetailHead(); } renderStatus(); },280);
  renderStatus();
}
function find(id){ return state.si.initiatives.find(x=>x.id===id); }
function newId(){ return 'i'+Date.now().toString(36)+Math.random().toString(36).slice(2,5); }
function toLines(v){ return v.split('\n').map(s=>s.replace(/^\s*[-•]\s*/,'').trim()).filter(Boolean); }
function exTarget(path){
  const e=state.exec, p=path.split('.');
  if(p[0]==='meta') return [e.meta,p[1],'i18n'];
  if(p[0]==='kpis'){ const k=e.kpis.find(k=>k.id===p[1]); return [k,p[2],p[2]==='n'?'raw':'i18n']; }
  if(p[0]==='funnel'){ const f=e.funnel.find(f=>f.id===p[1]); return [f,p[2],'num']; }
  if(p[0]==='acq'){ const a=e.acq.find(a=>a.id===p[1]); return [a,p[2],p[2]==='v'?'num':'i18n']; }
  if(p[0]==='comm'){ const c=e.comm.find(c=>c.id===p[1]); return [c,p[2],p[2]==='v'?'raw':'i18n']; }
  if(p[0]==='roadmap'){ const c=e.roadmap.find(c=>c.id===p[1]); return [c,p[2],p[2]==='count'?'raw':'i18n']; }
  if(p[0]==='rmitem'){ for(const c of e.roadmap){ const it=c.items.find(i=>i.id===p[1]); if(it) return [it,p[2],'i18n']; } return [null]; }
  if(p[0]==='wins'||p[0]==='challenges') return [e[p[0]],p[1],'i18n'];
  if(p[0]==='winsitem'||p[0]==='challengesitem'){ const g=e[p[0]==='winsitem'?'wins':'challenges']; const it=g.items.find(i=>i.id===p[1]); return [it,'text','i18n']; }
  if(p[0]==='footer') return [e.footer,p[1],'i18n'];
  return [null];
}
document.addEventListener('input',e=>{
  const el=e.target;
  if(el.id==='f-q'){ filters.q=el.value; renderMap(); renderCards(); renderBoard(); return; }
  if(!editable()) return;
  if(el.dataset.meta){ setF(state.si.meta[el.dataset.meta],el.textContent.trim()); touch(false); return; }
  if(el.dataset.fn){ const s=state.si.funnel.find(s=>s.id===el.dataset.fn); if(s){ s.v=+el.value||0; touch(false);} return; }
  if(el.dataset.obj!=null){ const o=state.si.objectives[+el.dataset.obj], f=el.dataset.f;
    if(f==='color') o.color=el.value; else setF(o[f],el.value); touch(false); return; }
  if(el.dataset.ex){ const [o,k,kind]=exTarget(el.dataset.ex); if(!o) return;
    if(kind==='num') o[k]=+el.value||0; else if(kind==='raw') o[k]=el.value; else setF(o[k],el.value);
    dirty=true; clearTimeout(draftTimer); draftTimer=setTimeout(()=>lsSet(LS.draft,{data:state,base:baseVersion,dirty:true}),400); renderStatus(); return; }
  if(el.dataset.bench){ const x=find(el.dataset.bench);
    if(x){ if(!x.bench) x.bench={en:'',pt:''}; setF(x.bench,el.value); dirty=true; renderStatus();
      clearTimeout(draftTimer); draftTimer=setTimeout(()=>lsSet(LS.draft,{data:state,dirty:true}),400); }
    return; }
  const x=el.dataset.id&&find(el.dataset.id); if(!x||!el.dataset.f) return;
  const f=el.dataset.f;
  if(el.type==='checkbox'||el.tagName==='SELECT') return;
  if(['detailed','helpMeta','helpBoost'].includes(f)) setA(x[f],toLines(el.value)); else setF(x[f],el.value);
  const card=$('card-'+x.id);
  if(card){ if(f==='name') card.querySelector('.c-name').textContent=el.value;
    if(f==='short') card.querySelector('.c-short').textContent=el.value;
    if(f==='kpi') card.querySelector('.kl-val').textContent=el.value; }
  touch(false);
});
document.addEventListener('change',e=>{
  const el=e.target; if(!editable()) return;
  if(el.dataset.obj!=null&&el.dataset.f==='color'){ touch(true); return; }
  if(el.dataset.fn||el.dataset.ex){ if(tab==='exec') renderExec(); else touch(true); return; }
  const x=el.dataset.id&&find(el.dataset.id); if(!x) return;
  if(el.type==='checkbox'){ x[el.dataset.f]=el.checked; touch(true); return; }
  if(el.tagName==='SELECT'){
    if(el.value==='__new'){ askText(t('newObjective'),t('objName'),'',name=>{
      if(!name){ renderCards(); return; }
      const id='o'+Date.now().toString(36); state.si.objectives.push({id:id,name:{en:name,pt:name},goal:{en:'',pt:''},icon:'flag',color:'#8B5CF6'}); x.impact=id; touch(true); });
      return; }
    x[el.dataset.f]=el.value; touch(true); return; }
  if(['detailed','helpMeta','helpBoost'].includes(el.dataset.f)){ renderBoard(); renderMap(); }
});
document.addEventListener('keydown',e=>{
  if((e.key==='Enter'||e.key===' ')&&e.target.dataset&&e.target.dataset.act==='toggle'){ e.preventDefault(); e.target.click(); }
  if(e.key==='Escape'){ closeDrawer(); closeModal(); }
});
document.addEventListener('click',e=>{
  const logo=e.target.closest('.logo-slot');
  if(logo&&editable()){ const k=logo.dataset.brand;
    if(e.shiftKey){ logos[k]=null; saveLogo(k); renderLogos(); toast(t('logoReset')); return; }
    pendingLogo=k; $('logo-file').click(); return; }
  const tb=e.target.closest('[data-tab]');
  if(tb){ tab=tb.dataset.tab; lsSet(LS.prefs,{lang:lang,tab:tab}); renderAll(); window.scrollTo({top:0,behavior:'smooth'}); return; }
  const b=e.target.closest('[data-act],[data-fg]'); if(!b) return;
  if(b.dataset.fg){ const g=b.dataset.fg,v=b.dataset.fv;
    if(g==='obj'){ filters.obj.has(v)?filters.obj.delete(v):filters.obj.add(v); }
    if(g==='cl'){ filters.cluster=filters.cluster===v?null:v; }
    if(g==='ask'){ filters.asks.has(v)?filters.asks.delete(v):filters.asks.add(v); }
    renderFilters(); renderMap(); renderCards(); renderBoard(); return; }
  const act=b.dataset.act,id=b.dataset.id,d=view();
  switch(act){
    case 'toggle': if(e.target.closest('input,select,textarea,button:not([data-act="toggle"])')) return;
      open.has(id)?open.delete(id):open.add(id);
      { const c=$('card-'+id); if(c){ c.classList.toggle('open'); b.setAttribute('aria-expanded',String(open.has(id))); } } break;
    case 'goto': open.add(id); detailOpen=true;
      if(!d.si.initiatives.find(x=>x.id===id&&matches(x))){ filters.obj.clear(); filters.cluster=null; filters.asks.clear(); filters.q=''; renderFilters(); renderMap(); renderBoard(); }
      renderDetailHead(); renderCards();
      { const el=$('card-'+id); if(el){ el.scrollIntoView({behavior:'smooth',block:'start'}); el.classList.add('flash'); setTimeout(()=>el.classList.remove('flash'),1300);} } break;
    case 'expand-all': d.si.initiatives.forEach(x=>open.add(x.id)); renderCards(); break;
    case 'collapse-all': open.clear(); renderCards(); break;
    case 'clear-f': filters.obj.clear(); filters.cluster=null; filters.asks.clear(); filters.q=''; renderFilters(); renderMap(); renderCards(); renderBoard(); break;
    case 'icon': { const x=find(id); if(x){ x.icon=b.dataset.ic; touch(true);} break; }
    case 'up': case 'down': { const a=state.si.initiatives,i=a.findIndex(x=>x.id===id),j=act==='up'?i-1:i+1;
      if(j<0||j>=a.length) return; const tmp=a[i]; a[i]=a[j]; a[j]=tmp; touch(true); break; }
    case 'dup': { const i=state.si.initiatives.findIndex(x=>x.id===id),cp=clone(state.si.initiatives[i]); cp.id=newId();
      cp.name={en:(cp.name.en||'')+' (copy)',pt:(cp.name.pt||'')+' (cópia)'}; state.si.initiatives.splice(i+1,0,cp); open.add(cp.id); touch(true); break; }
    case 'del': { const x=find(id); confirmBox(t('deleteTitle'),t('deleteMsg')(F(x.name)),t('del'),()=>{
      state.si.initiatives=state.si.initiatives.filter(y=>y.id!==id); open.delete(id); touch(true); }); break; }
    case 'obj-add': state.si.objectives.push({id:'o'+Date.now().toString(36),name:{en:'New objective',pt:'Novo objetivo'},goal:{en:'',pt:''},icon:'flag',color:'#8B5CF6'}); touch(true); break;
    case 'obj-left': { const i=+b.dataset.i; if(i<1) return; const a=state.si.objectives,tmp=a[i-1]; a[i-1]=a[i]; a[i]=tmp; touch(true); break; }
    case 'obj-del': { const i=+b.dataset.i,o=state.si.objectives[i],used=state.si.initiatives.filter(x=>x.impact===o.id).length;
      if(used){ toast(t('objInUse')(used,F(o.name)),true); return; } state.si.objectives.splice(i,1); touch(true); break; }
    case 'ex-add-item': { const col=state.exec.roadmap.find(c=>c.id===b.dataset.col);
      col.items.push({id:'x'+Date.now().toString(36),text:{en:'',pt:''},date:{en:'',pt:''}}); touch(true); renderExec(); break; }
    case 'ex-del-item': { const col=state.exec.roadmap.find(c=>c.id===b.dataset.col);
      col.items=col.items.filter(i=>i.id!==id); touch(true); renderExec(); break; }
    case 'restore': { const src=clone(view()); confirmBox(t('loadTitle'),t('loadMsg'),t('loadEditor'),()=>{
      state=src; baseVersion=viewing.kind==='original'?null:{id:viewing.id,label:viewing.label,savedAt:viewing.savedAt};
      viewing=null; dirty=false; lsSet(LS.draft,null); mode='edit'; renderAll(); }); break; }
    case 'exit-view': viewing=null; renderAll(); break;
    case 'pull': pullRemote(); break;
    case 'view-original': viewing={kind:'original'}; closeDrawer(); renderAll(); window.scrollTo({top:0}); break;
    case 'view-version': openVersion(id); break;
    case 'close-modal': closeModal(); break;
  }
});
$('detail-toggle').onclick=()=>{ detailOpen=!detailOpen; renderDetailHead(); if(detailOpen) renderCards(); };
$('mode-display').onclick=()=>{ mode='display'; renderAll(); };
$('mode-edit').onclick=()=>{ mode='edit'; renderAll(); };
$('lang-en').onclick=()=>{ lang='en'; lsSet(LS.prefs,{lang:lang,tab:tab}); renderAll(); };
$('lang-pt').onclick=()=>{ lang='pt'; lsSet(LS.prefs,{lang:lang,tab:tab}); renderAll(); };
$('btn-add').onclick=()=>{
  if(tab!=='si'){ tab='si'; }
  const o=state.si.objectives[0]||{id:'qual'};
  const x={id:newId(),icon:'flag',impact:o.id,cluster:'ext',top:false,eta:{en:'No ETA',pt:'Sem previsão'},
    name:{en:STR.en.newInitiative,pt:STR.pt.newInitiative},short:{en:'',pt:''},kpi:{en:'',pt:''},
    detailed:{en:[],pt:[]},helpMeta:{en:[],pt:[]},helpBoost:{en:[],pt:[]}};
  state.si.initiatives.push(x); open.add(x.id); detailOpen=true;
  filters.obj.clear(); filters.cluster=null; filters.asks.clear(); filters.q=''; touch(true);
  const el=$('card-'+x.id); if(el){ el.scrollIntoView({behavior:'smooth',block:'start'}); const i=el.querySelector('input[data-f="name"]'); if(i) i.select(); }
};
$('btn-versions').onclick=openDrawer;
$('drawer-close').onclick=closeDrawer; $('drawer-back').onclick=closeDrawer;
$('btn-save').onclick=()=>{ askSave(async(label,note)=>{
  const rec={id:'v'+Date.now().toString(36),label:label||('v'+(versions.length+1)),note:note||'',savedAt:Date.now(),data:clone(state)};
  if(!await persistVersion(rec)) return;
  baseVersion={id:rec.id,label:rec.label,savedAt:rec.savedAt}; dirty=false; lsSet(LS.draft,null);
  renderAll(); toast(t('savedToast')+': '+rec.label+'');
}); };

/* ---------------- dialogs ---------------- */
function openModal(h){ $('modal').innerHTML=h; $('modal-back').classList.add('open'); const f=$('modal').querySelector('input,textarea,button'); if(f) f.focus(); }
function closeModal(){ $('modal-back').classList.remove('open'); }
$('modal-back').addEventListener('click',e=>{ if(e.target.id==='modal-back') closeModal(); });
function confirmBox(title,msg,ok,cb){
  openModal('<h3>'+esc(title)+'</h3><p style="font-size:12.5px;color:var(--text-secondary);line-height:1.5;margin:0 0 16px">'+esc(msg)+'</p>'+
   '<div class="btn-row" style="justify-content:flex-end"><button class="btn ghost sm" data-act="close-modal">'+esc(t('cancel'))+'</button><button class="btn sm" id="m-ok">'+esc(ok)+'</button></div>');
  $('m-ok').onclick=()=>{ closeModal(); cb(); };
}
function askText(title,label,val,cb){
  openModal('<h3>'+esc(title)+'</h3><div class="field"><label for="m-t">'+esc(label)+'</label><input type="text" id="m-t" value="'+esc(val)+'"></div>'+
   '<div class="btn-row" style="justify-content:flex-end"><button class="btn ghost sm" id="m-cancel">'+esc(t('cancel'))+'</button><button class="btn sm" id="m-ok">'+esc(t('add'))+'</button></div>');
  $('m-ok').onclick=()=>{ const v=$('m-t').value.trim(); closeModal(); cb(v); };
  $('m-cancel').onclick=()=>{ closeModal(); cb(''); };
}
function askSave(cb){
  openModal('<h3>'+esc(t('save'))+'</h3><div class="field"><label for="m-l">'+esc(t('versionName'))+'</label><input type="text" id="m-l" maxlength="60"></div>'+
   '<div class="field"><label for="m-n">'+esc(t('note'))+'</label><textarea id="m-n" rows="3" placeholder="'+esc(t('whatChanged'))+'"></textarea></div>'+
   '<p style="font-size:11px;color:var(--text-dim);margin:0 0 14px">'+esc(t('storeShared'))+'</p>'+
   '<div class="btn-row" style="justify-content:flex-end"><button class="btn ghost sm" data-act="close-modal">'+esc(t('cancel'))+'</button><button class="btn sm" id="m-ok">'+icon('save')+esc(t('save'))+'</button></div>');
  $('m-ok').onclick=()=>{ const l=$('m-l').value.trim(),n=$('m-n').value.trim(); closeModal(); cb(l,n); };
}
function openDrawer(){ renderDrawer(); $('drawer').classList.add('open'); $('drawer-back').classList.add('open'); }
function closeDrawer(){ $('drawer').classList.remove('open'); $('drawer-back').classList.remove('open'); }
function renderDrawer(){
  const cur=baseVersion&&baseVersion.id;
  $('drawer-body').innerHTML='<p class="store-note">'+esc(t('storeShared'))+' '+esc(t('versionsHint'))+'</p>'+
   '<div class="ver'+(cur?'':' current')+'"><div class="v-name">'+icon('shield')+esc(t('original'))+(cur?'':'<span class="badge top">'+esc(t('loaded'))+'</span>')+'</div>'+
   '<div class="v-meta">'+esc(t('originalDesc'))+'</div><div class="btn-row"><button class="btn ghost sm" data-act="view-original">'+icon('eye')+esc(t('viewOriginal'))+'</button></div></div>'+
   (versions.length?versions.map(v=>'<div class="ver'+(v.id===cur?' current':'')+'"><div class="v-name">'+icon('history')+esc(v.label)+(v.id===cur?'<span class="badge top">'+esc(t('loaded'))+'</span>':'')+'</div>'+
     '<div class="v-meta">'+esc(fmtDate(v.savedAt))+'</div>'+(v.note?'<div class="v-note">'+esc(v.note)+'</div>':'')+
     '<div class="btn-row"><button class="btn ghost sm" data-act="view-version" data-id="'+esc(v.id)+'">'+icon('eye')+esc(t('view'))+'</button></div></div>').join('')
    :'<div class="empty" style="padding:16px;font-size:12px">'+esc(t('noVersions'))+'</div>');
}
async function openVersion(id){
  const v=versions.find(x=>x.id===id); if(!v) return;
  let data=v.data;
  if(!data){ try{ data=await openVersionRemote(id); }catch(e){ data=null; } }
  if(!data){ toast(t('loadErr'),true); return; }
  viewing={kind:'version',id:v.id,label:v.label,savedAt:v.savedAt,data:data};
  closeDrawer(); renderAll(); window.scrollTo({top:0});
}
let pendingLogo=null;
$('logo-file').addEventListener('change',e=>{
  const f=e.target.files[0]; e.target.value=''; if(!f||!pendingLogo) return;
  if(f.size>180*1024){ toast('> 180 KB',true); return; }
  const r=new FileReader(); r.onload=()=>{ logos[pendingLogo]=r.result; saveLogo(pendingLogo); renderLogos(); toast(t('logoUpdated')); }; r.readAsDataURL(f);
});
async function saveLogo(k){ lsSet(LS.logos,logos); }

/* ---------------- shared storage: GitHub contents API ---------------- */
function ghHeaders(){ const h={'Accept':'application/vnd.github+json'}; if(token) h.Authorization='Bearer '+token; return h; }
function b64enc(str){ return btoa(unescape(encodeURIComponent(str))); }
function b64dec(str){ return decodeURIComponent(escape(atob(String(str).replace(/\n/g,'')))); }
async function ghGet(path){
  const url='https://api.github.com/repos/'+CFG.owner+'/'+CFG.repo+'/contents/'+path+'?ref='+CFG.branch+'&t='+Date.now();
  const r=await fetch(url,{headers:ghHeaders(),cache:'no-store'});
  if(r.status===404) return null;
  if(!r.ok) throw new Error('GET '+r.status);
  const j=await r.json();
  return {sha:j.sha,json:JSON.parse(b64dec(j.content))};
}
async function ghPut(path,obj,sha,msg){
  const body={message:msg,content:b64enc(JSON.stringify(obj)),branch:CFG.branch};
  if(sha) body.sha=sha;
  const r=await fetch('https://api.github.com/repos/'+CFG.owner+'/'+CFG.repo+'/contents/'+path,
    {method:'PUT',headers:Object.assign({'Content-Type':'application/json'},ghHeaders()),body:JSON.stringify(body)});
  if(!r.ok) throw new Error('PUT '+r.status+' '+(await r.text()).slice(0,120));
  return (await r.json()).content.sha;
}
let contentSha=null;
async function loadShared(){
  const c=await ghGet(CFG.dataPath);
  if(!c) return null;
  contentSha=c.sha;
  remoteMeta={updatedAt:c.json.updatedAt,updatedBy:c.json.updatedBy};
  versions=(c.json.versions||[]).slice().sort((a,b)=>b.savedAt-a.savedAt);
  return (c.json.data&&c.json.data.schema===ORIGINAL.schema)?c.json.data:null;
}
async function saveShared(rec){
  if(!token){ toast(t('needToken'),true); return false; }
  syncing=true; renderStatus();
  try{
    const cur=await ghGet(CFG.dataPath);
    contentSha=cur?cur.sha:null;
    const vlist=(cur&&cur.json.versions?cur.json.versions.slice():[]);
    if(rec){
      await ghPut(CFG.versionsPath+rec.id+'.json',{id:rec.id,label:rec.label,note:rec.note,savedAt:rec.savedAt,author:rec.author,data:rec.data},null,'version: '+rec.label);
      vlist.unshift({id:rec.id,label:rec.label,note:rec.note,savedAt:rec.savedAt,author:rec.author});
    }
    const payload={schema:ORIGINAL.schema,updatedAt:Date.now(),updatedBy:profile?profile.name:'',data:state,versions:vlist.slice(0,40)};
    contentSha=await ghPut(CFG.dataPath,payload,contentSha,(rec?'save version: '+rec.label:'update')+' \u2014 '+(profile?profile.name:''));
    remoteMeta={updatedAt:payload.updatedAt,updatedBy:payload.updatedBy};
    versions=payload.versions; remoteAhead=false; syncing=false; renderStatus();
    return true;
  }catch(e){ syncing=false; toast(t('syncErr')+': '+e.message,true); renderStatus(); return false; }
}
async function persistVersion(rec){
  rec.author=profile?profile.name:'';
  const ok=await saveShared(rec);
  if(ok) lsSet(LS.draft,null);
  return ok;
}
async function pullRemote(){
  try{
    const data=await loadShared();
    if(data){ state=data; dirty=false; remoteAhead=false; viewing=null; lsSet(LS.draft,null); renderAll(); }
  }catch(e){ toast(t('loadErr'),true); }
}
async function pollRemote(){
  if(document.hidden||syncing) return;
  try{
    const c=await ghGet(CFG.dataPath);
    if(!c) return;
    if(!remoteMeta||c.json.updatedAt>remoteMeta.updatedAt){
      versions=(c.json.versions||[]).sort((a,b)=>b.savedAt-a.savedAt);
      if(dirty){ remoteAhead=true; remoteMeta={updatedAt:c.json.updatedAt,updatedBy:c.json.updatedBy}; renderBanner(); renderStatus(); }
      else if(!viewing&&c.json.data&&c.json.data.schema===ORIGINAL.schema){
        state=c.json.data; contentSha=c.sha; remoteMeta={updatedAt:c.json.updatedAt,updatedBy:c.json.updatedBy};
        renderAll(); toast(t('lastEdit')+' '+(c.json.updatedBy||''));
      }
    }
  }catch(e){}
}
function startPolling(){ clearInterval(pollTimer); pollTimer=setInterval(pollRemote, token?20000:120000); }
async function openVersionRemote(id){
  const v=await ghGet(CFG.versionsPath+id+'.json');
  return v?v.json.data:null;
}

/* ---------------- login, profile, boot ---------------- */
function deviceId(){ let d=lsGet('bb1p.device'); if(!d){ d='d'+Math.random().toString(36).slice(2,10); lsSet('bb1p.device',d); } return d; }
function renderLogin(){
  const l=$('login');
  l.innerHTML='<div class="login-card"><div class="login-logos"><span class="wm-blip">blip</span><span class="x">\u00d7</span><span class="wm-boost">Boost <span>Mobile</span></span></div>'+
   '<h2>'+esc(t('loginTitle'))+'</h2><p class="login-sub">'+esc(t('loginSub'))+'</p>'+
   '<div class="field"><label for="lg-p">'+esc(t('loginPass'))+'</label><input type="password" id="lg-p" autocomplete="current-password"></div>'+
   '<div class="field"><label for="lg-n">'+esc(t('loginName'))+'</label><input type="text" id="lg-n" autocomplete="name" value="'+esc(profile?profile.name:'')+'"></div>'+
   '<div class="field"><label for="lg-t">'+esc(t('loginToken'))+'</label><input type="password" id="lg-t" autocomplete="off"><span class="hint">'+esc(t('loginTokenHint'))+'</span></div>'+
   '<div class="login-err" id="lg-err"></div>'+
   '<button class="btn" id="lg-go" style="width:100%;justify-content:center">'+esc(t('loginBtn'))+'</button></div>';
  const go=()=>{
    const p=$('lg-p').value, n=$('lg-n').value.trim(), tk=$('lg-t').value.trim();
    if(p!==PASS){ $('lg-err').textContent=t('loginErrPass'); return; }
    if(!n){ $('lg-err').textContent=t('loginErrName'); return; }
    profile={name:n,device:deviceId(),since:Date.now()};
    token=tk||null;
    lsSet(LS.auth,{ok:true,at:Date.now()}); lsSet(LS.profile,profile); lsSet(LS.token,tk||null);
    l.classList.remove('open'); boot2();
  };
  $('lg-go').onclick=go;
  ['lg-p','lg-n','lg-t'].forEach(id=>$(id).addEventListener('keydown',e=>{ if(e.key==='Enter') go(); }));
  l.classList.add('open');
  $('lg-p').focus();
}
function loadPrefs(){
  const p=lsGet(LS.prefs); if(p){ if(p.lang) lang=p.lang; if(p.tab) tab=p.tab; }
  const lg=lsGet(LS.logos); if(lg) logos=Object.assign(logos,lg);
}
function loadDraft(){
  const draft=lsGet(LS.draft);
  if(draft&&draft.data&&draft.data.schema===ORIGINAL.schema&&draft.dirty){ state=draft.data; dirty=true; return true; }
  return false;
}
async function boot(){
  loadPrefs();
  try{
    const r=await fetch(CFG.originalPath+'?t='+Date.now(),{cache:'no-store'});
    ORIGINAL=Object.freeze(await r.json());
  }catch(e){ document.body.innerHTML='<p style="padding:24px;font-family:sans-serif">'+STR.en.loadErr+'</p>'; return; }
  profile=lsGet(LS.profile); token=lsGet(LS.token)||null;
  const auth=lsGet(LS.auth);
  if(auth&&auth.ok&&profile) boot2(); else renderLogin();
}
async function boot2(){
  state=clone(ORIGINAL);
  const hadDraft=loadDraft();
  renderAll();
  try{ const remote=await loadShared(); if(remote&&!hadDraft){ state=remote; } renderAll(); }
  catch(e){ toast(t('loadErr'),true); }
  startPolling();
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) pollRemote(); });
}
const logoutBtn=$('btn-logout'); if(logoutBtn) logoutBtn.onclick=()=>{ lsSet(LS.auth,null); lsSet(LS.token,null); location.reload(); };
boot();
})();

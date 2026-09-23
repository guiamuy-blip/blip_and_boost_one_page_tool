import re
js=open('app.js').read()
def rep(old,new,n=1):
    global js
    c=js.count(old)
    assert c==n, (c, old[:80])
    js=js.replace(old,new)

rep("const LS={draft:'bb1p.draft',prefs:'bb1p.prefs',profile:'bb1p.profile',token:'bb1p.token',auth:'bb1p.auth',logos:'bb1p.logos'};\nconst PASS='blipandboost4ever';",
    "const LS={draft:'bb1p.draft',prefs:'bb1p.prefs',profile:'bb1p.profile',token:'bb1p.token',auth:'bb1p.auth',logos:'bb1p.logos'};")

rep("""  loginPass:'Access password',loginName:'Your name',loginToken:'Edit token (optional)',
  loginTokenHint:'Paste the GitHub token shared by your team if you will edit. Without it you can view and filter, but not save.',
  loginBtn:'Enter',loginErrPass:'Wrong password.',loginErrName:'Enter your name.',logout:'Sign out',
  viewerOnly:'View only \\u2014 no edit token',editorAs:'Signed in as',
  syncing:'Saving\\u2026',syncErr:'Save failed',lastEdit:'Last change by',
  remoteAhead:'Someone else saved a new version while you were editing.',reload:'Load latest',
  needToken:'You need the edit token to save. Sign out and enter it to continue.',
  loadErr:'Could not load the shared data. Check the connection and reload.'},""",
"""  loginPass:'Access key',loginName:'Your name',
  loginPassHint:'The shared GitHub access key given to you by your team. Anyone who signs in can view and edit.',
  loginBtn:'Enter',loginChecking:'Checking\\u2026',loginErrPass:'That access key is not valid.',loginErrName:'Enter your name.',logout:'Sign out',
  editorAs:'Signed in as',
  syncing:'Saving\\u2026',syncErr:'Save failed',lastEdit:'Last change by',
  remoteAhead:'Someone else saved a new version while you were editing.',reload:'Load latest',
  needToken:'Your session lost its access key. Sign out and sign in again.',
  loadErr:'Could not load the shared data. Check the connection and reload.'},""")

rep("""  loginPass:'Senha de acesso',loginName:'Seu nome',loginToken:'Token de edi\\u00e7\\u00e3o (opcional)',
  loginTokenHint:'Cole o token do GitHub compartilhado pelo time se voc\\u00ea for editar. Sem ele voc\\u00ea visualiza e filtra, mas n\\u00e3o salva.',
  loginBtn:'Entrar',loginErrPass:'Senha incorreta.',loginErrName:'Informe seu nome.',logout:'Sair',
  viewerOnly:'Somente leitura \\u2014 sem token de edi\\u00e7\\u00e3o',editorAs:'Conectado como',
  syncing:'Salvando\\u2026',syncErr:'Falha ao salvar',lastEdit:'\\u00daltima altera\\u00e7\\u00e3o por',
  remoteAhead:'Outra pessoa salvou uma nova vers\\u00e3o enquanto voc\\u00ea editava.',reload:'Carregar a mais recente',
  needToken:'Voc\\u00ea precisa do token de edi\\u00e7\\u00e3o para salvar. Saia e informe o token para continuar.',
  loadErr:'N\\u00e3o foi poss\\u00edvel carregar os dados compartilhados. Verifique a conex\\u00e3o e recarregue.'}""",
"""  loginPass:'Chave de acesso',loginName:'Seu nome',
  loginPassHint:'A chave de acesso do GitHub compartilhada pelo seu time. Quem entrar pode visualizar e editar.',
  loginBtn:'Entrar',loginChecking:'Verificando\\u2026',loginErrPass:'Essa chave de acesso n\\u00e3o \\u00e9 v\\u00e1lida.',loginErrName:'Informe seu nome.',logout:'Sair',
  editorAs:'Conectado como',
  syncing:'Salvando\\u2026',syncErr:'Falha ao salvar',lastEdit:'\\u00daltima altera\\u00e7\\u00e3o por',
  remoteAhead:'Outra pessoa salvou uma nova vers\\u00e3o enquanto voc\\u00ea editava.',reload:'Carregar a mais recente',
  needToken:'Sua sess\\u00e3o perdeu a chave de acesso. Saia e entre novamente.',
  loadErr:'N\\u00e3o foi poss\\u00edvel carregar os dados compartilhados. Verifique a conex\\u00e3o e recarregue.'}""")

rep("""  if(who) who.textContent=(profile?t('editorAs')+' '+profile.name+(token?'':' \\u00b7 '+t('viewerOnly')):'')+
    (remoteMeta&&remoteMeta.updatedBy?' \\u00b7 '+t('lastEdit')+' '+remoteMeta.updatedBy:'')+(syncing?' \\u00b7 '+t('syncing'):'');""",
"""  if(who) who.textContent=(profile?t('editorAs')+' '+profile.name:'')+
    (remoteMeta&&remoteMeta.updatedBy?' \\u00b7 '+t('lastEdit')+' '+remoteMeta.updatedBy:'')+(syncing?' \\u00b7 '+t('syncing'):'');""")

rep("""function renderLogin(){
  const l=$('login');
  l.innerHTML='<div class="login-card"><div class="login-logos"><span class="wm-blip">blip</span><span class="x">\\u00d7</span><span class="wm-boost">Boost <span>Mobile</span></span></div>'+
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
}""",
"""async function validateAccessKey(tok){
  try{
    const r=await fetch('https://api.github.com/user',{headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+tok}});
    return r.ok;
  }catch(e){ return false; }
}
function renderLogin(){
  const l=$('login');
  l.innerHTML='<div class="login-card"><div class="login-logos"><span class="wm-blip">blip</span><span class="x">\\u00d7</span><span class="wm-boost">Boost <span>Mobile</span></span></div>'+
   '<h2>'+esc(t('loginTitle'))+'</h2><p class="login-sub">'+esc(t('loginSub'))+'</p>'+
   '<div class="field"><label for="lg-p">'+esc(t('loginPass'))+'</label><input type="password" id="lg-p" autocomplete="current-password"><span class="hint">'+esc(t('loginPassHint'))+'</span></div>'+
   '<div class="field"><label for="lg-n">'+esc(t('loginName'))+'</label><input type="text" id="lg-n" autocomplete="name" value="'+esc(profile?profile.name:'')+'"></div>'+
   '<div class="login-err" id="lg-err"></div>'+
   '<button class="btn" id="lg-go" style="width:100%;justify-content:center">'+esc(t('loginBtn'))+'</button></div>';
  const go=async()=>{
    const p=$('lg-p').value.trim(), n=$('lg-n').value.trim();
    if(!p){ $('lg-err').textContent=t('loginErrPass'); return; }
    if(!n){ $('lg-err').textContent=t('loginErrName'); return; }
    $('lg-err').textContent='';
    const btn=$('lg-go'); btn.disabled=true; btn.textContent=t('loginChecking');
    const ok=await validateAccessKey(p);
    btn.disabled=false; btn.textContent=t('loginBtn');
    if(!ok){ $('lg-err').textContent=t('loginErrPass'); return; }
    profile={name:n,device:deviceId(),since:Date.now()};
    token=p;
    lsSet(LS.auth,{ok:true,at:Date.now()}); lsSet(LS.profile,profile); lsSet(LS.token,token);
    l.classList.remove('open'); boot2();
  };
  $('lg-go').onclick=go;
  ['lg-p','lg-n'].forEach(id=>$(id).addEventListener('keydown',e=>{ if(e.key==='Enter') go(); }));
  l.classList.add('open');
  $('lg-p').focus();
}""")

rep("""  profile=lsGet(LS.profile); token=lsGet(LS.token)||null;
  const auth=lsGet(LS.auth);
  if(auth&&auth.ok&&profile) boot2(); else renderLogin();""",
"""  profile=lsGet(LS.profile); token=lsGet(LS.token)||null;
  const auth=lsGet(LS.auth);
  if(auth&&auth.ok&&profile&&token) boot2(); else renderLogin();""")

open('app.js','w').write(js)
print('patched, len', len(js))

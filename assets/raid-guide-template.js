/* RAID ATLAS | moteur de présentation unique v5 : aucune donnée de raid ici. */
(() => {
  "use strict";
  const doc=document, body=doc.body;
  const presets={
    heatran:{hero:".hero",strategy:".control",roles:".raid-controls",players:"#players",tabs:"#tabs",content:"#app",top:".atlas-guide-topline",nav:".atlas-guide-navrow",crumb:".raid-breadcrumb",footer:"footer"},
    cresselia:{hero:".cres-hero",strategy:".control",roles:".raid-controls",players:"#cres-players",tabs:"#cres-tabs",content:"#cres-app",top:".mini-bar",nav:".navbar",crumb:".cres-crumb",footer:".cres-footer"},
    halloween:{hero:".h25-hero",strategy:"#mode-container",roles:"#players-container",players:"#players-container",tabs:".h25-nav",content:"#guide-content",top:".mini-bar",nav:".navbar",crumb:".h25-bread",footer:".atlas-footer"}
  };
  function element(tag,cls){const el=doc.createElement(tag);if(cls)el.className=cls;return el;}
  function lookup(key,cfg){return doc.querySelector('[data-raid-slot="'+key+'"]')||doc.querySelector(cfg[key]||"#__raid_missing__");}
  function mark(el,cls){if(el&&!el.classList.contains(cls))el.classList.add(cls);}
  function decorate(cfg){
    for(const [key,cls] of [["top","raid-template-topline"],["nav","raid-template-navbar"],["crumb","raid-template-crumb"],["hero","raid-template-hero"],["footer","raid-template-footer"]])mark(lookup(key,cfg),cls);
    const hero=lookup("hero",cfg);if(!hero)return;
    for(const [selector,cls] of [
      [".hero-content,.cres-text,.h25-hero-copy,[data-raid-slot='hero-copy']","raid-template-hero-copy"],
      ["h1","raid-template-hero-title"],["img","raid-template-hero-art"],
      [".eyebrow,.cres-kicker,.h25-eyebrow","raid-template-kicker"]])mark(hero.querySelector(selector),cls);
  }
  function addCards(root){
    if(!root)return;
    for(const [selectors,name] of [
      [".card,.cres-mon,.h25-card,.h25-build,.h25-team-build,.h25-player-card,.cres-action,.h25-stat","raid-template-card"],
      [".battle-grid,.cres-grid,.h25-battle-grid,.pump-route-grid","raid-template-action-grid"],
      [".build-showcase,.cres-mon-body,.h25-build-body","raid-template-build-body"]]){
      for(const node of root.querySelectorAll(selectors))mark(node,name);
    }
  }
  function createDock(tabs,commands,center,players,strategy){
    // A single sticky panel owns strategy, player selection and navigation.
    // Move the real elements (never clone buttons): existing game listeners survive.
    const header=element("div","raid-center-header");
    const identity=element("div","raid-center-identity");
    const title=element("span","raid-center-title");title.textContent="PANNEAU DE RAID";
    const context=element("span","raid-center-context");context.textContent="STRATÉGIE · JOUEURS · NAVIGATION";
    identity.append(title,context);
    const status=element("span","raid-dock-marker");
    status.setAttribute("aria-live","polite");
    status.textContent="SECTION ACTIVE · COMBAT";
    const collapse=element("button","raid-dock-collapse");
    collapse.type="button";
    let reduced=false;
    const wrap=element("nav","raid-guide-dock");
    wrap.setAttribute("aria-label","Rubriques du guide de raid");
    const inner=element("div","raid-dock-content");
    tabs.classList.add("raid-dock-tabs","raid-template-tabs");
    inner.append(tabs);
    wrap.append(inner);

    function syncActiveTab(){
      const buttons=Array.from(tabs.querySelectorAll("button"));
      const current=buttons.find(b=>b.classList.contains("active")||
        b.getAttribute("aria-selected")==="true"||b.getAttribute("aria-pressed")==="true")||buttons[0];
      for(const button of buttons){
        const selected=button===current;
        button.setAttribute("aria-current",selected?"page":"false");
        button.classList.toggle("raid-dock-active",selected);
      }
      if(current){
        const section=current.textContent.replace(/[⚔◉✓ⓘ●]/g,"").trim().toUpperCase();
        status.textContent="SECTION ACTIVE · "+section;
      }
    }
    function syncContext(){
      const select=strategy?.querySelector("select");
      const option=select?.selectedOptions?.[0];
      const strategyText=option?.textContent?.trim()||
        strategy?.querySelector(".raid-strategy-readonly")?.textContent?.trim()||
        strategy?.querySelector("label")?.textContent?.trim()||"STRATÉGIE";
      const player=players&&Array.from(players.querySelectorAll("button")).find(b=>
        b.classList.contains("active")||b.getAttribute("aria-pressed")==="true");
      const role=player?.textContent?.trim()||"P1";
      context.textContent=strategyText+" · "+role;
      context.title=context.textContent;
    }
    tabs.addEventListener("click",()=>queueMicrotask(syncActiveTab));
    commands.addEventListener("click",()=>queueMicrotask(syncContext));
    commands.addEventListener("change",()=>queueMicrotask(syncContext));
    if(typeof MutationObserver!=="undefined"){
      new MutationObserver(syncActiveTab).observe(tabs,{childList:true,subtree:true});
      new MutationObserver(syncContext).observe(commands,{childList:true,subtree:true});
    }
    function apply(){
      center.classList.toggle("is-reduced",reduced);
      commands.hidden=reduced;
      wrap.hidden=reduced;
      collapse.textContent=reduced?"Déployer":"Réduire";
      collapse.setAttribute("aria-expanded",String(!reduced));
      collapse.setAttribute("aria-controls","raid-center-content");
      collapse.setAttribute("aria-label",reduced?"Déployer les commandes du raid":"Réduire les commandes du raid");
      center.setAttribute("data-collapsed",String(reduced));
    }
    const content=element("div","raid-center-content");
    content.id="raid-center-content";
    content.append(commands,wrap);
    collapse.addEventListener("click",()=>{reduced=!reduced;apply();});
    header.append(identity,status,collapse);
    center.append(header,content);
    syncContext();syncActiveTab();apply();
    return center;
  }
  function boot(){
    if(body.classList.contains("raid-template-ready"))return;
    const kind=body.dataset.raidTemplate||"custom";
    const cfg={...(presets[kind]||{})};
    const supplied=doc.querySelector("#raid-template-config");
    if(supplied){try{Object.assign(cfg,JSON.parse(supplied.textContent));}catch(e){console.warn("Config raid non valide",e)}}
    const hero=lookup("hero",cfg),tabs=lookup("tabs",cfg),content=lookup("content",cfg);
    if(!hero||!tabs||!content)return;
    const strategy=lookup("strategy",cfg),roles=lookup("roles",cfg),players=lookup("players",cfg);
    const position=kind==="halloween"?(doc.querySelector(".h25-alert")||hero):kind==="cresselia"?(doc.querySelector(".cres-warning")||hero):hero;
    const center=element("section","raid-command-center");
    center.setAttribute("aria-label","Commandes et navigation du raid");
    const commands=element("div","raid-template-commandbar");
    commands.setAttribute("aria-label","Stratégie et attribution des joueurs");
    position.insertAdjacentElement("afterend",center);
    if(strategy){mark(strategy,"raid-template-strategy");commands.append(strategy);}
    if(roles&&roles!==strategy){mark(roles,"raid-template-rolebar");commands.append(roles);}
    if(players){mark(players,"raid-template-players");}
    if(roles){
      const oldHeading=roles.querySelector(".sections-heading");
      if(oldHeading)mark(oldHeading,"raid-template-old-nav-heading");
    }
    // Navigation visible directement sous les rôles, jamais masquée par les fiches.
    createDock(tabs,commands,center,players,strategy);
    mark(content,"raid-template-content");
    decorate(cfg);
    body.classList.add("raid-template-ready");
    body.dataset.raidTemplateVersion="7";
    addCards(content);
    if(typeof MutationObserver!=="undefined"){
      let queued=false;
      new MutationObserver(()=>{
        if(queued)return;
        queued=true;
        Promise.resolve().then(()=>{queued=false;addCards(content)});
      }).observe(content,{childList:true,subtree:true});
    }
  }
  if(doc.readyState==="loading")doc.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();
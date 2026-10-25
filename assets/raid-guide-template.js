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
  function createDock(tabs,anchor){
    const wrap=element("nav","raid-guide-dock");
    wrap.setAttribute("aria-label","Navigation rapide dans la fiche de raid");
    const mast=element("div","raid-dock-header");
    const title=element("span","raid-dock-title");title.textContent="NAVIGATION DU RAID";
    const marker=element("span","raid-dock-marker");marker.setAttribute("aria-live","polite");marker.textContent="SECTION ACTIVE · COMBAT";
    mast.append(title,marker);
    const inner=element("div","raid-dock-content");
    tabs.classList.add("raid-dock-tabs","raid-template-tabs");
    inner.append(tabs); // réutilise les vrais onglets, avec leurs listeners
    function syncActiveTab(){
      const buttons=Array.from(tabs.querySelectorAll("button"));
      const current=buttons.find(b=>b.classList.contains("active")||b.getAttribute("aria-selected")==="true"||b.getAttribute("aria-pressed")==="true")||buttons[0];
      for(const button of buttons){
        const chosen=button===current;
        button.setAttribute("aria-current",chosen?"page":"false");
        button.classList.toggle("raid-dock-active",chosen);
      }
      if(current){
        const section=current.textContent.replace(/[⚔◉✓ⓘ]/g,"").trim().toUpperCase();
        marker.textContent="SECTION ACTIVE · "+section;
      }
    }
    tabs.addEventListener("click",()=>queueMicrotask(syncActiveTab));
    if(typeof MutationObserver!=="undefined"){
      new MutationObserver(syncActiveTab).observe(tabs,{childList:true,subtree:true});
    }
    syncActiveTab();
    const collapse=element("button","raid-dock-collapse");collapse.type="button";
    let reduced=false; // ouvert par défaut : le dock ne doit pas passer inaperçu
    function apply(){
      wrap.classList.toggle("is-reduced",reduced);
      inner.hidden=reduced;
      collapse.setAttribute("aria-expanded",String(!reduced));
      collapse.setAttribute("aria-label",reduced?"Afficher les rubriques du guide":"Réduire la navigation");
      collapse.textContent=reduced?"Ouvrir la navigation":"Réduire";
    }
    collapse.addEventListener("click",()=>{reduced=!reduced;apply();});
    mast.append(collapse);
    wrap.append(mast,inner);
    anchor.insertAdjacentElement("afterend",wrap);
    apply();
    return wrap;
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
    const commands=element("section","raid-template-commandbar");
    commands.setAttribute("aria-label","Stratégie et attribution des joueurs");
    position.insertAdjacentElement("afterend",commands);
    if(strategy){mark(strategy,"raid-template-strategy");commands.append(strategy);}
    if(roles&&roles!==strategy){mark(roles,"raid-template-rolebar");commands.append(roles);}
    if(players){mark(players,"raid-template-players");}
    if(roles){
      const oldHeading=roles.querySelector(".sections-heading");
      if(oldHeading)mark(oldHeading,"raid-template-old-nav-heading");
    }
    // Navigation visible directement sous les rôles, jamais masquée par les fiches.
    createDock(tabs,commands);
    mark(content,"raid-template-content");
    decorate(cfg);
    body.classList.add("raid-template-ready");
    body.dataset.raidTemplateVersion="5";
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
/* RAID ATLAS | Modèle d'interface partagé.
   Chaque moteur reste responsable de ses builds, tours, onglets et événements.
   Présentation d'origine Heatran restaurée : configuration/roles en haut,
   navigation seule dans le dock flottant réductible. */
(() => {
  "use strict";
  const doc = document;
  const body = doc.body;
  const presets = {
    heatran: {hero:".hero", strategy:".control", controls:".raid-controls", players:"#players",
      tabs:"#tabs", content:"#app", top:".atlas-guide-topline", navbar:".atlas-guide-navrow",
      breadcrumb:".raid-breadcrumb", footer:"footer"},
    cresselia: {hero:".cres-hero", controls:".cres-sidebar", players:"#cres-players",
      tabs:"#cres-tabs", content:"#cres-app", top:".mini-bar", navbar:".navbar",
      breadcrumb:".cres-crumb", footer:".cres-footer"},
    halloween: {hero:".h25-hero", strategy:"#mode-container", players:"#players-container",
      tabs:".h25-nav", content:"#guide-content", top:".mini-bar", navbar:".navbar",
      breadcrumb:".h25-bread", footer:".atlas-footer"}
  };
  const q = selector => selector ? doc.querySelector(selector) : null;
  const slot = name => doc.querySelector('[data-raid-slot="'+name+'"]');
  const make = (tag, cls) => {
    const element = doc.createElement(tag);
    element.className = cls;
    return element;
  };
  const annotate = (element, cls) => { if(element) element.classList.add(cls); };
  function cardClasses(root) {
    if(!root) return;
    const groups = [
      [".card,.cres-mon,.h25-card,.h25-build,.h25-team-build,.h25-player-card,.cres-action,.h25-stat", "raid-template-card"],
      [".battle-grid,.cres-grid,.h25-battle-grid,.pump-route-grid", "raid-template-action-grid"],
      [".build-showcase,.cres-mon-body,.h25-build-body", "raid-template-build-body"]
    ];
    for (const [selector, cls] of groups) {
      for(const el of root.querySelectorAll(selector)) {
        if(!el.classList.contains(cls)) el.classList.add(cls);
      }
    }
  }
  function markChrome(config) {
    for(const [key, cls] of [["top","raid-template-topline"],["navbar","raid-template-navbar"],
      ["breadcrumb","raid-template-crumb"],["hero","raid-template-hero"],["footer","raid-template-footer"]]){
      annotate(slot(key) || q(config[key]),cls);
    }
    const hero=slot("hero") || q(config.hero);
    if(hero){
      annotate(hero.querySelector(".hero-content,.cres-text,.h25-hero-copy,[data-raid-slot='hero-copy']"),"raid-template-hero-copy");
      annotate(hero.querySelector("h1"),"raid-template-hero-title");
      annotate(hero.querySelector("img"),"raid-template-hero-art");
      annotate(hero.querySelector(".eyebrow,.cres-kicker,.h25-eyebrow"),"raid-template-kicker");
    }
  }
  function savedCollapsed() {
    try { return localStorage.getItem("raid-atlas-dock-reduit")==="1"; }
    catch(_) { return false; }
  }
  function setupDock(tabs) {
    if(!tabs) return;
    const dock=make("aside","raid-floating-dock");
    dock.setAttribute("aria-label","Navigation flottante du raid");
    const navWrap=make("div","raid-dock-items");
    tabs.classList.add("raid-dock-tabs");
    navWrap.append(tabs); // élément source et ses écouteurs conservés
    const minimize=make("button","raid-dock-toggle");
    minimize.type="button";
    let collapsed=savedCollapsed();
    function paint() {
      dock.classList.toggle("is-collapsed",collapsed);
      minimize.textContent=collapsed?"☰  Navigation":"−  Réduire";
      minimize.setAttribute("aria-expanded",String(!collapsed));
      minimize.setAttribute("aria-controls","raid-dock-items");
      minimize.setAttribute("aria-label",collapsed?"Afficher les quatre rubriques du raid":"Réduire la navigation flottante");
      navWrap.hidden=collapsed;
    }
    navWrap.id="raid-dock-items";
    minimize.addEventListener("click",()=>{
      collapsed=!collapsed;
      try { localStorage.setItem("raid-atlas-dock-reduit",collapsed?"1":"0"); } catch(_){}
      paint();
    });
    dock.append(navWrap,minimize);
    body.append(dock);
    paint();
  }
  function moveControls(preset, config, tabs) {
    const hero=slot("hero") || q(config.hero);
    const content=slot("content") || q(config.content);
    if(!hero||!content||!tabs) return false;
    const anchor=preset==="halloween" ? q(".h25-alert")||hero : hero;
    const toolbar=make("section","raid-template-commandbar");
    toolbar.setAttribute("aria-label","Configuration du raid");
    anchor.insertAdjacentElement("afterend", toolbar);
    if(preset==="heatran") {
      const strategy=q(config.strategy);
      const controls=q(config.controls);
      if(strategy){strategy.classList.add("raid-template-strategy");toolbar.append(strategy);}
      if(controls) {
        controls.classList.add("raid-template-rolebar");
        const oldNavHeading=controls.querySelector(".sections-heading");
        if(oldNavHeading)oldNavHeading.classList.add("raid-template-old-nav-heading");
        toolbar.append(controls);
      }
    } else if(preset==="cresselia"){
      const sidebar=q(config.controls);
      const layout=q(".cres-layout");
      if(sidebar){
        sidebar.classList.add("raid-template-rolebar");
        const groups=Array.from(sidebar.children);
        const oldNavGroup=groups.find(el=>el.contains(tabs));
        if(oldNavGroup)oldNavGroup.classList.add("raid-template-old-nav-heading");
        const references=groups.find(el=>el.textContent.includes("AUTRES STRATÉGIES DOCUMENTÉES"));
        if(references){
          const fold=make("details","raid-template-references");
          const summary=make("summary","");
          summary.textContent="Autres stratégies documentées";
          fold.append(summary,references);
          // Garder toutes les sources accessibles, mais hors des contrôles principaux.
          const outer=layout||content;
          outer.insertAdjacentElement("afterend",fold);
        }
        toolbar.append(sidebar);
      }
    } else if(preset==="halloween"){
      const strategy=q(config.strategy);
      const players=q(config.players);
      if(strategy){strategy.classList.add("raid-template-strategy");toolbar.append(strategy);}
      if(players){players.classList.add("raid-template-rolebar");toolbar.append(players);}
    } else {
      const strategy=slot("strategy");
      const players=slot("players");
      if(strategy) toolbar.append(strategy);
      if(players) toolbar.append(players);
    }
    const players=slot("players")||q(config.players);
    annotate(players,"raid-template-players");
    annotate(content,"raid-template-content");
    setupDock(tabs);
    return true;
  }
  function boot() {
    if(body.classList.contains("raid-template-ready")) return;
    const preset=body.dataset.raidTemplate||"custom";
    const config={...(presets[preset]||{})};
    const custom=q("#raid-template-config");
    if(custom){try{Object.assign(config,JSON.parse(custom.textContent));}catch(e){console.warn("Configuration du modèle invalide",e);}}
    const tabs=slot("tabs")||q(config.tabs);
    if(!moveControls(preset,config,tabs)) return;
    markChrome(config);
    body.classList.add("raid-template-ready");
    body.dataset.raidTemplateVersion="3";
    const content=slot("content")||q(config.content);
    cardClasses(content);
    if(content && typeof MutationObserver !== "undefined"){
      let queued=false;
      new MutationObserver(()=>{
        if(queued) return;
        queued=true;
        Promise.resolve().then(()=>{queued=false;cardClasses(content);});
      }).observe(content,{childList:true,subtree:true});
    }
  }
  if(doc.readyState==="loading") doc.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();
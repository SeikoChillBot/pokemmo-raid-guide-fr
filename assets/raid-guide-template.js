/* RAID ATLAS — gabarit partagé de toutes les fiches de raid (FR).
   Pas de données de combat ici. Les moteurs Heatran/Cresselia/Halloween restent autonomes.
   Pour une nouvelle fiche : data-raid-template="custom" sur body et
   data-raid-slot="hero|crumb|strategy|players|tabs|content" sur les éléments. */
(function(){
"use strict";
const D=document, body=D.body;
const PRESETS={
 heatran:{top:".atlas-guide-topline",nav:".atlas-guide-navrow",crumb:".raid-breadcrumb",hero:".hero",layout:"",strategy:".control",controls:".raid-controls",players:"#players",tabs:"#tabs",content:"#app",footer:"footer",roleLabel:"VOTRE RÔLE"},
 cresselia:{top:".mini-bar",nav:".navbar",crumb:".cres-crumb",hero:".cres-hero",layout:".cres-layout",aside:".cres-sidebar",stage:".cres-content",strategy:"",controls:"",players:"#cres-players",tabs:"#cres-tabs",content:"#cres-app",footer:".cres-footer",roleLabel:"VOTRE RÔLE"},
 halloween:{top:".mini-bar",nav:".navbar",crumb:".h25-bread",hero:".h25-hero",layout:"",strategy:"#mode-container",players:"#players-container",tabs:".h25-nav",content:"#guide-content",footer:".atlas-footer",roleLabel:"VOTRE RÔLE"}
};
const one=(sel,scope)=>sel?(scope||D).querySelector(sel):null;
const slot=n=>D.querySelector('[data-raid-slot="'+n+'"]');
function node(n,cls){const x=D.createElement(n);x.className=cls;return x;}
function childMark(el,cls){if(el)el.classList.add(cls);}
function sectionHeading(s){const el=node("div","raid-template-section-label");el.textContent=s;return el;}
function collectConfig(){
 const preset=body.dataset.raidTemplate||"custom";
 const cfg=Object.assign({},PRESETS[preset]||{});
 const conf=one("#raid-template-config");
 if(conf){try{Object.assign(cfg,JSON.parse(conf.textContent));}catch(e){console.warn("RAID ATLAS template config invalid",e);}}
 return {preset,cfg};
}
function select(cfg,k){return slot(k)||one(cfg[k]);}
function assemble(preset,cfg){
 let layout=select(cfg,"layout"),aside=select(cfg,"aside"),stage=select(cfg,"stage");
 if(!layout){
   const hero=select(cfg,"hero"),content=select(cfg,"content");
   if(!hero||!content)return null;
   layout=node("div","raid-template-layout");
   (preset==="halloween"?(one(".h25-alert")||hero):hero).insertAdjacentElement("afterend",layout);
   aside=node("aside","raid-template-sidebar");
   stage=node("div","raid-template-main");
   layout.append(aside,stage);
   // Reposition existing nodes, not copies: preserves event listeners and state.
   const strategy=select(cfg,"strategy"),controls=select(cfg,"controls");
   const players=select(cfg,"players"),tabs=select(cfg,"tabs");
   if(strategy){aside.append(sectionHeading("STRATÉGIE / DIFFICULTÉ"),strategy);}
   if(controls){aside.append(controls);}
   else {
     if(players){aside.append(sectionHeading(cfg.roleLabel||"VOTRE RÔLE"),players);}
     if(tabs){aside.append(sectionHeading("NAVIGATION"),tabs);}
   }
   stage.append(content);
   // Halloween: maintain navigation between boss guides in main area.
   if(preset==="halloween"){const next=one("#next-raids");if(next)stage.append(next);}
 } else {
   aside=aside||layout.firstElementChild;
   stage=stage||layout.lastElementChild;
   if(!aside||!stage)return null;
 }
 childMark(layout,"raid-template-layout");
 childMark(aside,"raid-template-sidebar");
 childMark(stage,"raid-template-main");
 layout.dataset.raidTemplateLayout="shared-v1";
 // Make sidebar role / navigation controllable from a single CSS file.
 [select(cfg,"strategy"),select(cfg,"controls"),select(cfg,"players"),select(cfg,"tabs"),select(cfg,"content")].forEach((x,i)=>{
  if(x)x.classList.add(["raid-template-strategy","raid-template-controls","raid-template-players","raid-template-tabs","raid-template-content"][i]);
 });
 return layout;
}
function decorate(cfg){
 [["top","raid-template-topline"],["nav","raid-template-navbar"],["crumb","raid-template-crumb"],["hero","raid-template-hero"],["footer","raid-template-footer"]].forEach(([s,cl])=>childMark(select(cfg,s),cl));
 const h=select(cfg,"hero");
 if(h){
   const text=h.querySelector(".hero-content,.cres-text,.h25-hero-copy,[data-raid-slot='hero-copy']");
   const title=h.querySelector("h1");
   const img=h.querySelector("img");
   const label=h.querySelector(".eyebrow,.cres-kicker,.h25-eyebrow");
   childMark(text,"raid-template-hero-copy");
   childMark(title,"raid-template-hero-title");
   childMark(img,"raid-template-hero-art");
   childMark(label,"raid-template-kicker");
 }
}
function decorateCards(scope){
 if(!scope)return;
 // Only add semantic classes to existing cards; all design tokens live in shared CSS.
 for(const el of scope.querySelectorAll(".card,.cres-mon,.h25-card,.h25-build,.h25-team-build,.h25-player-card,.cres-action,.h25-stat")){
  el.classList.add("raid-template-card");
 }
 for(const el of scope.querySelectorAll(".battle-grid,.cres-grid,.h25-battle-grid,.pump-route-grid")){
  el.classList.add("raid-template-action-grid");
 }
 for(const el of scope.querySelectorAll(".build-showcase,.cres-mon-body,.h25-build-body")){
  el.classList.add("raid-template-build-body");
 }
}
function boot(){
 const {preset,cfg}=collectConfig();
 if(body.classList.contains("raid-template-ready"))return;
 const layout=assemble(preset,cfg);
 if(!layout){console.warn("RAID ATLAS: fiche non compatible avec le gabarit partagé",preset);return;}
 decorate(cfg);
 body.classList.add("raid-template-ready");
 body.dataset.raidTemplateVersion="1";
 const stage=select(cfg,"content");
 decorateCards(stage);
 // Existing engines replace cards on tab/turn changes: classify them as they appear.
 if(typeof MutationObserver!=="undefined"&&stage){
  let scheduled=false;
  const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;Promise.resolve().then(()=>{scheduled=false;decorateCards(stage);});});
  observer.observe(stage,{childList:true,subtree:true});
 }
}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
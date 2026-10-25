/* RAID ATLAS FR — correctifs ergonomiques V9.
 * Aucune mutation des stratégies: reprend les boutons de phase existants.
 * Identité PokeMMO, sélecteurs unifiés, navigation de phase au-dessus des actions.
 */
(()=>{
"use strict";
// Icône vectorielle autonome : Poké Ball noire et blanche, sans plaque ni texte.
const pokeballSvg='<svg class="raid-v9-pokeball" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" focusable="false" aria-hidden="true">'+
 '<circle cx="32" cy="32" r="28.5" fill="#f5f5f4" stroke="#f8f8f8" stroke-width="2.7"/>'+
 '<path d="M3.5 32 A28.5 28.5 0 0 1 60.5 32 Z" fill="#121315"/>'+
 '<path d="M4.5 32 H59.5" stroke="#111214" stroke-width="7.5"/>'+
 '<circle cx="32" cy="32" r="10.5" fill="#121315" stroke="#f7f7f7" stroke-width="2.5"/>'+
 '<circle cx="32" cy="32" r="5.3" fill="#fafafa"/>'+
 '</svg>';
function brand(){
 document.querySelectorAll("a.identity, a.atlas-guide-brand").forEach(anchor=>{
   if(anchor.dataset.raidBrandV9==="1")return;
   anchor.dataset.raidBrandV9="1";
   const mark=anchor.querySelector(".mark,.atlas-guide-mark");
   if(mark){
     const icon=document.createElement("span");
     icon.className="raid-v9-brand-icon";
     icon.setAttribute("aria-hidden","true");
     icon.innerHTML=pokeballSvg;
     mark.replaceWith(icon);
   }
   const title=anchor.querySelector(".identity-text,.atlas-guide-brand-copy");
   if(title){
     const sub=title.querySelector("small");
     const subtitle=sub?.textContent||"RAID ATLAS / GUIDES DE RAIDS";
     title.replaceChildren();
     const label=document.createElement("span");
     label.className="raid-v9-brand-name";
     label.append(document.createTextNode("Poke"));
     const mmo=document.createElement("strong");mmo.textContent="MMO";
     label.append(mmo);
     const caption=document.createElement("small");caption.textContent=subtitle;
     title.append(label,caption);
   }
   anchor.setAttribute("aria-label","Accueil PokeMMO Raid Atlas");
 });
 document.querySelectorAll(".atlas-footer b,.site-footer b,.raid-template-footer b").forEach(node=>{
    node.textContent=node.textContent.replace(/POKÉMMO|POKÉMMO|POKÉMMO/gi,"PokeMMO");
 });
}
brand();
function markTabState(){
 const center=document.querySelector(".raid-command-center");
 if(!center)return;
 const buttons=Array.from(center.querySelectorAll(".raid-dock-tabs button"));
 if(!buttons.length)return;
 const active=buttons.find(b=>b.classList.contains("active")||b.getAttribute("aria-pressed")==="true"||b.getAttribute("aria-selected")==="true")||buttons[0];
 for(const button of buttons){
   const selected=button===active;
   button.classList.toggle("raid-v9-tab-current",selected);
   button.setAttribute("aria-current",selected?"page":"false");
   button.setAttribute("data-active-label",selected?"Onglet actif":"");
 }
 const marker=center.querySelector(".raid-dock-marker");
 if(marker){
   marker.textContent="SECTION ACTIVE · "+active.textContent.replace(/[⚔◉✓ⓘ●]/g,"").trim().toUpperCase();
   marker.setAttribute("aria-live","polite");
 }
}
const raidCenter=document.querySelector(".raid-command-center");
if(raidCenter){
 raidCenter.addEventListener("click",event=>{
   if(event.target.closest(".raid-dock-tabs button"))queueMicrotask(markTabState);
 });
 markTabState();
 if(typeof MutationObserver!=="undefined"){
  new MutationObserver(markTabState).observe(raidCenter.querySelector(".raid-dock-tabs")||raidCenter,{childList:true,subtree:true});
 }
}
let scheduled=false;
function liftNavigation(){
 const scopes=["#app","#cres-app","#guide-content"];
 for(const selector of scopes){
  const root=document.querySelector(selector);if(!root)continue;
  const navs=Array.from(root.querySelectorAll(".phase-nav,.h25-actions"));
  for(const nav of navs){
   if(nav.classList.contains("raid-v9-placed")||nav.classList.contains("raid-inline-turn-nav"))continue;
   const controls=Array.from(nav.querySelectorAll("button"));
   const back=controls.find(b=>/Précédent|Étape précédente/i.test(b.textContent));
   const next=controls.find(b=>/suivant|suivante/i.test(b.textContent));
   if(!back||!next)continue;
   // Keep original click handlers, listeners and disabled state unchanged.
   const chooser=root.querySelector(".phase-control,.h25-select,select#phase,select#turn-select,select#turn");
   const panel=root.querySelector(".turn-section,.turn-panel,.h25-card,.h25-turn,.h25-turn-card,.h25-route-step,.h25-phase");
   const reference=chooser?.closest(".phase-control")||chooser||panel;
   if(!reference||!reference.parentNode)continue;
   if(nav.previousElementSibling===reference){nav.classList.add("raid-v9-placed");continue;}
   // Always keep the original buttons. Put them directly under the phase chooser,
   // including Halloween select.h25-select, or above the battle panel otherwise.
   reference.insertAdjacentElement(chooser?"afterend":"beforebegin",nav);
   nav.classList.add("raid-v9-placed");
   nav.setAttribute("aria-label","Navigation entre les phases du raid");
  }
 }
}
function schedule(){
 if(scheduled)return;
 scheduled=true;
 queueMicrotask(()=>{scheduled=false;liftNavigation();});
}
liftNavigation();
if(typeof MutationObserver!=="undefined"){
 const observer=new MutationObserver(mutations=>{
   for(const m of mutations){
     if(m.type==="childList"&&m.addedNodes.length){schedule();return;}
   }
 });
 ["#app","#cres-app","#guide-content"].forEach(selector=>{
   const e=document.querySelector(selector);
   if(e)observer.observe(e,{subtree:true,childList:true});
 });
}
})();

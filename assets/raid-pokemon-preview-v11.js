/* RAID ATLAS FR — aperçu riche des Pokémon, V12.
 * Fonctionne avec les données source des composants partagés, sans
 * mélanger les stratégies ni inventer les EV/IV, attaques ou objets.
 * Compatible avec toutes les futures fiches utilisant RaidAtlasComponents.
 */
(()=>{
"use strict";
function init(){
 if(!document.body?.classList?.contains("raid-template-ready"))return;
 if(typeof window.matchMedia==="function"&&window.matchMedia("(hover:none), (pointer:coarse)").matches)return;
 const selectors=[
  ".raid-template-content .battle-grid .card",
  ".raid-template-content details.card > summary",
  ".raid-template-content .prep-card",
  ".raid-template-content .h25-battle-grid .h25-player-card",
  ".raid-template-content .h25-build > summary",
  ".raid-template-content .h25-team-build",
  ".raid-template-content .h25-player-card:has(img)"
 ].join(",");
 const tooltip=document.createElement("aside");
 tooltip.id="raid-v11-pokemon-preview";
 tooltip.className="raid-v11-pokemon-preview raid-v12-rich-preview";
 tooltip.hidden=true;tooltip.setAttribute("role","tooltip");
 tooltip.setAttribute("aria-live","off");document.body.append(tooltip);
 let active=null;
 const el=(tag,cls,label)=>{
  const node=document.createElement(tag);
  if(cls)node.className=cls;
  if(label!=null)node.textContent=String(label);
  return node;
 };
 const normalize=x=>String(x??"").replace(/^\s*\d+\.\s*/,"").replace(/\s+/g," ").trim();
 const missing="Non précisé dans la source";
 const fields=[["Objet tenu","item"],["Nature","nature"],["Talent","ability"],
  ["EV","ev"],["IV","iv"],["Attaques","moves"]];
 function parseData(root){
  const raw=root?.dataset?.raidBuild;
  if(!raw)return null;
  try{
   const value=JSON.parse(raw);
   return value&&typeof value==="object"?value:null;
  }catch(_){return null;}
 }
 function valueFor(build,key){
  let v=build?.[key];
  if(key==="ability"&&!v)v=build?.talent;
  if(key==="moves"&&!v)v=build?.attacks;
  if(Array.isArray(v))return v.map(normalize).filter(Boolean).join(" · ");
  return normalize(v)||missing;
 }
 function domFallback(root){
  const info={};
  const normalizeKey=str=>normalize(str).toLocaleLowerCase("fr");
  for(const row of root.querySelectorAll(".build-fact, .h25-stat")){
   const key=normalizeKey(row.querySelector("small")?.textContent);
   const val=normalize(row.querySelector("strong")?.textContent);
   if(!val)continue;
   if(key.startsWith("objet"))info.item=val;
   else if(key==="nature")info.nature=val;
   else if(key==="talent")info.ability=val;
   else if(key==="ev")info.ev=val;
   else if(key.startsWith("iv"))info.iv=val;
   else if(key.includes("attaqu")||key.includes("fonction"))info.moves=val;
  }
  if(!info.moves){
   const moves=[...root.querySelectorAll(".move-pill")].map(x=>normalize(x.textContent).replace(/^[◆✦✧⬡]\s*/,"")).filter(Boolean);
   if(moves.length)info.moves=moves;
  }
  return info;
 }
 function getData(card){
  const wrapper=card.closest("details.card,details.h25-build")||card.closest(".h25-team-build")||card;
  const build=parseData(card)||parseData(wrapper)||domFallback(wrapper);
  let name=normalize(build.name||build.n||"");
  if(!name)name=normalize(wrapper.querySelector(".poke-name,.h25-mon-name,.h25-poke-name,.h25-name,.h25-build-title b,.h25-build-title strong")?.textContent);
  if(!name){
   const text=wrapper.querySelector(".poke-text .poke-name,strong,h3,h4")?.textContent;
   if(text&&text.length<56)name=normalize(text);
  }
  if(!name)return null;
  const image=wrapper.querySelector("img.raid-artwork-hd,img.sprite,img.h25-thumb,img");
  const role=normalize(wrapper.querySelector("small")?.textContent||"FICHE POKÉMON");
  const note=normalize(build.source||build.note||"");
  const isAction=!!card.closest(".battle-grid,.h25-battle-grid");
  return {name,image,role,note,build,isAction};
 }
 function paint(data){
  tooltip.replaceChildren();
  const head=el("div","raid-v11-preview-head");
  const photo=el("div","raid-v11-preview-photo");
  if(data.image){
   const image=el("img");image.src=data.image.currentSrc||data.image.src;image.alt="";
   image.addEventListener("error",()=>image.hidden=true,{once:true});
   photo.append(image);
  }
  const header=el("div");
  header.append(el("span","raid-v11-preview-eyebrow",data.role||"FICHE POKÉMON"),
   el("strong","raid-v11-preview-name",data.name));
  head.append(photo,header);tooltip.append(head);
  const rows=el("div","raid-v11-preview-details raid-v12-preview-details");
  for(const [label,key] of fields){
   const row=el("div","raid-v11-preview-line");
   row.append(el("span",null,label),el("strong",null,valueFor(data.build,key)));
   if(key==="moves")row.classList.add("raid-v12-preview-moves");
   rows.append(row);
  }
  tooltip.append(rows);
  if(data.note)tooltip.append(el("p","raid-v11-preview-note",data.note));
  if(data.isAction&&!data.build?.item)tooltip.append(el("div","raid-v11-preview-footer",
   "Build non documenté pour ce Pokémon ou ce remplacement. Aucune statistique inventée."));
 }
 function position(card){
  const bounds=card.getBoundingClientRect();
  const w=tooltip.offsetWidth||385,h=tooltip.offsetHeight||350;
  const vw=window.innerWidth,vh=window.innerHeight;
  let left=bounds.right+12;
  if(left+w>vw-14)left=bounds.left-w-12;
  left=Math.max(9,Math.min(left,vw-w-9));
  const top=Math.max(8,Math.min(bounds.top+(bounds.height-h)/2,vh-h-8));
  tooltip.style.left=Math.round(left)+"px";
  tooltip.style.top=Math.round(top)+"px";
 }
 function show(card){
  if(!card||active===card)return;
  const data=getData(card);if(!data)return;
  hide();active=card;paint(data);tooltip.hidden=false;position(card);
  card.setAttribute("aria-describedby",tooltip.id);
 }
 function hide(){
  if(active?.getAttribute("aria-describedby")===tooltip.id)active.removeAttribute("aria-describedby");
  active=null;tooltip.hidden=true;
 }
 const find=e=>e.target?.closest?.(selectors);
 document.addEventListener("mouseover",e=>{const target=find(e);if(target)show(target);});
 document.addEventListener("mouseout",e=>{
  if(!active||!active.contains(e.target))return;
  if(e.relatedTarget&&active.contains(e.relatedTarget))return;
  hide();
 });
 document.addEventListener("focusin",e=>{const target=find(e);if(target)show(target);});
 document.addEventListener("focusout",e=>{
  if(active&&active.contains(e.target)&&!(e.relatedTarget&&active.contains(e.relatedTarget)))hide();
 });
 document.addEventListener("keydown",e=>{if(e.key==="Escape")hide();});
 document.addEventListener("click",e=>{if(active&&!active.contains(e.target))hide();});
 window.addEventListener("scroll",hide,{capture:true,passive:true});
 window.addEventListener("resize",hide,{passive:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();

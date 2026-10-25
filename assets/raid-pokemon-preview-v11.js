/* RAID ATLAS FR V11 · aperçus Pokémon au survol.
 * Non destructif : lit uniquement le contenu déjà affiché dans les cartes.
 * Aucune valeur de build, d'EV, d'IV ni de mécanique inventée.
 * Sans requêtes réseau supplémentaires : réutilise l'illustration existante.
 */
(()=>{
"use strict";
function initPreview(){
if(!document.body?.classList?.contains("raid-template-ready"))return;
if(typeof window.matchMedia==="function"&&window.matchMedia("(hover:none), (pointer:coarse)").matches)return;
const selectors=[
 ".raid-template-content .battle-grid .card",
 ".raid-template-content details.card > summary",
 ".raid-template-content .prep-card > .poke-row",
 ".raid-template-content .h25-battle-grid .h25-card",
 ".raid-template-content .h25-player-card"
].join(",");
const preview=document.createElement("aside");
preview.className="raid-v11-pokemon-preview";
preview.id="raid-v11-pokemon-preview";
preview.hidden=true;
preview.setAttribute("role","tooltip");
preview.setAttribute("aria-live","off");
document.body.append(preview);
let current=null;
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=String(txt);return e;};
const normalize=s=>String(s||"").replace(/^\s*\d+\.\s*/,"").replace(/\s+/g," ").trim();
function detailFrom(card){
 const details=card.closest("details.card")||card;
 const rows=[];
 const seen=new Set();
 function push(k,v){
   k=normalize(k);v=normalize(v);
   if(!k||!v||seen.has(k.toLowerCase())||rows.length>=5)return;
   seen.add(k.toLowerCase());rows.push([k,v]);
 }
 const stats=details.querySelectorAll(".build-fact");
 for(const stat of stats){push(stat.querySelector("small")?.textContent,stat.querySelector("strong")?.textContent);}
 if(!rows.length&&details.matches("details")){
   for(const tr of details.querySelectorAll("table tr")){
     const cells=tr.querySelectorAll("td");
     if(cells.length>=2)push(cells[0].textContent,cells[1].textContent);
   }
 }
 if(rows.length<1){
   const note=card.querySelector(".muted")?.textContent;
   if(note){const [item,move]=note.split(" · ");if(item)push("Objet",item);if(move)push("Attaque",move)}
   const move=card.querySelector(".move, .h25-move")?.textContent;
   if(move)push("Action",move);
 }
 return rows;
}
function getData(card){
 const detail=card.closest("details.card");
 const owner=detail||card;
 let name=owner.querySelector(".poke-name,.h25-mon-name,.h25-poke-name,.h25-name")?.textContent;
 if(!name){
   const text=owner.querySelector("strong,h3,h4")?.textContent;
   if(text&&text.length<=45)name=text;
 }
 name=normalize(name);
 if(!name)return null;
 const image=owner.querySelector("img.raid-artwork-hd, img.sprite, img.h25-thumb, img");
 const role=owner.querySelector("small")?.textContent||"FICHE POKÉMON";
 const note=card.querySelector(".raid-when")?.textContent||
   (detail?detail.querySelector(".build-source-note")?.textContent:"")||
   "";
 const items=detailFrom(card);
 const moves=detail?.querySelectorAll(".move-pill");
 if(moves?.length&&items.length<5)items.push(["Attaques",[...moves].map(m=>normalize(m.textContent).replace(/^[◆✦✧⬡]\s*/,"")).filter(Boolean).join(" · ")]);
 return {name,image,role,note,items,isAction:!!card.closest(".battle-grid")};
}
function paint(data){
 preview.replaceChildren();
 const header=el("div","raid-v11-preview-head");
 const media=el("div","raid-v11-preview-photo");
 if(data.image){
  const img=el("img");
  img.src=data.image.currentSrc||data.image.src;
  img.alt="";
  img.addEventListener("error",()=>img.hidden=true,{once:true});
  media.append(img);
 }
 const title=el("div");
 title.append(el("span","raid-v11-preview-eyebrow",data.role),
              el("strong","raid-v11-preview-name",data.name));
 header.append(media,title);
 preview.append(header);
 if(data.items.length){
  const info=el("div","raid-v11-preview-details");
  for(const [key,value] of data.items.slice(0,6)){
   const row=el("div","raid-v11-preview-line");
   row.append(el("span",null,key),el("strong",null,value));
   info.append(row);
  }
  preview.append(info);
 }
 if(data.note)preview.append(el("p","raid-v11-preview-note",data.note));
 if(data.isAction)preview.append(el("div","raid-v11-preview-footer","Build complet : onglet Pokémon du panneau de raid"));
}
function locate(card){
 const a=card.getBoundingClientRect();
 const width=preview.offsetWidth||315,height=preview.offsetHeight||180;
 const vw=window.innerWidth,vh=window.innerHeight;
 let left=a.right+14;
 if(left+width>vw-12)left=a.left-width-14;
 left=Math.max(12,Math.min(left,vw-width-12));
 const top=Math.max(10,Math.min(a.top+(a.height-height)/2,vh-height-12));
 preview.style.left=Math.round(left)+"px";
 preview.style.top=Math.round(top)+"px";
}
function show(card){
 if(!card||current===card)return;
 const data=getData(card);
 if(!data)return;
 current=card;
 paint(data);
 preview.hidden=false;
 locate(card);
 card.setAttribute("aria-describedby",preview.id);
}
function hide(){
 if(current?.getAttribute("aria-describedby")===preview.id)current.removeAttribute("aria-describedby");
 current=null;preview.hidden=true;
}
const fromEvent=e=>e.target?.closest?.(selectors);
document.addEventListener("mouseover",e=>{const target=fromEvent(e);if(target)show(target);});
document.addEventListener("mouseout",e=>{
 if(!current||!current.contains(e.target))return;
 if(e.relatedTarget&&current.contains(e.relatedTarget))return;
 hide();
});
document.addEventListener("focusin",e=>{const target=fromEvent(e);if(target)show(target);});
document.addEventListener("focusout",e=>{
 if(current&&current.contains(e.target)&&!(e.relatedTarget&&current.contains(e.relatedTarget)))hide();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")hide();});
document.addEventListener("click",e=>{if(!current?.contains(e.target))hide();});
window.addEventListener("scroll",hide,{passive:true,capture:true});
window.addEventListener("resize",hide,{passive:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initPreview,{once:true});
else initPreview();
})();

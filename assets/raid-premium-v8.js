/* RAID ATLAS — Finitions premium V8 (FR seulement).
 * Artworks officiels HD en lieu et place des petits sprites, avec repli sûr.
 * Les éléments de stratégie et leurs événements ne sont jamais recréés.
 * Historique local des 3 derniers raids consultés, sans serveur ni tracking externe.
 */
(()=>{
"use strict";
const ART="/sprites/master/sprites/pokemon/other/official-artwork/";
const ART_HOST="https://raw.githubusercontent.com/PokeAPI";
const REGEX=/^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/master\/sprites\/pokemon\/(\d+)\.png(?:\?.*)?$/i;
const storageKey="raid-atlas-fr-recent-v1";
const archive={
 pumpking:{name:"Pumpking",id:94},
 galvantula:{name:"Galvantula",id:596},
 banette:{name:"Branette",id:354},
 hypno:{name:"Hypnomade",id:97},
 golurk:{name:"Golemastoc",id:623},
 scolipede:{name:"Brutapode",id:545},
 mandibuzz:{name:"Vaututrice",id:630},
 absol:{name:"Absol",id:359},
 darkrai:{name:"Darkrai",id:491}
};
const imageUrl=id=>ART_HOST+ART+id+".png";
function upgradeImage(img){
 if(!(img instanceof HTMLImageElement)||img.dataset.raidHdReady==="1")return;
 const match=(img.getAttribute("src")||"").match(REGEX);
 if(!match)return;
 const old=img.getAttribute("src");
 img.dataset.raidHdReady="1";
 img.dataset.raidSpriteFallback=old;
 img.classList.add("raid-artwork-hd");
 // Never replace an existing onerror handler (Heatran has a custom fallback).
 if(!img.onerror){
   img.addEventListener("error",()=>{
     if(img.dataset.raidSpriteFallback&&img.getAttribute("src")!==img.dataset.raidSpriteFallback){
       img.src=img.dataset.raidSpriteFallback;
       img.classList.remove("raid-artwork-hd");
     }
   },{once:true});
 }
 img.src=imageUrl(match[1]);
}
let scanQueued=false;
function scan(root=document){
 if(root instanceof HTMLImageElement)upgradeImage(root);
 if(root.querySelectorAll)root.querySelectorAll('img[src*="/sprites/master/sprites/pokemon/"]').forEach(upgradeImage);
 // Also cover Halloween / future raid-specific renderers that do not use
 // RaidAtlasComponents.actionGrid. This fixes opaque thumbnail squares at DOM source.
 const selector=".battle-grid .card img, .raid-template-action-grid img, .cres-grid .cres-action img, .h25-battle-grid img, .pump-route-grid img, .h25-player-card img";
 const items=root.querySelectorAll?root.querySelectorAll(selector):[];
 for(const img of items){
   if(!(img instanceof HTMLImageElement))continue;
   upgradeImage(img);
   img.classList.add("raid-action-art");
   for(const prop of ["background","background-color","background-image","border","outline","box-shadow"]){
     img.style.setProperty(prop,prop==="background"||prop==="background-color"?"transparent":"none","important");
   }
   img.style.setProperty("mix-blend-mode","normal","important");
 }
}
function scheduleScan(){
 if(scanQueued)return;scanQueued=true;
 queueMicrotask(()=>{scanQueued=false;scan();});
}
scan();
if(typeof MutationObserver!=="undefined"){
 const mo=new MutationObserver(changes=>{
   for(const c of changes){
     if(c.type==="childList"){
       for(const node of c.addedNodes){
         if(node.nodeType===1&&(node.matches?.("img")||node.querySelector?.("img"))){scheduleScan();return;}
       }
     }else if(c.type==="attributes"&&c.target instanceof HTMLImageElement&&c.target.dataset.raidHdReady!=="1"){scheduleScan();return;}
   }
 });
 mo.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src"]});
}
function readHistory(){
 try{
   const data=JSON.parse(localStorage.getItem(storageKey)||"[]");
   return Array.isArray(data)?data.filter(x=>x&&typeof x.path==="string"&&typeof x.title==="string").slice(0,12):[];
 }catch(_){return [];}
}
function saveHistory(items){try{localStorage.setItem(storageKey,JSON.stringify(items.slice(0,12)));}catch(_){}}
function currentRaid(){
 const file=location.pathname.split("/").pop().toLowerCase();
 if(file==="heatran.html")return {path:"heatran.html",title:"HEATRAN",note:"3 stratégies · Combat interactif",kind:"RAID PERMANENT / 5★",id:485};
 if(file==="cresselia.html")return {path:"cresselia.html",title:"CRESSELIA",note:"3 stratégies · 2 rotations détaillées",kind:"RAID PERMANENT / 6★",id:488};
 if(file==="halloween-2025-raid.html"){
   const key=(new URLSearchParams(location.search).get("boss")||"").toLowerCase();
   if(!Object.prototype.hasOwnProperty.call(archive,key))return null;
   const boss=archive[key];
   return {path:"halloween-2025-raid.html?boss="+key,title:boss.name.toUpperCase(),
    note:"Archive Halloween 2025 · probablement obsolète",kind:"HALLOWEEN / ARCHIVES 2025",id:boss.id};
 }
 return null;
}
const active=currentRaid();
if(active){saveHistory([active,...readHistory().filter(x=>x.path!==active.path)]);}
function personalizeHome(){
 const panel=document.querySelector(".raid-quick-access");
 const list=panel?.querySelector(".raid-quick-access-list");
 if(!list)return;
 const cards=[...list.querySelectorAll("a.raid-quick-access-card")];
 if(cards.length<3)return;
 const defaults=[
  {path:"heatran.html",title:"HEATRAN",note:"3 stratégies · Combat interactif",kind:"RAID PERMANENT / 5★",id:485},
  {path:"cresselia.html",title:"CRESSELIA",note:"3 stratégies · 2 rotations détaillées",kind:"RAID PERMANENT / 6★",id:488},
  {path:"halloween-2025.html",title:"HALLOWEEN",note:"9 boss documentés · probablement obsolète",kind:"ARCHIVES / 2025",id:491}
 ];
 const history=readHistory().filter(row=>{
  if(row.path==="heatran.html"||row.path==="cresselia.html")return true;
  const match=row.path.match(/^halloween-2025-raid\.html\?boss=([a-z]+)$/);
  return !!(match&&Object.prototype.hasOwnProperty.call(archive,match[1]));
 });
 if(!history.length)return; // Preserve the original recommended cards for new visitors.
 const used=new Set(),ordered=[];
 for(const entry of [...history,...defaults]){
  if(used.has(entry.path))continue;
  used.add(entry.path);ordered.push(entry);
  if(ordered.length===3)break;
 }
 cards.slice(0,3).forEach((card,i)=>{
  const entry=ordered[i];if(!entry)return;
  card.href=entry.path;
  const img=card.querySelector("img"),kind=card.querySelector("div span"),title=card.querySelector("div strong"),note=card.querySelector("div small");
  if(img){img.src=imageUrl(entry.id);img.alt="";img.loading="lazy";}
  if(kind)kind.textContent=entry.kind;
  if(title)title.textContent=entry.title;
  if(note)note.textContent=entry.note;
  card.classList.toggle("raid-quick-special",i===0);
  card.classList.add("raid-recent-card");
  card.setAttribute("aria-label","Reprendre le raid "+entry.title);
 });
 const caption=panel.querySelector(".raid-quick-access-head p");
 if(caption)caption.textContent="Tes derniers raids consultés, du plus récent au plus ancien. Tes choix restent enregistrés uniquement dans ce navigateur.";
 const eyebrow=panel.querySelector(".raid-quick-access-head span");
 if(eyebrow)eyebrow.textContent="TES DERNIERS RAIDS / ACCÈS DIRECT";
}
personalizeHome();
})();

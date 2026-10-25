/* RAID ATLAS — carrousel des boss permanents sur l'accueil.
 * Mélange à chaque chargement et rotation automatique, avec pauses accessibles.
 */
(function(){
"use strict";
const image=document.querySelector(".hero-right .hero-pokemon");
const section=image?.closest(".hero-right");
if(!image||!section)return;
const bosses=[
 {id:485,name:"Heatran",state:"Guide disponible",href:"heatran.html"},
 {id:488,name:"Cresselia",state:"Guide disponible",href:"cresselia.html"},
 {id:648,name:"Meloetta",state:"Guide à venir",href:"permanent.html"},
 {id:638,name:"Cobaltium",state:"Guide à venir",href:"permanent.html"},
 {id:639,name:"Terrakium",state:"Guide à venir",href:"permanent.html"},
 {id:640,name:"Viridium",state:"Guide à venir",href:"permanent.html"}
];
function shuffle(items){for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;}
let order=shuffle([...bosses]),index=0,timer=null,paused=false;
const label=section.querySelector(".hero-corner");
const number=section.querySelector(".hero-outline");
const badge=document.createElement("div");badge.className="hero-boss-info";badge.setAttribute("aria-live","polite");
const name=document.createElement("strong");const status=document.createElement("small");badge.append(name,status);
const controls=document.createElement("div");controls.className="hero-boss-controls";
const back=document.createElement("button"),forward=document.createElement("button");
back.type=forward.type="button";back.className="hero-boss-prev";forward.className="hero-boss-next";
back.textContent="←";forward.textContent="→";
back.setAttribute("aria-label","Boss précédent");forward.setAttribute("aria-label","Boss suivant");
const count=document.createElement("span");count.className="hero-boss-count";
controls.append(back,count,forward);
section.append(badge,controls);
if(label){label.textContent="BOSS EN VEDETTE";}
function show(){
 const boss=order[index];
 const url="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+boss.id+".png";
 image.src=url;image.alt="Illustration de "+boss.name;
 image.decoding="async";name.textContent=boss.name;
 status.textContent=boss.state;
 badge.classList.toggle("is-available",boss.state==="Guide disponible");
 badge.setAttribute("data-href",boss.href);
 if(number){number.textContent="RAID";number.setAttribute("aria-hidden","true");}
 count.textContent=(index+1)+" / "+order.length;
}
function go(step){index=(index+step+order.length)%order.length;show();reset();}
function reset(){if(timer){clearInterval(timer);timer=null;}if(paused||document.hidden||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;timer=setInterval(()=>{index=(index+1)%order.length;show();},8000);}
back.addEventListener("click",()=>go(-1));
forward.addEventListener("click",()=>go(1));
section.addEventListener("mouseenter",()=>{paused=true;reset()});
section.addEventListener("mouseleave",()=>{paused=false;reset()});
section.addEventListener("focusin",()=>{paused=true;reset()});
section.addEventListener("focusout",e=>{if(!section.contains(e.relatedTarget)){paused=false;reset();}});
document.addEventListener("visibilitychange",reset);
show();reset();
})();
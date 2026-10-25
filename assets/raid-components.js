/* RAID ATLAS FR — composants canoniques des fiches Heatran et Cresselia.
 * Les moteurs gardent exclusivement leur stratégie et les données Pokémon.
 * Tous les futurs raids utilisent ces fonctions plutôt que fabriquer leurs cartes.
 */
(function(global){
"use strict";
const doc=document;
const el=(tag,cls,txt)=>{const x=doc.createElement(tag);if(cls)x.className=cls;if(txt!=null)x.textContent=String(txt);return x;};
function checkbox(label,checked,change){
 const row=el("label","view-option");const input=el("input");
 input.type="checkbox";input.checked=!!checked;input.addEventListener("change",()=>change(input.checked));
 row.append(input,doc.createTextNode(label));return row;
}
function battleIntro(boss){
 const section=el("div","battle-intro"),inner=el("div");
 inner.append(el("h2",null,"Stratégie de combat"),el("p",null,"Suivez la rotation pour vaincre "+boss+". Chaque tour indique les actions des quatre joueurs."));
 section.append(inner);return section;
}
function phaseSelect({labels,current,onChange}){
 const box=el("div","phase-control");const lab=el("label",null,"PHASE DU COMBAT"),sel=el("select");
 lab.htmlFor="phase";sel.id="phase";sel.setAttribute("aria-label","Choisir le tour du raid");
 labels.forEach((label,i)=>{const option=el("option",null,(i+1)+" / "+labels.length+" · "+label);
 option.value=String(i);option.selected=i===current;sel.append(option);});
 sel.addEventListener("change",()=>onChange(Number(sel.value)));box.append(lab,sel);return box;
}
/* Métadonnées exactes pour les aperçus V12 (sans inventer de builds).
   Data conservées sur la carte utilisée par le moteur et accessibles aux
   futures fiches via action.build ou pokemon du composant buildCard. */
function decoratePreview(node,p){
 if(!p||!node)return node;
 const detail={
   name:p.name||p.n||"",
   item:p.item||"",
   nature:p.nature||"",
   ability:p.ability||p.talent||"",
   ev:p.ev||"",
   iv:p.iv||"",
   moves:Array.isArray(p.moves)?p.moves:(p.attacks||p.moves||"").split(/\\s*[\/·]\\s*/).filter(Boolean),
   source:p.source||"",
   note:p.note||""
 };
 node.dataset.raidBuild=JSON.stringify(detail);
 return node;
}
function actionGrid(actions,selected){
 const grid=el("div","battle-grid");
 actions.forEach((a,i)=>{
  const card=el("div","card"+(i===selected?" selected":""));
  if(a.build)decoratePreview(card,a.build);
  card.append(el("small",null,"P"+(i+1)+(i===selected?" · VOTRE ACTION":"")));
  const line=el("div","poke-row"),info=el("div","poke-text"),name=el("div","poke-name",a.name),move=el("div","move",a.move);
  info.append(name,move);
  if(a.note)info.append(el("small","raid-when",a.note));
  let sprite=a.sprite;
  if(!sprite&&a.spriteUrl){sprite=el("img","sprite");sprite.src=a.spriteUrl;sprite.alt="";sprite.loading="lazy";}
  if(sprite)line.append(sprite);
  line.append(info);card.append(line);grid.append(card);
 });
 return grid;
}
function copyButton(label,copyText,copy){
 const button=el("button","copy-turn-action",label||"Copier ce tour");button.type="button";
 button.addEventListener("click",()=>copy(button,copyText));return button;
}
function battleTurn({target,index,total,title,actions,selected,preflight,banner,notes,advice,onPokemon,onTurnChange,copyText,copy}){
 const panel=target||el("section","turn-section");
 panel.classList.add("turn-panel");panel.append(el("div","section-kicker","Phase "+(index+1)+" sur "+total));
 panel.append(el("h2",null,title));
 if(preflight)panel.append(preflight);
 if(banner)panel.append(el("p","raid-conditional-banner",banner));
 const copyEl=copyButton("Copier ce tour",copyText,copy);
 panel.append(copyEl,actionGrid(actions,selected));
 // Shared raid rule: turn controls replace the redundant "View 6 Pokémon"
 // button, which is already available in the permanent Pokémon tab.
 // Place them immediately after the actions, not at the end of the guide.
 if(typeof onTurnChange==="function"){
  const nav=phaseNav({current:index,total,onChange:onTurnChange});
  nav.classList.add("raid-inline-turn-nav");
  nav.setAttribute("aria-label","Passer au tour précédent ou suivant");
  panel.append(nav);
 }
 if(notes)panel.append(notes);
 if(advice)panel.append(advice);
 return panel;
}
function phaseNav({current,total,onChange}){
 const row=el("div","phase-nav raid-inline-turn-nav"),back=el("button",null,"← Tour précédent"),next=el("button",null,"Tour suivant →");
 back.type=next.type="button";
 back.disabled=current<=0;next.disabled=current>=total-1;
 back.onclick=()=>onChange(current-1);next.onclick=()=>onChange(current+1);
 row.append(back,next);return row;
}
function feature({player,boss,artwork}){
 const section=el("section","pokemon-feature-banner"),copy=el("div");
 copy.append(el("span","eyebrow","FICHES POKÉMON"),el("h2",null,"Préparez votre équipe"),
 el("p",null,"Objets, talents, EV, IV prioritaires et attaques pour le joueur "+(player+1)+". Ouvrez une fiche pour consulter le build complet."));
 section.append(copy);
 if(artwork){const img=el("img","feature-octillery");img.alt="";img.loading="lazy";img.src=artwork;section.append(img);}
 return section;
}
function buildCard({pokemon,index=0,expanded=false,onToggle,copy}){
 const p=pokemon,card=el("details","card");
 decoratePreview(card,p);
 card.open=expanded;
 if(onToggle)card.addEventListener("toggle",()=>onToggle(card));
 const summary=el("summary"),row=el("span","poke-row"),info=el("span","poke-text");
 let img=p.sprite;
 if(!img){img=el("img","sprite");img.alt="";img.loading="lazy";img.src=p.spriteUrl||"";}
 row.append(img);
 info.append(el("div","poke-name",(index+1)+". "+p.name),
 el("div","muted",p.item+" · "+(p.moves?.[0]||"")));
 row.append(info);summary.append(row);card.append(summary);
 const table=el("table");
 const values=[["Objet tenu",p.item],["Nature",p.nature],["Talent",p.ability],["EV",p.ev],
 ["IV prioritaires",p.iv],["Attaques",(p.moves||[]).join(" / ")],["Variantes",p.variant||"Non précisé"]];
 values.forEach(([key,value])=>{const tr=table.insertRow();tr.insertCell().textContent=key;tr.insertCell().textContent=value||"Non précisé";});
 if(p.note)card.append(el("p","muted",p.note));
 const overview=el("div","build-showcase"),specs=el("section","build-specs"),head=el("h3",null,"Répartition du Pokémon");
 specs.append(head);
 const layout=el("div","build-summary"),portrait=el("div","build-portrait");
 let artwork=el("img","sprite large");artwork.alt="";artwork.loading="lazy";
 artwork.src=p.artworkUrl||p.spriteUrl||"";artwork.style.imageRendering="auto";
 portrait.append(artwork);layout.append(portrait);
 const facts=el("div","build-facts");
 [["Objet",p.item],["Nature",p.nature],["Talent",p.ability],["EV",p.ev],["IV prioritaires",p.iv]].forEach(([key,val])=>{
  const f=el("div","build-fact");f.append(el("small",null,key),el("strong",null,val||"Non précisé"));facts.append(f);
 });
 layout.append(facts);specs.append(layout);
 const attacks=el("section","build-moves");
 attacks.append(el("h3",null,"Attaques"));
 (p.moves||[]).forEach((move,j)=>{
  const cell=el("div","move-pill"),symbol=el("span","move-symbol move-symbol-"+(j%4),["◆","✦","✧","⬡"][j%4]);
  cell.append(symbol,el("span",null,move));attacks.append(cell);
 });
 overview.append(specs,attacks);
 card.append(overview,table);
 const b=el("button",null,"Copier le build");b.type="button";
 b.onclick=()=>copy(b,p);
 card.append(b);return card;
}
function prepCard({name,item,sprite,spriteUrl,checks,build}){
 const card=el("div","prep-card"),row=el("div","poke-row");
 if(build)decoratePreview(card,build);
 let img=sprite;
 if(!img&&spriteUrl){img=el("img","sprite");img.src=spriteUrl;img.loading="lazy";img.alt="";}
 if(img)row.append(img);
 row.append(el("div","poke-text",name+(item?" · "+item:"")));
 card.append(row);
 (checks||[]).forEach(c=>{
  const label=el("label","prep-check"),box=el("input");
  box.type="checkbox";box.checked=!!c.checked;
  box.addEventListener("change",()=>c.onChange(box.checked));
  label.append(box,doc.createTextNode(c.label));card.append(label);
 });
 return card;
}
function progressCard(id,title){
 const node=el("div","progress-card"),head=el("div","progress-head"),label=el("span",null,title||"PRÉPARATION"),percent=el("strong");
 percent.id=id+"-pct";percent.textContent="0%";head.append(label,percent);
 const track=el("div","progress-track"),fill=el("div");fill.id=id+"-fill";track.append(fill);
 node.append(head,track);return node;
}
function pokemonIntroNote(text){return el("p","build-source-note",text);}
global.RaidAtlasComponents=Object.freeze({
 checkbox,battleIntro,phaseSelect,actionGrid,battleTurn,phaseNav,feature,buildCard,prepCard,progressCard,pokemonIntroNote,decoratePreview
});
})(window);
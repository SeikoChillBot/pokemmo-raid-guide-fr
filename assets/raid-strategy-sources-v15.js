/* RAID ATLAS — Attribution unifiée : une stratégie / un boss = ses sources vérifiables.
 * Aucun changement aux équipes, tours ou statistiques. Compatible FR et EN.
 */
(function(){
 "use strict";
 const en = document.documentElement.lang.toLowerCase().startsWith("en");
 const tr = (fr,english) => en ? english : fr;
 const path = location.pathname.split("/").pop() || "index.html";
 const make = (tag,cls,value) => {
   const el=document.createElement(tag);
   if(cls) el.className=cls;
   if(value!==undefined) el.textContent=value;
   return el;
 };
 const u = (label,href,note) => ({label,href,note});
 const heatran = {
   core: {
     name:"Crimson Core",
     by:tr("Crimson Core (éditeur du guide ; auteur individuel non confirmé)","Crimson Core (guide publisher; individual creator unconfirmed)"),
     note:tr("Guide original Crimson Core. Les recommandations IV citées à titre complémentaire depuis Beorns ne sont pas des exigences de Crimson Core.","Original Crimson Core guide. Supplemental Beorns IV recommendations are not Crimson Core requirements."),
     links:[u(tr("Guide de raid Crimson Core","Crimson Core raid guide"),"https://www.crimsoncoremmo.co.uk/guides/crimson-core-guides-heatran-raid-octillery-strat")]
   },
   video: {
     name:"Beorns / JinxedBoon",
     by:tr("Beorns (crédit communautaire ; coauteurs non confirmés)","Beorns (community attribution; collaborators unconfirmed)"),
     note:tr("La rotation affichée correspond à la variante vidéo. Le document contient aussi une variante mise à jour, distincte : ne pas mélanger les deux.","The displayed rotation follows the video variant. The source document also contains a separate updated version; do not mix their rotations."),
     links:[u(tr("Document de stratégie Beorns / JinxedBoon","Beorns / JinxedBoon source document"),"https://docs.google.com/document/d/1iZ0YhbEQntdbdRrBzSGR3PLiYkZSc0P962_3N_dnc_E/mobilebasic")]
   },
   cloud:{
     name:"Cloud Five v0.74",
     by:tr("Cadoiz (créateur principal) ; Alde et Groenthijs (theorycraft et tests) ; RogueMaster (Phoebe), Th3_Fastest et autres (tests)","Cadoiz (main creator); Alde and Groenthijs (theorycraft and testing); RogueMaster (Phoebe), Th3_Fastest and others (testing)"),
     note:tr("Source : Cloud Five v0.74, rubrique Credits and History, page 21. Stratégie diffusée par The Council. Certaines mécaniques et variantes restent en test.","Source: Cloud Five v0.74, Credits and History, page 21. Published by The Council. Some mechanics and variants remain under testing."),
     links:[{label:"Cloud Five — original strategy document",href:"https://docs.google.com/document/d/1FCZxveUusrDXNs1IoU7bOykB8Qy3cAE52h0jT5lwOkw/"}]
   }
 };
 const cresselia = {
   musketeers:{
     name:"The Three Musketeers v2.1",
     by:"Cadoiz, RogueMaster (Phoebe), Th3Fastest, OhKaibaBoy",
     note:tr("Version collaborative v2.1 (crédits aux auteurs d'origine). La page Crimson Core est une transcription de référence, pas l'auteur de cette stratégie.","Collaborative v2.1; credit belongs to the original authors. The Crimson Core article is a reference transcription, not the strategy's creator."),
     links:[
       u(tr("Profil de l'auteur Cadoiz (forum PokeMMO)","Original author Cadoiz (PokeMMO forum)"),"https://forums.pokemmo.com/index.php?/profile/541645-cadoiz/"),
       u(tr("Transcription détaillée Crimson Core","Detailed Crimson Core transcription"),"https://www.crimsoncoremmo.co.uk/guides/cresselia-the-three-musketeers-strat")
     ]
   },
   sensei:{
     name:"Sensei / DoubleDude — New Strategy",
     by:tr("CALLMESENSEIX (auteur du guide ; créateurs de toutes les variantes non confirmés)","CALLMESENSEIX (guide author; creators of all variants unconfirmed)"),
     note:tr("Guide de forum : certaines colonnes de la version « New Strategy » sont ambiguës ; vérifier les équipes et les tours dans la source.","Community forum guide: some columns in the New Strategy section are ambiguous; confirm builds and turns against the source."),
     links:[u(tr("Stratégie originale Sensei / DoubleDude","Original Sensei / DoubleDude strategy"),"https://forums.pokemmo.com/index.php?/topic/193398-cresselia-raid-guide/")]
   },
   latin:{
     name:"Latin Combo V2",
     by:"PAXPO avec kriptonito, kalffff et RockeritoGamer",
     note:tr("Vidéo de 12 tours. Les builds complets et la liste des actions n'ont pas été vérifiés et ne sont pas reconstitués artificiellement.","12-turn video reference. Full builds and turn-by-turn actions have not been verified and are not reconstructed."),
     links:[u(tr("Vidéo originale Latin Combo V2","Original Latin Combo V2 video"),"https://www.youtube.com/watch?v=AvmnNLs-CWw")]
   }
 };
 const validLink = href => {
   try { const parsed = new URL(href); return /^https?:$/.test(parsed.protocol) ? parsed.href : null; } catch (_) {return null;}
 };
 function eventSource(){
   const list=typeof HALLOWEEN_2025!=="undefined" ? HALLOWEEN_2025 : [];
   const id=new URLSearchParams(location.search).get("boss");
   const boss=list.find(x=>x.id===id)||list[0];
   if(!boss) return null;
   const selectedMode=(typeof mode==="number" && Number.isInteger(mode))?mode:0;
   const links=[];
   if(boss.source)links.push(u(tr("Guide d'événement PokeMMO 2025 (forum)","PokeMMO 2025 event guide (forum)"),boss.source));
   if(boss.guide)links.push(u(tr("Fiche complémentaire du boss","Supplemental boss reference"),boss.guide));
   if(boss.video2025 && (boss.id!=="pumpking" || selectedMode>0))links.push(u(tr("Vidéo 2025 de cette rencontre","2025 encounter video"),boss.video2025));
   for(const [i,href] of (boss.enrichment?.sources||[]).entries())
     links.push(u(tr("Référence de mécanique ou de préparation "+(i+1),"Mechanics or preparation reference "+(i+1)),href));
   for(const item of (boss.id==="pumpking" && selectedMode===0 ? [] : (boss.enrichment?.guideVideos||[])))
     if(item.url)links.push(u(item.name,item.url,item.description||""));
   if(boss.id==="pumpking"){
     const easy=(typeof PUMPKING_EASY_ROADMAP!=="undefined")?PUMPKING_EASY_ROADMAP:null;
     const hard=(typeof PUMPKING_HYDREIGON_ROADMAP!=="undefined")?PUMPKING_HYDREIGON_ROADMAP:null;
     const route=selectedMode===0?easy:hard;
     if(route?.source)links.push(u(tr("Source de la route sélectionnée","Selected route source"),route.source));
     if(route?.sourceSupplement)links.push(u(tr("Référence complémentaire de cette route","Additional reference for this route"),route.sourceSupplement));
   }
   const unique=links.filter((x,i)=>validLink(x.href)&&links.findIndex(y=>y.href===x.href)===i);
   const modeName = (boss.id==="darkrai" || boss.id==="pumpking") && boss.variants?.[selectedMode]?.name ?
     " · "+boss.variants[selectedMode].name : "";
   return {
     name:boss.name+modeName,
     by:tr("Auteur original non confirmé pour ce boss ; références communautaires indiquées ci-dessous","Original strategy author unconfirmed for this boss; community references below"),
     note:tr("Archives 2025 potentiellement obsolètes pour 2026. Les rosters proposés ou les détails non vérifiés ne sont pas présentés comme officiels.","2025 archives may be outdated for 2026. Proposed rosters or unverified details are not presented as official."),
     links:unique
   };
 }
 let selector=null,data=null,shown=null;
 if(path==="heatran.html"){selector=document.querySelector("#strategy");data=heatran;shown=()=>selector?.value||"core";}
 else if(path==="cresselia.html"){selector=document.querySelector("#cres-strategy");data=cresselia;shown=()=>selector?.value||"musketeers";}
 else if(path==="halloween-2025-raid.html"){data=null;shown=()=>eventSource();}
 else if(path==="halloween-2025.html"||path==="halloween.html"){
   shown=()=>({
     name:tr("Archive Halloween 2025","Halloween 2025 archive"),
     by:tr("Guides communautaires PokeMMO et document de rotation caav","PokeMMO community guides and caav rotation document"),
     note:tr("Les crédits et les liens propres à chaque boss se trouvent en bas de sa fiche. Archives susceptibles d'être obsolètes.","Boss-specific credits and links appear at the bottom of each raid guide. Archived mechanics may be outdated."),
     links:[u(tr("Guide événement Halloween 2025 (forum)","Halloween 2025 event guide (forum)"),"https://forums.pokemmo.com/index.php?/topic/192700-halloween-2025-the-ultimate-halloween-event-guide/")]
   });
 } else if(window.RAID_ATLAS_SOURCE_CONFIG){
   // Extension point for future raids and events: provide {selector, strategies}.
   const config=window.RAID_ATLAS_SOURCE_CONFIG;
   selector=document.querySelector(config.selector);
   data=config.strategies||{};
   shown=()=>selector?.value||Object.keys(data)[0];
 } else return;
 const footer=document.querySelector("footer");if(!footer)return;
 const details=make("details","raid-extra-references raid-source-drawer");
 details.id="raid-strategy-sources";
 details.open=true;
 const summary=make("summary","raid-source-heading");
 summary.append(make("span","raid-source-title",tr("Sources et crédits de la stratégie","Strategy sources and credits")));
 const active=make("span","raid-source-active");
 summary.append(active);
 details.append(summary);
 const content=make("div","raid-source-body");
 details.append(content);

 footer.parentNode.insertBefore(details,footer);
 const attribution=make("aside","raid-author-attribution");
 attribution.setAttribute("aria-label",tr("Crédits des stratégies","Strategy credits"));
 attribution.style.cssText="margin:16px auto 24px;padding:14px 18px;max-width:1160px;border:1px solid rgba(255,255,255,.22);border-left:4px solid #e0444c;border-radius:8px;background:rgba(20,21,25,.92);color:#f4f4f4;font:inherit;line-height:1.55";
 const attributionHeading=make("div","raid-author-attribution-heading",tr("CRÉDITS DES STRATÉGIES COMMUNAUTAIRES","COMMUNITY STRATEGY CREDITS"));
 attributionHeading.style.cssText="font-weight:800;letter-spacing:.04em;margin-bottom:5px";
 const attributionNames=make("p","raid-author-attribution-names");
 attributionNames.style.margin="4px 0";
 const attributionPurpose=make("p","raid-author-attribution-purpose",tr("RAID ATLAS centralise, traduit et compare des stratégies communautaires. Les stratégies appartiennent à leurs auteurs respectifs ; Seiko a créé le site, pas les stratégies.","RAID ATLAS collects, translates and compares community strategies. Strategies belong to their respective authors; Seiko created the website, not the strategies."));
 attributionPurpose.style.cssText="margin:6px 0;font-size:.92em;color:#d5d5d5";
 const attributionLink=make("a","raid-author-attribution-link",tr("Voir les auteurs et les sources originales ↓","View original authors and sources ↓"));
 attributionLink.href="#raid-strategy-sources";
 attributionLink.style.cssText="color:#ff9da5;text-decoration:underline;font-weight:600";
 attribution.append(attributionHeading,attributionNames,attributionPurpose,attributionLink);
 const main=document.querySelector("main");
 if(main)main.insertBefore(attribution,main.firstChild);
 else footer.parentNode.insertBefore(attribution,details);
 function render(){
   const src=typeof shown()==="string"?data[shown()]:shown();
   if(!src)return;
   active.textContent=src.name;
   attributionNames.textContent=tr("Stratégie : ","Strategy: ")+src.name+" — "+tr("Auteurs / contributeurs : ","Authors / contributors: ")+src.by;
   content.replaceChildren();
   content.append(make("p","raid-source-by",tr("Auteurs / contributeurs : ","Authors / contributors: ")+src.by));
   const links=make("div","raid-source-links");
   for(const item of src.links||[]){
     const url=validLink(item.href);if(!url)continue;
     const a=make("a","raid-source-link",item.label+" ↗");
     a.href=url;a.target="_blank";a.rel="noopener noreferrer";
     links.append(a);
     if(item.note)links.append(make("span","raid-source-link-note",item.note));
   }
   if(links.children.length)content.append(links);
   content.append(make("p","raid-source-note",src.note||""));
 }
 if(selector)selector.addEventListener("change",render);
 if(path==="halloween-2025-raid.html")document.addEventListener("click",event=>{
   if(event.target.closest?.("#mode-container button"))Promise.resolve().then(render);
 });
 render();
})();
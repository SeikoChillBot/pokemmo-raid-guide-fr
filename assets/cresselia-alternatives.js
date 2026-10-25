/* RAID ATLAS / Cresselia — variantes de la source primaire.
 * Source Sensei/DoubleDude: guide du forum PokeMMO (section "New Strategy").
 * Latin Combo V2: référencé chez MMOBreeder ; vidéo Latin Combo par PAXPO (09/11/2025); EV/IV et actions
 * absents d'une source vérifiable dans cet audit: jamais de valeurs inventées.
 */
(function(global){
"use strict";
const FR={
"Sucker Punch":"Coup Bas","Fling":"Dégommage","Fake Tears":"Croco Larme",
"Psywave":"Vague Psy","Seismic Toss":"Frappe Atlas","Light Screen":"Mur Lumière",
"Captivate":"Séduction","Brine":"Saumure","Safeguard":"Rune Protect",
"Toxic":"Toxik","Hex":"Châtiment","Assurance":"Assurance","Mud Sport":"Lance-Boue",
"Knock Off":"Sabotage","Crunch":"Mâchouille","Power Gem":"Rayon Gemme",
"Dark Gem":"Joyau Ténèbres","Poison Barb":"Pic Venin","Choice Band":"Bandeau Choix",
"Choice Specs":"Lunettes Choix","Assault Vest":"Veste de Combat","Covert Cloak":"Cape Obscure",
"Life Orb":"Orbe Vie","Mystic Water":"Eau Mystique","Rock Gem":"Joyau Roche",
"Eviolite":"Évoluroc","Iron Ball":"Balle Fer","Timid":"Timide","Calm":"Calme",
"Modest":"Modeste","Adamant":"Rigide","Sassy":"Malpoli",
"Prankster":"Farceur","Defiant":"Acharné","Competitive":"Battant",
"Cursed Body":"Corps Maudit","Sand Stream":"Sable Volant","Lightning Rod":"Paratonnerre"
};
const ids={Purugly:432,Bisharp:625,Whimsicott:547,Blissey:242,Milotic:350,Empoleon:395,
 Weavile:461,Hydreigon:635,Gengar:94,Cubone:104,Tyranitar:248,Chandelure:609,
 Minun:312,Krookodile:553};
const names={Purugly:"Chaffreux",Bisharp:"Scalproie",Whimsicott:"Farfaduvet",
 Blissey:"Leuphorie",Milotic:"Milobellus",Empoleon:"Pingoléon",Weavile:"Dimoret",
 Hydreigon:"Trioxhydre",Gengar:"Ectoplasma",Cubone:"Osselait",Tyranitar:"Tyranocif",
 Chandelure:"Lugulabre",Minun:"Négapi",Krookodile:"Crocorible"};
const tr=text=>String(text||"").split(" / ").map(x=>FR[x]||x).join(" / ");
const p=(key,moves,item,nature,ability,ev,iv,note="")=>({
 n:names[key]||key,id:ids[key],item:tr(item)||"Non précisé",nature:tr(nature)||"Non imposée",
 talent:tr(ability)||"Non précisé",ev:ev||"Non imposés / non publiés",
 iv:iv||"Non imposés / non publiés",attacks:tr(moves)||"Aucune attaque exigée dans le tableau source",
 note
});
const S=[
 [p("Purugly","Sucker Punch","Dark Gem","+Attaque","Defiant","252 Att.","Att. 31"),
  p("Bisharp","Sucker Punch","Choice Band","+Attaque","Defiant","252 Att.","Att. 31"),
  p("Whimsicott","Fake Tears","","","Prankster","",""),
  p("Blissey","Psywave / Seismic Toss / Light Screen / Captivate","Covert Cloak","Calm","","216 PV / 40 Déf. / 252 Déf. Spé.","PV 31 / Déf. Spé. 31 / Vit. 31"),
  p("Milotic","Brine / Light Screen","Iron Ball","Modest","Competitive","252 Att. Spé. / 252 Déf. Spé.","PV 31 / Att. Spé. 31 / Déf. Spé. 31 / Vit. 31"),
  p("Empoleon","Brine","Assault Vest","Calm","Competitive","252 Att. Spé. / 252 Déf. Spé.","PV 31 / Att. Spé. 31 / Déf. Spé. 31 / Vit. 31","Table des builds : aucune attaque indiquée. Rotation T13 : Saumure ; conflit de présentation entre tableau et rotation à confirmer dans le guide d’origine.")],
 [p("Weavile","Fling","Poison Barb","Adamant","","252 Att. / 252 Vit.","Att. 31"),
  p("Bisharp","Sucker Punch","Choice Band","+Attaque","Defiant","252 Att.","Att. 31"),
  p("Hydreigon","Assurance","Dark Gem","Adamant","","252 Att. / 252 Vit.","Att. 31 / Vit. 31"),
  p("Blissey","Psywave / Seismic Toss / Toxic / Captivate","Covert Cloak","Calm","","216 PV / 32 Déf. / 252 Déf. Spé. / 8 Vit.","PV 31 / Déf. Spé. 31 / Vit. 31"),
  p("Milotic","Brine / Light Screen / Safeguard / Captivate","Mystic Water","Modest","Competitive","252 Att. Spé. / 252 Déf. Spé.","PV 31 / Att. Spé. 31 / Déf. Spé. 31 / Vit. 31"),
  p("Empoleon","Brine","Assault Vest","Calm","Competitive","242 Att. Spé. / 252 Déf. Spé. / 16 Vit.","PV 31 / Att. Spé. 31 / Déf. Spé. 31 / Vit. 31")],
 [p("Purugly","Sucker Punch","Dark Gem","+Attaque","Defiant","252 Att.","Att. 31"),
  p("Bisharp","Sucker Punch","Choice Band","+Attaque","Defiant","252 Att.","Att. 31"),
  p("Gengar","Hex","Choice Specs","Modest","Cursed Body","252 Att. Spé. / 252 Vit.","Att. Spé. 31 / Vit. 31"),
  p("Blissey","Psywave / Seismic Toss / Light Screen / Captivate","Covert Cloak","Calm","","216 PV / 16 Déf. / 252 Déf. Spé. / 24 Vit.","PV 31 / Déf. Spé. 31 / Vit. 31"),
  p("Cubone","Captivate / Knock Off","Eviolite","Sassy","Lightning Rod","252 PV / 252 Déf. Spé.","Déf. Spé. 31","Utilisé au T9–T11 pour Séduction puis Sabotage."),
  p("Tyranitar","Assurance / Crunch / Power Gem / Captivate","Rock Gem","Adamant","Sand Stream","Non précisés dans la table de Sensei","Non imposés dans la table de Sensei")],
 [p("Purugly","Sucker Punch","Life Orb","+Attaque","Defiant","252 Att.","Att. 31"),
  p("Bisharp","Sucker Punch","Dark Gem","+Attaque","Defiant","252 Att.","Att. 31"),
  p("Chandelure","Hex","Choice Specs","Timid","Cursed Body","252 Att. Spé. / 252 Vit.","Att. Spé. 31 / Vit. 31"),
  p("Blissey","Psywave / Seismic Toss / Toxic / Captivate","Covert Cloak","Calm","","216 PV / 252 Déf. Spé. / 40 Vit.","PV 31 / Déf. Spé. 31 / Vit. 31"),
  p("Minun","Mud Sport / Seismic Toss","","Calm","","252 PV / 252 Déf. Spé.","PV 31 / Déf. Spé. 31","Dans des échanges ultérieurs du forum, une Balle Fer est discutée : contrôle de version indispensable."),
  p("Krookodile","Assurance","Choice Band","Adamant","","Non précisés dans cette section","PV 31 / Att. 31 / Déf. Spé. 31","Avertissement source : la dernière colonne est intitulée Tyranitar mais représente Crocorible dans l'illustration et la rotation. Identification à confirmer avant élevage.")]
];
const t=(label,acts,hp="",info="")=>({label,hp,info,actions:acts.map(([id,move])=>[id,tr(move)])});
const T=[
 t("Ouverture · poison et Coup Bas",[[0,"Sucker Punch"],[0,"Fling"],[0,"Sucker Punch"],[0,"Sucker Punch"]],"","Les deux premiers tours déclenchent les changements de Pokémon prévus."),
 t("Quatre Scalproie",[[1,"Sucker Punch"],[1,"Sucker Punch"],[1,"Sucker Punch"],[1,"Sucker Punch"]]),
 t("Croco Larme et attaques Spectre",[[2,"Fake Tears"],[2,"Assurance"],[2,"Hex"],[2,"Hex"]],"≈65 %","La source situe le premier palier vers 65 % : surveiller l'alternance de dégâts."),
 t("Leuphorie · mise en place",[[3,"Seismic Toss"],[3,"Psywave"],[3,"Light Screen"],[3,"Captivate"]]),
 t("Frappe Atlas et Vague Psy",[[3,"Seismic Toss"],[3,"Psywave"],[3,"Seismic Toss"],[3,"Psywave"]]),
 t("Gestion de Toxik",[[3,"Seismic Toss"],[3,"Psywave"],[3,"Seismic Toss"],[3,"Toxic"]]),
 t("Alternance de dégâts",[[3,"Psywave"],[3,"Seismic Toss"],[3,"Psywave"],[3,"Seismic Toss"]]),
 t("Séduction et dégâts fixes",[[3,"Captivate"],[3,"Psywave"],[3,"Seismic Toss"],[3,"Captivate"]]),
 t("Milobellus et préparations",[[4,"Light Screen"],[4,"Safeguard"],[4,"Captivate"],[4,"Mud Sport"]],"≈50 %","Le guide annonce le palier 50 %. Respecter le ciblage et les statistiques avant de changer de phase."),
 t("Saumure et Sabotage",[[4,"Brine"],[4,"Brine"],[4,"Knock Off"],[4,"Seismic Toss"]]),
 t("Séduction au palier 25 %",[[4,"Brine"],[4,"Captivate"],[4,"Captivate"],[4,"Seismic Toss"]],"≈25 %","Au palier 25 %, la répartition exacte des dégâts et le ciblage restent critiques."),
 t("Tyranocif et Crocorible",[[4,"Brine"],[4,"Brine"],[5,"Assurance"],[5,"Assurance"]],"","P4 : Crocorible est identifié par la rotation, mais le titre de la colonne source dit Tyranitar."),
 t("Conclusion · dégâts coordonnés",[[5,"Brine"],[5,"Brine"],[5,"Assurance"],[5,"Assurance"]],"","Source du forum : vérifier la version la plus récente et les ajustements de Vitesse avant reproduction.")
];
const sourceSensei="https://forums.pokemmo.com/index.php?/topic/193398-cresselia-raid-guide/";
const sourceLatin="https://www.youtube.com/watch?v=AvmnNLs-CWw";
const Latin={
 id:"latin",title:"Latin Combo V2 · vidéo 12 tours",brief:"Vidéo collaborative Latin Combo publiée par PAXPO le 9 novembre 2025. La variante V2 (12 tours) est listée par MMOBreeder ; les builds et les 48 actions ne sont pas vérifiés indépendamment.",
 complete:false,tours:12,
 source:sourceLatin,
 videoCredits:"PAXPO avec kriptonito, kalffff et RockeritoGamer",
 warning:"Guide vidéo uniquement : aucune composition complète, attaque de tour, valeur EV ou IV n'a été inventée. Visionner et relever les séquences depuis la vidéo d'origine avant de reproduire la stratégie.",
 team:[[],[],[],[]],turns:[]
};
global.CresseliaAlternatives=Object.freeze({
 sensei:{id:"sensei",title:"Sensei / DoubleDude — New Strategy",brief:"24 fiches et 13 tours retranscrits depuis la section New Strategy du guide source. Certaines colonnes de la source sont ambiguës.",complete:true,source:sourceSensei,team:S,turns:T,
 warning:"Guide Sensei/DoubleDude (version New Strategy, distincte de Old et Experimental). La dernière colonne du joueur 4 se contredit (Tyranitar/Crocorible) et des EV/attaques ne sont pas imposés. Vérifier la source avant élevage.",
 notes:["La variante New Strategy commence par Chaffreux et Dimoret (Dégommage), puis quatre Scalproie.","À partir des paliers, respecter l'alternance physique/spécial imposée par le boss.","Les ajustements de Vitesse et de ciblage IA ne doivent pas être improvisés.","P4 : dernier Pokémon nommé Tyranitar dans l'en-tête du forum mais représenté par Crocorible dans la rotation."]},
 latin:Latin
});
})(window);
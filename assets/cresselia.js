/* Cresselia raid PokeMMO — données citées v2.1, aucune dépendance aux autres guides. */
const CRESSELIA_DATA={
  "team": [
    [
      {
        "n": "Hippodocus",
        "id": 450,
        "item": "Herbe Blanche",
        "talent": "Sable Volant",
        "nature": "Augmente la Déf. Spé. sans baisser la Vitesse",
        "iv": "PV 31 ; Déf. Spé. 31 ; Vit. 27–31",
        "ev": "20 Déf. Spé. ; 252 Vit. ; reste Déf.",
        "attacks": "Séduction",
        "note": "Séduction au T1 ; K.O. prévu au T2. Le timing est déterminant."
      },
      {
        "n": "Farfaduvet",
        "id": 547,
        "item": "Lumargile",
        "talent": "Libre",
        "nature": "Libre",
        "iv": "Non imposés",
        "ev": "Éviter les EV en Déf. Spé.",
        "attacks": "Mur Lumière",
        "note": "Pose Mur Lumière au T3. Éviter la Déf. Spé. pour conserver le ciblage prévu."
      },
      {
        "n": "Darumacho",
        "id": 555,
        "item": "Bandeau Choix",
        "talent": "Sans Limite",
        "nature": "Nature +Attaque",
        "iv": "Att. 31",
        "ev": "252 Att. ; Vitesse finale inférieure à 269 ; reste Déf./Att. Spé.",
        "attacks": "Boutefeu",
        "note": "Attaquant T4. Conserver la Vitesse finale sous le seuil indiqué par la source."
      },
      {
        "n": "Gueriaigle",
        "id": 628,
        "item": "Baie Pommo",
        "talent": "Acharné",
        "nature": "Rigide / Solo",
        "iv": "Att. 21–31 ; Vit. 3–31 ; PV 2–31 ; Déf. Spé. 3–31",
        "ev": "6 PV ; 252 Att. ; 252 Vit.",
        "attacks": "Assurance",
        "note": "T5. Construit pour atteindre le plafond de dégâts sans objet offensif."
      },
      {
        "n": "Milobellus",
        "id": 350,
        "item": "Cape Obscure",
        "talent": "Battant",
        "nature": "Discret",
        "iv": "PV 31 ; Att. Spé. 31 ; Déf. Spé. 31 ; Vit. 0–1",
        "ev": "6 PV ; 252 Att. Spé. ; 252 Déf. Spé.",
        "attacks": "Rune Protect · Lance-Boue · Saumure",
        "note": "Rune Protect au T6 puis Lance-Boue au T7. L'IV Vitesse 0–1 est intentionnel."
      },
      {
        "n": "Pingoléon",
        "id": 395,
        "item": "Lunettes Choix",
        "talent": "Battant",
        "nature": "Modeste / Doux / Discret",
        "iv": "PV 31 ; Att. Spé. 31 ; Déf. Spé. 31",
        "ev": "6 PV ; 252 Att. Spé. ; 252 Déf. Spé.",
        "attacks": "Saumure",
        "note": "T8–T10. Variante de répartition polyvalente corrigée : 232 Att. Spé. / 252 Déf. Spé. / 20 Vit. ; comparer avant d'utiliser entre rôles."
      }
    ],
    [
      {
        "n": "Dimoret",
        "id": 461,
        "item": "Pointe Poison",
        "talent": "Non imposé",
        "nature": "Rigide / Solo",
        "iv": "PV 2–31 ; Déf. Spé. 2–31 ; Att. 31 ; Vit. 31",
        "ev": "252 Att. ; 252 Vit.",
        "attacks": "Dégommage",
        "note": "T1 : lance la Pointe Poison avec Dégommage."
      },
      {
        "n": "Scalproie",
        "id": 625,
        "item": "Orbe Vie",
        "talent": "Acharné",
        "nature": "Rigide / Solo / Brave",
        "iv": "PV 31 ; Att. 31 ; Déf. Spé. 31",
        "ev": "252 Att. ; 252 Déf. Spé.",
        "attacks": "Coup Bas",
        "note": "T2–T3. L'un des trois Scalproie du noyau offensif."
      },
      {
        "n": "Sharpedo",
        "id": 319,
        "item": "Bandeau Choix",
        "talent": "Non imposé",
        "nature": "Rigide / Solo / Mauvais",
        "iv": "Att. 31 ; Vit. 31",
        "ev": "252 Att. ; 252 Vit.",
        "attacks": "Assurance",
        "note": "T4 : dommage physique en transition."
      },
      {
        "n": "Gueriaigle",
        "id": 628,
        "item": "Veste de Combat",
        "talent": "Acharné",
        "nature": "Rigide / Solo",
        "iv": "Att. 21–31 ; Vit. 3–31",
        "ev": "6 PV ; 252 Att. ; 252 Déf. Spé.",
        "attacks": "Assurance",
        "note": "T5. Sa Déf. Spé. oriente le ciblage vers le Gueriaigle de J1 ; ne pas ajouter des EV Vitesse librement."
      },
      {
        "n": "Milobellus",
        "id": 350,
        "item": "Cape Obscure",
        "talent": "Battant",
        "nature": "Modeste / Doux",
        "iv": "PV 31 ; Att. Spé. 31 ; Déf. Spé. 31",
        "ev": "6 PV ; 252 Att. Spé. ; 252 Déf. Spé. (Vitesse à vérifier)",
        "attacks": "Saumure",
        "note": "T6–T7. Doit dépasser Tyranocif à −2 en Vitesse ; la source exige de régler cet ordre."
      },
      {
        "n": "Pingoléon",
        "id": 395,
        "item": "Lunettes Choix",
        "talent": "Battant",
        "nature": "Modeste / Doux",
        "iv": "PV 31 ; Att. Spé. 31 ; Déf. Spé. 31 ; Vit. 31",
        "ev": "232 Att. Spé. ; 252 Déf. Spé. ; 20 Vit.",
        "attacks": "Saumure",
        "note": "T8–T10. Répartition corrigée confirmée par l'auteur du guide (mars 2026)."
      }
    ],
    [
      {
        "n": "Alakazam",
        "id": 65,
        "item": "Sans objet",
        "talent": "Non imposé",
        "nature": "Ne doit pas augmenter la Déf. Spé.",
        "iv": "Déf. Spé. 0–30",
        "ev": "252 Vit. ; reste Att./Déf./Att. Spé.",
        "attacks": "Rune Protect",
        "note": "T1 : protection contre les statuts."
      },
      {
        "n": "Scalproie",
        "id": 625,
        "item": "Bandeau Choix",
        "talent": "Acharné",
        "nature": "Rigide / Solo / Brave",
        "iv": "PV 31 ; Att. 31 ; Déf. Spé. 31",
        "ev": "152 PV ; 168 Att. ; 88 Déf. Spé.",
        "attacks": "Coup Bas",
        "note": "T2–T3. Répartition reprise telle que publiée ; les EV restants ne sont pas déduits."
      },
      {
        "n": "Nostenfer",
        "id": 169,
        "item": "Sans objet",
        "talent": "Non imposé",
        "nature": "Libre",
        "iv": "Non imposés",
        "ev": "252 Vit. ; reste Att./Déf./Att. Spé.",
        "attacks": "Bombe Acide",
        "note": "T4 : baisse la Déf. Spé. du boss pour la suite."
      },
      {
        "n": "Sidérella",
        "id": 576,
        "item": "Lunettes Choix",
        "talent": "Battant",
        "nature": "Modeste / Doux",
        "iv": "PV 29–31 ; Déf. Spé. 29–31 ; Att. Spé. 31",
        "ev": "6 PV ; 252 Att. Spé. ; 252 Déf. Spé.",
        "attacks": "Ball’Ombre",
        "note": "T5. Répartition en Déf. Spé. propre au joueur 3."
      },
      {
        "n": "Colhomard",
        "id": 342,
        "item": "Pointe Poison",
        "talent": "Adaptabilité",
        "nature": "Rigide / Solo / Brave",
        "iv": "PV 20–31 ; Att. 31 ; Déf. Spé. 20–31",
        "ev": "6 PV ; 252 Att. ; 252 Déf. Spé.",
        "attacks": "Dégommage · Assurance",
        "note": "Dégommage au T6 ; Assurance du T8 au T10."
      },
      {
        "n": "Tyranocif",
        "id": 248,
        "item": "Balle Fer",
        "talent": "Sable Volant",
        "nature": "Rigide / Solo",
        "iv": "PV 31 ; Att. 31 ; Déf. Spé. 31 ; Vit. 31",
        "ev": "6 PV ; 252 Att. ; 252 Déf. Spé.",
        "attacks": "Séduction · Assurance",
        "note": "T7 : Séduction permet de contrôler l'Att. Spé. de Cresselia avant le final."
      }
    ],
    [
      {
        "n": "Xatu",
        "id": 178,
        "item": "Mouchoir Choix",
        "talent": "Libre",
        "nature": "Libre",
        "iv": "Non imposés",
        "ev": "252 Vit. ; reste Att./Déf./Att. Spé.",
        "attacks": "Air Veinard",
        "note": "T1 : protège des coups critiques."
      },
      {
        "n": "Scalproie",
        "id": 625,
        "item": "Orbe Vie",
        "talent": "Acharné",
        "nature": "Rigide / Solo / Brave",
        "iv": "PV 31 ; Att. 31 ; Déf. Spé. 31",
        "ev": "6 PV ; 252 Att. ; 252 Déf. Spé.",
        "attacks": "Coup Bas · Assurance",
        "note": "Coup Bas T2–T3 ; Assurance T8–T10 sur le même emplacement d'équipe."
      },
      {
        "n": "Ectoplasma",
        "id": 94,
        "item": "Joyau Spectre",
        "talent": "Corps Maudit",
        "nature": "Modeste / Doux / Foufou",
        "iv": "Att. Spé. 31 ; Vit. 31",
        "ev": "252 Att. Spé. ; 120 Vit. ; reste libre",
        "attacks": "Châtiment",
        "note": "T4 : attaque spéciale de transition."
      },
      {
        "n": "Sidérella",
        "id": 576,
        "item": "Lunettes Choix",
        "talent": "Battant",
        "nature": "Modeste / Doux / Foufou",
        "iv": "Att. Spé. 31",
        "ev": "6 PV ; 252 Att. Spé. ; 252 Vit.",
        "attacks": "Ball’Ombre",
        "note": "T5 : répartition visant le ciblage spécifique de l'IA sur J4."
      },
      {
        "n": "Lippoutou",
        "id": 124,
        "item": "Baie Pommo",
        "talent": "Non imposé",
        "nature": "Nature neutre pour la Déf. Spé.",
        "iv": "À répartir selon rôle (source sans seuil)",
        "ev": "Répartition libre en Att./Déf./Att. Spé.",
        "attacks": "Air Veinard",
        "note": "T6 : renouvelle la protection contre les coups critiques."
      },
      {
        "n": "Crocorible",
        "id": 553,
        "item": "Bandeau Choix",
        "talent": "Non imposé",
        "nature": "Rigide / Solo",
        "iv": "PV 31 ; Att. 31 ; Déf. Spé. 31",
        "ev": "6 PV ; 252 Att. ; 252 Déf. Spé.",
        "attacks": "Assurance",
        "note": "T7 : dégâts physiques de transition."
      }
    ]
  ],
  "turns": [
    {
      "hp": "≈ 98 %",
      "label": "Ouverture et protections",
      "actions": [
        [
          0,
          "Séduction"
        ],
        [
          0,
          "Dégommage"
        ],
        [
          0,
          "Rune Protect"
        ],
        [
          0,
          "Air Veinard"
        ]
      ],
      "info": "Hippodocus applique Séduction, Dimoret lance la Pointe Poison et les deux protections se mettent en place. Le ciblage est sensible aux statistiques de départ."
    },
    {
      "hp": "≈ 85 %",
      "label": "Trois Scalproie",
      "actions": [
        [
          0,
          "K.O. prévu"
        ],
        [
          1,
          "Coup Bas"
        ],
        [
          1,
          "Coup Bas"
        ],
        [
          1,
          "Coup Bas"
        ]
      ],
      "info": "Le K.O. d’Hippodocus doit libérer l'emplacement J1. Les Scalproie J2, J3 et J4 frappent avec Coup Bas."
    },
    {
      "hp": "≈ 72 %",
      "label": "Mur Lumière et Coups Bas",
      "actions": [
        [
          1,
          "Mur Lumière"
        ],
        [
          1,
          "Coup Bas"
        ],
        [
          1,
          "Coup Bas"
        ],
        [
          1,
          "Coup Bas"
        ]
      ],
      "info": "Farfaduvet pose Mur Lumière. La mécanique d’alternance physique / spécial devient déterminante après le palier des 75 % : respecter l’ordre réel d’action."
    },
    {
      "hp": "≈ 63 %",
      "label": "Transition mixte",
      "actions": [
        [
          2,
          "Boutefeu"
        ],
        [
          2,
          "Assurance"
        ],
        [
          2,
          "Bombe Acide"
        ],
        [
          2,
          "Châtiment"
        ]
      ],
      "info": "Bombe Acide prépare les attaques spéciales. Ne pas changer l’ordre de Vitesse des Pokémon sans recalcul."
    },
    {
      "hp": "≈ 45 %",
      "label": "Gueriaigle et Sidérella",
      "actions": [
        [
          3,
          "Assurance"
        ],
        [
          3,
          "Assurance"
        ],
        [
          3,
          "Ball’Ombre"
        ],
        [
          3,
          "Ball’Ombre"
        ]
      ],
      "info": "Les Gueriaigle attaquent physiquement et les Sidérella spécialement. Le réglage des défenses oriente les cibles choisies par Cresselia."
    },
    {
      "hp": "≈ 39 %",
      "label": "Phase Milobellus",
      "actions": [
        [
          4,
          "Rune Protect"
        ],
        [
          4,
          "Saumure"
        ],
        [
          4,
          "Dégommage"
        ],
        [
          4,
          "Air Veinard"
        ]
      ],
      "info": "Le premier Milobellus pose Rune Protect, le second utilise Saumure ; Colhomard lance son objet, Lippoutou renforce la protection contre les critiques."
    },
    {
      "hp": "≈ 33 %",
      "label": "Lance-Boue et Séduction",
      "actions": [
        [
          4,
          "Lance-Boue"
        ],
        [
          4,
          "Saumure"
        ],
        [
          5,
          "Séduction"
        ],
        [
          5,
          "Assurance"
        ]
      ],
      "info": "Lance-Boue réduit la pression de Tonnerre. Tyranocif intervient pour ramener l’Attaque Spéciale du boss au niveau prévu avant Pingoléon."
    },
    {
      "hp": "≈ 22 %",
      "label": "Début du final",
      "actions": [
        [
          5,
          "Saumure"
        ],
        [
          5,
          "Saumure"
        ],
        [
          4,
          "Assurance"
        ],
        [
          1,
          "Assurance"
        ]
      ],
      "info": "Double Saumure avec les deux Pingoléon, complétée par Colhomard et Scalproie. Le réglage corrigé de Pingoléon J2 compte."
    },
    {
      "hp": "≈ 11 %",
      "label": "Maintien du final",
      "actions": [
        [
          5,
          "Saumure"
        ],
        [
          5,
          "Saumure"
        ],
        [
          4,
          "Assurance"
        ],
        [
          1,
          "Assurance"
        ]
      ],
      "info": "Même séquence que le tour 8 ; viser le palier d’environ 11 % sans changer l’ordre d’action."
    },
    {
      "hp": "0 % visé",
      "label": "Dernière poussée",
      "actions": [
        [
          5,
          "Saumure"
        ],
        [
          5,
          "Saumure"
        ],
        [
          4,
          "Assurance"
        ],
        [
          1,
          "Assurance"
        ]
      ],
      "info": "La rotation publiée prévoit de vaincre Cresselia en dix tours. Selon la variation en jeu, la fin peut exiger une adaptation ; pas de garantie automatique."
    }
  ],
  "mechanics": [
    [
      "Lien Miroir · 100 %",
      "Quand un Pokémon tombe K.O., les Pokémon de la même espèce sur le côté concerné peuvent tomber avec lui. Prévoir les entrées et sorties des équipes."
    ],
    [
      "Plénitude · 80 %",
      "Cresselia augmente ses statistiques spéciales. Séduction est chronométrée pour contrôler ses dégâts."
    ],
    [
      "Alternance · 75 %",
      "La mécanique impose une alternance des catégories physiques et spéciales. L’ordre réel des attaques importe autant que les actions affichées par joueur."
    ],
    [
      "Distorsion · 65 %",
      "L’ordre de Vitesse change : certains réglages apparemment étranges sont volontaires."
    ],
    [
      "Bascule de l’alternance · 50 %",
      "La règle du type de dégâts alternés change à ce palier. Contrôler les dégâts effectifs avant de poursuivre."
    ],
    [
      "Plénitude · 25 %",
      "Nouveau renforcement : les défenses, Lance-Boue et Séduction deviennent critiques pour le final."
    ],
    [
      "Plafond des dégâts",
      "Le guide v2.1 vise le plafond de dégâts (4 % pour les attaques super efficaces du raid 6★). Les objets ne servent pas toujours à augmenter directement les dégâts."
    ],
    [
      "Réinitialisation des baisses de stats",
      "Selon les correctifs des raids, les baisses de statistiques peuvent disparaître ensemble à l'expiration du premier minuteur (8 actions). Ne pas décaler Séduction."
    ],
    [
      "Ciblage de l’IA",
      "Les EV de Défense Spéciale et les Vitesses de Gueriaigle et Sidérella sont calibrés pour attirer certaines attaques sur le bon joueur."
    ],
    [
      "Tonnerre / Lance-Boue",
      "Lance-Boue diminue l’efficacité des attaques Électrik et protège notamment la phase Pingoléon."
    ],
    [
      "Protection et coups critiques",
      "Rune Protect et Air Veinard ont des fonctions distinctes. Ne pas remplacer ces tours par de simples attaques."
    ],
    [
      "Pokémon additionnels",
      "Feunard et Fragilady apparaissent dans des guides communautaires du raid. Leurs attaques citées comprennent Tricherie et Ball’Météo."
    ]
  ],
  "sources": [
    [
      "Auteur du guide v2.1 — profil Cadoiz",
      "https://forums.pokemmo.com/index.php?/profile/541645-cadoiz/",
      "Version 2.1 de Cadoiz, RogueMaster (Phoebe), Th3Fastest et OhKaibaBoy, commentaires de correction des EV de Pingoléon."
    ],
    [
      "Crimson Core — transcription 19 septembre 2026",
      "https://www.crimsoncoremmo.co.uk/guides/cresselia-the-three-musketeers-strat",
      "Reprise détaillée des 24 fiches et de la rotation en dix tours ; la page précise que le forum source était partiellement inaccessible pendant sa consultation."
    ],
    [
      "MMOBreeder — Cresselia en français",
      "https://mmobreeder.com/fr/raids/cresselia",
      "Comparaison entre The Three Musketeers v2.1, Sensei's New Strategy et Latin Combo V2."
    ],
    [
      "CALLMESENSEIX — stratégie 2025",
      "https://forums.pokemmo.com/index.php?/topic/193398-cresselia-raid-guide/",
      "Guide communautaire plus ancien avec stratégies et compositions distinctes."
    ]
  ]
};

(function(){
"use strict";
let D=CRESSELIA_DATA;
const STRATS={musketeers:{...CRESSELIA_DATA,id:'musketeers',title:'The Three Musketeers v2.1',complete:true},...window.CresseliaAlternatives};
const $=id=>document.getElementById(id);
const ST={strategy:"musketeers",player:0,tab:"combat",turn:0,all:false,expand:false};
function current(){return STRATS[ST.strategy]||STRATS.musketeers;}
function strategyData(id){const row=STRATS[id]||STRATS.musketeers;return {...row,mechanics:CRESSELIA_DATA.mechanics,sources:row.sources||[[row.title,row.source,row.brief||"Guide source"]]};}
function sourceNotice(target){const row=current();if(ST.strategy==="musketeers")return;const box=document.createElement("aside");box.className="raid-source-notice";box.textContent=row.warning||row.brief||"";target.append(box);}
function sourceLink(target){const a=document.createElement("a");a.className="raid-source-link";a.href=current().source;a.target="_blank";a.rel="noopener noreferrer";a.textContent=ST.strategy==="latin"?"Voir la vidéo originale Latin Combo V2":"Consulter le guide original Sensei";target.append(a);}
function selectStrategy(id){ST.strategy=id;D=strategyData(id);ST.turn=0;ST.tab="combat";ST.all=false;ST.expand=false;render();}
const NAMES={combat:"Combat",pokemon:"Pokémon",preparation:"Préparation",mecaniques:"Mécaniques"};
const img=id=>"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+".png";
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function button(label,fn,cls){const b=document.createElement("button");b.type="button";b.textContent=label;if(cls)b.className=cls;b.addEventListener("click",fn);return b;}
function copy(text,btn){const fallback=()=>{const area=document.createElement("textarea");area.value=text;area.style.position="fixed";area.style.left="-9999px";document.body.append(area);area.select();let ok=false;try{ok=document.execCommand("copy");}finally{area.remove();}if(!ok)throw Error("copie impossible");};const done=()=>{const t=btn.textContent;btn.textContent="✓ Copié !";btn.classList.add("cres-copied");setTimeout(()=>{btn.textContent=t;btn.classList.remove("cres-copied");},1400);};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done).catch(()=>{try{fallback();done();}catch(e){btn.textContent="Copie indisponible";}});}else{try{fallback();done();}catch(e){btn.textContent="Copie indisponible";}}}
function playerControls(){const a=$("cres-players");a.replaceChildren();for(let i=0;i<4;i++){const b=button("P"+(i+1),()=>{ST.player=i;render();},ST.player===i?"active":"");b.setAttribute("aria-label","Joueur "+(i+1));b.setAttribute("aria-pressed",String(ST.player===i));a.append(b);}}
function navControls(){const a=$("cres-tabs");a.replaceChildren();for(const [id,name] of Object.entries(NAMES)){const b=button(name,()=>{ST.tab=id;render();},ST.tab===id?"active":"");b.setAttribute("aria-pressed",String(ST.tab===id));a.append(b);}}
function head(){playerControls();navControls();const status=$('cres-strategy-status');if(status){status.textContent=ST.strategy==='sensei'?'13 tours · 24 Pokémon':ST.strategy==='latin'?'12 tours vidéo · builds non vérifiés':'10 tours · 24 Pokémon';}}
function renderCombat(){
const app=$("cres-app");app.replaceChildren();
app.append(RaidAtlasComponents.battleIntro("Cresselia"));
sourceNotice(app);
if(!D.turns.length){const box=document.createElement("section");box.className="raid-latin-unverified";const h=document.createElement("h2");h.textContent="Latin Combo V2 · 12 tours en vidéo";const p=document.createElement("p");p.textContent="La stratégie vidéo existe, mais les 24 fiches et les actions des 12 tours ne sont pas documentées avec suffisamment de précision pour être affichées sans risque d’erreur. Elles ne sont pas inventées.";box.append(h,p);app.append(box);sourceLink(app);return;}
app.append(RaidAtlasComponents.checkbox("Vue complète · afficher les "+D.turns.length+" tours",ST.all,checked=>{ST.all=checked;renderCombat()}));
if(!ST.all)app.append(RaidAtlasComponents.phaseSelect({labels:D.turns.map(t=>t.label),current:ST.turn,onChange:i=>{ST.turn=i;renderCombat()}}));
const wrap=document.createElement("div");if(ST.all)wrap.className="all-turns";app.append(wrap);
const list=ST.all?D.turns.map((t,i)=>[t,i]):[[D.turns[ST.turn],ST.turn]];
for(const [t,i] of list){
 const panel=document.createElement("section");if(ST.all)panel.className="turn-section";
 const actions=t.actions.map(([slot,move],j)=>({
  name:D.team[j][slot].n,move,
  spriteUrl:img(D.team[j][slot].id)
 }));
 const info=document.createElement("section");info.className="raid-tips";
 const heading=document.createElement("h3");heading.textContent="À retenir — "+t.label;
 const note=document.createElement("p");note.textContent=t.info;
 info.append(heading,note);if(t.hp){const hp=document.createElement("p");hp.className="raid-alert";hp.textContent="PV du boss visés en fin de tour : "+t.hp+" (valeur indicative).";info.append(hp);}
 const actionText="TOUR "+(i+1)+" / CRESSELIA 6★ — "+current().title+"\n"+
 t.actions.map(([slot,move],j)=>"P"+(j+1)+" · "+D.team[j][slot].n+" → "+move).join("\n")+"\nPV cible : "+t.hp;
 RaidAtlasComponents.battleTurn({
  target:panel,index:i,total:D.turns.length,title:t.label,actions,selected:ST.player,
  onPokemon:()=>{ST.tab="pokemon";render()},advice:info,copyText:actionText,
  copy:(button,text)=>copy(text,button)
 });
 wrap.append(panel);
}
if(!ST.all)app.append(RaidAtlasComponents.phaseNav({current:ST.turn,total:D.turns.length,onChange:i=>{ST.turn=i;renderCombat()}}));
else{const note=document.createElement("p");note.className="build-source-note";note.textContent="Mode vue complète : "+D.turns.length+" tours et "+D.turns.length*4+" actions. Les pourcentages indiquent des repères, pas des garanties.";app.append(note);}
}
function monCopy(m){return m.n+" @ "+m.item+"\nTalent : "+m.talent+"\nNature : "+m.nature+"\nIV : "+m.iv+"\nEV : "+m.ev+"\nAttaques : "+m.attacks+"\nNotes : "+m.note;}
function renderPokemon(){
const app=$("cres-app");app.replaceChildren();
app.append(RaidAtlasComponents.feature({player:ST.player,boss:"Cresselia",
 artwork:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/488.png"}));
sourceNotice(app);
if(!current().complete){const p=document.createElement("p");p.className="raid-latin-unverified";p.textContent="Latin Combo V2 : les six Pokémon de chaque joueur et leurs IV/EV ne sont pas attestés dans les sources disponibles. Consulte la vidéo d’origine ; aucune composition non vérifiée n’est présentée.";app.append(p);sourceLink(app);return;}
app.append(RaidAtlasComponents.pokemonIntroNote("Composition du joueur "+(ST.player+1)+
" : six Pokémon. Les valeurs non imposées ne sont pas des seuils inventés : contrôlez les IV, EV et natures documentés par la source."));
app.append(RaidAtlasComponents.checkbox("Tout déplier · afficher les 6 fiches",ST.expand,checked=>{ST.expand=checked;renderPokemon()}));
D.team[ST.player].forEach((m,i)=>{
 const sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+m.id+".png";
 const art="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+m.id+".png";
 const pokemon={name:m.n,item:m.item,nature:m.nature,ability:m.talent,ev:m.ev,iv:m.iv,
  moves:m.attacks.split(/\s*[\/·]\s*/).filter(Boolean),note:m.note,
  variant:"Non précisé",spriteUrl:sprite,artworkUrl:art};
 const card=RaidAtlasComponents.buildCard({
  pokemon,index:i,expanded:ST.expand||i===0,
  onToggle:c=>{if(!ST.expand&&c.open)app.querySelectorAll("details.card").forEach(other=>{if(other!==c)other.open=false})},
  copy:(button)=>copy(monCopy(m),button)
 });
 app.append(card);
});
app.append(button("Copier l'équipe complète (6 builds)",e=>copy(
 "CRESSELIA 6★ / "+current().title+" / P"+(ST.player+1)+"\n\n"+
 D.team[ST.player].map(monCopy).join("\n\n"),e.currentTarget),"cres-copy"));
}
function renderPrep(){
const a=$("cres-app");a.replaceChildren();
const intro=document.createElement("div");intro.className="cres-note";
intro.textContent="Cresselia se trouve sur l'Île Pleine Lune (Sinnoh), accessible par bateau depuis Joliberges. Raid permanent 6★ à quatre joueurs. Une stratégie adaptée à chaque joueur ; ne pas fusionner avec une ancienne version.";
a.append(intro);sourceNotice(a);
if(!current().complete){const msg=document.createElement("p");msg.className="raid-latin-unverified";msg.textContent="Latin Combo V2 : les équipes ne sont pas vérifiées. La checklist détaillée sera disponible lorsque les builds originaux seront confirmés.";a.append(msg);sourceLink(a);return;}
const progress=RaidAtlasComponents.progressCard("cres-prep","PRÉPARATION");
a.append(progress);
const roster=document.createElement("div");roster.className="grid";
function update(){
 const inputs=Array.from(a.querySelectorAll(".prep-check input,.cres-checklist input"));
 const done=inputs.filter(c=>c.checked).length,pct=inputs.length?Math.round(done/inputs.length*100):0;
 const title=a.querySelector("#cres-prep-pct"),fill=a.querySelector("#cres-prep-fill"),global=a.querySelector("#cres-progress");
 if(title)title.textContent=pct+"%";if(fill)fill.style.width=pct+"%";
 if(global)global.textContent=tasks.filter((_,i)=>saved[ST.player+"-"+i]).length+" / "+tasks.length+" vérifiés";
}
D.team[ST.player].forEach((m,i)=>{
 const checks=[["ready","Pokémon prêt"],["item","Objet équipé"],["verified","Fiche vérifiée"]].map(([part,label])=>{
  const key="raid-atlas-cresselia-"+ST.strategy+"-build-"+ST.player+"-"+i+"-"+part;
  let checked=false;try{checked=localStorage.getItem(key)==="1"}catch(e){}
  return {label,checked,onChange:yes=>{try{localStorage.setItem(key,yes?"1":"0")}catch(e){}update()}};
 });
 roster.append(RaidAtlasComponents.prepCard({name:m.n,item:m.item,
  spriteUrl:img(m.id),checks}));
});
a.append(roster);
const tasks=["Pokédex OT rempli ; au moins 4 Pokémon OT dans l’équipe","Les 6 Pokémon du joueur "+(ST.player+1)+" sont disponibles et placés dans l’ordre prévu","Aucun objet ou lignée d’évolution dupliqué dans mon équipe","Natures, talents et capacités vérifiés un par un","IV, EV et ordres de Vitesse vérifiés entre les quatre joueurs","Réglages de Déf. Spé. et ciblage IA contrôlés (Gueriaigle / Sidérella)","Lance-Boue, Air Veinard, Rune Protect et Séduction présents où indiqués","Quatre joueurs synchronisés sur les 10 tours et les paliers de PV","Vérifier les dernières corrections du guide source avant de breeder"];
const wrap=document.createElement("div");wrap.className="cres-source";
wrap.innerHTML='<h3>Checklist de préparation générale</h3><p class="cres-progress" id="cres-progress"></p>';
const checklist=document.createElement("div");checklist.className="cres-checklist";
let saved={};try{saved=JSON.parse(localStorage.getItem("raid-atlas-cresselia-"+ST.strategy+"-check")||"{}")||{}}catch(e){}
tasks.forEach((t,i)=>{
 const line=document.createElement("label");line.className="cres-check prep-check";
 const box=document.createElement("input");box.type="checkbox";
 box.checked=!!saved[ST.player+"-"+i];
 box.addEventListener("change",()=>{
  saved[ST.player+"-"+i]=box.checked;
  try{localStorage.setItem("raid-atlas-cresselia-"+ST.strategy+"-check",JSON.stringify(saved))}catch(e){}
  update();
 });
 const span=document.createElement("span");span.textContent=t;line.append(box,span);checklist.append(line);
});
wrap.append(checklist);a.append(wrap);update();
const links=document.createElement("section");links.className="cres-source";
const section=document.createElement("h3");section.textContent="Sources et versions";
const description=document.createElement("p");description.textContent="Stratégie sélectionnée : "+current().title+". Les données ne sont pas fusionnées avec les autres stratégies et aucun EV/IV manquant n’est inventé.";
links.append(section,description);
for(const entry of D.sources||[]){
 const p=document.createElement("p"),a=document.createElement("a"),sub=document.createElement("small");
 a.href=entry[1]||"#";a.textContent=entry[0]||"Guide source";a.target="_blank";a.rel="noopener noreferrer";
 sub.textContent=entry[2]||"";p.append(a,document.createElement("br"),sub);links.append(p);
}
a.append(links);
}
function renderMechanics(){
const app=$("cres-app");app.replaceChildren();
const intro=document.createElement("section");intro.className="mechanics-intro";
const heading=document.createElement("h2");heading.textContent="Mécaniques communes et seuils de PV";
const p=document.createElement("p");
p.textContent="Cresselia : type Psy · PV 120 / Att. 70 / Déf. 110 / Att. Spé. 75 / Déf. Spé. 120 / Vit. 85 (statistiques de base, différentes du boss de raid). Faiblesses : Insecte, Spectre et Ténèbres ×2. Les règles ci-dessous concernent le raid 6★.";
intro.append(heading,p);app.append(intro);
const grid=document.createElement("div");grid.className="mechanic-grid";
D.mechanics.forEach(([name,detail])=>{
 const card=document.createElement("article");card.className="raid-mechanic-note";
 const h=document.createElement("h3");h.textContent=name;
 const desc=document.createElement("p");desc.textContent=detail;
 card.append(h,desc);grid.append(card);
});app.append(grid);
}
function render(){head();if(ST.tab==="combat")renderCombat();else if(ST.tab==="pokemon")renderPokemon();else if(ST.tab==="preparation")renderPrep();else renderMechanics();}

const picker=$("cres-strategy");if(picker)picker.addEventListener("change",()=>selectStrategy(picker.value));
D=strategyData(ST.strategy);
render();
})();
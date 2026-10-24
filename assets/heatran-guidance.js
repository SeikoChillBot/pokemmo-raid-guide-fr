
const raidPreflight={
 core:{
  source:"Crimson Core",
  position:"Maganon à droite de Heatran",
  warning:"Si Maganon n’est pas à droite : reset.",
  detail:"Crimson Core ne demande pas explicitement que Chartor soit à gauche."
 },
 video:{
  source:"Beorns / JinxedBoon · vidéo",
  position:"Placement montré : Chartor à gauche · Heatran au centre · Maganon à droite",
  warning:"",
  detail:"Ce placement apparaît dans la vidéo. Le PDF ne confirme pas que les deux positions soient une condition de reset."
 }
};
const turnGuidance={
core:[
{title:"Ouverture et vol des Restes",points:["Minotaupe P1 et P2 : Séisme ; P4 : Tunnelier. Le Ballon de Chartor lui permet d'éviter Séisme.","Dimoret P3, sans objet : Larcin pour voler les Restes de Heatran dès le début.","Les quatre premiers Pokémon sont censés tomber K.O. pour faire entrer la vague suivante."],alert:"Priorité : voler les Restes dès le départ avec Dimoret."},
{title:"Piétisol pour ralentir Heatran",points:["P1, P3 et P4 : Nidoking avec Telluriforce ; P2 : Scorvol avec Piétisol pour abaisser la Vitesse de Heatran.","La baisse de Vitesse facilite l’action des Octillery au tour suivant. Scorvol peut avoir une faible Défense Spéciale pour tomber K.O. au moment prévu.","Les K.O. de la deuxième vague déclenchent l'entrée des Pokémon suivants. Si les K.O. ne se produisent pas comme prévu, adapter le timing."],alert:"Piétisol doit être placé avant l'arrivée des Octillery."},
{title:"Double Anti-Brume et deux Octillery",points:["P1 et P2 : Octillery avec Hydrocanon. Ventouse les protège des changements forcés par Hurlement.","P3 : Xatu avec Anti-Brume ; P4 : Bekipan avec Anti-Brume. Les deux utilisations nettoient les pièges signalés dans la source.","Miroir Magik de Xatu peut renvoyer Hurlement s'il est ciblé. Crachin de Bekipan installe la pluie."],alert:"Crimson Core : Xatu P3 + Bekipan P4, et non deux Xatu."},
{title:"Mur Lumière, Tourniquet et pluie",points:["P1 : Staross place Mur Lumière ; Lumargile augmente sa durée à huit tours.","P2 : Bekipan déclenche Crachin en entrant puis utilise Tourniquet pour diminuer les dégâts Feu.","P3 et P4 : Libégon utilise Telluriforce. Les K.O. et Hurlement peuvent décaler l'entrée des Pokémon."],alert:"Ne pas confondre Bekipan P4 (Anti-Brume au tour 3) et Bekipan P2 (Tourniquet ici)."},
{title:"Offensive sous la pluie",points:["P1 : Hyporoi utilise Danse Pluie si elle n'est plus active, sinon Hydrocanon.","P2, P3, P4 : Tarpaud utilise Ball’Météo sous la pluie, renforcée par Joyau Eau.","Crachin de Tarpaud peut rétablir la pluie. Surveiller les seuils des 50 % (Saumure) et 40 % (Adaptation)."],alert:"Vérifier la météo : Ball’Météo change de type selon le temps."},
{title:"Croco Larme et Saumure",points:["P1 : Voltali utilise Croco Larme pour réduire la Défense Spéciale de Heatran de deux niveaux.","P2, P3 et P4 : Hyporoi utilise Saumure, dont la puissance double à 50 % de PV ou moins.","Le document Beorns conseille Croco Larme avant la barrière des 25 %. Si l'ordre des K.O. a changé, adapter la rotation."],alert:"Préparer les −2 Défense Spéciale avant le bouclier, si possible."}
],
video:[
{title:"Ouverture : attaque et Larcin",points:["La vidéo montre Chartor à gauche, Heatran au centre, Maganon à droite. Chartor porte un Ballon : Séisme ne le touche pas.","P1/P2 : Minotaupe Séisme ; P3 : Dimoret sans objet Larcin pour voler les Restes ; P4 : Minotaupe Tunnelier.","Les quatre Pokémon initiaux sont censés tomber K.O. Les variantes Close Combat sont notées comme non testées."],alert:"Priorité : utiliser Larcin dès le premier tour pour retirer les Restes."},
{title:"Bekipan, Scorvol et deux Nidoking",points:["P1 (gauche) : Bekipan avec Joyau Eau et Ball’Météo ; Crachin installe la pluie.","P2 (milieu gauche) : Scorvol utilise Piétisol pour diminuer la Vitesse de Heatran.","P3 et P4 (droite) : Nidoking avec Orbe Vie et Telluriforce. La deuxième vague doit idéalement tomber K.O."],alert:"Repère vidéo : Bekipan et Scorvol à gauche ; deux Nidoking à droite."},
{title:"Deux Octillery et deux Xatu",points:["P1/P2 : Octillery Hydrocanon. Ventouse empêche Hurlement de les expulser.","P3/P4 : les deux Xatu utilisent Anti-Brume ; Miroir Magik peut renvoyer Hurlement ciblé.","Dans la stratégie vidéo sélectionnée, les deux Anti-Brume sont les Xatu P3 et P4. La variante du PDF avec Bekipan P4 n’est pas utilisée ici."],alert:"Les deux Xatu doivent pouvoir utiliser Anti-Brume ; surveiller Hurlement et les changements forcés."},
{title:"Protection et dégâts avec Libégon",points:["P1 : Staross Mur Lumière ; il peut ensuite utiliser Hydrocanon s'il survit.","P2 : Bekipan déclenche Crachin, puis utilise Tourniquet.","P3/P4 : Libégon Telluriforce. Le guide présente Orbe Vie / Puissance Cachée Eau comme expérimentaux.","Si un Xatu survit au tour précédent, il peut éventuellement poser Mur Lumière plutôt que Staross."],alert:"P2 utilise Tourniquet et non Anti-Brume."},
{title:"Enchaînement conditionnel",points:["P1 : Hyporoi entre après le K.O. de Staross et attaque avec ses capacités Eau.","P2 : Tarpaud rétablit la pluie grâce à Crachin quand elle n'est plus active.","P3/P4 : continuer Telluriforce avec Libégon tant qu’il reste sur le terrain. Après son K.O., choisir Tarpaud si la pluie manque, ou Hyporoi si elle est active.","Le cinquième tour dépend des K.O., de la pluie et d'un éventuel Hurlement."],alert:"Ne pas forcer un remplacement si le Pokémon précédent est toujours en jeu."},
{title:"Tour 6 et suivants : finir selon la situation",points:["P1 : Voltali entre après le K.O. d'Hyporoi et utilise Croco Larme, idéalement vers 30 % de PV avant la barrière.","P2 : après Tarpaud, Hyporoi utilise Saumure lorsque Heatran possède 50 % de ses PV ou moins.","P3/P4 : Tarpaud si la pluie manque, ou Hyporoi si elle est déjà active.","À 40 % survient Adaptation ; à 25 % la barrière de quatre charges. Viser −2 en Défense Spéciale."],alert:"Le tour 6 n'est pas figé : respecter les conditions réelles du combat."}
]};

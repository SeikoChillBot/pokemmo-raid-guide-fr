
const raidMechanicsCommon=[
["Ordre et K.O.","Les quatre joueurs jouent en parallèle. Les premières vagues doivent tomber K.O. pour faire entrer les équipes suivantes. Ensuite, Hurlement, pluie et ordre des K.O. rendent les tours conditionnels."],
["100 % : Bassin de magma","Selon Beorns, ce piège peut infliger des dégâts résiduels et brûler les Pokémon. Deux utilisations d'Anti-Brume permettent de nettoyer le terrain."],
["80 % : Piège de Roc","Heatran peut installer Piège de Roc vers 80 % de PV. Vérifier les pièges après chaque action ; Anti-Brume permet de les retirer."],
["67 % : Hurlement","Hurlement force un changement. Ventouse protège Octillery ; Miroir Magik de Xatu peut renvoyer Hurlement si Xatu est ciblé."],
["Soleil et pluie","Chartor déclenche le soleil grâce à Sécheresse. Certaines actions de Heatran peuvent affecter la météo. Crachin de Bekipan et de Tarpaud remet la pluie ; vérifier son état avant Ball’Météo."],
["Mur Lumière et Tourniquet","Mur Lumière réduit les dégâts spéciaux et dure huit tours avec Lumargile. Tourniquet de Bekipan diminue les dégâts Feu pendant cinq tours dans Crimson Core."],
["50 % : Mur de Fer et Saumure","Heatran peut gagner deux niveaux de Défense. Saumure double sa puissance contre Heatran lorsqu'il possède 50 % de ses PV ou moins."],
["40 % : Adaptation","Heatran peut devenir résistant au type d'attaque le plus utilisé, notamment Sol. Puissance Cachée Eau sur Libégon est donnée par Beorns comme essai possible."],
["25 % : barrière","La source Beorns décrit une barrière de quatre charges. Abaisser la Défense Spéciale de deux niveaux avec Croco Larme avant ce seuil aide à atteindre le plafond de dégâts."],
["Larcin et Restes","Dimoret sans objet vole les Restes de Heatran avec Larcin au tour 1 ; cela empêche sa récupération via cet objet."],
["Torche","Ne pas utiliser une attaque Feu contre Heatran si Torche est actif : elle risque d'être absorbée et de renforcer ses attaques Feu."],
["Fin du combat","Croco Larme réduit la Défense Spéciale de deux niveaux. Beorns conseille de le placer vers 30 % de PV, avant la barrière. Saumure est particulièrement efficace à 50 % de PV ou moins."]
];
const raidMechanicsByStrat={
core:[
["Placement avant le départ","Maganon doit être à droite de Heatran. Si ce n'est pas le cas, Crimson Core demande de relancer. Chartor est de l'autre côté et possède un Ballon."],
["Anti-Brume : P3 et P4","Au tour 3, Xatu P3 et Bekipan P4 utilisent Anti-Brume. Dans cette version il ne s'agit pas de deux Xatu."],
["Deux rôles de Bekipan","P4 emploie Anti-Brume au tour 3 ; P2 arrive ensuite et utilise Tourniquet au tour 4 tout en déclenchant Crachin."],
["Ralentir Heatran","Scorvol P2 lance Piétisol au tour 2. Une faible Défense Spéciale est recherchée pour son K.O. au bon moment et l'entrée d'Octillery."],
["Final type","Tour 5 : Hyporoi P1 et Tarpaud P2/P3/P4 sous la pluie. Tour 6 : Voltali Croco Larme et trois Hyporoi Saumure. Adapter selon les K.O. réels."]
],
video:[
["Vidéo et PDF actualisé : deux variantes","La vidéo présente deux Xatu au tour 3. Le tableau actualisé du PDF présente Xatu P3 et Bekipan P4. Les notes relatives à Bekipan/Tonnerre ne s'appliquent pas automatiquement à la vidéo."],
["Repères de placement","Tour 2 : Bekipan et Scorvol à gauche, Nidoking et Nidoking à droite. Tour 3 : deux Octillery à gauche, deux Xatu à droite. Tour 4 : Staross et Bekipan à gauche, deux Libégon à droite."],
["Maganon et Tonnerre : variante PDF","Dans la variante actualisée avec Bekipan en Anti-Brume, le document attend son K.O. par Tonnerre de Maganon. Sinon il faut adapter ou relancer. Ce n'est pas la configuration à deux Xatu de la vidéo."],
["Derniers tours conditionnels","P1 passe de Staross à Hyporoi puis Voltali. P2 remet la pluie avec Tarpaud si nécessaire avant Hyporoi. P3/P4 gardent Libégon jusqu'au K.O., puis choisissent Tarpaud sans pluie ou Hyporoi avec pluie."],
["Options expérimentales","Orbe Vie et Puissance Cachée Eau sur Libégon ainsi que certains EV de Hyporoi P1 sont présentés comme des essais et non comme des obligations."]
]};

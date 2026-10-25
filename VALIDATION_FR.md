# Checklist de validation — site français PokeMMO Raid Guides

Mise à jour : 24 octobre 2026, audit des stratégies puis intégration de la direction RAID ATLAS validée. Après téléchargement de la dernière version GitHub, déployer ensemble les quatre fichiers HTML et le répertoire `assets/` dans Cloudflare Pages. Un commit GitHub seul ne prouve pas que la production a été redéployée.

## Design RAID ATLAS — hiérarchie préservée
- [ ] Le site français utilise la même direction noir/blanc/rouge que `design-lab.html`, sans recopier la navigation « tout-en-un » de la démonstration.
- [ ] Accueil `index.html` : grand visuel Heatran et exactement 4 catégories ; aucun des six dossiers permanents n'est déplacé sur l'accueil.
- [ ] Catégorie `permanent.html` : 6 dossiers Pokémon sur cette page séparée ; liens inchangés vers Heatran ou les pages « À venir ».
- [ ] `coming-soon.html` : le titre, l'illustration et le lien de retour correspondent au paramètre `event` pour Halloween, Noël, Nouvel An lunaire et les cinq légendaires.
- [ ] Guide `heatran.html` : en-tête RAID ATLAS et fil d'Ariane, mais onglets Combat/Pokémon/Préparation/Mécaniques, joueur choisi et boutons de copie inchangés.
- [ ] Vérifier à 390 px, 760 px et sur grand écran : cartes événement asymétriques sur bureau, une colonne sur téléphone, aucune superposition d'artworks sur le texte.
- [ ] Les nouvelles feuilles `assets/raid-atlas.css` et `assets/heatran-atlas.css` chargent correctement après les feuilles historiques ; pas de retour à l'ancien fond bleu.
- [ ] La page `design-lab.html` reste un prototype de référence et non l'accueil public du site.

## Accueil et présentation
- [ ] Accueil : quatre cartes cliquables « Raids permanents », « Halloween Event », « Christmas Event », « Lunar New Year Event ».
- [ ] Illustrations Pokémon nettes dans les cartes, sans flou excessif ou recadrage gênant.
- [ ] Cartes et textes bien alignés sur PC et téléphone.
- [ ] Raids permanents : six cartes, Heatran disponible et cinq pages « À venir ».
- [ ] Les cartes à venir ouvrent la bonne page ; retour correct à la catégorie précédente.

## Navigation dans Heatran
- [ ] Fil d’Ariane « Accueil › Raids permanents › Heatran » entièrement navigable.
- [ ] Absence de bouton « Retour aux raids permanents » en doublon sous le fil d’Ariane.
- [ ] Les liens « Guide Crimson Core » et « Guide Beorns / JinxedBoon » s’ouvrent dans un nouvel onglet, sans perdre le guide en cours.

## Combat et deux stratégies
- [ ] Le changement Crimson Core ↔ Beorns / JinxedBoon met à jour les actions, les conseils et les mécaniques.
- [ ] Tour 1 Crimson Core : Maganon à droite obligatoire, sinon reset ; Chartor à gauche n'est pas présenté comme obligatoire. Tour 1 Beorns : Maganon présent (sinon reset), placement droite/gauche mentionné seulement comme repère de la vidéo (pas d'obligation de position inventée).
- [ ] Les 12 ensembles de commentaires propres aux stratégies (6 Crimson Core, 6 Beorns) apparaissent sous leur tour respectif, sans devoir ouvrir Mécaniques.
- [ ] Dans Beorns vidéo, tour 2 : Bekipan/Scorvol à gauche, deux Nidoking à droite ; tour 3 : deux Octillery et deux Xatu.
- [ ] Les variantes Beorns vidéo et Beorns PDF actualisé (Xatu + Bekipan) ne sont pas mélangées.
- [ ] Crimson Core tour 2 : Hurlement peut provoquer le changement, sans exiger à tort quatre K.O. en deuxième vague.
- [ ] Beorns tours 5 et 6 : bandeau de phase indicative et conditions de remplacement visibles sous les quatre joueurs.
- [ ] La vue complète affiche les six tours et leurs conseils ; la vue simple navigue entre les phases.

## Pokémon et préparation
- [ ] Les quatre joueurs ouvrent chacun six fiches Pokémon et « Tout déplier » fonctionne.
- [ ] Les fiches affichent objets, natures, talents, EV, IV prioritaires, attaques et variantes en français.
- [ ] Bekipan, Hyporoi, Tarpaud et Libégon ont leurs IV prioritaires renseignés, avec la distinction entre données confirmées et référence complémentaire.
- [ ] Les choix de nature de Bekipan J2 et Bekipan J4 ne sont pas confondus ; pour Bekipan J1 vidéo, les IV/EV/nature proposés sont explicitement non confirmés.
- [ ] Xatu J3 Crimson Core : nature au choix avec Défense Spéciale élevée ; aucune contrainte de Vitesse inventée.
- [ ] Staross J1 Beorns : natures Modeste/Foufou/Doux et EV 252 Att. Spé. / 252 Déf. Spé.
- [ ] Hyporoi J1 Beorns : 252 Att. Spé. / 252 Déf. Spé. en build de référence ; variante 252/64/192, Sniper et Plaque Hydro affichés comme essais.
- [ ] La checklist de préparation reste sauvegardée lors des changements d'onglets.
- [ ] Beorns : les possibilités de CS hors combat sont dans un encadré dépliable séparé des attaques de raid.

## Mécaniques et copie
- [ ] Mécaniques explique les seuils 100 %, 80 %, 67 %, 50 %, 40 % et 25 %, ainsi que soleil, pluie, Hurlement, Anti-Brume, Croco Larme et Saumure.
- [ ] Mécaniques commence par une comparaison lisible des deux stratégies (avant combat, tour 2, tour 3, fin), avec la stratégie sélectionnée mise en évidence ; aucune procédure détaillée n'y fait doublon avec Combat.
- [ ] La section « Mécaniques communes et seuils de PV » conserve 12 fiches complètes (6 seuils de PV et 6 règles générales).
- [ ] « Copier ce tour » et « Copier le build » placent le bon contenu dans le presse-papiers.
- [ ] Confirmation « ✓ Copié ! » apparaît, puis le libellé initial revient.
- [ ] Aucun débordement, texte masqué ou bouton inaccessible sur téléphone.

Les vérifications de syntaxe et de structure réalisées sur GitHub ne remplacent pas une validation visuelle et interactive dans un navigateur réel.

- [ ] Après déploiement : le tour 1 ne contient plus « Le document demande de relancer sans Maganon ». Crimson Core affiche « Si Maganon n’est pas à droite : reset. » ; Beorns demande Maganon présent et présente le placement de la vidéo sans en faire une règle de côté non écrite dans le PDF.


## V13 — acceptation provisoire par l'utilisateur (25 octobre 2026)

- [x] Les 8 pages VF chargent `assets/raid-polish-v13.css` après V12.
- [x] La bannière de `permanent.html` conserve le GIF in-game communiqué et affiche l'autel avec un cadrage moins zoomé (fond `auto 130%`, centré).
- [x] La carte « Raids permanents » sur l'accueil conserve son GIF de fond déjà apprécié ; pas de carré surimposé.
- [x] Les cartes d'action de combat utilisent une transparence/masque radial pour supprimer l'impression de carré noir, au niveau CSS partagé sur toutes les fiches.
- [x] Signature exclusivement dans le footer d'`index.html` : « Créé par Seiko (Seikolito en jeu) ».
- [x] `assets/raid-components.js` fournit la navigation « Tour précédent / Tour suivant » immédiatement après les actions. Même règle pour les futures fiches ; absence de lien redondant « Voir les 6 Pokémon ».
- [x] L'ensemble du style et des fonctionnalités communes a été reporté sur le dépôt EN, avec localisation des composants.
- [ ] Rendu visuel GIF et transparence, test de l'animation, clavier/souris/mobile et publication GitHub Pages non observés dans un navigateur réel.

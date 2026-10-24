# Checklist de validation — site français PokeMMO Raid Guides

Mise à jour : 24 octobre 2026. Après téléchargement de la dernière version GitHub, déployer ensemble les quatre fichiers HTML et le répertoire `assets/` dans Cloudflare Pages. Un commit GitHub seul ne prouve pas que la production a été redéployée.

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
- [ ] Tour 1 Crimson Core : Maganon à droite obligatoire, sinon reset ; Chartor à gauche n'est pas présenté comme obligatoire. Tour 1 Beorns : placement de la vidéo affiché comme repère, sans reset inventé.
- [ ] Les 12 ensembles de commentaires propres aux stratégies (6 Crimson Core, 6 Beorns) apparaissent sous leur tour respectif, sans devoir ouvrir Mécaniques.
- [ ] Dans Beorns vidéo, tour 2 : Bekipan/Scorvol à gauche, deux Nidoking à droite ; tour 3 : deux Octillery et deux Xatu.
- [ ] Les variantes Beorns vidéo et Beorns PDF actualisé (Xatu + Bekipan) ne sont pas mélangées.
- [ ] Après les tours fixes, les conditions de K.O., de pluie et de Hurlement sont explicites.
- [ ] La vue complète affiche les six tours et leurs conseils ; la vue simple navigue entre les phases.

## Pokémon et préparation
- [ ] Les quatre joueurs ouvrent chacun six fiches Pokémon et « Tout déplier » fonctionne.
- [ ] Les fiches affichent objets, natures, talents, EV, IV prioritaires, attaques et variantes en français.
- [ ] Bekipan, Hyporoi, Tarpaud et Libégon ont leurs IV prioritaires renseignés, avec la distinction entre données confirmées et référence complémentaire.
- [ ] Les choix de nature de Bekipan ne sont pas confondus entre Crimson Core et Beorns.
- [ ] La checklist de préparation reste sauvegardée lors des changements d'onglets.

## Mécaniques et copie
- [ ] Mécaniques explique les seuils 100 %, 80 %, 67 %, 50 %, 40 % et 25 %, ainsi que soleil, pluie, Hurlement, Anti-Brume, Croco Larme et Saumure.
- [ ] Mécaniques commence par une comparaison lisible des deux stratégies (avant combat, tour 2, tour 3, fin), avec la stratégie sélectionnée mise en évidence ; aucune procédure détaillée n'y fait doublon avec Combat.
- [ ] La section « Mécaniques communes et seuils de PV » conserve 12 fiches complètes (6 seuils de PV et 6 règles générales).
- [ ] « Copier ce tour » et « Copier le build » placent le bon contenu dans le presse-papiers.
- [ ] Confirmation « ✓ Copié ! » apparaît, puis le libellé initial revient.
- [ ] Aucun débordement, texte masqué ou bouton inaccessible sur téléphone.

Les vérifications de syntaxe et de structure réalisées sur GitHub ne remplacent pas une validation visuelle et interactive dans un navigateur réel.

- [ ] Après déploiement : le tour 1 ne contient plus « Le document demande de relancer sans Maganon ». Crimson Core affiche « Si Maganon n’est pas à droite : reset. » ; Beorns ne transforme pas le placement illustré en obligation non démontrée.

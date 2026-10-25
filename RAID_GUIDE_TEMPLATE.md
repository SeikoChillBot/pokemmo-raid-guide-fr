# RAID ATLAS FR — modèle commun des fiches de raid (design v3)

Mise à jour : 25 octobre 2026.

## Règle de conception

La présentation préférée par l'utilisateur est celle de **Heatran avant l'ajout d'une barre latérale**. Ne pas réintroduire une colonne gauche avec les rôles/onglets sans demande explicite.

- La bannière du boss reste en haut.
- Les options de stratégie/difficulté et de choix du joueur sont regroupées **horizontalement sous la bannière**, sur la largeur du guide.
- Le contenu Combat / Pokémon / Préparation / Mécaniques est affiché **sur toute la largeur**.
- **Seules ces quatre rubriques** figurent dans un **dock flottant discret** au bas de l'écran, commun à tous les raids et réductible grâce au bouton « Réduire ». L'utilisateur peut rouvrir le dock (« Navigation »).
- Le site réserve une marge basse pour la lecture et la fin des fiches. Responsive sur mobile, navigation clavier et préférence de mouvements réduits.

## Sources de vérité du design

| Fichier | Rôle |
|---|---|
| `assets/raid-site-polish.css` | Améliorations transversales accueil, catégories, archives, cartes, boutons, responsive |
| `assets/raid-guide-template.css` | Style commun à **toutes les fiches de raids** : bannière, options, joueur, dock, blocs combat, fiches Pokémon |
| `assets/raid-guide-template.js` | Montage partagé des contrôles du boss et du dock ; déplace les **nœuds existants** sans remplacer leurs scripts |
| `assets/heatran-*.css`, `assets/cresselia.css`, CSS Halloween inline | Héritage/identité spécifique ; éviter de modifier pour une évolution commune |
| `heatran.html`, `cresselia.html`, `halloween-2025-raid.html` | Pages sources contenant les moteurs propres à chaque raid |

Ne jamais mettre les EV, IV, natures, capacités ou rotations dans la couche de design. Leur logique reste dans les scripts du raid.

## Configuration actuelle

Le script commun reconnaît :

- `data-raid-template="heatran"` — `.control`, `.raid-controls`, `#players`, `#tabs`, `#app`.
- `data-raid-template="cresselia"` — `.cres-sidebar`, `#cres-players`, `#cres-tabs`, `#cres-app`. Les liens vers stratégies alternatives sont conservés dans un panneau déroulant sous le guide.
- `data-raid-template="halloween"` — `#mode-container`, `#players-container`, `.h25-nav`, `#guide-content`. Les modes Pumpking/Darkrai, les checklists et les rotations restent inchangés.
- `data-raid-template="custom"` — pour les futures fiches, fournir `data-raid-slot="hero"`, `data-raid-slot="strategy"`, `data-raid-slot="players"`, `data-raid-slot="tabs"`, `data-raid-slot="content"`, et éventuellement `top/nav/breadcrumb/footer`.

Le script partagé doit être chargé **après** le moteur de page ; la CSS du modèle doit être chargée après les CSS spécifiques. Cela conserve les boutons d'origine, leurs événements, leurs sélections, et leurs clés de stockage.

## Modifier tous les guides d'un coup

- Changer la barre de navigation : dans `raid-guide-template.css` travailler sur `.raid-floating-dock`, `.raid-dock-tabs`, `.raid-dock-toggle`.
- Changer la position/présentation des rôles : dans `raid-guide-template.css`, modifier `.raid-template-commandbar`.
- Changer la présentation des fiches : blocs `.raid-template-content`, `.raid-template-card`, `.build-showcase`, `.build-fact`, `.move-pill`.
- Changer les cartes accueil et index : `raid-site-polish.css`.

Éviter de réécrire indépendamment les HTML ou moteurs de raid pour une modification esthétique globale.

## Périmètre

Le thème global est relié aux huit pages françaises actives : `index.html`, `permanent.html`, `coming-soon.html`, `halloween.html`, `halloween-2025.html`, `heatran.html`, `cresselia.html`, `halloween-2025-raid.html`.

La page `design-lab.html` est une **maquette archivée**, conservée intacte. Le dépôt anglais est également inchangé. L'archive Halloween 2025 reste exclusive au français.

## Validation et déploiement

Tests statiques effectués :
- syntaxe JS du gabarit et des moteurs ;
- données Cresselia : 4 joueurs × 6 Pokémon, 10 tours × 4 actions ;
- comparaison des scripts de combat inline Heatran, Cresselia et Halloween : inchangés ;
- simulation DOM des trois variantes : barre supérieure, boutons originaux, dock et réduction/restauration ;
- équilibrage des accolades CSS ;
- présence des feuilles partagées sur les huit pages.

À vérifier encore **dans un vrai navigateur**, ordinateur et mobile : alignement réel, collision éventuelle entre styles hérités, fonctionnement des boutons, scroll, footer, raccourcis clavier et rendu adaptatif.

L'utilisateur doit mettre à jour les huit pages HTML actives ainsi que les nouveaux fichiers du dossier `assets/` sur Cloudflare. Une mise à jour GitHub seule ne met pas automatiquement Cloudflare à jour.

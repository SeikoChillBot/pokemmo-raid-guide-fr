# Modèle unique des fiches de raid — RAID ATLAS FR

Date : 25 octobre 2026

## Principe obligatoire

Chaque guide de raid français utilise désormais le même **gabarit d'interface** :

- `assets/raid-guide-template.js` : structure commune, détection des emplacements et rattachement des contrôles (barre supérieure, fil d'Ariane, bannière, sélecteur de stratégie, rôles/joueurs, onglets et zone principale). Les nœuds existants sont déplacés **sans les recréer**, afin de conserver les événements et états internes.
- `assets/raid-guide-template.css` : **source unique de présentation générale** (largeur, position gauche des contrôles, colonnes, responsive, titres, habillage des fiches Pokémon, cartes de combat et boutons). À charger **après** les anciennes feuilles de style.
- **Chaque boss conserve ses propres données et règles de combat**. Ne pas déplacer EV, IV, tours, mécaniques ni choix de stratégie vers le composant global.

Fiches raccordées :
- `heatran.html` : moteur original conservé, contrôles `#strategy`, `#players`, `#tabs` déplacés dans la colonne latérale ;
- `cresselia.html` : données v2.1 et moteur propres conservés, disposition et couleurs harmonisées ;
- `halloween-2025-raid.html` : moteur d'archives 2025, modes/équipes/tours par boss conservés ; la navigation `#next-raids` reste dans la zone principale.

## Modifier globalement la présentation

Modifier **uniquement** `assets/raid-guide-template.css` pour les changements communs :

- Placement à gauche : `.raid-template-layout`, `.raid-template-sidebar`, `.raid-template-main`.
- Largeur de la colonne : `--raid-side-width`.
- Espacement : `--raid-layout-gap`.
- Bandeau de boss : `.raid-template-hero`.
- Emplacement joueurs : `.raid-template-players`.
- Navigation entre onglets : `.raid-template-tabs`.
- Cartes communes (combats, builds, statistiques) : `.raid-template-card`, `.raid-template-action-grid`, `.raid-template-build-body`.
- Apparence sur téléphone : blocs `@media` du même fichier.

La dernière section du CSS renforce volontairement la priorité sur les anciens styles `!important` de Heatran. **Si la charte change, modifier ou remplacer ces règles en même temps**, sans rajouter de CSS individuel.

`assets/raid-guide-template.js` peut servir à changer la **structure DOM** de toutes les fiches en une fois (par exemple : déplacer le menu de la gauche vers le haut). Ne jamais recopier séparément le menu dans chaque page.

## Ajouter un nouveau guide sans copier-coller Heatran

Le gabarit utilise `data-raid-template="custom"` sur `body` et les emplacements suivants :

```html
<body data-raid-template="custom">
  <div data-raid-slot="top">RAID ATLAS</div>
  <header data-raid-slot="nav">...</header>
  <nav data-raid-slot="crumb">...</nav>
  <header data-raid-slot="hero"><div class="hero-content"><h1>Nom du boss</h1><p>Description</p></div><img src="..." alt=""></header>
  <div data-raid-slot="strategy">Sélection facultative</div>
  <div data-raid-slot="players">Boutons de rôles</div>
  <div data-raid-slot="tabs">Boutons Combat, Pokémon, Préparation, Mécaniques</div>
  <main data-raid-slot="content"></main>
  <footer data-raid-slot="footer"></footer>
  <!-- Charger les données et le moteur du boss, puis le modèle -->
  <script src="assets/raid-guide-template.js"></script>
</body>
```

Ajouter dans le `<head>`, **après les CSS propres au boss** :

```html
<link rel="stylesheet" href="assets/raid-guide-template.css">
```

Le script regroupe automatiquement les emplacements dans le panneau latéral et la zone centrale. Les quatre onglets et les joueurs doivent être pilotés par le moteur du boss, **pas par des valeurs codées en dur dans le gabarit**. Les données d'Halloween restent une archive française, elles ne doivent jamais être copiées en anglais sans demande expresse.

## Tests avant de déclarer un nouveau guide terminé

1. Vérifier que l'en-tête, le fil d'Ariane, la bannière, les rôles et la navigation sont identiquement disposés.
2. Vérifier le changement de joueur, d'onglet, de stratégie, de tour et de mode sans perte de contenu.
3. Vérifier que les fiches, EV, IV, objets et attaques sont inchangés (comparaison avant/après).
4. Vérifier le rendu sur PC/tablette/mobile et le comportement avec largeur réduite.
5. Vérifier les boutons Copier, les checklists et la persistance locale.
6. Déployer les pages HTML concernées et `assets/raid-guide-template.js` / `.css` sur Cloudflare ; invalider le cache des assets lorsque nécessaire.

Les modifications GitHub ne constituent pas un déploiement Cloudflare ni un test du navigateur réel.

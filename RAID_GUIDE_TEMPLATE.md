# RAID ATLAS FR — gabarit canonique V6

Mise à jour : 25 octobre 2026.

## Contrat d'interface : Heatran est la référence

La fiche Heatran est le modèle réel, pas seulement une inspiration visuelle. Pour les raids permanents, réutiliser les **mêmes fonctions HTML/DOM** ; ne pas fabriquer un moteur de présentation unique par boss.

Les composantes canoniques du site français sont :

| Fichier | Rôle |
| --- | --- |
| `assets/raid-components.js` | **Source de vérité des vrais composants HTML :** introduction de combat, Vue complète, sélecteur de phase, panneau de phase, cartes P1/P2/P3/P4, « Copier ce tour », navigation précédent/suivant, bandeau Pokémon, fiche complète du build, cartes de préparation, progression |
| `assets/raid-guide-components-v6.css` | Styles canoniques de ces composants pour Heatran et Cresselia, y compris le responsive |
| `assets/raid-guide-template.js` | Cadre de toutes les fiches : bannière, blocs Stratégie/Votre rôle sous la bannière, dock sticky contenant les quatre onglets, affichage explicite de la **section active** |
| `assets/raid-redesign-v6.css` | Couleurs, typographies, accents, composition des pages du site, dock et carrousel |
| `assets/raid-home-carousel.js` | Rotation aléatoire des boss permanents sur l'accueil : Heatran, Cresselia, Meloetta, Cobaltium, Terrakium, Viridium ; noms et statuts explicites |
| `heatran.html` | Données/rotations et variantes Crimson Core, Beorns/JinxedBoon, Cloud Five |
| `assets/cresselia.js` | Données « The Three Musketeers v2.1 » (24 Pokémon, 10 tours, 12 mécaniques), logique de sélection et de stockage |
| `halloween-2025-raid.html` | Moteur historique d'archives Halloween 2025, contenu exclusif français et modèles de navigation partagés |

Les anciens CSS (`raid-redesign-v5.css`, `raid-site-polish.css`, `heatran-theme.css`, `cresselia.css`) restent présents pour compatibilité, mais les règles V6 sont chargées **en dernier**. Les versions de cache des pages de production sont `20261025-v6d`.

## Présentation obligatoire

1. Couleurs : **noir, rouge, gris, blanc** et nuances proches, sans bleu ni cyan.
2. Sous la bannière : « STRATÉGIE » et « VOTRE RÔLE », avec quatre boutons **P1, P2, P3, P4**. Sur écran étroit, ces sections s'empilent plutôt que de déborder.
3. Dock « NAVIGATION DU RAID » visible, **sticky dans le flux** sous les commandes, réductible et ouvert par défaut ; il présente Combat, Pokémon, Préparation, Mécaniques et le libellé **SECTION ACTIVE · …**, ainsi qu'un bouton rouge clairement sélectionné.
4. Combat : `RaidAtlasComponents.battleIntro` → `checkbox("Vue complète · afficher les N tours")` → `phaseSelect` → `battleTurn` (bouton **Copier ce tour** en haut à droite, quatre cartes P1–P4, note de raid et lien « Voir les 6 Pokémon du Pn ») → `phaseNav`.
5. Pokémon : `feature` → `pokemonIntroNote` si nécessaire → `checkbox("Tout déplier")` → six `buildCard` utilisant les mêmes titres, grille EV/IV, talents, objets, attaques et bouton Copier le build.
6. Préparation : `progressCard` puis `prepCard` pour chaque Pokémon ; conserver les checklists historiques supplémentaires des sources.
7. Mécaniques : `mechanics-intro`, `mechanic-grid`, `raid-mechanic-note`.

La séparation est stricte : composants communs pour l'interface, données et règles distinctes par boss. Modifier ces composants pour un changement de présentation commun à tous les futurs raids.

## Retour utilisateur à l'origine de V6

L'utilisateur a envoyé des captures montrant :
- Cresselia différente de Heatran (anciens panels « Voir tous les tours », « Copier les 4 actions » et cartes spécifiques), tandis que la disposition Heatran doit être reproduite **exactement** ;
- boutons de joueur textuels trop longs, remplacés par P1–P4 ;
- Cloud Five pas identique à Crimson Core ou Beorns/JinxedBoon ;
- palette bleue explicitement rejetée au profit de noir/rouge/blanc/gris ;
- accueil « TARGET // 485 » incompréhensible ;
- besoin de boss en vedette tournants sur l'accueil ;
- absence de retour assez visible sur l'onglet actif.

Réponse technique V6 : Heatran ET Cresselia passent par `raid-components.js`; Cloud Five passe également par les mêmes composants (combat, Pokémon, préparation, mécaniques). Navigation active et carrousel créés dans leurs scripts communs.

## Validation

Réalisée par analyse statique et simulation DOM :
- composants JS valides et objets de composants construits sans erreur ;
- tableaux de données Heatran `base`, `video`, `cloudTeams`, `cloudTurns`, `cloudRemaining`, `cloudNotes` et `rotations` inchangés ;
- objet de données Cresselia identique à la version antérieure (4 × 6 Pokémon, 10 × 4 actions, 12 mécaniques) ;
- feuille V6 chargée sur huit pages FR, cache versionné ;
- liens et noms explicites du carrousel, disparition de « TARGET // 485 ».

Limite : **le rendu navigateur réel sur GitHub Pages et le comportement en jeu ne sont pas vérifiés ici**. Le vrai test doit couvrir desktop, fenêtres côte à côte, petits écrans, « Vue complète », copie, navigation, sélection et bascule de stratégie. Aucune modification du dépôt anglais ni retrait des pages/stratégies existantes.


## Cresselia : sélecteur à trois stratégies (25 octobre 2026)

Dans `cresselia.html`, `#cres-strategy` reprend le modèle de sélecteur de Heatran et permet de choisir :

1. `musketeers` : The Three Musketeers v2.1, équipes et rotation historiques strictement inchangées, dix tours.
2. `sensei` : Sensei / DoubleDude (New Strategy), 4 × 6 fiches et treize tours / 52 actions, relevés du [guide source](https://forums.pokemmo.com/index.php?/topic/193398-cresselia-raid-guide/). Contradiction Tyranitar/Crocorible en P4 signalée. Les champs non précisés restent marqués « non imposés / non publiés » ; les corrections/évolutions des auteurs doivent être revérifiées avant élevage.
3. `latin` : Latin Combo V2, référence communautaire de douze tours. [Comparateur MMOBreeder](https://mmobreeder.com/fr/raids/cresselia) et [vidéo Latin Combo par PAXPO](https://www.youtube.com/watch?v=AvmnNLs-CWw). Les 24 builds et les 48 actions n'ont pas de transcription primaire indépendante suffisamment vérifiée. L'onglet conserve les composants communs, la source et un avertissement explicite au lieu d'afficher des informations fictives.

Les nouveaux jeux de données se trouvent dans `assets/cresselia-alternatives.js`. Le moteur `assets/cresselia.js` choisit les données en fonction de `#cres-strategy`, remet l'état du tour à zéro au changement, puis utilise les composants communs `RaidAtlasComponents` pour Combat, Pokémon et Préparation. Les checklists sont enregistrées séparément par stratégie. Le bandeau affiche le nombre de tours et le statut de disponibilité des builds correspondant au choix actif. L'onglet Mécaniques conserve les mécaniques communes du boss.

La version précédente The Three Musketeers reste la valeur par défaut et son objet `CRESSELIA_DATA` demeure immuable. Ne jamais transformer Latin Combo en tutoriel build complet sans accès aux compositions/rotations authentiques.


## Panneau compact unifié — V7, 25 octobre 2026

Décision utilisateur : fusionner les trois contrôles **Stratégie + Votre rôle + Navigation du raid** dans **un seul panneau sticky**, sans conserver le dock de navigation comme deuxième panneau autonome. Les anciens gros pavés et boutons doivent être beaucoup moins hauts. Palette noire, rouge, blanche et grise conservée.

- Script commun : `assets/raid-guide-template.js` (version `data-raid-template-version="7"`) crée un seul `.raid-command-center` après la bannière/les avertissements, avec l'en-tête `.raid-center-header`, puis `.raid-center-content` contenant `.raid-template-commandbar` (stratégie + rôle) et `.raid-guide-dock` (quatre rubriques), tous **dans le même élément sticky**. Les nœuds de commandes et d'onglets d'origine sont **déplacés**, non clonés : interactions, état de sélection, événements et raccourcis métier ne doivent pas changer.
- Style central unique : `assets/raid-command-center-v7.css`, chargé en **dernier** sur `heatran.html`, `cresselia.html`, `halloween-2025-raid.html` après le thème V6. Un seul cadre, espacement réduit (boutons joueurs 36 px, onglets 34 px, sélecteur 36 px), compact sur ordinateur, stratégie et rôle en deux colonnes au-delà de 920 px, sous l'un et l'autre en dessous. Navigation à quatre boutons, deux colonnes uniquement aux très petites largeurs.
- L'en-tête affiche « PANNEAU DE RAID », le contexte stratégie/joueur choisi, l'indicateur « SECTION ACTIVE · … » et le bouton **Réduire**. Celui-ci replie l'ensemble du panneau en une barre fine **Déployer**, pas seulement les quatre onglets. Le mode réduit supprime aussi les contrôles du parcours de tabulation, et conserve le contexte actif dans l'en-tête. Ouvert au chargement par défaut.
- Un seul `position:sticky` sur le panneau parent ; le dock imbriqué est `position:static`. Éviter de réintroduire la version V6 avec stratégie/role fixes en haut et deuxième panneau autonome.
- Effet commun sur les guides permanents Heatran et Cresselia (toutes stratégies) ainsi que sur les guides Halloween 2025. Les données et logiques du boss restent isolées.
- Tests : simulation DOM sur les 3 familles de guides, onglets originaux conservés, quatre boutons d'onglet, rôles/stratégies dans le même conteneur, indicateur d'onglet actif, réduction puis réouverture fonctionnelles. JS valide, CSS équilibré, HTML original intégralement préservé à part les nouvelles références d'assets. Aucun test graphique réel en navigateur à ce stade.

Pour les prochaines évolutions esthétiques du panneau, modifier **uniquement** le script commun et `assets/raid-command-center-v7.css` ; ne pas copier des blocs HTML individuels d'une fiche à l'autre.

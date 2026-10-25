# RAID ATLAS FR — gabarit générique des fiches et design V5

Mise à jour : 25 octobre 2026.

## Décision de présentation

La fiche Heatran est la référence canonique pour **toutes** les fiches de raid. Les interfaces Cresselia et Halloween réutilisent les mêmes règles de mise en page.

Structure standard :

1. Bandeau du boss avec illustration, résumé et indicateurs.
2. Sous le bandeau, **Stratégie** à gauche et **Votre rôle** à droite, exactement dans le même composant CSS `raid-template-commandbar` (sur une colonne quand la fenêtre est étroite).
3. Dock `raid-guide-dock` **visible, en haut du contenu**, avec titre **NAVIGATION DU RAID** et les onglets d'origine Combat, Pokémon, Préparation, Mécaniques ; `position:sticky` pendant le défilement, dans le flux de la page, pas de positionnement fixe au bas de l'écran. Il n'occulte pas les cartes de combat en bas comme l'ancien dock.
4. Contenu combat/Pokémon/préparation/mécaniques sur toute la largeur.
5. Références et footer préservés.

Écran étroit : les deux contrôles passent l'un sous l'autre à largeur inférieure à 880 px ; les boutons P1/P2/P3/P4 utilisent `grid-template-columns:repeat(4,minmax(0,1fr))` et `min-width:0`, avec repli en deux colonnes si inférieur à 365 px. Cresselia affiche maintenant **P1/P2/P3/P4** (libellés ARIA « Joueur N »), comme Heatran. Le dock est réduit volontairement via bouton, jamais réduit par défaut.

## Sources de vérité

| Fichier | Rôle |
| --- | --- |
| `assets/raid-redesign-v5.css` | **Design global V5**, chargé en dernier sur les huit pages de production : palette bleu nuit/cyan/corail, bannières, boutons, cartes, navigation, responsive, effets |
| `assets/raid-guide-template.js` | Seul montage des commandes et de la navigation pour tous les boss ; déplace les vrais onglets sans changer leurs écouteurs d'événements |
| `assets/raid-guide-template.css` | Ancien gabarit historique conservé, actuellement surchargé par le redesign V5 ; ne pas réutiliser sa disposition en barre latérale |
| `assets/raid-site-polish.css` | Première passe visuelle historique conservée, actuellement surchargée par V5 |
| `assets/raid-atlas.css`, `assets/cresselia.css`, `assets/heatran-*.css` | CSS historiques spécifiques, utiles pour les détails non remplacés |
| `assets/cresselia.js` et scripts Heatran / Halloween | **Données et logique du raid**, distinctes du template visuel |

Ne pas repartir d'une barre latérale gauche : cette proposition a été explicitement rejetée par l'utilisateur. Ne pas revenir au dock flottant fixé au bas de l'écran : l'utilisateur le jugeait discret et gênant pour la visibilité des fiches.

## Pages de production couvertes

- `index.html` : nouvelle section `raid-quick-access` avec accès directs aux deux raids disponibles et Halloween 2025.
- `permanent.html` : six raids permanents (Heatran/Cresselia disponibles, quatre à venir).
- `halloween.html`, `halloween-2025.html`, `halloween-2025-raid.html` : pages et guides Halloween, uniquement en français.
- `coming-soon.html`.
- `heatran.html`, `cresselia.html`.

`design-lab.html` : laboratoire/maquette historique laissée intacte. Dépôt anglais : intact.

## Intégrer un prochain raid

Copier la **structure des contrôles** Heatran : `.control`, `.raid-controls` avec titre `.section-heading`, `#players` ou ID du guide, et un `nav` à quatre onglets.

Définir `data-raid-template="custom"` dans `body` et les slots `data-raid-slot="hero|strategy|roles|players|tabs|content"`, ou ajouter une configuration dans `assets/raid-guide-template.js`. Le script commun déplace les vrais nœuds au bon endroit au chargement. Les scripts du boss alimentent les onglets, les rôles, les tours, les données et les checklists.

Le nouveau CSS global doit être chargé **après** tous les CSS historiques. Le script du gabarit doit se charger **après** celui du boss.

## Validation

Validations effectuées dans la conversation du 25/10 :
- syntaxe des scripts de raid et du montage partagé ;
- scripts de combat inline Heatran et Halloween conservés à l'identique ;
- quatre équipes de six Pokémon et dix tours Cresselia ;
- montage DOM simulé Heatran/Cresselia/Halloween : placement des commandes, conservation des onglets et réduction/réouverture ;
- équilibrage des accolades CSS et présence des nouvelles feuilles sur les huit pages.

À valider encore à l'écran (GitHub Pages) : rendu ordinateur/mobile réel, scroll sticky, clavier, copies et cases cochées. Les changements GitHub peuvent nécessiter la publication GitHub Pages de la dernière révision et le rafraîchissement de la page, ce qui n'a pas été vérifié ici.

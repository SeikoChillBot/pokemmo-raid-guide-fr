# Audit de construction — Halloween 2025 (FR)

Mise à jour : 25 octobre 2026

## Statut
Le dossier `Halloween Event → Halloween 2025` contient neuf boss, dans l'ordre Pumpking, Mygavolt, Branette, Hypnomade, Golemastoc, Brutapode, Vaututrice, Absol, Darkrai.

Une proposition de roster est disponible dans `assets/halloween-2025-rosters.js` pour :
- 7 raids prérequis, chacun avec 4 joueurs × 6 Pokémon (168 fiches) ;
- Darkrai 4★ et 5★, chacun avec 4 joueurs × 6 Pokémon (48 fiches) ;
- Pumpking facile et difficile, chacun avec 6 Pokémon de référence exploratoire (12 fiches).

Total : **38 équipes de six, 228 fiches/emplacements**.

### Provenance et limites
| Élément | Statut | Source |
|---|---|---|
| Boss, ordre et 7 prérequis de Darkrai | Documenté | Guide forum Halloween 2025 |
| Rotations génériques de 6 tours | Documentées | PDF utilisateur `hallo25.pdf` / caav 2025 ; MMOBreeder |
| Seuils et compétences du boss | Documentés dans les limites des sources | PDF caav 2025 et synthèses communautaires |
| 6 espèces différentes par joueur | Vérification des propositions | Génération algorithmique |
| 6 objets tenus différents par joueur | Vérification des propositions | Génération algorithmique |
| Espèces proposées pour remplir les rôles de caav | Hypothèses non testées | Raisonnement de composition, bases de capacités communautaires |
| EV, IV, natures, objets proposés pour les Pokémon | Hypothèses non testées | Répartitions génériques de combat, PAS des seuils mathématiques |
| Déroulement réel des K.O. / switches / cap des dégâts | Non vérifié | Dépend du jeu et des builds exacts |
| Pumpking solo trois phases | Mécanique référencée | Guides communautaires |
| Pumpking : six Pokémon et rotation exacte validés pour 2025 | Non vérifié | Plusieurs pistes historiques d'éditions antérieures, changements en 2025 |
| Darkrai 5★ : tour 4 Tengalice, tour 6 Charmina et inversions | Documenté | PDF caav 2025, p. 8–11 |

**Attention : il serait dangereux d'investir en breeding sur la seule base des propositions d'EV/IV.** Le guide signale les informations à tester ; il n'existe pas de garantie de victoire ou de concordance avec la vraie stratégie de la vidéo. L'affichage « Pokémon suggéré » ne prouve pas que le Pokémon précédent sort du terrain avant chaque tour.

## Références
- Guide global : https://forums.pokemmo.com/index.php?/topic/192700-halloween-2025-the-ultimate-halloween-event-guide/
- Synthèses des raids : https://mmobreeder.com/fr/raids/halloween
- Document principal : `hallo25.pdf`, intitulé « 2025 Halloween Raid Info », maintenu par caav (12 pages, reçu dans le projet Seiko).
- Vidéo 2025 de construction Pumpking difficile : https://www.youtube.com/watch?v=htTdOEO1Y1k
- Un exemple historique Pumpking (autre édition, à ne pas transposer sans test) : https://www.youtube.com/watch?v=2d8yXkMHjXQ

## Contrôles techniques
- 152 combinaisons boss × difficulté × onglet × joueur rendues avec un DOM simulé sans erreur.
- Syntaxe des scripts contrôlée.
- Distinction des sources et des propositions explicitée dans la page des guides.
- Non effectués : rendu graphique en véritable navigateur, vérification exhaustive des attaques apprises dans PokeMMO, simulations de dégâts et de vitesse, validation des K.O. et des changements de Pokémon, tests en jeu, déploiement Cloudflare.

## Étapes de validation en jeu
1. Vérifier le roster candidat par joueur : chaque Pokémon apprend les attaques proposées avec les règles PokeMMO.
2. Vérifier l'ordre de vitesse, y compris Tailwind, météo, effets de terrain et Trick Room.
3. Simuler les dégâts, les caps de dégâts par tour et les seuils de boss.
4. Vérifier qu'un Pokémon différent peut effectivement entrer au bon tour (K.O., Hurlement ou autre remplacement).
5. Confirmer le déroulement dans au moins une session réelle, et relever les scénarios RNG / reset.
6. Comparer avec les « Big Info Docs » exacts des vidéos, lorsqu'ils seront accessibles, puis distinguer les rosters originaux des propositions.

N'effectuer aucune modification du dépôt anglais sans demande explicite.

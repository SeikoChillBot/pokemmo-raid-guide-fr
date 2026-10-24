# Halloween 2025 — Sources, précision et état de couverture

Date de vérification : 25 octobre 2026.

## Périmètre

Uniquement l'archive française du site, dans l'ordre Pumpking → Mygavolt → Branette → Hypnomade → Golemastoc → Brutapode → Vaututrice → Absol → Darkrai.

Le fichier `assets/halloween-2025-data.js` contient les données de l'archive (stratégies synthétiques caav, notes par tour, règles des raids, ressources vidéo et builds historiques distincts).

## Sources principales utilisées

1. Guide événementiel Halloween 2025 de CALLMESENSEIX, forum : https://forums.pokemmo.com/index.php?/topic/192700-halloween-2025-the-ultimate-halloween-event-guide/  
   Pour l'accès, les boss, les localisations, les récompenses, les modes de Pumpking et Darkrai.
2. Document *2025 Halloween Raid Info* de caav, PDF de 12 pages transmis dans le projet Seiko.  
   Pour les tableaux de six tours par joueur et les informations spécifiques, dont Darkrai 5★ pages 8–11. Document fourni par l'utilisateur, et non ressource publiée dans ce dépôt.
3. MMOBreeder, index : https://mmobreeder.com/fr/raids/halloween et guides de boss `/fr/raids/galvantula`, `banette`, `hypno`, `golurk`, `scolipede`, `mandibuzz`, `absol`, `darkrai`, `pumpking`.  
   Pour les synthèses des rotations caav 2025, les attaques des boss, les seuils et les règles.
4. Guide de préparation *[ENG][ES] Halloween preparation guide to make profits*, forum : https://forums.pokemmo.com/index.php?/topic/150294-eng-es-halloween-preparation-guide-to-make-profits/  
   **Source historique fondée sur les éditions précédentes, mise à jour en septembre 2025.** Pour les 12 variantes de builds *historiques*, leurs EV/IV, natures, talents, objets et attaques. **Ce ne sont pas les rosters complets caav pour les raids 2025, ni une équipe validée pour Pumpking 2025.**

### Vidéos 2025 identifiées

- caav Mygavolt : https://www.youtube.com/watch?v=rxINO6Zb9RU
- caav Golemastoc : https://www.youtube.com/watch?v=CtUt0w8BUg4
- Smooge Pumpking difficile : https://www.youtube.com/watch?v=tfSJuAeaQ3Q
- lasaGna Pumpking difficile : https://www.youtube.com/watch?v=htTdOEO1Y1k
- PAXPO Pumpking difficile : https://www.youtube.com/watch?v=EaAR1BhlQ6o
- Synthèse de rentabilité (et références vidéo) : https://www.youtube.com/watch?v=80UeAuVRL3U

Certains auteurs annoncent un `Big Info Doc`, un guide écrit ou un Pokepaste dans leur description, mais les moteurs de recherche n'exposent que `URL...`. Ne pas inventer ces liens ni prétendre avoir lu les documents tronqués. Le PDF caav reçu n'a pas de rosters complets par joueur.

## Couverture exacte

| Boss | Tours caav 2025 | Attaques/mécaniques | Pokémon et EV/IV disponibles | Roster exact 4 × 6 |
|---|---|---|---|---|
| Pumpking facile/difficile | Phases seulement, pas de rotation 2025 sûre | Oui, règles générales et vidéos | **12 builds historiques** avec avertissement ; 2025 mentionne Crocorible et Mygavolt notamment | Non |
| Mygavolt | Six tours synthétiques | Oui | Liste historique d'espèces, sans attribution de slots | Non |
| Branette | Six tours synthétiques | Oui | Liste historique d'espèces, sans attribution de slots | Non |
| Hypnomade | Six tours synthétiques | Oui | Liste historique d'espèces, sans attribution de slots | Non |
| Golemastoc | Six tours synthétiques | Oui | Liste historique d'espèces, sans attribution de slots | Non |
| Brutapode | Six tours synthétiques | Oui | Liste historique d'espèces, sans attribution de slots | Non |
| Vaututrice | Six tours synthétiques | Oui | Liste historique d'espèces, sans attribution de slots | Non |
| Absol | Six tours synthétiques | Oui | Liste historique d'espèces, sans attribution de slots | Non |
| Darkrai 4★ | Six tours synthétiques | Oui | Liste historique d'espèces, sans attribution de slots | Non |
| Darkrai 5★ | Six tours du PDF caav, rôles et Pokémon proposés | Oui, alternance types/physique-spécial | Groupes d'espèces par phase, sans builds chiffrés par slot | Non |

## Règles éditoriales

- Une attaque générique « Feu » ou « Eau » est un **rôle**, pas un nom d'espèce ni un build.
- Des espèces citées dans la préparation de 2024 ne deviennent pas automatiquement des rosters de 2025.
- L'ordre des tours de Darkrai 4★ ne doit pas être réutilisé pour Darkrai 5★.
- Pumpking est un combat solo à trois Pokémon simultanés, pas un raid standard à quatre joueurs.
- Le talent Boom Final de Grodrive a subi un changement signalé dans les discussions 2025 : anciennes rotations Pumpking phase 3 non garanties.
- Les récompenses Pumpking difficile varient selon les sources consultées (forum événementiel vs témoignages de runs). Conserver l'origine de chaque chiffre.
- Les documents vidéo originaux avec les six Pokémon par joueur, leurs objets, natures, EV/IV et attaques restent nécessaires pour atteindre la complétude de Heatran.
- Aucune modification du dépôt anglais autorisée par cette mise à jour.

## Tests

- Présence de 9 boss, dans l'ordre approuvé.
- 54 notes de tours : 7 × 6 + 6 Darkrai 4★ + 6 Darkrai 5★.
- 12 profils historiques Pumpking vérifiés comme données étiquetées historiques.
- Syntaxe JavaScript valide sur les fichiers modifiés.
- Simulation structurelle JavaScript de 44 combinaisons boss/mode/onglet avec faux DOM : aucune exception. Ce test ne remplace pas un rendu navigateur ni une validation en jeu.

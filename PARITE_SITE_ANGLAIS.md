# Cahier de parité pour la future version anglaise

La version française du dépôt `SeikoChillBot/pokemmo-raid-guide-fr` reste la **référence visuelle et fonctionnelle** du prototype. Le dépôt anglais `SeikoChillBot/pokemmo-raid-guide` ne doit être modifié qu'après validation explicite de la version française.

## Contrat : exactement le même site

- Conserver la structure de navigation et les mêmes pages : `index.html`, `permanent.html`, `heatran.html`, `coming-soon.html`.
- La nouvelle identité RAID ATLAS noir/blanc/rouge est validée et appliquée sur le site FR le 24 octobre 2026. Reproduire les pages distinctes : accueil = 4 catégories ; raids permanents = 6 dossiers ; Heatran = guide interactif ; `coming-soon.html` = contexte de retour. Ne pas copier la composition de démonstration tout-en-un de `design-lab.html` comme structure de l'anglais.
- Conserver les mêmes feuilles CSS et leurs réglages : `assets/raid-hub.css`, `assets/raid-pro.css`, `assets/raid-atlas.css`, `assets/heatran-theme.css`, `assets/heatran-pro.css`, `assets/heatran-guidance.css`, `assets/heatran-atlas.css`. Ne pas refaire le design.
- Conserver les mêmes images et artworks, dimensions, animations, cartes, responsive mobile, pictogrammes, couleurs, mises en page et états des boutons.
- Conserver les mêmes données tactiques et la même distinction entre `Crimson Core` et `Beorns / JinxedBoon (vidéo)` ; reproduire **48 fiches**, **12 phases commentées**, **12 fiches de mécaniques communes**, **2 cartes comparatives** et les avertissements sourcés.
- Conserver les fonctions : choix du joueur, déroulé des six tours, vue complète, tout déplier, copier ce tour/build avec confirmation, préparation persistante, liens des sources en nouvel onglet, navigation retour et pages « À venir ».
- Utiliser les mêmes scripts de consignes/conditions et leur structure : `assets/heatran-guidance.js` et `assets/heatran-mechanics.js`. Traduire uniquement les chaînes affichées ; préserver l'ordre des équipes, les conditions et les formules.
- Adapter `<html lang="en">`, les titres, explications, textes de l'interface et les noms anglais Pokémon/capacités/objets ; ne pas traduire les URL de sources ni renommer les identifiants du code.
- Nommer explicitement la variante Beorns sélectionnable « Video variant », puisque le PDF comprend également une stratégie actualisée différente non transposable sans changement d'équipe.
- Utiliser les mêmes ressources graphiques locales que la version FR et vérifier les chemins relatifs du déploiement Cloudflare.
- Ne pas importer par inadvertance d'anciennes données du dépôt anglais : partir de l'état **validé du site français** puis faire la localisation, pas une seconde refonte.

## Tests de parité à appliquer

1. Comparer des captures d'écran FR/EN aux mêmes dimensions (PC et mobile) sur les quatre pages et chacun des onglets Heatran.
2. Parcourir les deux stratégies, les 4 joueurs, les 6 tours, les fiches des 24 Pokémon et la préparation.
3. Contrôler que tous les avertissements et choix conditionnels ont des équivalents sémantiques anglais exacts.
4. Vérifier les mêmes liens, la même confirmation de copie et la persistance du navigateur.
5. Vérifier qu'aucun texte français n'est resté dans l'interface anglaise et qu'aucune donnée tactique n'a changé pendant la traduction.
6. Déployer et valider l'anglais seulement après confirmation que le français est approuvé.

Dernière mise à jour : 24 octobre 2026. Référence graphique : site français RAID ATLAS (et non la démonstration autonome `design-lab.html`).

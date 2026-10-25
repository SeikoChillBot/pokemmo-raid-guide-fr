# Suggestions communautaires — Installation de `/adminDev`

Mise en place pour RAID ATLAS français. La version anglaise n'est volontairement pas modifiée avant validation de l'utilisateur.

## Ce qui est déjà codé dans le dépôt

- `index.html` : section « Une idée pour RAID ATLAS ? », formulaire rapide, pseudo facultatif et aucune inscription.
- `assets/raid-suggestions-home.js` et `assets/raid-suggestions.css` : formulaire et design noir/rouge cohérent avec les huit pages.
- `adminDev/index.html` : interface non liée dans les menus publics, login administrateur et deux sections : « À traiter » et « Suggestions traitées » (repliable).
- `assets/raid-admin-dev.js` : récupération authentifiée, passage au statut traité, réouverture, actualisation et pagination.
- `functions/api/suggestions.js` : POST public avec validation des champs, honeypot et limite d'envoi 60 secondes par IP, GET privé.
- `functions/api/suggestions/[id].js` : PATCH privé pour marquer une suggestion comme traitée ou la rouvrir.
- `_routes.json` : réserve les fonctions serveur aux URLs `/api/*`, sans ralentir les pages de raid.

Les données ne sont jamais enregistrées dans le dépôt, ni renvoyées dans le HTML. La clé administrateur n'apparaît jamais dans GitHub. Les entrées des visiteurs sont rendues via `textContent` dans l'interface d'administration (pas de HTML injecté).

## Activation à effectuer dans Cloudflare (une seule fois)

Le code est prêt, mais **Cloudflare n'a pas encore été configuré depuis cette conversation**. Tant que les ressources ci-dessous n'existent pas, le formulaire affiche une erreur de configuration plutôt que de confirmer un faux enregistrement.

1. Vérifier que le projet `pokemmo-raids-fr` est déployé via **Cloudflare Pages avec intégration Git** depuis `SeikoChillBot/pokemmo-raid-guide-fr`. Les Pages Functions dans le répertoire `/functions` sont alors déployées par Git. En mode Direct Upload, utiliser le processus de déploiement Functions compatible.
2. Dans Cloudflare : **Workers & Pages > KV** (ou menu Storage & databases > KV). Créer un espace de stockage nommé par exemple `pokemmo-raid-suggestions-fr`.
3. Dans **Workers & Pages > pokemmo-raids-fr > Settings > Bindings > Add > KV namespace**, choisir cet espace KV. Nommer **exactement** la variable `SUGGESTIONS_KV`.
4. Dans **Settings > Variables and Secrets > Add**, créer le secret chiffré `ADMIN_SUGGESTIONS_KEY`, avec une valeur aléatoire de **24 caractères minimum** (idéalement 32–48 caractères issus d'un gestionnaire de mots de passe). Choisir **Encrypt**, puis enregistrer. Ne jamais mettre ce secret dans un fichier GitHub, une URL, un screenshot ou un message de chat.
5. Redéployer la branche de production après avoir ajouté la liaison KV et le secret. Les bindings doivent être disponibles dans l'environnement Production.
6. Ouvrir `https://pokemmo-raids-fr.pages.dev/` pour tester le formulaire puis `https://pokemmo-raids-fr.pages.dev/adminDev/` pour saisir la clé secrète et examiner les suggestions.

### URLs

- Site Cloudflare FR : `https://pokemmo-raids-fr.pages.dev/`
- Administration : `https://pokemmo-raids-fr.pages.dev/adminDev/`
- GitHub Pages FR (si toujours utilisé) : `https://seikochillbot.github.io/pokemmo-raid-guide-fr/adminDev/`

Les formulaires hébergés sur GitHub Pages envoient leurs requêtes à l'API de Cloudflare FR. Les deux origines autorisées sont `https://seikochillbot.github.io` et `https://pokemmo-raids-fr.pages.dev`. Les URLs de prévisualisation Cloudflare sur d'autres sous-domaines ne sont pas autorisées sans mise à jour du contrôle d'origine.

## Vérifications importantes après activation

1. Sans clé, `GET /api/suggestions` doit répondre `401` ; si l'API est absente, la page est mal déployée ; si elle répond `503`, une liaison ou un secret manque.
2. Envoyer une proposition de test, vérifier qu'elle apparaît dans `/adminDev/`.
3. Cliquer « Marquer comme traitée ». Elle disparaît des propositions ouvertes et apparaît dans la section repliée « Suggestions traitées ».
4. Ouvrir cette section et cliquer « Réouvrir la suggestion ». Elle revient dans « À traiter ».
5. Vérifier qu'un visiteur sans clé ne peut ni lister ni modifier les suggestions.
6. Pour les volumes importants, envisager Cloudflare Turnstile / une règle WAF en complément du honeypot et de la limite basique par IP.

## Sécurité et limites

`/adminDev` est une URL **non référencée mais pas secrète au sens technique** : n'importe qui peut deviner ou lire son chemin dans un dépôt public. Le vrai contrôle d'accès est effectué à chaque requête privée côté Cloudflare avec `ADMIN_SUGGESTIONS_KEY`. Aucun accès aux données n'est donné par la simple possession de l'URL.

Le secret est temporairement mémorisé dans `sessionStorage` du navigateur pour ne pas le redemander à chaque actualisation de l'onglet ; le bouton Déconnexion l'efface. Éviter ce module sur un appareil partagé. Si une protection d'accès à **la page elle-même** est nécessaire, ajouter Cloudflare Access à la route `/adminDev/*` du domaine hébergé chez Cloudflare.

Cloudflare KV est un stockage réparti à cohérence éventuelle : une modification peut mettre un court délai à être visible selon l'emplacement et le cache. Le tableau de bord met immédiatement à jour la liste après un changement confirmé par le serveur.

## Évolutions possibles

L'URL `/adminDev/` a une structure extensible pour d'autres outils privés : suivi des corrections, annonces, liste des raids à documenter. Ne rien reporter sur le dépôt anglais tant que l'utilisateur n'a pas validé la version française.

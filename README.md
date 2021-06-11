# Contenu de la branche

La branche contient **3 dossiers**. Voici son contenu:
- Le dossier `spring`: Contient tout le travail réalisé durant les tps 1 et 2.
- Le dossier `api`: Contient tout le travail réalisé durant les tps 3 et 4.
- Le dossier `client`: Contient tout le travail réalisé du tp4 au tp8.

## Spring

Ce dossier contient le serveur tomcat qui permet de stocker les utilisateurs correspondant aux survivants dans la suite du projet.

Il permet de:
- Créer, modifier et supprimer des utilisateurs.
- Récupérer les informations sur les utilisateurs.
- Connecter l'utilisateur (_et le déconnecter_).
- Générer des **tokens** utiles pour confirmer l'idendité du survivant.

**Lancement:** Il se lance à l'aide de **tomcat**.

**Aide:** Pour un peu plus de détails, vous pouvez accéder à la [branche concernée](https://forge.univ-lyon1.fr/p1709456/mif13-tps/-/tree/tp1/tp2).

## API

Ce dossier contient l'API du jeu **Solid Rain**. Il utilise **Node**. Il est séparé en 2 dossiers:
- Un dossier concernant l'API du jeu, lui-même séparé en 2 parties (_dossier `api`_):
    - La partie administrative:
        - La création d'impacts, de ZRR, de joueurs (_existants dans le serveur `spring`_).
        - L'accès à ces ressources.
    - La partie publique, entres autres:
        - La connexion au jeu.
        - L'accès aux ressources.
        - L'édition des coordonnées et de l'image de profil du joueur.
        - Le fait d'informer au serveur qu'un joueur a rencontré une météorite (_à **moins de 2 mètres** en théorie, mais pour plus de facilité en réel, nous l'avons augmenté à **4 mètres**_).
- Un dossier contenant une **SPA** (_dossier `admin`_) permettant aux administrateurs (_pour le moment, aucune vérification n'est faite pour s'assurer qu'il s'agisse d'un administrateur_) d'effectuer des requêtes au serveur (_création de ZRR, de joueurs existants, d'impacts, récupération de ceux-ci à l'aide d'une carte_). **Il peut de plus savoir pour chaque météorite si celui-ci à été capturé ou non, et si oui par qui**.

**Lancement:**
- Le dossier `admin` contient une dépendance pour générer un dossier packagé (_webpack_) en tapant les commandes `npm install` puis `npm run build` (__nécessite **node** et ses dépendances contenu dans ce même dossier__).

- Le dossier `api` permet de lancer l'api à l'aide de la commande `node app.js` (_le fichier principal_) en ayant au préalable installé toutes les dépendances nécessaires au bon fonctionnement du projet.

**Aide:** Pour un peu plus de détails, vous pouvez accéder à la [branche concernée](https://forge.univ-lyon1.fr/p1709456/mif13-tps/-/tree/tp3).

## Client

Ce dossier contient le framework côté client. Il utilise **Vue.js** (_version 4_). Il permet à l'utilisateur (_non administrateur_) de se connecter en tant que survivant, puis d'essayer de survivre le plus longtemps possible en se rendant près des points d'impacts situés dans des ZRR. Tout comme le dossier `api` il contient un générateur de package grâce à **webpack** pour le déploiement.

L'utilisateur peut avoir accès au pitch du jeu sur la page `about`, peut se connecter sur la page `login` (_ou se déconnecter sur la page `logout`_), avoir accès aux informations sur son profil sur la page `user` et jouer au jeu à la page principale.

Lorsque l'utilisateur se déplace, les marqueurs (_indiquant des impacts, d'autres survivants ou des ZRR_) se suppriment et s'actualisent en récupérant toutes les ressources grâce à l'api du jeu. Une fois actualisé, si un joueur est proche à moins de **2 mètres** (_pour la démonstration, nous l'avons augmenté à **4 mètres** pour avoir plus de facilités en raison d'un GPS non précis au mètre près_) alors on envoie vers l'api du jeu qu'on est proche d'une météorité ce qui indique que cette météorite à été découverte par ce joueur (_il ne sera donc **plus possible de récupérer cette météorite**_) et gagne le temps de survie attaché à cette météorite.

**_Attention:_** Il est possible qu'un joueur soit proche de plusieurs météorites en même temps. Dans ce cas-la: bien joué à lui! Il les récupéres toutes.

Lorsque le TTL (_son temps de survie_) atteint 0, il a perdu et tout les marqueurs sont supprimés (_plus rien ne sera actualisé, **même pas sa position sur la carte**_).

**Lancement:** Pour utiliser le package, il faudra se rendre dans le dossier `client/client` utiliser les commandes `npm install` et `npm run build`. En mode développement, remplacez la dernière commande par `npm run serve`.

**Aide:** Pour un peu plus de détails, vous pouvez accéder à la [branche concernée](https://forge.univ-lyon1.fr/p1709456/mif13-tps/-/tree/tp7).
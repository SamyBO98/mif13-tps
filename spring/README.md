# TP1 & TP2

Voici les différents liens permettant de vérifier le bon fonctionnement de l'application:
- [Documentation de l'application YAML](#Documentation-de-l'application-YAML)
- [Swagger](#Swagger)
- [Client](#Client)

## Documentation de l'application YAML
Le lien vers le fichier YAML sur le dépôt se situe [ici](./users-api.yaml).

## Swagger
Le lien vers le Swagger généré par Spring et déployé sur la VM se situe [ici (version HTTP)](http://192.168.75.118:8080/v1/swagger-ui/index.html?configUrl=/v1/v3/api-docs/swagger-config) et [ici (version HTTPS)](https://192.168.75.118/api/v1/swagger-ui/index.html?configUrl=/api/v1/v3/api-docs/swagger-config).

**Avertissement**: la version sécurisée présente une petite erreur lors du chargement de la documentation. Pour une raison inconnue, elle ne vérifie pas le bon chemin. Il faudra rajouter manuellement un chemin pour que celui-ci fonctionne.

Ce chemin est le suivant: `/api/v1/v3/api-docs` (*chemin à éditer sur la page de Swagger dans la barre de recherche située en haut de la page*).

**Utilisation**: La documentation contient 3 serveurs: une servant de débuguage (*localhost*), une pour l'API non sécurisée (*HTTP*) et une pour l'API sécurisée (*HTTPS*). **N'utilisez pas le serveur `localhost`: privilégiez le bon serveur selon le site utilisé (*si vous avez lancé Swagger en HTTP, il serait plus préférable d'utiliser le serveur non sécurisé, et inversement pour HTTPS*).**

## Client
Le lien vers le client simple déployé sur le serveur nginx de la VM se situe [ici (version HTTP)](http://192.168.75.118/users-api/) et [ici (version HTTPS)](https://192.168.75.118/users-api/).

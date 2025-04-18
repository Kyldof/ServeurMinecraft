# Présentation

Ce projet consiste à gérer un serveur Minecraft à travers une application mobile. Le principe est d’interroger une API développée avec Node.js, laquelle communique avec le serveur Minecraft via le protocole RCON (Remote Console), généralement accessible sur le port `25575`.

L’application permet :

- de lister et afficher les joueurs actuellement connectés,
- d’exécuter des commandes administrateur sur le serveur,
- de démarrer le serveur à distance.

L’API écoute sur différentes routes HTTP (192.168.1.180) détaillées ci-dessous :

- `POST /start` : démarre le serveur Minecraft (exécution d’un script ou d’une commande côté serveur).
- `POST /send-command` : exécute une commande envoyée par le client via RCON.
- `POST /player_list` : renvoie la liste des joueurs connectés actuellement au serveur.

---

## Application Mobile

L'application mobile a été développée avec **React Native**. Elle propose une interface simple et épurée pour permettre à l’administrateur du serveur Minecraft de :

- **Visualiser les joueurs en ligne** : affichage dynamique depuis l’API.
- **Envoyer des commandes RCON** : possibilité d’envoyer n’importe quelle commande via un champ de texte.
- **Démarrer le serveur Minecraft** : bouton dédié qui envoie une requête de démarrage.

### Fonctionnalités principales

- Un **en-tête** clair indiquant qu’il s’agit d’un panneau de contrôle Minecraft.
- Un **composant `PlayersList`** qui affiche les joueurs et permet de rafraîchir la liste.
- Un **champ de saisie de commande** avec un bouton pour l’envoi.
- Un **bouton de démarrage du serveur**.

L’interface utilise un **style sombre (dark mode)** pour une meilleure lisibilité et un look en accord avec l’univers Minecraft.

---

## Technologies utilisées

- **React Native** pour le développement de l'application mobile
- **TypeScript** pour une meilleure robustesse du code
- **Node.js** côté serveur avec Express
- **Protocole RCON** pour la communication avec le serveur Minecraft

---

## À venir (TODO)

- Authentification pour restreindre l'accès à l'application
- Affichage des logs du serveur en temps réel
- Interface de configuration du serveur
- Amélioration de la gestion des erreurs

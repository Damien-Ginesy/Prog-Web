# Prog-Web
Projet dans le cadre du cours de prog Web

Projet IT103 2020/2021
Introduction
Le projet de programmation web doit être réalisé par binômes . Il a pour
but de vous faire développer une application web utilisant l’architecture
dynamique côté serveur . Vous serez notés sur les éléments suivants :

• ● Qualité du code HTML5 et CSS (sur 6)

• ● Ergonomie du site (sur 6)

• ● Qualité du code Javascript (node) (sur 6)

• ● Qualité du code SQL (sur 2)

Voici la liste des technologies qui sont autorisées dans le projet :

• ● HTML

• ● CSS

• ● MySQL (ou SQLite)

• ● Javascript (Node)

• ● JavaScript

• ● Jade/Pug

Enfin faites particulièrement attention à la copie , j’utilise un logiciel qui
permet de détecter les copier-coller automatiquement, tout projet suspect
sera étudié avec la plus grande attention...

Concernant le rendu, vous devez rendre le code source du projet, situé
dans un répertoire src ainsi qu’un rapport au format texte brut, nommé
readme.txt . 

La partie architecture doit décrire l’intégralité des fichiers
contenus dans votre application.

Fonctionnalité
--------------

Liste des fonctionnalités implémentées et non implémentées

Architecture
-----------

src/views/ fichier1.jade : description du fichier 1
src/ fichier2.js : description du fichier 2.
..

Les description doivent être courtes et indiquer clairement quelles sont les
fonctionnalités du fichier. Vous devez compresser le tout dans une archive
nommée it103-2021-NOM_PRENOM1_NOM_PRENOM2.zip. Enfin, les
fichiers sources doivent être correctement indentés. Les groupes ne
respectant pas ces règles se verront appliquer un malus.
Le projet est à rendre via Moodle au plus tard le 20/05/2021 à minuit .

#Sujet

L’objectif du projet est de reproduire une partie des fonctionnalités du site
reddit.com . Reddit est un site communautaire permettant à ses
utilisateurs de s’échanger des liens avec une description mais également
de commenter et voter pour les liens les plus intéressantes.
Fonctionnalités

Page d’accueil
- Si l’utilisateur est connecté, elle devra lui afficher les liens
ayant eu le plus d’interactions (commentaires et upvotes) de la
journée d’un côté, et également afficher une section résumant les
nouveautés qu’il y a eu depuis sa dernière connexion pour les liens
ou il avait interagi dans les dernière 24h.

• - Si l’utilisateur n’est pas connecté, elle devra
automatiquement le rediriger vers la page d’authentification.

La page d’accueil devra fonctionner de la manière suivante:Inscription
La page d’inscription devra demander à l’utilisateur de saisir un pseudo,
une adresse mail ainsi qu’un mot de passe.
Le pseudo devra contenir plus de 4 caractères, l’adresse mail devra être
valide et le mot de passe devra avoir au minimum 6 caractères.
La page devra également contenir un lien permettant à l’utilisateur
d’accéder à la page d’authentification s’il a déjà un compte.

#Authentification
Pour s’authentifier il faut fournir son adresse mail et son mot de passe. Un
utilisateur peut se déconnecter. La consultation du site est interdite à toute
personne qui n’est pas authentifiée. La page d’authentification devra de la
même manière que la page d’inscription, proposer un lien pour les
personnes n’ayant pas encore de compte.

#Ajouter/Éditer/Supprimer des liens
Le partage d’un nouveau lien pourra se faire directement depuis la page
d’accueil, en haut de la page comme pour Facebook, il faudra afficher un
champ ou l’utilisateur pourra rapidement partager un lien avec son
commentaire.
Lorsque l’utilisateur accèdera à la page d’un lien pour voir ses
commentaires, il devra avoir la possibilité de modifier son lien ainsi que sa
description (s’il en est propriétaire).
Enfin, il lui sera également possible de supprimer le lien et rendre donc
cette page là définitivement inaccessible (s’il en est propriétaire).
Visualiser la page d’un lien
Chaque lien devra avoir sa propre page pour visualiser ses commentaires
ainsi que le nombre de votes qu’il a (upvotes - downvotes).

#Upvote et Downvote des liens
Il sera possible pour tout utilisateur authentifié d’upvoter (+1) ou de
downvoter (-1) un lien ou un commentaire.
Une fois qu’un utilisateur a voté pour un lien, il lui sera possible de voir
son vote, mais également de le modifier à tout moment.Chaque lien ou commentaire devra donc avoir un score représentant le
nombre total de votes qu’il a.

#Commenter un lien
Chaque utilisateur authentifié devra avoir la possibilité de commenter un
lien, il pourra également modifier ou supprimer son commentaire. Un
utilisateur peut commenter un lien autant de fois qu’il le souhaite.

#Page de profil
Chaque utilisateur devra avoir sa propre page de profil qui contiendra
l’historique de tous les liens qu’il a upvoté/downvoté ou commenté. Ainsi
que tous les liens qu’il aura posté par le passé. L’affichage se faisant de
manière anti-chronologique.

#Déploiement
Un script doit permettre de déployer l’application sur un serveur
comportant Node et MySQL ou SQLite. En outre le script de déploiement
doit automatiquement :
• ● créer toutes les tables nécessaires à l’application
• ● créer les utilisateurs (login/password) : max/max et bob/bob
• ● créer un partage de lien de max : http://google.fr
•
● créer un commentaire de bob : Excellent site pour faire des
recherches!
● ajouter un upvote de max pour la réponse de bob
Le script doit impérativement se trouver à la racine du projet et se
nommer : install.js .

#Contraintes
•
● Bien entendu l’application doivent être le plus robuste
possible à la saisie d’information erronées (mail dans un format non
valide, etc...).etc...).

• ● Des messages d’erreurs clairs doivent être affichés en cas
de problème avec l’application.

• ● L’application doit être sécurisée. Il ne doit pas être possible
d’accéder aux informations d’un utilisateur sans avoir rentré au
moins une fois son mail et mot de passe. Il ne faut non plus qu’un
utilisateur puisse modifier des questions qu’il n’a pas posté.

#Bonus
Un bonus sera alloué aux groupes qui :
• - Ajouteront la possibilité de mettre des liens en favoris et de
les voir sur sa page de profil.

• - La possibilité de créer comme des “sub-reddit”, qui ne sont
autre que des “catégories” ou liens peuvent être publiés, chaque
sub-reddit ayant sa propre page.

• - De la même manière vous pouvez implémenter des
fonctionnalités supplémentaires, après discussion avec l’enseignant.

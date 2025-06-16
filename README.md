
✨ Codé avec ❤️ par Ilyesse El Adaoui





# 🔐 Système d'Authentification Sécurisé

Une API robuste d’authentification conçue avec Node.js, Express et MongoDB. Ce projet met en œuvre les meilleures pratiques de sécurité : gestion des rôles (admin, modérateur, utilisateur), tokens JWT, refresh tokens, mot de passe oublié, validation d’email, et plus encore.

## 🧩 Fonctionnalités

- ✅ Connexion / Inscription sécurisée via JWT
- 🔄 Refresh Token pour renouveler les sessions
- 🛡️ Rôles utilisateur : Admin, Modérateur, Utilisateur
- 🔐 Hashage des mots de passe avec Bcrypt
- 📧 Récupération de mot de passe (avec token temporaire)
- 🧪 Vérification d’email (simulation/démo)
- 🧱 API RESTful bien structurée
- 🧼 Validation des entrées (express-validator)

## 👥 Rôles Utilisateurs

| Rôle        | Email                     | Mot de passe |
|-------------|---------------------------|--------------|
| 👑 Admin     | admin@secure.com          | admin123     |
| 🛡️ Modérateur | moderator@secure.com       | mod123       |
| 👤 Utilisateur | user@secure.com            | user123      |

## 🧠 Architecture Technique

- **Backend** : Node.js + Express.js
- **Base de données** : MongoDB
- **Sécurité** :
  - JWT (access & refresh tokens)
  - Bcrypt (hashage)
  - Middleware de protection des routes
- **Langage** : TypeScript (ou JavaScript selon config)

## 🔌 Endpoints Principaux (API)

| Méthode | Endpoint                 | Description                           |
|--------|--------------------------|---------------------------------------|
| POST   | `/api/auth/register`     | Créer un nouveau compte utilisateur   |
| POST   | `/api/auth/login`        | Connexion avec génération des tokens  |
| POST   | `/api/auth/refresh`      | Rafraîchir l’access token             |
| POST   | `/api/auth/logout`       | Déconnexion + suppression des tokens  |
| POST   | `/api/auth/forgot-password` | Envoi d’un lien de réinitialisation  |
| POST   | `/api/auth/reset-password`  | Modifier le mot de passe             |
| GET    | `/api/user/profile`      | Afficher le profil connecté (protégé) |
  

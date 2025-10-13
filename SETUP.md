# Guide de Configuration - Portfolio Backend

## 📋 Prérequis

- Node.js v18+ 
- PostgreSQL 12+
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd Portfolio-Backend
npm install
```

### 2. Configurer la base de données PostgreSQL

#### Installer PostgreSQL (si pas déjà installé)

**Windows:**
- Télécharger depuis [postgresql.org](https://www.postgresql.org/download/windows/)
- Installer avec les paramètres par défaut
- Noter le mot de passe que vous définissez pour l'utilisateur `postgres`

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Créer la base de données

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE portfolio_db;

# Quitter
\q
```

### 3. Configurer les variables d'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env
```

Éditer `.env` avec vos informations :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe
DB_DATABASE=portfolio_db

PORT=3001
NODE_ENV=development

CORS_ORIGIN=http://localhost:5173
```

### 4. Démarrer l'application

```bash
# Mode développement
npm run start:dev
```

L'API sera disponible sur : `http://localhost:3001`

### 5. Peupler la base de données (optionnel)

```bash
# Ajouter des données de test
npm run seed
```

## 📚 Documentation API

Une fois l'application lancée, accédez à la documentation Swagger :

```
http://localhost:3001/api/docs
```

## 🔌 Endpoints disponibles

### Projets
- `GET    /api/projects` - Liste tous les projets
- `GET    /api/projects/:id` - Détails d'un projet
- `POST   /api/projects` - Créer un projet
- `PATCH  /api/projects/:id` - Modifier un projet
- `DELETE /api/projects/:id` - Supprimer un projet

### Compétences
- `GET    /api/skills` - Liste toutes les compétences
- `GET    /api/skills/:id` - Détails d'une compétence
- `GET    /api/skills/by-categories` - Compétences groupées par catégorie
- `POST   /api/skills` - Créer une compétence
- `PATCH  /api/skills/:id` - Modifier une compétence
- `DELETE /api/skills/:id` - Supprimer une compétence

### Dashboard
- `GET    /api/dashboard/stats` - Statistiques générales
- `GET    /api/dashboard/timeline` - Timeline des projets
- `GET    /api/dashboard/recent-activity` - Activités récentes

## 🧪 Tester l'API

### Avec cURL

```bash
# Obtenir tous les projets
curl http://localhost:3001/api/projects

# Créer un projet
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon Projet",
    "category": "Web App",
    "description": "Description du projet",
    "technologies": ["React", "Node.js"],
    "status": "termine"
  }'
```

### Avec Postman

1. Importer la collection Swagger : `http://localhost:3001/api/docs-json`
2. Tester les endpoints

## 🔧 Scripts disponibles

```bash
npm run start          # Démarrer en mode production
npm run start:dev      # Démarrer en mode développement (watch)
npm run start:debug    # Démarrer en mode debug
npm run build          # Compiler le projet
npm run seed           # Peupler la base de données
npm run lint           # Linter le code
npm run format         # Formater le code
```

## ⚠️ Troubleshooting

### Erreur de connexion PostgreSQL

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:** Vérifier que PostgreSQL est démarré
```bash
# Windows (dans Services)
# Rechercher "PostgreSQL" et démarrer le service

# macOS
brew services restart postgresql@15

# Linux
sudo systemctl status postgresql
sudo systemctl start postgresql
```

### Erreur "database does not exist"

**Solution:** Créer la base de données
```bash
createdb portfolio_db
```

### Port 3001 déjà utilisé

**Solution:** Changer le port dans `.env`
```env
PORT=3002
```

## 📦 Structure du projet

```
Portfolio-Backend/
├── src/
│   ├── projects/          # Module projets
│   │   ├── entities/      # Entités TypeORM
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   └── projects.module.ts
│   ├── skills/            # Module compétences
│   ├── dashboard/         # Module dashboard
│   ├── seed/              # Données de test
│   ├── app.module.ts      # Module principal
│   └── main.ts            # Point d'entrée
├── .env                   # Configuration
├── package.json
└── README.md
```

## 🔒 Production

Pour déployer en production :

1. Changer `NODE_ENV=production` dans `.env`
2. Désactiver `synchronize` dans TypeORM (déjà fait automatiquement)
3. Utiliser des migrations pour les changements de schéma
4. Sécuriser avec HTTPS
5. Ajouter un système d'authentification si nécessaire

```bash
npm run build
npm run start:prod
```

# Portfolio Backend API

Backend moderne développé avec NestJS pour gérer les projets et compétences du portfolio.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Configurer la base de données
cp .env.example .env
# Éditer .env avec vos paramètres de base de données

# Lancer le serveur de développement
npm run start:dev
```

## 📦 Technologies

- **NestJS** - Framework backend
- **TypeORM** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données
- **Swagger** - Documentation API
- **Class Validator** - Validation des données

## 🔌 API Endpoints

### Projets
- `GET /api/projects` - Liste tous les projets
- `GET /api/projects/:id` - Détails d'un projet
- `POST /api/projects` - Créer un projet
- `PUT /api/projects/:id` - Modifier un projet
- `DELETE /api/projects/:id` - Supprimer un projet

### Compétences
- `GET /api/skills` - Liste toutes les compétences
- `GET /api/skills/:id` - Détails d'une compétence
- `POST /api/skills` - Créer une compétence
- `PUT /api/skills/:id` - Modifier une compétence
- `DELETE /api/skills/:id` - Supprimer une compétence

### Statistiques
- `GET /api/dashboard/stats` - Statistiques générales
- `GET /api/dashboard/timeline` - Timeline des projets

## 📚 Documentation

Documentation Swagger disponible sur : `http://localhost:3001/api/docs`

## 🗄️ Base de données

### Configuration PostgreSQL

```bash
# Créer la base de données
createdb portfolio_db

# Les migrations se lancent automatiquement au démarrage
```

## 🔒 Sécurité

- Validation des données avec class-validator
- CORS configuré
- Limite de taille des fichiers uploadés

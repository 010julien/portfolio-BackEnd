# 📦 Projet Portfolio Complet - ADOBOE Comlan Julien

## 🎯 Vue d'ensemble

Projet complet comprenant :
1. **Frontend Portfolio** - Site web moderne avec React + Tailwind CSS
2. **Backend API** - API REST avec NestJS + PostgreSQL pour gérer projets et compétences

---

## 📁 Structure des dossiers

```
Desktop/
├── Portfolio/              # Frontend - Site portfolio
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── images/         # Images (votre photo)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── Portfolio-Backend/      # Backend - API NestJS
    ├── src/
    │   ├── projects/       # Gestion des projets
    │   ├── skills/         # Gestion des compétences
    │   ├── dashboard/      # Statistiques
    │   ├── seed/           # Données de test
    │   └── main.ts
    ├── .env                # Configuration (à créer)
    ├── package.json
    ├── SETUP.md           # Guide d'installation
    └── README.md
```

---

## 🚀 Démarrage rapide

### 1. Portfolio Frontend

```bash
cd Portfolio
npm install
npm run dev
```

➡️ Ouvrir http://localhost:5173

### 2. Backend API

```bash
cd Portfolio-Backend

# Installer les dépendances
npm install

# Configurer la base de données
cp .env.example .env
# Éditer .env avec vos paramètres PostgreSQL

# Créer la base de données PostgreSQL
createdb portfolio_db

# Démarrer le serveur
npm run start:dev

# (Optionnel) Peupler avec des données de test
npm run seed
```

➡️ API sur http://localhost:3001
➡️ Documentation sur http://localhost:3001/api/docs

---

## ✨ Fonctionnalités

### Frontend Portfolio

✅ **Design moderne** avec Tailwind CSS
✅ **Mode sombre/clair** avec toggle
✅ **Animations fluides** avec Framer Motion
✅ **Responsive** pour tous les écrans
✅ **Slider de projets** interactif
✅ **Sections complètes** :
   - Hero avec photo
   - À propos
   - Compétences (graphiques de progression)
   - Projets (carousel)
   - Management
   - Expériences (timeline)
   - Contact (formulaire)

### Backend API

✅ **API REST complète** avec NestJS
✅ **Base de données PostgreSQL** avec TypeORM
✅ **Documentation Swagger** automatique
✅ **Validation des données** avec class-validator
✅ **CRUD complet** pour projets et compétences
✅ **Dashboard statistiques** :
   - Nombre de projets par statut
   - Compétences par catégorie
   - Timeline des projets
   - Activités récentes

---

## 🔌 API Endpoints

### Projets
- `GET /api/projects` - Liste tous les projets
- `GET /api/projects/:id` - Détails d'un projet
- `POST /api/projects` - Créer un projet
- `PATCH /api/projects/:id` - Modifier un projet
- `DELETE /api/projects/:id` - Supprimer un projet

### Compétences
- `GET /api/skills` - Liste toutes les compétences
- `GET /api/skills/:id` - Détails d'une compétence
- `GET /api/skills/by-categories` - Groupées par catégorie
- `POST /api/skills` - Créer une compétence
- `PATCH /api/skills/:id` - Modifier une compétence
- `DELETE /api/skills/:id` - Supprimer une compétence

### Dashboard
- `GET /api/dashboard/stats` - Statistiques générales
- `GET /api/dashboard/timeline` - Timeline
- `GET /api/dashboard/recent-activity` - Activités récentes

---

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icônes

### Backend
- **NestJS** - Framework Node.js
- **TypeORM** - ORM
- **PostgreSQL** - Base de données
- **Swagger** - Documentation API
- **Class Validator** - Validation

---

## 📝 Prochaines étapes

### Phase 1 : Backend Dashboard UI (React)
Créer une interface d'administration pour gérer projets et compétences :
- Page de connexion
- Liste des projets avec CRUD
- Liste des compétences avec CRUD
- Dashboard avec graphiques

### Phase 2 : Connexion Portfolio ↔ Backend
Modifier le portfolio pour qu'il récupère les données depuis l'API :
- Remplacer les données statiques par des appels API
- Actualisation automatique
- Gestion du loading et des erreurs

### Phase 3 : Authentification
Ajouter un système d'authentification :
- JWT pour sécuriser l'API
- Page de login pour le dashboard
- Protection des routes admin

### Phase 4 : Déploiement
- Backend sur Heroku/Railway/Render
- Frontend sur Vercel/Netlify
- Base de données PostgreSQL hébergée

---

## 💡 Comment utiliser

### Ajouter un nouveau projet via l'API

```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon Nouveau Projet",
    "category": "Application Web",
    "description": "Description du projet...",
    "technologies": ["React", "Node.js"],
    "role": "developer",
    "roleDescription": "Développeur Full-Stack",
    "team": "Équipe de 3",
    "duration": "2 mois",
    "status": "termine",
    "icon": "🚀",
    "order": 1
  }'
```

### Ajouter une nouvelle compétence

```bash
curl -X POST http://localhost:3001/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Docker",
    "category": "Backend",
    "level": "intermediate",
    "percentage": 70,
    "order": 1
  }'
```

---

## 📚 Documentation complète

- **Frontend** : Voir `/Portfolio/README.md`
- **Backend** : Voir `/Portfolio-Backend/README.md` et `/Portfolio-Backend/SETUP.md`
- **API** : http://localhost:3001/api/docs (Swagger)
- **Exemples d'API** : `/Portfolio-Backend/api-examples.http`

---

## 🎨 Palette de couleurs

Le site utilise une palette moderne basée sur des tons bleus et corail :

- **#1b9abe** - Bleu principal
- **#9fd6e2** - Bleu clair
- **#335f73** - Bleu gris foncé
- **#f06641** - Orange corail
- **#203c48** - Bleu très foncé
- **#a7d9e4** - Bleu très clair

---

## 🔧 Configuration requise

- **Node.js** v18+
- **PostgreSQL** 12+
- **npm** ou **yarn**

---

## 🆘 Support

En cas de problème :

1. Vérifier que PostgreSQL est démarré
2. Vérifier les variables d'environnement dans `.env`
3. Consulter les logs de l'application
4. Voir la documentation dans SETUP.md

---

## 📄 Licence

MIT - ADOBOE Comlan Julien

---

## 🎉 Félicitations !

Vous disposez maintenant d'un système complet de portfolio avec :
- ✅ Un site web moderne et professionnel
- ✅ Une API REST complète et documentée
- ✅ Une base de données structurée
- ✅ Un système évolutif pour ajouter des fonctionnalités

**Prochaine étape recommandée** : Créer le dashboard React pour administrer facilement vos projets et compétences depuis une interface graphique.

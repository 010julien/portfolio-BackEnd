# 🧪 Guide de Test de l'API

## 🚀 Démarrage rapide

### 1. Démarrer le backend

```bash
cd Portfolio-Backend
npm run start:dev
```

Attendez que le message suivant apparaisse :
```
🚀 Application is running on: http://localhost:3001
📚 API Documentation: http://localhost:3001/api/docs
```

### 2. Tester automatiquement

```bash
# Dans le dossier Portfolio-Backend
node test-api.js
```

Ce script va :
- ✅ Vérifier la connexion à l'API
- ✅ Créer un projet et une compétence
- ✅ Tester tous les endpoints CRUD
- ✅ Tester le dashboard
- ✅ Nettoyer les données de test

---

## 📚 Documentation Swagger

Ouvrez dans votre navigateur : **http://localhost:3001/api/docs**

Vous aurez une interface interactive pour tester tous les endpoints.

---

## 🔍 Tests manuels avec cURL

### Projets

#### 1. Obtenir tous les projets
```bash
curl http://localhost:3001/api/projects
```

#### 2. Créer un projet
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon Super Projet",
    "category": "Application Web",
    "description": "Une application web moderne",
    "technologies": ["React", "Node.js", "PostgreSQL"],
    "role": "both",
    "roleDescription": "Chef de projet & Développeur",
    "team": "Équipe de 4 personnes",
    "duration": "3 mois",
    "githubLink": "https://github.com/username/project",
    "demoLink": "https://project.com",
    "status": "termine",
    "icon": "🚀",
    "color": "from-blue-500 to-purple-500",
    "order": 1
  }'
```

#### 3. Filtrer par statut
```bash
# Projets terminés
curl http://localhost:3001/api/projects?status=termine

# Projets en cours
curl http://localhost:3001/api/projects?status=en_cours

# Projets futurs
curl http://localhost:3001/api/projects?status=futur
```

#### 4. Modifier un projet
```bash
# Remplacer {ID} par l'ID du projet
curl -X PATCH http://localhost:3001/api/projects/{ID} \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Description mise à jour",
    "status": "en_cours"
  }'
```

#### 5. Supprimer un projet
```bash
curl -X DELETE http://localhost:3001/api/projects/{ID}
```

---

### Compétences

#### 1. Obtenir toutes les compétences
```bash
curl http://localhost:3001/api/skills
```

#### 2. Créer une compétence
```bash
curl -X POST http://localhost:3001/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TypeScript",
    "category": "Frontend",
    "level": "advanced",
    "percentage": 85,
    "description": "Langage typé basé sur JavaScript",
    "icon": "📘",
    "color": "blue",
    "order": 1,
    "isActive": true
  }'
```

#### 3. Filtrer par catégorie
```bash
# Frontend
curl http://localhost:3001/api/skills?category=Frontend

# Backend
curl http://localhost:3001/api/skills?category=Backend

# Management
curl http://localhost:3001/api/skills?category=Management
```

#### 4. Compétences groupées par catégorie
```bash
curl http://localhost:3001/api/skills/by-categories
```

#### 5. Modifier une compétence
```bash
curl -X PATCH http://localhost:3001/api/skills/{ID} \
  -H "Content-Type: application/json" \
  -d '{
    "percentage": 90,
    "level": "expert"
  }'
```

---

### Dashboard

#### 1. Statistiques générales
```bash
curl http://localhost:3001/api/dashboard/stats
```

Retourne :
- Nombre total de projets
- Projets par statut (terminé, en cours, futur)
- Nombre total de compétences
- Répartition par catégorie
- Pourcentage moyen de maîtrise

#### 2. Timeline
```bash
curl http://localhost:3001/api/dashboard/timeline
```

Liste chronologique de tous les projets.

#### 3. Activités récentes
```bash
curl http://localhost:3001/api/dashboard/recent-activity
```

Les 10 dernières modifications (projets et compétences).

---

## 🎯 Peupler avec des données de test

```bash
npm run seed
```

Cela va ajouter :
- 3 projets (TogoSchool, E-commerce, AutoWash)
- 16 compétences dans différentes catégories

---

## 🐛 Dépannage

### L'API ne répond pas
```bash
# Vérifier que le serveur est démarré
npm run start:dev

# Vérifier le port
curl http://localhost:3001/api/projects
```

### Erreur de connexion à la base de données
```bash
# Vérifier que PostgreSQL est démarré
# Windows: Services > PostgreSQL
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Vérifier le fichier .env
cat .env
```

### Erreur 404
- Vérifiez l'URL : tous les endpoints commencent par `/api/`
- Exemple correct : `http://localhost:3001/api/projects`

---

## 📊 Valeurs possibles

### Statuts de projet
- `en_cours` - En cours
- `termine` - Terminé
- `futur` - Futur

### Rôles de projet
- `developer` - Développeur
- `manager` - Manager
- `both` - Les deux

### Catégories de compétences
- `Frontend`
- `Backend`
- `Database & Other`
- `Management`
- `Cybersécurité`
- `Design`

### Niveaux de compétence
- `beginner` - Débutant
- `intermediate` - Intermédiaire
- `advanced` - Avancé
- `expert` - Expert

---

## ✅ Checklist de test

- [ ] Le serveur démarre sans erreur
- [ ] La documentation Swagger s'affiche
- [ ] GET /api/projects retourne une liste
- [ ] POST /api/projects crée un projet
- [ ] PATCH /api/projects/:id modifie un projet
- [ ] DELETE /api/projects/:id supprime un projet
- [ ] GET /api/skills retourne une liste
- [ ] POST /api/skills crée une compétence
- [ ] GET /api/skills/by-categories groupe par catégorie
- [ ] GET /api/dashboard/stats retourne des statistiques
- [ ] GET /api/dashboard/timeline retourne la timeline
- [ ] Le seeding fonctionne (npm run seed)

---

## 🎉 Prochaine étape

Une fois que tous les tests passent, vous êtes prêt pour :
- **Option 2** : Créer le dashboard React d'administration
- **Option 3** : Connecter le portfolio au backend

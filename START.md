# 🚀 Démarrage Rapide - Système Portfolio Complet

## ⚡ Première Installation (Une seule fois)

### 1. Backend API
```bash
cd Portfolio-Backend
npm install
cp .env.example .env
```

**Éditer `.env` avec vos paramètres PostgreSQL :**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=VOTRE_MOT_DE_PASSE
DB_DATABASE=portfolio_db
```

**Créer la base de données :**
```bash
createdb portfolio_db
```

### 2. Dashboard Admin
```bash
cd Portfolio-Dashboard
npm install
```

### 3. Portfolio Frontend
```bash
cd Portfolio
npm install
cp .env.example .env
```

---

## 🎬 Démarrage quotidien

### Option A : Démarrage manuel (3 terminaux)

**Terminal 1 - Backend :**
```bash
cd Portfolio-Backend
npm run start:dev
```
✅ API : http://localhost:3001
📚 Docs : http://localhost:3001/api/docs

**Terminal 2 - Dashboard :**
```bash
cd Portfolio-Dashboard
npm run dev
```
✅ Dashboard : http://localhost:5174

**Terminal 3 - Portfolio :**
```bash
cd Portfolio
npm run dev
```
✅ Portfolio : http://localhost:5173

### Option B : Script PowerShell (Windows)

Créez `start-all.ps1` :
```powershell
# Démarrer Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Portfolio-Backend; npm run start:dev"

# Attendre 5 secondes
Start-Sleep -Seconds 5

# Démarrer Dashboard
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Portfolio-Dashboard; npm run dev"

# Démarrer Portfolio
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Portfolio; npm run dev"

Write-Host "✅ Tous les services sont en cours de démarrage !" -ForegroundColor Green
Write-Host "📚 API Docs: http://localhost:3001/api/docs" -ForegroundColor Cyan
Write-Host "💼 Dashboard: http://localhost:5174" -ForegroundColor Yellow
Write-Host "🎨 Portfolio: http://localhost:5173" -ForegroundColor Magenta
```

**Exécuter :**
```bash
./start-all.ps1
```

---

## 🧪 Peupler avec des données de test

```bash
cd Portfolio-Backend
npm run seed
```

Cela ajoute :
- 3 projets (TogoSchool, E-commerce, AutoWash)
- 16 compétences dans différentes catégories

---

## 🔍 Vérifier que tout fonctionne

### 1. Backend ✅
```bash
curl http://localhost:3001/api/projects
```
Devrait retourner une liste de projets JSON

### 2. Dashboard ✅
- Ouvrir : http://localhost:5174
- Vous devriez voir le dashboard avec statistiques

### 3. Portfolio ✅
- Ouvrir : http://localhost:5173
- Les projets et compétences doivent s'afficher

---

## 📋 Checklist de démarrage

- [ ] PostgreSQL est démarré
- [ ] Base de données `portfolio_db` créée
- [ ] Fichiers `.env` configurés dans Backend et Portfolio
- [ ] Dépendances installées (`npm install` dans chaque dossier)
- [ ] Backend démarre sans erreur (port 3001)
- [ ] Dashboard démarre sans erreur (port 5174)
- [ ] Portfolio démarre sans erreur (port 5173)
- [ ] Données de test ajoutées (`npm run seed`)

---

## 🎯 Workflow de travail

1. **Démarrer** tout le système (3 terminaux ou script)
2. **Gérer** le contenu via le Dashboard (http://localhost:5174)
3. **Visualiser** les changements sur le Portfolio (http://localhost:5173)
4. **Tester** l'API via Swagger (http://localhost:3001/api/docs)

---

## 🛑 Arrêter les services

Dans chaque terminal, appuyer sur `Ctrl + C`

Ou fermer les fenêtres PowerShell

---

## 🔧 En cas de problème

### Backend ne démarre pas
```bash
# Vérifier PostgreSQL
# Windows : Ouvrir Services > PostgreSQL
# Vérifier qu'il est "En cours d'exécution"

# Tester la connexion
psql -U postgres -d portfolio_db
```

### Port déjà utilisé
```bash
# Trouver et tuer le processus
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Erreur "Cannot find module"
```bash
# Dans chaque dossier
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Liens utiles

| Service | URL | Description |
|---------|-----|-------------|
| Backend API | http://localhost:3001 | API REST |
| Swagger Docs | http://localhost:3001/api/docs | Documentation interactive |
| Dashboard Admin | http://localhost:5174 | Interface de gestion |
| Portfolio Site | http://localhost:5173 | Site public |

---

## 💡 Conseils pro

1. **Toujours démarrer le backend en premier** - Les autres en dépendent
2. **Utiliser le seeding** pour tester rapidement
3. **Consulter Swagger** pour comprendre l'API
4. **Regarder les logs** en cas d'erreur
5. **Tester avec curl** ou Postman pour déboguer

---

## 🎉 Prêt à travailler !

Votre système de portfolio professionnel est maintenant opérationnel.

**Amusez-vous à créer du contenu ! 🚀**

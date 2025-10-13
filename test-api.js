/**
 * Script de test automatique de l'API Portfolio Backend
 * Usage: node test-api.js
 */

const http = require('http');

const BASE_URL = 'localhost';
const PORT = 3001;
const API_BASE = '/api';

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      port: PORT,
      path: API_BASE + path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : null;
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testEndpoint(name, method, path, expectedStatus, data = null) {
  try {
    const result = await makeRequest(method, path, data);
    if (result.status === expectedStatus) {
      log('green', `✅ ${name} - OK (${result.status})`);
      return { success: true, data: result.data };
    } else {
      log('red', `❌ ${name} - FAILED (Expected ${expectedStatus}, got ${result.status})`);
      return { success: false, data: result.data };
    }
  } catch (error) {
    log('red', `❌ ${name} - ERROR: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('cyan', '\n🧪 Démarrage des tests de l\'API Portfolio Backend\n');
  log('cyan', '='.repeat(60));

  let projectId = null;
  let skillId = null;
  const results = { passed: 0, failed: 0 };

  // Test 1: Connexion à l'API
  log('blue', '\n📡 Test de connexion...');
  const healthCheck = await testEndpoint(
    'Connexion API',
    'GET',
    '/projects',
    200
  );
  if (healthCheck.success) {
    results.passed++;
  } else {
    results.failed++;
    log('red', '\n❌ L\'API ne répond pas. Assurez-vous que le serveur est démarré.');
    log('yellow', 'Commande: npm run start:dev');
    return;
  }

  // Test 2: Créer un projet
  log('blue', '\n📁 Test de création de projet...');
  const newProject = {
    title: 'Test Project',
    category: 'Test Category',
    description: 'Ceci est un projet de test',
    technologies: ['React', 'Node.js'],
    role: 'developer',
    roleDescription: 'Développeur Full-Stack',
    team: 'Solo',
    duration: '1 semaine',
    status: 'termine',
    icon: '🧪',
    color: 'from-blue-500 to-purple-500',
    order: 999,
  };

  const createProject = await testEndpoint(
    'Créer un projet',
    'POST',
    '/projects',
    201,
    newProject
  );
  if (createProject.success) {
    results.passed++;
    projectId = createProject.data.id;
    log('yellow', `   📝 ID du projet créé: ${projectId}`);
  } else {
    results.failed++;
  }

  // Test 3: Récupérer tous les projets
  log('blue', '\n📋 Test de récupération des projets...');
  const getProjects = await testEndpoint(
    'Récupérer tous les projets',
    'GET',
    '/projects',
    200
  );
  if (getProjects.success) {
    results.passed++;
    log('yellow', `   📊 Nombre de projets: ${getProjects.data.length}`);
  } else {
    results.failed++;
  }

  // Test 4: Récupérer un projet par ID
  if (projectId) {
    log('blue', '\n🔍 Test de récupération d\'un projet par ID...');
    const getProject = await testEndpoint(
      'Récupérer un projet',
      'GET',
      `/projects/${projectId}`,
      200
    );
    if (getProject.success) {
      results.passed++;
    } else {
      results.failed++;
    }
  }

  // Test 5: Modifier un projet
  if (projectId) {
    log('blue', '\n✏️ Test de modification de projet...');
    const updateProject = await testEndpoint(
      'Modifier un projet',
      'PATCH',
      `/projects/${projectId}`,
      200,
      { description: 'Description mise à jour', status: 'en_cours' }
    );
    if (updateProject.success) {
      results.passed++;
    } else {
      results.failed++;
    }
  }

  // Test 6: Créer une compétence
  log('blue', '\n🎯 Test de création de compétence...');
  const newSkill = {
    name: 'Test Skill',
    category: 'Frontend',
    level: 'intermediate',
    percentage: 75,
    description: 'Compétence de test',
    order: 999,
    isActive: true,
  };

  const createSkill = await testEndpoint(
    'Créer une compétence',
    'POST',
    '/skills',
    201,
    newSkill
  );
  if (createSkill.success) {
    results.passed++;
    skillId = createSkill.data.id;
    log('yellow', `   📝 ID de la compétence créée: ${skillId}`);
  } else {
    results.failed++;
  }

  // Test 7: Récupérer toutes les compétences
  log('blue', '\n📚 Test de récupération des compétences...');
  const getSkills = await testEndpoint(
    'Récupérer toutes les compétences',
    'GET',
    '/skills',
    200
  );
  if (getSkills.success) {
    results.passed++;
    log('yellow', `   📊 Nombre de compétences: ${getSkills.data.length}`);
  } else {
    results.failed++;
  }

  // Test 8: Compétences par catégorie
  log('blue', '\n🗂️ Test de groupement par catégorie...');
  const getByCategories = await testEndpoint(
    'Compétences par catégorie',
    'GET',
    '/skills/by-categories',
    200
  );
  if (getByCategories.success) {
    results.passed++;
    const categories = Object.keys(getByCategories.data);
    log('yellow', `   📂 Catégories: ${categories.join(', ')}`);
  } else {
    results.failed++;
  }

  // Test 9: Statistiques du dashboard
  log('blue', '\n📊 Test des statistiques...');
  const getStats = await testEndpoint(
    'Statistiques dashboard',
    'GET',
    '/dashboard/stats',
    200
  );
  if (getStats.success) {
    results.passed++;
    const stats = getStats.data.overview;
    log('yellow', `   📈 Projets totaux: ${stats.totalProjects}`);
    log('yellow', `   🎯 Compétences totales: ${stats.totalSkills}`);
    log('yellow', `   ✅ Projets terminés: ${stats.completedProjects}`);
  } else {
    results.failed++;
  }

  // Test 10: Timeline
  log('blue', '\n⏰ Test de la timeline...');
  const getTimeline = await testEndpoint(
    'Timeline',
    'GET',
    '/dashboard/timeline',
    200
  );
  if (getTimeline.success) {
    results.passed++;
    log('yellow', `   📅 Événements dans la timeline: ${getTimeline.data.length}`);
  } else {
    results.failed++;
  }

  // Test 11: Activités récentes
  log('blue', '\n🔔 Test des activités récentes...');
  const getActivity = await testEndpoint(
    'Activités récentes',
    'GET',
    '/dashboard/recent-activity',
    200
  );
  if (getActivity.success) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Test 12: Supprimer la compétence de test
  if (skillId) {
    log('blue', '\n🗑️ Test de suppression de compétence...');
    const deleteSkill = await testEndpoint(
      'Supprimer une compétence',
      'DELETE',
      `/skills/${skillId}`,
      204
    );
    if (deleteSkill.success) {
      results.passed++;
    } else {
      results.failed++;
    }
  }

  // Test 13: Supprimer le projet de test
  if (projectId) {
    log('blue', '\n🗑️ Test de suppression de projet...');
    const deleteProject = await testEndpoint(
      'Supprimer un projet',
      'DELETE',
      `/projects/${projectId}`,
      204
    );
    if (deleteProject.success) {
      results.passed++;
    } else {
      results.failed++;
    }
  }

  // Résumé
  log('cyan', '\n' + '='.repeat(60));
  log('cyan', '\n📊 RÉSUMÉ DES TESTS\n');
  log('green', `✅ Tests réussis: ${results.passed}`);
  if (results.failed > 0) {
    log('red', `❌ Tests échoués: ${results.failed}`);
  }
  log('cyan', `\n📈 Taux de réussite: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`);
  log('cyan', '\n' + '='.repeat(60) + '\n');

  if (results.failed === 0) {
    log('green', '🎉 Tous les tests sont passés avec succès !');
    log('yellow', '\n📚 Documentation Swagger: http://localhost:3001/api/docs');
  } else {
    log('yellow', '\n⚠️ Certains tests ont échoué. Vérifiez les logs ci-dessus.');
  }
}

// Lancer les tests
runTests().catch((error) => {
  log('red', `\n❌ Erreur fatale: ${error.message}`);
  process.exit(1);
});

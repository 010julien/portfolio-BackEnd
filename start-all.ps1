# Script PowerShell pour démarrer tous les services du portfolio
# Usage: ./start-all.ps1

Write-Host "🚀 Démarrage du système Portfolio Complet..." -ForegroundColor Cyan
Write-Host ""

# Vérifier que les dossiers existent
$folders = @("Portfolio-Backend", "Portfolio-Dashboard", "Portfolio")
foreach ($folder in $folders) {
    if (-Not (Test-Path $folder)) {
        Write-Host "❌ Erreur: Le dossier $folder n'existe pas" -ForegroundColor Red
        exit 1
    }
}

# Démarrer Backend API
Write-Host "1️⃣ Démarrage du Backend API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\Portfolio-Backend'; npm run start:dev"

# Attendre que le backend démarre
Write-Host "⏳ Attente du démarrage du backend (10 secondes)..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# Démarrer Dashboard Admin
Write-Host "2️⃣ Démarrage du Dashboard Admin..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\Portfolio-Dashboard'; npm run dev"

# Attendre 3 secondes
Start-Sleep -Seconds 3

# Démarrer Portfolio Frontend
Write-Host "3️⃣ Démarrage du Portfolio Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\Portfolio'; npm run dev"

# Message de succès
Write-Host ""
Write-Host "✅ Tous les services sont en cours de démarrage !" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Services disponibles:" -ForegroundColor Cyan
Write-Host "   Backend API:    http://localhost:3001" -ForegroundColor White
Write-Host "   Swagger Docs:   http://localhost:3001/api/docs" -ForegroundColor White
Write-Host "   Dashboard:      http://localhost:5174" -ForegroundColor White
Write-Host "   Portfolio:      http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "💡 Conseil: Attendez 30 secondes que tous les services démarrent complètement" -ForegroundColor Yellow
Write-Host ""
Write-Host "🛑 Pour arrêter: Fermez les fenêtres PowerShell ou appuyez sur Ctrl+C" -ForegroundColor Gray

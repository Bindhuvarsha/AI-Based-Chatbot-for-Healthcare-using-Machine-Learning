@echo off
echo ===================================================
echo Starting Jeeva Raksha Healthcare Assistant (Python Stack)...
echo ===================================================

echo [1/2] Starting Python FastAPI Backend Server on port 3001...
start "Jeeva Raksha Python Backend" cmd /k "cd /d "%~dp0backend" && python server.py --port 3001"

echo [2/2] Starting Frontend Server on port 5173...
start "Jeeva Raksha Frontend" cmd /k "cd /d "%~dp0" && npm run dev"

echo.
echo ===================================================
echo Application is starting!
echo Frontend (Vite):         http://localhost:5173
echo Backend (Python FastAPI): http://localhost:3001
echo API Docs (Swagger):      http://localhost:3001/docs
echo ===================================================

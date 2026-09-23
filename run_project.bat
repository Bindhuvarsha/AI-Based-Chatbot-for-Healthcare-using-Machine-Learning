@echo off
echo ===================================================
echo Starting Jeeva Raksha Healthcare Assistant...
echo ===================================================

echo Starting Backend Server on port 3001...
start "Jeeva Raksha Backend" cmd /k "cd /d "%~dp0backend" && node server.js"

echo Starting Frontend Server on port 5173...
start "Jeeva Raksha Frontend" cmd /k "cd /d "%~dp0" && npm run dev"

echo.
echo Application is starting!
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3001
echo ===================================================

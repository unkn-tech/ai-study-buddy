@echo off
echo Starting AI Study Buddy Application...

:: Change to the project directory
cd /d "%~dp0"

:: Install Frontend Dependencies
echo Installing Frontend Dependencies...
cd frontend
call npm install @mui/x-date-pickers date-fns --legacy-peer-deps

:: Start Frontend Server on port 3002
echo Starting Frontend Server...
start cmd /k "npm run dev -- --port 3002"

:: Start Backend Server
echo Starting Backend Server...
cd ../backend
start cmd /k "mvnw spring-boot:run"

echo Application is starting...
echo Backend will be available at http://localhost:8080
echo Frontend will be available at http://localhost:3002
echo Press any key to close this window...
pause > nul 
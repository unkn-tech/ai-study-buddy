# AI Study Buddy Setup Log

## Setup Process

### Frontend Setup
1. Frontend is running on port 3002 (or next available port if 3002 is in use)
2. Required dependencies:
   - @mui/x-date-pickers
   - date-fns
3. Installation command:
   ```
   npm install @mui/x-date-pickers date-fns --legacy-peer-deps
   ```

### Backend Setup
1. Backend is using Java Spring Boot
2. Start command:
   ```
   cd backend
   mvn spring-boot:run
   ```

### Batch File Setup
Created `start_study_buddy.bat` with the following content:
```batch
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
```

## Common Issues and Solutions

1. Port Issues:
   - If port 3002 is in use, the frontend will automatically use the next available port
   - Check the terminal output for the actual port number

2. Dependency Issues:
   - Frontend: Make sure to install @mui/x-date-pickers and date-fns
   - Backend: Ensure Java and Maven are installed

3. Starting the Application:
   - Double-click `start_study_buddy.bat`
   - Wait for both servers to start
   - Check the terminal output for URLs

## URLs
- Frontend: http://localhost:3002 (or next available port)
- Backend: http://localhost:8080

## Notes
- The application is saved in: C:\Users\DELL\Downloads\Ai-Powered-Study-Buddy-main
- All changes are committed to GitHub repository: https://github.com/unkn-tech/ai-study-buddy
- To stop the application, close both command windows or press Ctrl+C in each window

## Next Steps
1. Double-click `start_study_buddy.bat` to start the application
2. Check the terminal output for the actual frontend URL
3. Access the application in your web browser 
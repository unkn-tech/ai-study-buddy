# AI Study Buddy Setup Guide

## Project Overview
This is an AI-powered study assistant application with features including:
- Study sessions with timer
- Notes management
- Todo list
- Session statistics
- Motivational quotes

## Setup Instructions

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install @mui/x-date-pickers date-fns --legacy-peer-deps
   ```

3. Start the frontend server:
   ```
   npm run dev -- --port 3002
   ```
   Note: If port 3002 is in use, the server will automatically use the next available port.

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install Python dependencies:
   ```
   pip install python-dotenv
   ```

3. Start the backend server:
   ```
   mvnw spring-boot:run
   ```

### Quick Start
To start both servers with one click:
1. Double-click `start_study_buddy.bat`
2. Wait for both servers to start
3. Access the application at:
   - Frontend: http://localhost:3002 (or the port shown in the terminal)
   - Backend: http://localhost:8080

## Troubleshooting
- If ports are in use, the frontend will automatically use the next available port
- Make sure all dependencies are installed before starting the servers
- Check the terminal output for any error messages

## Features
- Study session tracking
- Timer functionality
- Notes management
- Todo list
- Session statistics
- Motivational quotes
- Modern UI with dark theme

## For Contributors 👩‍💻👨‍💻

Want to help make StudyBuddy even better? Here's how you can contribute:

1. **Fork the Repository**
   - Click the "Fork" button at the top right of this page
   - This creates your own copy of the project

2. **Create a New Branch**
   ```bash
   git checkout -b feature/your-awesome-feature
   ```

3. **Make Your Changes**
   - Write your code
   - Test it thoroughly
   - Make sure it works!

4. **Share Your Work**
   ```bash
   git add .
   git commit -m "Add your awesome feature"
   git push origin feature/your-awesome-feature
   ```

5. **Create a Pull Request**
   - Go to your forked repository
   - Click "New Pull Request"
   - Describe your changes
   - Submit and wait for review!

## Need Help? 🤝

- Found a bug? Create an issue!
- Have a question? Ask in the discussions!
- Want to chat? Join our community!

## Meet the Team 👋

- Bhanu Reddy Mallavarapu (Project Lead)
- BhavKirat Kaur (Contributor)

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by students, for students. Happy studying! 📚✨ 
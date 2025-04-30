# Welcome to StudyBuddy! 👋

Hey there! We're excited to have you join our project. This guide will help you get started with contributing to StudyBuddy.

## Getting Started 🚀

### 1. Fork the Repository
- Go to https://github.com/BHANU063/Ai-Powered-Study-Buddy
- Click the "Fork" button in the top-right corner
- This creates your own copy of the project

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/Ai-Powered-Study-Buddy.git
cd Ai-Powered-Study-Buddy
```

### 3. Set Up Development Environment
1. **Backend Setup**:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

### 4. Make Your First Contribution
1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Test your changes:
   - Backend: `python main.py`
   - Frontend: `npm run dev`

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request:
   - Go to your forked repository
   - Click "Pull requests" → "New pull request"
   - Select your branch
   - Add a description of your changes
   - Submit!

## Keeping Your Fork Updated 🔄
To get the latest changes from the main project:
```bash
git remote add upstream https://github.com/BHANU063/Ai-Powered-Study-Buddy.git
git fetch upstream
git merge upstream/main
```

## Best Practices 📝
- Write clear commit messages
- Test your changes before submitting
- Keep your pull requests focused on one feature/fix
- Ask for help if you need it!

## Need Help? 🤝
- Create an issue if you find a bug
- Ask questions in the discussions
- Contact the team members:
  - Bhanu Reddy Mallavarapu (Project Lead)
  - BhavKirat Kaur (Contributor)

Happy coding! 🎉 
# 📚 Study Buddy — AI-Powered Personalized Learning Assistant

Study Buddy is an AI-powered academic assistance platform designed to help students organize their learning, understand academic concepts, and track their study progress in one place.

The project aims to make studying more interactive and personalized through AI-assisted question answering, quiz generation, flashcards, study notes, and productivity tools.

## ✨ Features

* **AI Academic Assistant:** Get assistance with academic questions and concepts.
* **PDF-Based Learning:** Use uploaded study materials to support contextual question answering.
* **Quiz Generation:** Generate quizzes to practice and evaluate understanding.
* **Flashcards:** Create flashcards for revision and memorization.
* **Study Notes:** Organize important academic information.
* **Pomodoro Timer:** Manage study sessions and breaks.
* **Motivational Quotes:** Stay encouraged during study sessions.
* **Progress Tracking:** Monitor learning activities and academic progress.
* **Interactive Dashboard:** Access learning tools through a centralized interface.

*Feature availability depends on the current implementation of the project.*

## 🛠️ Technologies Used

| Component                      | Technologies                      |
| ------------------------------ | --------------------------------- |
| Frontend                       | React.js, JavaScript, HTML5, CSS3 |
| Frontend Build Tool            | Vite                              |
| Backend                        | Python, Flask                     |
| Database                       | MySQL                             |
| API Communication              | REST APIs                         |
| AI Integration                 | Large Language Models (LLMs)      |
| Retrieval-Augmented Generation | RAG, embeddings, LangChain        |
| PDF Processing                 | PyPDF                             |
| Version Control                | Git and GitHub                    |
| API Testing                    | Postman                           |

## 🏗️ Project Architecture

Study Buddy follows a frontend-backend architecture.

1. **Frontend:** Provides the user interface for interacting with learning tools.
2. **Backend:** Uses Flask to handle application logic and REST API requests.
3. **Database:** MySQL stores supported application data, such as user information and learning activities.
4. **AI Layer:** LLMs and RAG can be used to generate contextual responses from relevant academic materials.
5. **PDF Processing:** Extracts text from uploaded PDF notes for academic assistance.

## 📁 Project Structure

The frontend currently uses React and Vite. The repository structure may evolve as the backend and AI services are integrated.

```text
study-buddy/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

The backend can be organized separately as development progresses:

```text
backend/
├── app.py
├── requirements.txt
├── routes/
├── services/
└── database/
```

## 🚀 Getting Started

### Prerequisites

Install the following tools before running the application:

* Node.js and npm
* Python 3
* MySQL, if using the database-backed features

### 1. Clone the Repository

```bash
git clone https://github.com/unkn-tech/study-buddy.git
```

Navigate into the project directory:

```bash
cd study-buddy
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Run the Frontend

```bash
npm run dev
```

Open the local address displayed in your terminal, usually:

```text
http://localhost:5173
```

### 4. Backend Setup

Once the Flask backend is available, create and activate a Python virtual environment.

On Windows:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

Install the backend dependencies listed in `requirements.txt`:

```bash
pip install -r requirements.txt
```

Configure the required database settings and environment variables before starting the Flask application.

*The backend setup instructions will need to be adjusted to match the actual backend files and configuration.*

## 🔐 Security Considerations

* Store API keys and database credentials in environment variables.
* Never commit `.env` files containing secrets.
* Use appropriate password hashing for user authentication.
* Validate user input and uploaded files.
* Apply suitable access controls to protected API endpoints.
* Handle uploaded academic documents securely.

## 🎯 Project Objectives

* Make academic assistance more accessible and interactive.
* Support personalized learning through AI-assisted tools.
* Simplify revision using quizzes and flashcards.
* Help students organize study sessions and learning activities.
* Explore the application of LLMs and RAG in educational technology.

## 🔮 Future Enhancements

* Improved personalization based on learning history.
* More advanced academic document retrieval.
* Additional learning analytics and visualizations.
* Improved authentication and user-specific dashboards.
* Deployment of the application for wider access.

## 👩‍💻 Author

**Bhavkirat Kaur Khurana**

* GitHub: [unkn-tech](https://github.com/unkn-tech)

## 📌 Project Status

Study Buddy is under development. Features, integrations, and architecture may change as implementation progresses.

## 📄 License

A license has not yet been specified for this project.

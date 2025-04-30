# StudyBuddy Backend

This is the backend server for the StudyBuddy application, which provides AI-powered study assistance.

## Setup

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Set up the environment variables:
   
   **Option 1: Use the setup script (recommended)**
   ```
   python setup_env.py
   ```
   This will guide you through the process of creating a `.env` file with your configuration.

   **Option 2: Manual setup**
   Create a `.env` file in the backend directory with the following content:
   ```
   # OpenAI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # Server Configuration
   PORT=8000
   HOST=0.0.0.0

   # Environment
   ENVIRONMENT=development

   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:3000

   # Logging
   LOG_LEVEL=info
   ```

   Replace `your_openai_api_key_here` with your actual OpenAI API key.

3. Run the server:
   ```
   python main.py
   ```

## API Endpoints

- `POST /api/chat`: Chat with the AI assistant
- `POST /api/generate-practice`: Generate practice questions
- `GET /api/health`: Check the health of the server

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: The port to run the server on (default: 8000)
- `HOST`: The host to run the server on (default: 0.0.0.0)
- `ENVIRONMENT`: The environment (development, production)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS
- `LOG_LEVEL`: The log level (debug, info, warning, error) 
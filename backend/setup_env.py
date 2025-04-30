#!/usr/bin/env python3
"""
Script to help set up the .env file for the StudyBuddy backend.
"""

import os
import sys
from pathlib import Path

def create_env_file():
    """Create a .env file with user input."""
    env_path = Path(__file__).parent / '.env'
    
    # Check if .env file already exists
    if env_path.exists():
        print(f"Warning: {env_path} already exists.")
        overwrite = input("Do you want to overwrite it? (y/n): ").lower()
        if overwrite != 'y':
            print("Aborting.")
            return
    
    # Get OpenAI API key
    openai_api_key = input("Enter your OpenAI API key: ")
    if not openai_api_key:
        print("Warning: No OpenAI API key provided. The application will not work without it.")
    
    # Get server configuration
    port = input("Enter the port to run the server on (default: 8000): ") or "8000"
    host = input("Enter the host to run the server on (default: 0.0.0.0): ") or "0.0.0.0"
    environment = input("Enter the environment (development, production) (default: development): ") or "development"
    
    # Get CORS configuration
    allowed_origins = input("Enter allowed origins for CORS (comma-separated, default: http://localhost:3000): ") or "http://localhost:3000"
    
    # Get logging configuration
    log_level = input("Enter the log level (debug, info, warning, error) (default: info): ") or "info"
    
    # Create .env file
    with open(env_path, 'w') as f:
        f.write(f"""# OpenAI API Configuration
OPENAI_API_KEY={openai_api_key}

# Server Configuration
PORT={port}
HOST={host}

# Environment
ENVIRONMENT={environment}

# CORS Configuration
ALLOWED_ORIGINS={allowed_origins}

# Logging
LOG_LEVEL={log_level}
""")
    
    print(f"Created {env_path} successfully.")

if __name__ == "__main__":
    try:
        create_env_file()
    except KeyboardInterrupt:
        print("\nAborted by user.")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1) 
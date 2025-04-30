import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

try:
    # Test API call
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Hello! This is a test message."}],
        temperature=0.7,
        max_tokens=50
    )
    print("API test successful!")
    print("Response:", response.choices[0].message.content)
except Exception as e:
    print("API test failed!")
    print("Error:", str(e))
    # Print masked API key for debugging
    api_key = os.getenv("OPENAI_API_KEY", "")
    if api_key:
        print("API key starts with:", api_key[:8] + "*" * (len(api_key) - 12) + api_key[-4:]) 
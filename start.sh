#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd backend
python main.py &
BACKEND_PID=$!

# Start the frontend server
echo "Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
function cleanup {
  echo "Stopping servers..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Register the cleanup function to be called on script termination
trap cleanup SIGINT SIGTERM

# Keep the script running
echo "Servers are running. Press Ctrl+C to stop."
wait 
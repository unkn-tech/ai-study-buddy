import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import StudySession from './components/StudySession';
import Flashcards from './components/Flashcards';
import Notes from './components/Notes';
import Timer from './components/Timer';
import History from './components/History';
import Chatbot from './components/Chatbot';
import FloatingChatbot from './components/FloatingChatbot';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import { theme } from './theme';

function App() {
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('userName') || '';
  });

  // Show onboarding if userName is not set
  if (!userName) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Onboarding onComplete={(name) => {
          setUserName(name);
          localStorage.setItem('userName', name);
        }} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard userName={userName} />} />
            <Route path="/study" element={<StudySession />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/history" element={<History />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <FloatingChatbot />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

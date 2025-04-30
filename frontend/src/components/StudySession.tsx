import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Checkbox,
  Divider,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import TodoList from './TodoList';

interface StudySession {
  id: string;
  subject: string;
  duration: number; // in minutes
  notes: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'paused';
  date: string;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  sessionId: string;
}

interface SessionStats {
  totalSessions: number;
  totalTime: number;
  completedSessions: number;
  averageDuration: number;
}

const motivationalQuotes = [
  "The expert in anything was once a beginner.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The only way to do great work is to love what you do.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "You don't have to be great to start, but you have to start to be great.",
  "The secret of getting ahead is getting started.",
  "Believe you can and you're halfway there.",
];

const StudySession = () => {
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    const savedSessions = localStorage.getItem('studySessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [newSession, setNewSession] = useState({ subject: '', duration: 25, notes: '', date: format(new Date(), 'yyyy-MM-dd') });
  const [isAdding, setIsAdding] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studySessions', JSON.stringify(sessions));
  }, [sessions]);

  // Rotate motivational quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => {
        const currentIndex = motivationalQuotes.indexOf(prev);
        return motivationalQuotes[(currentIndex + 1) % motivationalQuotes.length];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Timer effect
  useEffect(() => {
    if (currentSession?.status === 'active' && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            handleCompleteSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(interval);
      return () => clearInterval(interval);
    }
  }, [currentSession?.status, remainingTime]);

  const calculateStats = (): SessionStats => {
    const completedSessions = sessions.filter(s => s.status === 'completed');
    const totalTime = completedSessions.reduce((acc, s) => acc + s.duration, 0);
    return {
      totalSessions: sessions.length,
      totalTime,
      completedSessions: completedSessions.length,
      averageDuration: completedSessions.length > 0 ? totalTime / completedSessions.length : 0,
    };
  };

  const handleStartSession = () => {
    if (newSession.subject.trim()) {
      const session: StudySession = {
        id: Date.now().toString(),
        subject: newSession.subject,
        duration: newSession.duration,
        notes: newSession.notes,
        startTime: new Date().toISOString(),
        endTime: '',
        status: 'active',
        date: newSession.date,
      };
      setCurrentSession(session);
      setRemainingTime(newSession.duration * 60);
      setSessions([session, ...sessions]);
      setNewSession({ subject: '', duration: 25, notes: '', date: format(new Date(), 'yyyy-MM-dd') });
      setIsAdding(false);
    }
  };

  const handlePauseSession = () => {
    if (currentSession) {
      setCurrentSession({ ...currentSession, status: 'paused' });
      if (timer) clearInterval(timer);
      setTimer(null);
    }
  };

  const handleResumeSession = () => {
    if (currentSession) {
      setCurrentSession({ ...currentSession, status: 'active' });
    }
  };

  const handleCompleteSession = () => {
    if (currentSession) {
      const completedSession: StudySession = {
        ...currentSession,
        status: 'completed' as const,
        endTime: new Date().toISOString(),
      };

      // Save to localStorage
      const savedSessions: StudySession[] = JSON.parse(localStorage.getItem('studySessions') || '[]');
      localStorage.setItem('studySessions', JSON.stringify([...savedSessions, completedSession]));

      setSessions((prevSessions: StudySession[]) => [...prevSessions, completedSession]);
      setCurrentSession(null);
      setTimer(null);
    }
  };

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const stats = calculateStats();
  const progress = currentSession ? 
    ((currentSession.duration * 60 - remainingTime) / (currentSession.duration * 60)) * 100 : 0;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Left Column - Current Session */}
        <Grid item xs={12} md={8}>
          <Card
            component={motion.div}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            sx={{
              mb: 3,
              background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                {currentSession ? currentSession.subject : 'No Active Session'}
              </Typography>
              
              {currentSession ? (
                <>
                  <Typography variant="h2" sx={{ color: 'white', textAlign: 'center', mb: 3 }}>
                    {formatTime(remainingTime)}
                </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      mb: 2,
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(45deg, #2E51ED, #7C3AED)',
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {currentSession.status === 'active' ? (
                      <IconButton
                        onClick={handlePauseSession}
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': { bgcolor: 'primary.dark' },
                        }}
                      >
                        <PauseIcon />
                      </IconButton>
                    ) : (
                    <IconButton
                        onClick={handleResumeSession}
                      sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': { bgcolor: 'primary.dark' },
                      }}
                    >
                        <PlayIcon />
                    </IconButton>
                    )}
                    <IconButton
                      onClick={handleCompleteSession}
                      sx={{
                        bgcolor: 'error.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'error.dark' },
                      }}
                    >
                      <StopIcon />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <Button
                  onClick={() => setIsAdding(true)}
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    width: '100%',
                    py: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  Start New Session
                </Button>
              )}
              </Box>
          </Card>

          {/* Todo List */}
          {currentSession && <TodoList sessionId={currentSession.id} />}
        </Grid>

        {/* Right Column - Stats and Calendar */}
        <Grid item xs={12} md={4}>
          {/* Motivational Quote */}
          <Card sx={{ mb: 3, background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Daily Motivation
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
              >
                "{currentQuote}"
              </Typography>
            </Box>
          </Card>

          {/* Session Stats */}
          <Card sx={{ mb: 3, background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Study Statistics
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Total Sessions
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'white' }}>
                    {stats.totalSessions}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Total Study Time
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'white' }}>
                    {stats.totalTime} minutes
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Average Session Duration
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'white' }}>
                    {Math.round(stats.averageDuration)} minutes
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Session History */}
          <Card sx={{ background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Recent Sessions
              </Typography>
              <List>
                {sessions.slice(0, 5).map((session) => (
                  <ListItem
                    key={session.id}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.05)',
                      mb: 1,
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ color: 'white' }}>
                          {session.subject}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {formatDate(session.startTime)}
                        </Typography>
                      }
                    />
                    <Chip
                      label={session.status}
                      size="small"
                      sx={{
                        bgcolor: session.status === 'completed' ? 'success.main' : 
                                session.status === 'active' ? 'primary.main' : 'warning.main',
                        color: 'white',
                    }}
                  />
                  </ListItem>
                ))}
              </List>
              </Box>
          </Card>
        </Grid>
      </Grid>

      {/* New Session Dialog */}
      {isAdding && (
        <Card
          component={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            zIndex: 1000,
            background: 'linear-gradient(145deg, rgba(20,27,45,0.9), rgba(20,27,45,0.95))',
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Start New Session
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Subject"
                value={newSession.subject}
                onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Duration (minutes)"
                value={newSession.duration}
                onChange={(e) => setNewSession({ ...newSession, duration: Number(e.target.value) })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                }}
              />
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={newSession.date}
                onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                value={newSession.notes}
                onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  onClick={() => setIsAdding(false)}
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleStartSession}
                  variant="contained"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  Start Session
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default StudySession; 
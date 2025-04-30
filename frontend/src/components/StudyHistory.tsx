import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Paper,
  IconButton,
  Chip,
  LinearProgress,
  Tooltip,
  Button,
} from '@mui/material';
import {
  History as HistoryIcon,
  TrendingUp as TrendingIcon,
  Timer as TimerIcon,
  School as SchoolIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { format, differenceInMinutes, parseISO } from 'date-fns';

interface StudySession {
  id: number;
  subject: string;
  duration: number;
  notes: string;
  startTime: string;
  endTime: string;
  status: string;
}

const StudyHistory = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalTime: 0,
    averageDuration: 0,
    favoriteSubject: '',
  });

  // Load sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('studySessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Calculate statistics whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      const totalTime = sessions.reduce((acc, session) => acc + session.duration, 0);
      const averageDuration = totalTime / sessions.length;
      
      // Find favorite subject
      const subjectCounts = sessions.reduce((acc, session) => {
        acc[session.subject] = (acc[session.subject] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const favoriteSubject = Object.entries(subjectCounts)
        .sort(([, a], [, b]) => b - a)[0][0];

      setStats({
        totalSessions: sessions.length,
        totalTime,
        averageDuration,
        favoriteSubject,
      });
    }
  }, [sessions]);

  const handleDeleteSession = (id: number) => {
    const updatedSessions = sessions.filter(session => session.id !== id);
    setSessions(updatedSessions);
    localStorage.setItem('studySessions', JSON.stringify(updatedSessions));
  };

  const handleClearHistory = () => {
    setSessions([]);
    localStorage.removeItem('studySessions');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Statistics Section */}
        <Grid item xs={12}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              p: 3,
              background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                Study Statistics
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    background: 'rgba(255,255,255,0.05)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white' }}>
                    {stats.totalSessions}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Total Sessions
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    background: 'rgba(255,255,255,0.05)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white' }}>
                    {formatDuration(stats.totalTime)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Total Study Time
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    background: 'rgba(255,255,255,0.05)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white' }}>
                    {formatDuration(stats.averageDuration)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Average Duration
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    background: 'rgba(255,255,255,0.05)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white' }}>
                    {stats.favoriteSubject || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Favorite Subject
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Session History */}
        <Grid item xs={12}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              p: 3,
              background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Study History
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleClearHistory}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                Clear History
              </Button>
            </Box>
            <AnimatePresence>
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      mb: 2,
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SchoolIcon sx={{ color: 'primary.main', mr: 1 }} />
                        <Typography variant="h6" sx={{ color: 'white' }}>
                          {session.subject}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          icon={<TimerIcon />}
                          label={formatDuration(session.duration)}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.1)',
                            color: 'primary.main',
                          }}
                        />
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {format(parseISO(session.startTime), 'MMM d, yyyy h:mm a')}
                        </Typography>
                      </Box>
                      {session.notes && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255,255,255,0.7)',
                            mt: 1,
                            fontStyle: 'italic',
                          }}
                        >
                          {session.notes}
                        </Typography>
                      )}
                    </Box>
                    <Tooltip title="Delete session">
                      <IconButton
                        onClick={() => handleDeleteSession(session.id)}
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          '&:hover': { color: 'error.main' },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
            {sessions.length === 0 && (
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  textAlign: 'center',
                  py: 4,
                }}
              >
                No study sessions recorded yet
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudyHistory; 
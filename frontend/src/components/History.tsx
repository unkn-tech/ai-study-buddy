import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Timer as TimerIcon,
  Style as StyleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface StudySession {
  id: string;
  type: 'study' | 'flashcards' | 'quiz';
  subject: string;
  duration: number;
  date: string;
  progress: number;
}

const History = () => {
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: '1',
      type: 'study',
      subject: 'Mathematics',
      duration: 120,
      date: '2024-03-15',
      progress: 85,
    },
    {
      id: '2',
      type: 'flashcards',
      subject: 'Physics',
      duration: 45,
      date: '2024-03-14',
      progress: 70,
    },
    {
      id: '3',
      type: 'quiz',
      subject: 'Chemistry',
      duration: 30,
      date: '2024-03-13',
      progress: 90,
    },
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, sessionId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedSession(sessionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSession(null);
  };

  const handleDeleteSession = () => {
    if (selectedSession) {
      setSessions(sessions.filter(session => session.id !== selectedSession));
    }
    handleMenuClose();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study':
        return <SchoolIcon />;
      case 'flashcards':
        return <StyleIcon />;
      case 'quiz':
        return <TimerIcon />;
      default:
        return <SchoolIcon />;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Study History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your learning progress and achievements
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sessions.map((session) => (
          <Grid item xs={12} key={session.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          bgcolor: 'primary.dark',
                          color: 'primary.light',
                        }}
                      >
                        {getTypeIcon(session.type)}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {session.subject}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {session.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={formatDuration(session.duration)}
                        size="small"
                        sx={{
                          bgcolor: 'primary.dark',
                          color: 'primary.light',
                        }}
                      />
                      <IconButton onClick={(e) => handleMenuOpen(e, session.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {session.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={session.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'background.default',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: 'linear-gradient(90deg, #4361EE, #F72585)',
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteSession} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete Session
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default History; 
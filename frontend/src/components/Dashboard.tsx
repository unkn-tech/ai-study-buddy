import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  EmojiEvents as StreakIcon,
  Lightbulb as TipIcon,
  Psychology as MindsetIcon,
  Timer as TimerIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
  EmojiEvents,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const studyTips = [
  {
    id: 1,
    title: "Pomodoro Technique",
    description: "Study for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer break.",
    icon: <TimerIcon />,
  },
  {
    id: 2,
    title: "Active Recall",
    description: "Test yourself on the material instead of just re-reading it.",
    icon: <MindsetIcon />,
  },
  {
    id: 3,
    title: "Spaced Repetition",
    description: "Review material at increasing intervals to improve long-term retention.",
    icon: <CheckIcon />,
  },
  {
    id: 4,
    title: "Mind Mapping",
    description: "Create visual diagrams to organize and connect ideas.",
    icon: <MindsetIcon />,
  },
];

const motivationalMessages = [
  "Every minute you spend studying brings you closer to your goals.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The expert in anything was once a beginner.",
  "Your future is created by what you do today, not tomorrow.",
  "The only way to do great work is to love what you do.",
  "Don't watch the clock; do what it does. Keep going.",
  "The secret of getting ahead is getting started.",
  "Believe you can and you're halfway there.",
];

const studyChallenges = [
  "Complete 3 study sessions today",
  "Study for 2 hours without distractions",
  "Review yesterday's notes",
  "Create flashcards for a difficult topic",
  "Teach someone what you learned today",
];

const Dashboard = () => {
  const [currentStreak, setCurrentStreak] = useState(() => {
    const savedStreak = localStorage.getItem('studyStreak');
    return savedStreak ? parseInt(savedStreak) : 0;
  });
  const [currentMessage, setCurrentMessage] = useState(motivationalMessages[0]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
    const savedChallenges = localStorage.getItem('completedChallenges');
    return savedChallenges ? JSON.parse(savedChallenges) : [];
  });
  const [currentTip, setCurrentTip] = useState(0);

  // Save streak and challenges to localStorage
  useEffect(() => {
    localStorage.setItem('studyStreak', currentStreak.toString());
    localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
  }, [currentStreak, completedChallenges]);

  // Rotate motivational messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = motivationalMessages.indexOf(prev);
        return motivationalMessages[(currentIndex + 1) % motivationalMessages.length];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Rotate study tips
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % studyTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleCompleteChallenge = (challenge: string) => {
    if (!completedChallenges.includes(challenge)) {
      setCompletedChallenges([...completedChallenges, challenge]);
      setCurrentStreak(prev => prev + 1);
    }
  };

  const handleResetStreak = () => {
    setCurrentStreak(0);
    setCompletedChallenges([]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Streak Section */}
        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              p: 3,
              background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StreakIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                Study Streak
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <CircularProgress
                variant="determinate"
                value={Math.min((currentStreak / 7) * 100, 100)}
                size={120}
                thickness={4}
                sx={{
                  color: 'primary.main',
                  mb: 2,
                }}
              />
              <Typography variant="h2" sx={{ color: 'white' }}>
                {currentStreak} days
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Keep going! {7 - currentStreak} more days to reach your weekly goal
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={handleResetStreak}
              sx={{
                color: 'rgba(255,255,255,0.7)',
                borderColor: 'rgba(255,255,255,0.2)',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                },
              }}
            >
              Reset Streak
            </Button>
          </Card>
        </Grid>

        {/* Motivational Message */}
        <Grid item xs={12} md={8}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              p: 3,
              background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TipIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                Daily Motivation
              </Typography>
            </Box>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    mb: 3,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  "{currentMessage}"
                </Typography>
              </motion.div>
            </AnimatePresence>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                endIcon={<ArrowIcon />}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Start Studying
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Study Tips */}
        <Grid item xs={12} md={6}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              p: 3,
              background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TipIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                Study Tips
              </Typography>
            </Box>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ mb: 2, fontSize: '2.5rem' }}>{studyTips[currentTip].icon}</Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'white', 
                      mb: 1.5,
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                    }}
                  >
                    {studyTips[currentTip].title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      maxWidth: '80%',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    }}
                  >
                    {studyTips[currentTip].description}
                  </Typography>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Card>
        </Grid>

        {/* Daily Challenges */}
        <Grid item xs={12} md={6}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              p: 3,
              background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmojiEvents sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                Daily Challenges
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {studyChallenges.map((challenge) => (
                <Paper
                  key={challenge}
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  sx={{
                    p: 2,
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ color: 'white' }}>{challenge}</Typography>
                  <Chip
                    label="Today's Goal"
                    color="primary"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'primary.main',
                    }}
                  />
                </Paper>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
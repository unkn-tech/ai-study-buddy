import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { School as SchoolIcon, Timer as TimerIcon, FlashOn as FlashOnIcon, AutoStories as BookIcon } from '@mui/icons-material';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0F1F 0%, #1A2035 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        component={motion.div}
        animate={{
          background: [
            'radial-gradient(800px circle at 0% 0%, rgba(46,81,237,0.15), transparent 70%)',
            'radial-gradient(600px circle at 100% 0%, rgba(124,58,237,0.1), transparent 70%)',
            'radial-gradient(800px circle at 100% 100%, rgba(76,175,80,0.1), transparent 70%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Floating shapes */}
      <Box
        component={motion.div}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, rgba(46,81,237,0.1), rgba(124,58,237,0.1))',
          borderRadius: '24px',
          transform: 'rotate(-15deg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />

      <Box
        component={motion.div}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 0.5,
        }}
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(45deg, rgba(124,58,237,0.1), rgba(76,175,80,0.1))',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 8 }, position: 'relative' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ position: 'relative' }}>
                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    background: 'linear-gradient(45deg, #2E51ED, #7C3AED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '60px',
                      height: '4px',
                      background: 'linear-gradient(45deg, #2E51ED, #7C3AED)',
                      borderRadius: '2px',
                    },
                  }}
                >
                  StudyBuddy
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  Your AI-powered study companion for{' '}
                  <Box
                    component="span"
                    sx={{
                      color: '#4CAF50',
                      fontWeight: 600,
                    }}
                  >
                    smarter
                  </Box>{' '}
                  learning and{' '}
                  <Box
                    component="span"
                    sx={{
                      color: '#7C3AED',
                      fontWeight: 600,
                    }}
                  >
                    better
                  </Box>{' '}
                  retention
                </Typography>

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your name to get started"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      mb: 3,
                      maxWidth: 400,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        height: 56,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.08)',
                        },
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.1)',
                        },
                        '& input': {
                          color: 'white',
                          '&::placeholder': {
                            color: 'rgba(255,255,255,0.5)',
                            opacity: 1,
                          },
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!name.trim()}
                    sx={{
                      height: 56,
                      px: 6,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(45deg, #2E51ED, #7C3AED)',
                      boxShadow: '0 8px 32px rgba(46,81,237,0.25)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #2545D1, #6C2EDB)',
                        boxShadow: '0 8px 32px rgba(46,81,237,0.35)',
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </form>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: { xs: '400px', md: '500px' } }}>
              {/* Animated Feature Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {[
                  {
                    icon: <FlashOnIcon sx={{ fontSize: 32, color: '#2E51ED' }} />,
                    title: 'Smart Flashcards',
                    description: 'AI-powered spaced repetition for optimal learning',
                    offset: { top: '5%', left: '10%' },
                    delay: 0,
                  },
                  {
                    icon: <TimerIcon sx={{ fontSize: 32, color: '#7C3AED' }} />,
                    title: 'Focus Timer',
                    description: 'Stay productive with Pomodoro technique',
                    offset: { top: '35%', right: '5%' },
                    delay: 0.1,
                  },
                  {
                    icon: <SchoolIcon sx={{ fontSize: 32, color: '#4CAF50' }} />,
                    title: 'Study Analytics',
                    description: 'Track your progress and improve',
                    offset: { bottom: '10%', left: '15%' },
                    delay: 0.2,
                  },
                  {
                    icon: <BookIcon sx={{ fontSize: 32, color: '#FF5252' }} />,
                    title: 'Smart Notes',
                    description: 'Organize and review your study materials',
                    offset: { bottom: '30%', right: '15%' },
                    delay: 0.3,
                  },
                ].map((feature, index) => (
                  <Box
                    key={index}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: feature.delay, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    sx={{
                      position: 'absolute',
                      width: { xs: 240, sm: 280 },
                      p: 3,
                      borderRadius: 4,
                      background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      ...feature.offset,
                    }}
                  >
                    {feature.icon}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {feature.description}
                    </Typography>
                  </Box>
                ))}
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Onboarding; 
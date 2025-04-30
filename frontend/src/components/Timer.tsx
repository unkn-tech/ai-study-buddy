import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [mode, setMode] = useState<'focus' | 'break' | 'longBreak'>('focus');

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    if (mode === 'focus') {
      setTimeLeft(FOCUS_TIME);
    } else if (mode === 'break') {
      setTimeLeft(BREAK_TIME);
    } else {
      setTimeLeft(LONG_BREAK_TIME);
    }
  }, [mode]);

  const switchMode = useCallback(() => {
    if (mode === 'focus') {
      if (cycles === 3) {
        setMode('longBreak');
        setTimeLeft(LONG_BREAK_TIME);
        setCycles(0);
      } else {
        setMode('break');
        setTimeLeft(BREAK_TIME);
        setCycles(c => c + 1);
      }
    } else {
      setMode('focus');
      setTimeLeft(FOCUS_TIME);
    }
  }, [mode, cycles]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play sound when timer ends
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {}); // Ignore if audio fails to play
      switchMode();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, switchMode]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (mode === 'focus' ? FOCUS_TIME : mode === 'break' ? BREAK_TIME : LONG_BREAK_TIME)) * 100;

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 100px)',
      px: 3,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(46,81,237,0.1), transparent 70%)',
          zIndex: -1,
        }}
      />

      <Typography 
        variant="h2" 
        sx={{ 
          mb: 4, 
          fontWeight: 800,
          fontSize: { xs: '2.5rem', md: '3rem' },
          background: 'linear-gradient(45deg, #2E51ED, #7C3AED)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            background: 'linear-gradient(45deg, #2E51ED, #7C3AED)',
            borderRadius: '2px',
          },
        }}
      >
        Focus Timer
      </Typography>

      <Card
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          position: 'relative',
          width: { xs: 320, sm: 360 },
          borderRadius: 6,
          background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
          px: 4,
          overflow: 'visible',
        }}
      >
        {/* 3D floating effect */}
        <Box
          sx={{
            position: 'absolute',
            inset: -2,
            background: 'linear-gradient(45deg, rgba(46,81,237,0.1), rgba(124,58,237,0.1))',
            borderRadius: 'inherit',
            zIndex: -1,
            filter: 'blur(8px)',
          }}
        />

        <Box sx={{ position: 'relative', width: 200, height: 200, mb: 4 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={200}
            thickness={3}
            sx={{
              position: 'absolute',
              color: 'rgba(255,255,255,0.1)',
            }}
          />
          <CircularProgress
            variant="determinate"
            value={progress}
            size={200}
            thickness={3}
            sx={{
              position: 'absolute',
              color: mode === 'focus' ? 'primary.main' : 'secondary.main',
              transform: 'rotate(-90deg)',
              transition: 'color 0.3s ease',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700,
                fontSize: '2.5rem',
                mb: 1,
                fontFamily: 'SF Mono, monospace',
                letterSpacing: '-0.05em',
              }}
            >
              {formatTime(timeLeft)}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: mode === 'focus' ? 'primary.main' : 'secondary.main',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {mode === 'focus' ? 'Focus Time' : mode === 'break' ? 'Break Time' : 'Long Break'}
            </Typography>
          </Box>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 4,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -8,
              background: 'linear-gradient(45deg, rgba(46,81,237,0.1), rgba(124,58,237,0.1))',
              borderRadius: 'inherit',
              zIndex: -1,
              filter: 'blur(8px)',
            },
          }}
        >
          <IconButton
            onClick={() => setIsRunning(!isRunning)}
            sx={{
              bgcolor: mode === 'focus' ? 'primary.main' : 'secondary.main',
              color: 'white',
              '&:hover': {
                bgcolor: mode === 'focus' ? 'primary.dark' : 'secondary.dark',
                transform: 'translateY(-2px)',
              },
              width: 56,
              height: 56,
              transition: 'all 0.2s ease',
              boxShadow: theme => `0 8px 32px ${theme.palette.primary.main}25`,
            }}
          >
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <IconButton
            onClick={resetTimer}
            sx={{
              bgcolor: 'background.default',
              color: 'text.secondary',
              '&:hover': { 
                bgcolor: 'action.hover',
                transform: 'translateY(-2px)',
              },
              width: 56,
              height: 56,
              transition: 'all 0.2s ease',
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            opacity: 0.7,
            fontWeight: 500,
          }}
        >
          Completed Cycles: {cycles}
        </Typography>
      </Card>

      <Card 
        sx={{ 
          mt: 4, 
          maxWidth: { xs: 320, sm: 360 },
          width: '100%',
          p: 3,
          background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          How it works
        </Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <Typography 
            component="li" 
            variant="body2" 
            sx={{ 
              mb: 1,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            25 minutes of focused work
          </Typography>
          <Typography 
            component="li" 
            variant="body2" 
            sx={{ 
              mb: 1,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            5 minutes short break
          </Typography>
          <Typography 
            component="li" 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            15 minutes long break after 4 cycles
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Timer; 
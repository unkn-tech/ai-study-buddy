import { useState } from 'react';
import { 
  Box, 
  Fab, 
  Dialog, 
  DialogContent, 
  IconButton, 
  Typography, 
  useTheme, 
  alpha,
  Zoom,
  Badge,
} from '@mui/material';
import { 
  SmartToy as BotIcon, 
  Close as CloseIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import Chatbot from './Chatbot';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingChatbot = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const handleOpen = () => {
    setOpen(true);
    setUnreadMessages(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // This would be connected to your actual chatbot logic
  const handleNewMessage = () => {
    if (!open) {
      setUnreadMessages(prev => prev + 1);
    }
  };

  return (
    <>
      <Zoom in={true}>
        <Fab
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpen}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: theme.palette.primary.main,
            color: 'white',
            width: 60,
            height: 60,
            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
              boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
            },
            zIndex: 1000,
          }}
        >
          <Badge badgeContent={unreadMessages} color="error">
            <BotIcon sx={{ fontSize: 28 }} />
          </Badge>
        </Fab>
      </Zoom>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            height: '80vh',
            maxHeight: '80vh',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BotIcon />
            <Typography variant="h6" fontWeight="bold">
              AI Study Buddy
            </Typography>
          </Box>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              color: 'white',
              '&:hover': {
                bgcolor: alpha(theme.palette.common.white, 0.2),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0, height: '100%' }}>
          <Chatbot onNewMessage={handleNewMessage} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChatbot; 
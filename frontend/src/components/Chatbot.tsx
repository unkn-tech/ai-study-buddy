import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  IconButton,
  Typography,
  Paper,
  useTheme,
  alpha,
  Avatar,
  CircularProgress,
  Button,
  Chip,
  Fade,
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  onNewMessage?: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Help me create a study plan",
  "Explain a concept I'm struggling with",
  "Give me practice questions",
  "How can I improve my memory?",
  "Create flashcards for me",
];

const Chatbot = ({ onNewMessage }: ChatbotProps) => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI Study Buddy. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Notify parent component about new message
    onNewMessage?.();

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              content: input.trim(),
              role: 'user',
            },
          ],
          subject: null,
          context: null
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      onNewMessage?.();
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      onNewMessage?.();
    } finally {
      setIsTyping(false);
    }
  };

  const handleGeneratePractice = async () => {
    setIsTyping(true);
    try {
      const response = await fetch('http://localhost:8000/api/generate-practice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              content: 'Generate practice questions about my current study topic',
              role: 'user',
            },
          ],
          subject: null,
          context: null
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate practice questions');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: messages.length + 1,
        text: data.questions,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      onNewMessage?.();
    } catch (error) {
      console.error('Error generating practice questions:', error);
      const errorMessage: Message = {
        id: messages.length + 1,
        text: 'Sorry, I encountered an error generating practice questions. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      onNewMessage?.();
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const studyPrompts = [
    { label: 'Explain this concept', action: () => setInput('Can you explain this concept in simple terms?') },
    { label: 'Help me understand', action: () => setInput('I need help understanding this topic. Can you break it down?') },
    { label: 'Give me an example', action: () => setInput('Can you give me a practical example of this concept?') },
    { label: 'Generate Practice Questions', action: handleGeneratePractice },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* Quick Prompts */}
      <Box sx={{ p: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {studyPrompts.map((prompt) => (
          <Chip
            key={prompt.label}
            label={prompt.label}
            onClick={prompt.action}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'flex-start',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                      width: 32,
                      height: 32,
                    }}
                  >
                    {message.sender === 'user' ? 'U' : 'AI'}
                  </Avatar>
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      borderRadius: 3,
                      bgcolor: message.sender === 'user' ? 'primary.main' : alpha(theme.palette.background.paper, 0.8),
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      boxShadow: message.sender === 'user'
                        ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                        : `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
                    }}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                  </Paper>
                </Box>
              </Box>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: 'secondary.main',
                    width: 32,
                    height: 32,
                  }}
                >
                  AI
                </Avatar>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
                  }}
                >
                  <Box
                    component={motion.div}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    sx={{
                      display: 'flex',
                      gap: 0.5,
                    }}
                  >
                    <Typography>•</Typography>
                    <Typography>•</Typography>
                    <Typography>•</Typography>
                  </Box>
                </Paper>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </Box>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: alpha(theme.palette.background.paper, 0.8),
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            sx={{
              alignSelf: 'flex-end',
              p: '8px',
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&.Mui-disabled': {
                bgcolor: 'action.disabledBackground',
                color: 'action.disabled',
              },
            }}
          >
            {isTyping ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot; 
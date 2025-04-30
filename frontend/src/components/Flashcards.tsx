import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';

interface Flashcard {
  id: number;
  front: string;
  back: string;
}

const Flashcards = () => {
  const [cards, setCards] = useState<Flashcard[]>([
    { id: 1, front: 'What is React?', back: 'A JavaScript library for building user interfaces' },
    { id: 2, front: 'What is JSX?', back: 'A syntax extension for JavaScript that allows you to write HTML-like code in JavaScript' },
    { id: 3, front: 'What is a Component?', back: 'A reusable piece of UI that can be composed to build complex interfaces' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 300);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 300);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddCard = () => {
    setEditMode(false);
    setNewCard({ front: '', back: '' });
    setOpenDialog(true);
  };

  const handleEditCard = () => {
    setEditMode(true);
    setEditingCard(cards[currentIndex]);
    setNewCard({
      front: cards[currentIndex].front,
      back: cards[currentIndex].back,
    });
    setOpenDialog(true);
  };

  const handleDeleteCard = () => {
    const newCards = cards.filter((_, index) => index !== currentIndex);
    setCards(newCards);
    if (currentIndex >= newCards.length) {
      setCurrentIndex(Math.max(0, newCards.length - 1));
    }
  };

  const handleSaveCard = () => {
    if (editMode && editingCard) {
      setCards(cards.map((card) =>
        card.id === editingCard.id
          ? { ...card, front: newCard.front, back: newCard.back }
          : card
      ));
    } else {
      setCards([...cards, { id: Date.now(), ...newCard }]);
    }
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {/* Add Card Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCard}
          sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #2DD4BF 30%, #8B5CF6 90%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #2DD4BF 20%, #8B5CF6 100%)',
            },
          }}
        >
          Add New Card
        </Button>

        {/* Flashcard Container */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            height: 400,
            position: 'relative',
            transformStyle: 'preserve-3d',
            perspective: 1500,
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
          >
            {/* Front of Card */}
            <Card
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backfaceVisibility: 'hidden',
                bgcolor: 'background.paper',
                color: 'text.primary',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
              onClick={handleFlip}
            >
              <Typography variant="h4" component="div" sx={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 500 }} gutterBottom>
                {cards[currentIndex]?.front || 'Add your first card'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                Click to flip
              </Typography>
            </Card>

            {/* Back of Card */}
            <Card
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                bgcolor: 'background.paper',
                color: 'text.primary',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
              onClick={handleFlip}
            >
              <Typography variant="h4" component="div" sx={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 500 }} gutterBottom>
                {cards[currentIndex]?.back || 'Create a new flashcard to begin'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                Click to flip
              </Typography>
            </Card>
          </motion.div>
        </Box>

        {/* Navigation Controls */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: 4,
            width: '100%',
            maxWidth: 600,
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            onClick={handlePrevious}
            disabled={cards.length <= 1}
            sx={{
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'action.hover' },
              '&.Mui-disabled': { opacity: 0.3 },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton 
              onClick={handleEditCard} 
              sx={{
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDeleteCard}
              sx={{
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' },
                '&.Mui-disabled': { opacity: 0.3 },
              }}
              disabled={cards.length <= 1}
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <IconButton
            onClick={handleNext}
            disabled={cards.length <= 1}
            sx={{
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'action.hover' },
              '&.Mui-disabled': { opacity: 0.3 },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Typography 
          sx={{ 
            mt: 2, 
            color: 'text.secondary',
            opacity: 0.7,
          }}
        >
          Card {currentIndex + 1} of {cards.length}
        </Typography>
      </Box>

      {/* Add/Edit Card Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Card' : 'Add New Card'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Front"
            fullWidth
            multiline
            rows={3}
            value={newCard.front}
            onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Back"
            fullWidth
            multiline
            rows={3}
            value={newCard.back}
            onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveCard}
            variant="contained"
            disabled={!newCard.front.trim() || !newCard.back.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Flashcards; 
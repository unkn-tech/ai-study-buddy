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
  Divider,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('studyNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studyNotes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '' });
      setIsAdding(false);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({ title: note.title, content: note.content });
    setIsAdding(true);
  };

  const handleUpdateNote = () => {
    if (editingNote && newNote.title.trim() && newNote.content.trim()) {
      setNotes(notes.map(note => 
        note.id === editingNote.id
          ? {
              ...note,
              title: newNote.title,
              content: newNote.content,
              updatedAt: new Date().toISOString(),
            }
          : note
      ));
      setEditingNote(null);
      setNewNote({ title: '', content: '' });
      setIsAdding(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: 'calc(100vh - 100px)',
      px: 3,
      py: 4,
    }}>
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
        Study Notes
      </Typography>

      <Card
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: '100%',
          maxWidth: 800,
          borderRadius: 6,
          background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          p: 3,
          mb: 4,
        }}
      >
        {isAdding ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <IconButton
                onClick={() => {
                  setIsAdding(false);
                  setEditingNote(null);
                  setNewNote({ title: '', content: '' });
                }}
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Cancel
              </IconButton>
              <IconButton
                onClick={editingNote ? handleUpdateNote : handleAddNote}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                {editingNote ? <SaveIcon /> : <AddIcon />}
              </IconButton>
            </Box>
          </Box>
        ) : (
          <IconButton
            onClick={() => setIsAdding(true)}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              width: '100%',
              py: 2,
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add New Note
          </IconButton>
        )}
      </Card>

      <List sx={{ width: '100%', maxWidth: 800 }}>
        {notes.map((note) => (
          <Paper
            key={note.id}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              mb: 2,
              borderRadius: 2,
              background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    {note.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        whiteSpace: 'pre-wrap',
                        mb: 1,
                      }}
                    >
                      {note.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.5)',
                        fontStyle: 'italic',
                      }}
                    >
                      Last updated: {formatDate(note.updatedAt)}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleEditNote(note)}
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteNote(note.id)}
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default Notes; 
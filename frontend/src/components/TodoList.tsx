import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Card,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoListProps {
  sessionId: string;
}

const TodoList = ({ sessionId }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('studyTodos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studyTodos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        sessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { 
        ...todo, 
        completed: !todo.completed,
        updatedAt: new Date().toISOString()
      } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const currentTodos = todos.filter(todo => todo.sessionId === sessionId);

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        background: 'linear-gradient(145deg, rgba(20,27,45,0.7), rgba(20,27,45,0.9))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        mb: 3,
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
          Session Tasks
        </Typography>
        
        {/* Add Todo Input */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Add a task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
            }}
          />
          <IconButton
            onClick={handleAddTodo}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* Todo List */}
        <List>
          {currentTodos.map((todo) => (
            <ListItem
              key={todo.id}
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              sx={{
                bgcolor: 'rgba(255,255,255,0.05)',
                mb: 1,
                borderRadius: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: 'white',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      opacity: todo.completed ? 0.7 : 1,
                    }}
                  >
                    {todo.text}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      fontStyle: 'italic',
                    }}
                  >
                    Added: {new Date(todo.createdAt).toLocaleString()}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteTodo(todo.id)}
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {currentTodos.length === 0 && (
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'center',
              py: 2,
            }}
          >
            No tasks yet. Add some tasks to track your progress!
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default TodoList; 
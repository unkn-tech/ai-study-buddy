import { ReactNode, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Style as StyleIcon,
  Timer as TimerIcon,
  Notes as NotesIcon,
  History as HistoryIcon,
  Chat as ChatIcon,
  Note as NoteIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import StudyBuddyIcon from './StudyBuddyIcon';

interface LayoutProps {
  children: ReactNode;
}

const DRAWER_WIDTH = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Study Session', icon: <SchoolIcon />, path: '/study' },
  { text: 'Flashcards', icon: <StyleIcon />, path: '/flashcards' },
  { text: 'Notes', icon: <NoteIcon />, path: '/notes' },
  { text: 'Timer', icon: <TimerIcon />, path: '/timer' },
  { text: 'History', icon: <HistoryIcon />, path: '/history' },
  { text: 'Chatbot', icon: <ChatIcon />, path: '/chatbot' },
];

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', background: 'linear-gradient(180deg, rgba(20,27,45,0.7) 0%, rgba(20,27,45,0.95) 100%)' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(45deg, rgba(46,81,237,0.1), rgba(124,58,237,0.1))',
          backdropFilter: 'blur(10px)',
        }}
      >
        <StudyBuddyIcon
          sx={{
            fontSize: 40,
            filter: 'drop-shadow(0 0 10px rgba(46,81,237,0.3))',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2E51ED, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          StudyBuddy
        </Typography>
      </Box>
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 2,
              backgroundColor: location.pathname === item.path ? 'rgba(46,81,237,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(46,81,237,0.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                },
              }}
            />
            {location.pathname === item.path && (
              <Box
                sx={{
                  width: 4,
                  height: 32,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2E51ED, #7C3AED)',
                  ml: 2,
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(26, 27, 30, 0.8)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'StudyBuddy'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              border: 'none',
              background: 'transparent',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              border: 'none',
              background: 'transparent',
              backdropFilter: 'blur(10px)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Layout; 
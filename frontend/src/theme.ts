import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    accent: Palette['primary'];
    cream: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
    accent: PaletteOptions['primary'];
    cream: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#F43F5E',
      light: '#FB7185',
      dark: '#E11D48',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrastText: '#FFFFFF',
    },
    cream: {
      main: '#FFFAF0',
      light: '#FFFFFF',
      dark: '#FFF5E6',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
  },
  typography: {
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      fontSize: '2.75rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
      color: '#F8FAFC',
    },
    h2: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      fontSize: '2.25rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
      color: '#F8FAFC',
    },
    h3: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
      color: '#F8FAFC',
    },
    h4: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
      color: '#F8FAFC',
    },
    h5: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
      fontSize: '1.25rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
      color: '#F8FAFC',
    },
    h6: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
      fontSize: '1.125rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
      color: '#F8FAFC',
    },
    subtitle1: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
      fontSize: '1.125rem',
      letterSpacing: '0.01em',
      lineHeight: 1.5,
      color: '#94A3B8',
    },
    subtitle2: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
      fontSize: '0.875rem',
      letterSpacing: '0.01em',
      lineHeight: 1.5,
      color: '#94A3B8',
    },
    body1: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 400,
      fontSize: '1rem',
      letterSpacing: '0.01em',
      lineHeight: 1.6,
      color: '#94A3B8',
    },
    body2: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 400,
      fontSize: '0.875rem',
      letterSpacing: '0.01em',
      lineHeight: 1.6,
      color: '#64748B',
    },
    button: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
      fontSize: '0.875rem',
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
    caption: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 400,
      fontSize: '0.75rem',
      letterSpacing: '0.02em',
      lineHeight: 1.5,
      color: '#64748B',
    },
    overline: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
      fontSize: '0.75rem',
      letterSpacing: '0.05em',
      lineHeight: 1.5,
      color: '#94A3B8',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.02em',
        },
        contained: {
          background: 'linear-gradient(45deg, #06B6D4, #8B5CF6)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0891B2, #7C3AED)',
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          background: 'linear-gradient(145deg, #1E293B, #0F172A)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundImage: 'none',
          background: '#1E293B',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover fieldset': {
              borderColor: '#06B6D4',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#06B6D4',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          color: '#06B6D4',
          '&:hover': {
            backgroundColor: 'rgba(6, 182, 212, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: alpha('#000000', 0.8),
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000',
          borderRight: `1px solid ${alpha('#F8FAFC', 0.1)}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            color: '#06B6D4',
            '&:hover': {
              backgroundColor: 'rgba(6, 182, 212, 0.2)',
            },
          },
        },
      },
    },
  },
  shadows: [
    'none',
    `0 2px 4px ${alpha('#000000', 0.05)}`,
    `0 4px 8px ${alpha('#000000', 0.1)}`,
    `0 6px 12px ${alpha('#000000', 0.15)}`,
    `0 8px 16px ${alpha('#000000', 0.2)}`,
    `0 10px 20px ${alpha('#000000', 0.25)}`,
    `0 12px 24px ${alpha('#000000', 0.3)}`,
    `0 14px 28px ${alpha('#000000', 0.35)}`,
    `0 16px 32px ${alpha('#000000', 0.4)}`,
    `0 18px 36px ${alpha('#000000', 0.45)}`,
    `0 20px 40px ${alpha('#000000', 0.5)}`,
    `0 22px 44px ${alpha('#000000', 0.55)}`,
    `0 24px 48px ${alpha('#000000', 0.6)}`,
    `0 26px 52px ${alpha('#000000', 0.65)}`,
    `0 28px 56px ${alpha('#000000', 0.7)}`,
    `0 30px 60px ${alpha('#000000', 0.75)}`,
    `0 32px 64px ${alpha('#000000', 0.8)}`,
    `0 34px 68px ${alpha('#000000', 0.85)}`,
    `0 36px 72px ${alpha('#000000', 0.9)}`,
    `0 38px 76px ${alpha('#000000', 0.95)}`,
    `0 40px 80px ${alpha('#000000', 1)}`,
    `0 42px 84px ${alpha('#000000', 1)}`,
    `0 44px 88px ${alpha('#000000', 1)}`,
    `0 46px 92px ${alpha('#000000', 1)}`,
    `0 48px 96px ${alpha('#000000', 1)}`,
  ],
}); 
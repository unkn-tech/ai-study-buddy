import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    hero: React.CSSProperties;
    subtitle3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    hero?: React.CSSProperties;
    subtitle3?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    hero: true;
    subtitle3: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Quicksand',
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Quicksand',
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'Quicksand',
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontFamily: 'Quicksand',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: 'Quicksand',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: 'Quicksand',
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    subtitle1: {
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '0.875rem',
      letterSpacing: '0.01em',
    },
    subtitle3: {
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '0.75rem',
      letterSpacing: '0.01em',
      opacity: 0.8,
    },
    body1: {
      fontFamily: 'Inter',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'Inter',
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: 'Quicksand',
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontFamily: 'Inter',
      fontSize: '0.75rem',
      letterSpacing: '0.03em',
    },
    overline: {
      fontFamily: 'Inter',
      fontSize: '0.75rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    hero: {
      fontFamily: 'Quicksand',
      fontWeight: 700,
      fontSize: '3.5rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      background: 'linear-gradient(45deg, #2E51ED 30%, #7C3AED 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  palette: {
    primary: {
      main: '#2E51ED',
      light: '#4C6EFF',
      dark: '#1E3BB8',
    },
    secondary: {
      main: '#7C3AED',
      light: '#9B5FF5',
      dark: '#5B21B6',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },
}); 
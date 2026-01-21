import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0b7285',
      light: '#2da7b9',
      dark: '#064b5d'
    },
    secondary: {
      main: '#f08c00',
      light: '#ffb02e',
      dark: '#b76500'
    },
    background: {
      default: '#f7f4ef',
      paper: '#ffffff'
    },
    text: {
      primary: '#1b1b1f',
      secondary: '#4f4f57'
    }
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", "IBM Plex Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontFamily: '"Space Grotesk", "IBM Plex Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h3: {
      fontFamily: '"Space Grotesk", "IBM Plex Sans", sans-serif',
      fontWeight: 700
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

export default theme;

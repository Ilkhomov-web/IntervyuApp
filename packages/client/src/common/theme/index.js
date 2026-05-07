import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4318FF',
      light: '#6F4EFF',
      dark: '#2E0DC2',
    },
    secondary: {
      main: '#00B5D8',
    },
    success: {
      main: '#01B574',
    },
    warning: {
      main: '#FFB547',
    },
    error: {
      main: '#EE5D50',
    },
    background: {
      default: '#F4F7FE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2B3674',
      secondary: '#707EAE',
    },
  },
  typography: {
    fontFamily: [
      'DM Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 700, color: '#2B3674' },
    h2: { fontWeight: 700, color: '#2B3674' },
    h3: { fontWeight: 700, color: '#2B3674' },
    h4: { fontWeight: 700, color: '#2B3674' },
    h5: { fontWeight: 700, color: '#2B3674' },
    h6: { fontWeight: 600, color: '#2B3674' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(67, 24, 255, 0.05)',
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 16 },
      },
    },
  },
});

export default theme;

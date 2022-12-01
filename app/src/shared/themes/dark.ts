import { createTheme } from '@mui/material';
import { blue, cyan, purple } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[800],
      dark: purple[900],
      light: purple[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      default: '#202124',
      paper: '#303134'
    }
  },
  typography: {
    allVariants: {
      color: '#ffffff'
    }
  }
});

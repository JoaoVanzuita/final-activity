import { createTheme } from '@mui/material';
import { cyan, purple } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
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
      default: '#f7f6f3',
      paper: '#ffffff'
    }
  }
});

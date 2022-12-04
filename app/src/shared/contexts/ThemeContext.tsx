import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from '../themes';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

interface IThemeContext {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContext);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

interface IAppThemeProviderProps {
  children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({children}) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() =>{
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if(themeName === 'light') return LightTheme;

    return DarkTheme;
  },[themeName]);

  return(
    <ThemeContext.Provider value={{themeName, toggleTheme}}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default} >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

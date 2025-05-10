import { AppTheme, darkTheme, lightTheme } from '@/constants/theme'; // Assuming your theme file is here
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ThemeContextType {
  theme: AppTheme;
  isDarkMode: boolean;
  toggleTheme: () => void; // We might not use toggleTheme immediately, but good to have
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // For now, we will default to light theme as per requirements,
  // but we can use system's preference later.
  // const colorScheme = useColorScheme(); 
  // const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  
  // Default to light theme for now
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
}; 
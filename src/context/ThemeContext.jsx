import { createContext } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Hardcoded to light mode as requested by user
  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {}, setThemeMode: () => {}, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

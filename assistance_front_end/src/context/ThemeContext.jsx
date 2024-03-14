
import { createContext, useContext, useState } from 'react';
import { getLocalStorage, updateTheme, DARK_THEME } from '../logic/themeContext.js'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [contextTheme, setContextTheme] = useState(() => {
    const localStorageTheme = getLocalStorage("Theme", false)
    updateTheme(localStorageTheme);

    return localStorageTheme || DARK_THEME
  });

  return (
    <ThemeContext.Provider value={{contextTheme, setContextTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);
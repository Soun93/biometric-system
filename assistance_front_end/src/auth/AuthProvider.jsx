import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => '',
  saveUser: (userToken) => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(() => getAccessToken());

  function getAccessToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    setIsAuthenticated(true);
    return JSON.parse(token);
  }

  function saveUser(userToken) {
    setAccessToken(userToken);
    setIsAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  const values = { 
    isAuthenticated,
    getAccessToken,
    saveUser,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
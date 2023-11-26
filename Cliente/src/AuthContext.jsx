// src/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    // Decode the token if needed
    // For simplicity, assuming the token contains user information
    const decodedUser = JSON.parse(atob(token.split('.')[1]));

    setUser(decodedUser);

    // Store the token in localStorage
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setUser(null);

    // Remove the token from localStorage
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

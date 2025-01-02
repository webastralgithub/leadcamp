import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true  : false);
  const [token,setToken]=useState(localStorage.getItem('token'));
  
  const [userDetails,setUserDetails]=useState(JSON.parse(localStorage.getItem('userDetails')))
  const login = () => {
    setToken(localStorage.getItem('token'));
    setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
    // Implement your login logic here
    setIsLoggedIn(localStorage.getItem('token') ? true  : false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    // Implement your logout logic here
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

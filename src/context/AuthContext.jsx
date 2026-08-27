import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers } from './mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Default to Elderly demo user Eleanor Vance, with easy switcher
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('careconnect_user');
    return saved ? JSON.parse(saved) : demoUsers[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('careconnect_auth') !== 'false';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('careconnect_user', JSON.stringify(currentUser));
      localStorage.setItem('careconnect_auth', 'true');
    }
  }, [currentUser]);

  const login = (email, password, role) => {
    const matched = demoUsers.find(u => u.role === role || u.email === email) || {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0] || "User",
      email,
      role: role || "elderly",
      roleLabel: role === 'volunteer' ? 'Companion Volunteer' : role === 'family' ? 'Family Caregiver' : 'Care Recipient',
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
      details: "Registered Member"
    };
    setCurrentUser(matched);
    setIsAuthenticated(true);
    return matched;
  };

  const switchRole = (roleKey) => {
    const userForRole = demoUsers.find(u => u.role === roleKey);
    if (userForRole) {
      setCurrentUser(userForRole);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('careconnect_auth');
  };

  const registerUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.fullName || userData.name || "New Member",
      email: userData.email,
      role: userData.role || "elderly",
      roleLabel: userData.role === 'volunteer' ? 'Companion Volunteer' : userData.role === 'family' ? 'Family Caregiver' : 'Care Recipient',
      avatar: userData.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
      details: userData.location || "Springfield",
      ...userData
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        switchRole,
        registerUser,
        availableDemoUsers: demoUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

"use client"
import React, { createContext, useContext, useState } from 'react';


interface UserContextType {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

interface UserProviderProps {
    children: React.ReactNode;
  }
  

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (user: string) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: UserContextType = {
    user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  password: string
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updatePassword: (newPassword: string) => void;
  changeProfile: (email: string, first: string, last: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updatePassword = (newPassword: string) => {
    if (user) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = users.map((u: any) => {
        if (u.email === user?.email) {
          return { ...u, password: newPassword };
        }
        return u;
      });
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    }
  };

  const changeProfile = (email: string, first: string, last: string) => {
    if (user) {
      const updatedUser = { ...user, email: email, name: first + " " + last };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = users.map((u: any) => {
        if (u.email === user?.email) {
          return { ...u, email: email, name: first + " " + last };
        }
        return u;
      });
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updatePassword, changeProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
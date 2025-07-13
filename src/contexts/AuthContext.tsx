
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - replace with actual API call
    if (email === 'admin@furniturecraft.com' && password === 'admin123') {
      const adminUser = { id: '1', email, name: 'Admin', isAdmin: true };
      setUser(adminUser);
      localStorage.setItem('token', 'mock-admin-token');
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    } else if (email && password) {
      const regularUser = { id: '2', email, name: 'John Doe' };
      setUser(regularUser);
      localStorage.setItem('token', 'mock-user-token');
      localStorage.setItem('user', JSON.stringify(regularUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup - replace with actual API call
    if (email && password && name) {
      const newUser = { id: Date.now().toString(), email, name };
      setUser(newUser);
      localStorage.setItem('token', 'mock-user-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
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

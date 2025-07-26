import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';

type UserType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const normalizeUser = (userData: any): UserType => ({
    _id: userData._id || userData.id,
    name: userData.name,
    email: userData.email,
    isAdmin: userData.isAdmin,
  });

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('/users/signup', { name, email, password });
      const { token, user } = res.data;

      if (!token || !user) {
        console.error('Invalid signup response:', res.data);
        return false;
      }

      const normalized = normalizeUser(user);
      localStorage.setItem('user', JSON.stringify(normalized));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(normalized);

      return true;
    } catch (error: any) {
      console.error('Signup Error:', error?.response?.data?.message || error.message);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('/users/login', { email, password });
      const { token, user } = res.data;

      if (!token || !user) throw new Error('Invalid login response');

      const normalized = normalizeUser(user);
      localStorage.setItem('user', JSON.stringify(normalized));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(normalized);

      return true;
    } catch (error: any) {
      console.error('Login Error:', error?.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


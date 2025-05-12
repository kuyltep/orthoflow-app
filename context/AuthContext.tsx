import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { User, loginUser, registerUser } from '@/api/authService';


// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'patient' | 'doctor') => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
});

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => 
      loginUser(credentials),
    onSuccess: (userData) => {
      if (userData) {
        setUser(userData);
        AsyncStorage.setItem('user', JSON.stringify(userData));
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: { name: string; email: string; password: string; role: 'patient' | 'doctor' }) => 
      registerUser(userData),
    onSuccess: (userData) => {
      if (userData) {
        setUser(userData);
        AsyncStorage.setItem('user', JSON.stringify(userData));
      }
    },

  });

  // Load user from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      return !!result;
    } catch (error) {
      console.error('Login failed:', error);
      // Check if it's a network error and provide clearer message
      if (axios.isAxiosError(error) && !error.response) {
        console.error('Network Error: Please ensure your server is running and accessible');
      }
      return false;
    }
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'patient' | 'doctor'
  ): Promise<boolean> => {
    try {
      const result = await registerMutation.mutateAsync({ name, email, password, role });
      return !!result;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading: loginMutation.isPending || registerMutation.isPending, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext); 
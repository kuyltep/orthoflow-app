import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Get the appropriate API URL based on the platform
// For web - use localhost
// For mobile - use the development machine's IP address (from Expo)
export const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:3500';
  }
  
  // For mobile devices in development
  let host = 'localhost';
  
  try {
    // Try different ways to get the host depending on Expo version
    if (Constants.expoConfig?.hostUri) {
      host = Constants.expoConfig.hostUri.split(':')[0];
    } else {
      // Fallback for older Expo versions or different configurations
      // @ts-expect-error - Accessing potentially undefined property in different Expo versions
      const debuggerHost = Constants.manifest?.debuggerHost || Constants.manifest2?.extra?.expoGo?.debuggerHost;
      if (debuggerHost) {
        host = debuggerHost.split(':')[0];
      }
    }
  } catch (error) {
    console.warn('Could not determine host IP, defaulting to localhost:', error);
  }
  
  return `http://${host}:3500`;
};

const API_URL = getApiUrl();
console.log('API URL:', API_URL);

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
}

export const loginUser = async (credentials: LoginCredentials): Promise<User | null> => {
  try {
    console.log(`Connecting to API at: ${API_URL}`);
    
    // In a real app, you would send a POST request to a login endpoint
    // For json-server, we'll query for a user with matching email/password
    const response = await axios.get(`${API_URL}/users`, {
      params: { email: credentials.email }
    });

    const users = response.data;
    const user = users.find((u: any) => u.password === credentials.password);

    if (!user) {
      return null;
    }

    // Don't return the password to the client
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export const registerUser = async (userData: RegisterData): Promise<User | null> => {
  try {
    // Check if user already exists
    const existingUsers = await axios.get(`${API_URL}/users`, {
      params: { email: userData.email }
    });
    
    if (existingUsers.data.length > 0) {
      console.error('User already exists');
      return null;
    }
    
    // Create new user
    const response = await axios.post(`${API_URL}/users`, userData);
    
    // Don't return the password to the client
    const { password, ...userWithoutPassword } = response.data;
    return userWithoutPassword;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}; 
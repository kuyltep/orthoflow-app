import axios from 'axios'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = "false";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

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
    
    // In a real app, you would send a POST request to a login endpoint
    // For json-server, we'll query for a user with matching email/password
    const response = await axios.get(`${API_URL}/users`, {
      params: { email: credentials.email },

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
      params: { email: userData.email },
 
    });
    
    if (existingUsers.data.length > 0) {
      console.error('User already exists');
      return null;
    }
    
    // Create new user
    const response = await axios.post(`${API_URL}/users`, userData, {

    });
    
    // Don't return the password to the client
    const { password, ...userWithoutPassword } = response.data;
    return userWithoutPassword;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}; 
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { useToast } from './toast';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoFinance:token');
    const user = localStorage.getItem('@GoFinance:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoFinance:token');
    localStorage.removeItem('@GoFinance:user');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { data: { success, message, result } } = await api.post('/sessions', {
      email,
      password,
    });

    if (!success)
      throw new Error(message);


    const { token, user } = result;

    localStorage.setItem('@GoFinance:token', token);
    localStorage.setItem('@GoFinance:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, [addToast]);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoFinance:user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

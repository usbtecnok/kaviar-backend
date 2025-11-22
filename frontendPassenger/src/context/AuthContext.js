import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para verificar se o token é válido
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // tempo atual em segundos
      return decoded.exp && decoded.exp > now;
    } catch (err) {
      return false;
    }
  };

  // Carrega usuário salvo no AsyncStorage ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (isTokenValid(parsed.token)) {
          setUser(parsed);
          api.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
        } else {
          await AsyncStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/passenger/login', { email, password });
    const userData = response.data;
    if (isTokenValid(userData.token)) {
      setUser(userData);
      api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } else {
      throw new Error('Token inválido recebido.');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  // Verificação automática de expiração enquanto o app roda
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      const valid = isTokenValid(user.token);
      if (!valid) {
        await logout();
      }
    }, 60 * 1000); // verifica a cada 1 minuto
    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

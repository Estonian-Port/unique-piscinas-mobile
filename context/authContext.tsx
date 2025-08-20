import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserLogin } from '@/data/domain/user';
import { authService } from '@/services/auth.service';
import { router } from 'expo-router';

type AuthContextType = {
  user: UserLogin | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLogin | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cargar datos persistidos al iniciar la app
  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        authService.setAuthToken(storedToken)
        try {
          const fetchedUser = await authService.getCurrentUser();
          setUser(fetchedUser);
        } catch (e) {
          console.error("Error al obtener usuario con token guardado", e);
          logout();
        }
      }
    };

    loadSession();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Paso 1: pedir el token
      const receivedToken = await authService.login(username, password);

      // Paso 2: guardar token
      await AsyncStorage.setItem("token", receivedToken);
      setToken(receivedToken);

      // Paso 3: setear el token en axios
      authService.setAuthToken(receivedToken);

      // Paso 4: traer usuario actual
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (e) {
      console.error("Error en login:", e);
      throw e;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setToken(null);
    router.replace('/index'); // Volver a la pantalla de login
  };

  const refreshUser = async () => {
    try {
      const refreshed = await authService.getCurrentUser();
      setUser(refreshed);
    } catch (e) {
      console.error('Error actualizando usuario:', e);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};

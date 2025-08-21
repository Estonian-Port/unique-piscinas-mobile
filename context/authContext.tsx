import { UserLogin } from "@/data/domain/user";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "@/services/auth.service";

type AuthContextType = {
  user: UserLogin | null;
  token: string | null;
  selectedPoolId: number | null;
  loading: boolean | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setSelectedPoolId: (id: number | null) => void;
  seleccionarPiscina: (piscinaId: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_POOL = "pool_id";
const STORAGE_KEY_TOKEN = "token";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserLogin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedPoolId, setSelectedPoolId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessionAndPool = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(STORAGE_KEY_TOKEN);
        if (storedToken) {
          authService.setAuthToken(storedToken);
          setToken(storedToken);

          const storedPoolId = await AsyncStorage.getItem(STORAGE_KEY_POOL);
          if (storedPoolId !== null) {
            setSelectedPoolId(Number(storedPoolId));
          }
        }
      } catch (e) {
        console.error("Error al cargar la sesión:", e);
        await AsyncStorage.removeItem(STORAGE_KEY_TOKEN);
        await AsyncStorage.removeItem(STORAGE_KEY_POOL);
        setUser(null);
        setToken(null);
        setSelectedPoolId(null);
      } finally {
        setLoading(false);
      }
    };
    loadSessionAndPool();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const receivedToken = await authService.login(username, password);
      await AsyncStorage.setItem(STORAGE_KEY_TOKEN, receivedToken);
      authService.setAuthToken(receivedToken);
      
      const currentUser = await authService.getCurrentUser();
      setToken(receivedToken);
      setUser(currentUser);
    } catch (e) {
      console.error("Error en login:", e);
      throw e;
    }
  };

  const seleccionarPiscina = async (piscinaId: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_POOL, piscinaId.toString());
      setSelectedPoolId(piscinaId);
    } catch (e) {
      console.error("Error al seleccionar piscina:", e);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEY_POOL);
      setUser(null);
      setToken(null);
      setSelectedPoolId(null);
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  };

  const refreshUser = async () => {
    try {
      if (token) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Error al refrescar usuario:", error);
    }
  };

  const value = {
    user,
    token,
    selectedPoolId,
    login,
    logout,
    refreshUser,
    seleccionarPiscina,
    setSelectedPoolId,
    loading
  };

  if (loading) {
    // Puedes renderizar una pantalla de carga si el estado inicial no se ha cargado
    return null; 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PoolContextType {
  selectedPoolId: number | null;
  setSelectedPoolId: (id: number | null) => void;
}

const PoolContext = createContext<PoolContextType | undefined>(undefined);

export const PoolProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPoolId, setSelectedPoolIdState] = useState<number | null>(null);

  // Clave para AsyncStorage
  const STORAGE_KEY = '@selected_pool_id';

  // Recuperar el ID guardado al iniciar la app
  useEffect(() => {
    const loadSelectedPoolId = async () => {
      try {
        const storedId = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedId !== null) {
          setSelectedPoolIdState(Number(storedId));
        }
      } catch (error) {
        console.error('Error al cargar el ID de piscina:', error);
      }
    };

    loadSelectedPoolId();
  }, []);

  // Función para actualizar y guardar en AsyncStorage
  const setSelectedPoolId = async (id: number | null) => {
    try {
      if (id === null) {
        await AsyncStorage.removeItem(STORAGE_KEY);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, id.toString());
      }
      setSelectedPoolIdState(id);
    } catch (error) {
      console.error('Error al guardar el ID de piscina:', error);
    }
  };

  return (
    <PoolContext.Provider value={{ selectedPoolId, setSelectedPoolId }}>
      {children}
    </PoolContext.Provider>
  );
};

export const usePool = (): PoolContextType => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error('usePool debe usarse dentro de un PoolProvider');
  }
  return context;
};
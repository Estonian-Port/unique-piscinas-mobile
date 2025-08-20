import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import PoolCard from '@/components/utiles/poolCard';
import { useAuth } from '@/context/authContext';
import { router } from 'expo-router';
import { usePool } from '@/context/piscinaContext';
import { PiscinaListItem } from '@/data/domain/piscina';
import { piscinaService } from '@/services/piscina.service';
import PrivateScreen from '@/components/utiles/privateScreen';

const Pools = () => {
  const { user } = useAuth();
  const { setSelectedPoolId } = usePool();
  const [pools, setPools] = useState<PiscinaListItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const data = await piscinaService.getPiscinasByUserId(user!.id);
        setPools(data);
      } catch (error) {
        console.error('Error cargando las piscinas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, [user]);

  if (loading || !pools) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <PrivateScreen>
      <View className="flex-1 bg-white items-center h-full">
        {/* Texto de bienvenida */}
        <View className="w-11/12 my-3">
          <Text className="font-geist-semi-bold text-2xl text-text mb-3">
            Hola {user!.nombre}, bienvenido!
          </Text>
        </View>
        {user!.piscinasId.length === 0 && (
          <View className="w-11/12 justify-start items-center flex-1">
            <Text className="font-geist-bold text-text text-3xl mb-3 text-center">
              No tienes piscinas asignadas, por favor contacta a un
              administrador.
            </Text>
          </View>
        )}
        {user!.piscinasId.length > 0 && (
          <>
            <View className="w-11/12 items-start mb-3">
              <Text className="font-geist-semi-bold text-text text-lg">
                Seleccione una piscina:
              </Text>
            </View>
            <FlatList
              data={pools}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <PoolCard piscina={item} />}
              contentContainerStyle={{
                gap: 20, // Espacio entre los elementos
                flexGrow: 1, // Asegura que el contenedor ocupe todo el espacio disponible
                paddingBottom: 15, // Espacio al final de la lista
              }}
              style={{ width: '90%' }}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </PrivateScreen>
  );
};

export default Pools;

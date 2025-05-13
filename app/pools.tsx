import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect } from 'react';
import PoolCard from '@/components/utiles/poolCard';
import { diego, gabi, leo, seba } from '@/data/mock/userMock';
import { router } from 'expo-router';

const Pools = () => {
  const user: User = leo;
  const pools = user.piscinas;

  const usuarioSinPiscinas = (): boolean => {
    return pools.length === 0;
  };

  const usuarioConMultiplesPiscinas = (): boolean => {
    return pools.length > 1;
  };

  useEffect(() => {
    if (pools.length === 1) {
      router.replace(`/(tabs)/${pools[0].id}`);
    }
  }, [pools, router]);

  return (
    <View className="flex-1 bg-white items-center h-full">
      
      {/* Texto de bienvenida */}
      <View className="w-11/12 my-3">
        <Text className="font-geist-semi-bold text-2xl text-text mb-3">
          Hola, {user.name} bienvenido!
        </Text>
      </View>
      {usuarioSinPiscinas() && (
        <View className="w-11/12 justify-start items-center flex-1">
          <Text className="font-geist-bold text-text text-3xl mb-3 text-center">
            No tienes piscinas asignadas, por favor contacta a un administrador.
          </Text>
        </View>
      )}
      {usuarioConMultiplesPiscinas() && (
        <>
          <View className='w-11/12 items-start mb-3'>
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
  );
};

export default Pools;

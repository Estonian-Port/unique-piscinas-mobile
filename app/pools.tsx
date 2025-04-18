import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import PoolCard from '@/components/poolCard';
import { piscinaNiños, piscinas } from '@/data/mock/piscinaMock';

const Pools = () => {
  const pools = piscinas;

  return (
    <View className="flex-1 bg-white items-center justify-center h-full">
      {/* Encabezado */}
      <View className="w-full items-center">
        <Image
          source={require('../assets/images/logo-unique-encabezado.png')}
          resizeMode="contain"
          style={{ width: 280, height: 100 }}
        />
      </View>

      {/* Texto de bienvenida */}
      <View className="w-11/12 my-3">
        <Text className="font-geist-semiBold text-2xl text-text mb-3">
          Hola, Leo bienvenido!
        </Text>
        <Text className="font-geist-semiBold text-text text-lg">
          Seleccione una piscina:
        </Text>
      </View>

      {/* FlatList con las cards */}
      <FlatList
        data={pools}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PoolCard piscina={item} />}
        contentContainerStyle={{
          gap: 20, // Espacio entre los elementos
          flexGrow: 1, // Asegura que el contenedor ocupe todo el espacio disponible
          paddingBottom: 96, // Espacio al final de la lista
        }}
        style={{ width: '90%' }}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

export default Pools;

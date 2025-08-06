import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import { PiscinaListItem } from '@/data/domain/piscina';
import { usePool } from '@/context/piscinaContext';

const PoolCard = ({ piscina }: { piscina: PiscinaListItem }) => {
  const { setSelectedPoolId } = usePool();

  const handlePress = () => {
    setSelectedPoolId(piscina.id);
    router.replace(`/(tabs)/resume`);
  };

  return (
    <Link asChild href={`/(tabs)/resume`}>
      <Pressable className="relative bg-white rounded-sm shadow-sm w-full justify-center items-center" onPress={handlePress}>
      <Image
        source={require('../../assets/images/portada-card-piscina.webp')}
        style={{ width: '100%', height: 120, borderRadius: 3, opacity: 0.3 }}
      />
      <View className="absolute inset-0 justify-center items-center">
        <Text className="font-geist-semi-bold text-text text-lg text-center">
        {piscina.nombre}
        </Text>
      </View>
      </Pressable>
    </Link>
  );
};

export default PoolCard;

import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const PoolCard = ({ piscina }: { piscina: Piscina }) => {
  return (
    <Link asChild href={`/${piscina.id}`}>
    <Pressable className="relative bg-white rounded-sm shadow-sm w-full justify-center items-center">
        <Image
          source={require('../../assets/images/portada-card-piscina.webp')}
          style={{ width: '100%', height: 120, borderRadius: 3, opacity: 0.3 }}
        />
        <View className="absolute inset-0 justify-center items-center">
          <Text className="font-geist-semi-bold text-text text-lg text-center">
            {piscina.name}
          </Text>
        </View>
    </Pressable>
    </Link>
  );
};

export default PoolCard;

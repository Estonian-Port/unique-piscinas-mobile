import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { PersonIcon } from '@/assets/icons';

const BotonPerfil = () => {
  return (
    <Link href={'/profile'} asChild>
      <Pressable>
        <View className="p-1 border rounded-full bg-gray-200 items-center justify-center">
          <PersonIcon />
        </View>
        <Text className="font-geist-semi-bold text-text text-sm text-center">
          Perfil
        </Text>
      </Pressable>
    </Link>
  );
};

export default BotonPerfil;

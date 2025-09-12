import { View, Image, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/authContext';

const LogoUniqueHeader = () => {
  const { usuario } = useAuth();

  const handlePress = () => {
    if (usuario?.isAdmin) {
      router.replace('/dashboard');
    } else if (usuario?.primerLogin) {
      router.replace('/resume');
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Image
        source={require('../../assets/images/logo-unique-encabezado.png')}
        resizeMode="contain"
        style={{ width: 100, height: 25 }}
      />
    </Pressable>
  );
};

export default LogoUniqueHeader;
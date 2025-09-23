import { Image, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/authContext';

const LogoUniqueHeader = () => {
  const { usuario } = useAuth();

  const handlePress = () => {
    console.log(usuario?.primerLogin);
    if (usuario?.isAdmin) {
      router.replace('/dashboard');
    } else if (!usuario?.primerLogin) {
      if (usuario?.piscinasId && usuario.piscinasId.length > 1) {
        router.replace('/pools');
      } else {
        router.replace('/dashboard');
      }
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
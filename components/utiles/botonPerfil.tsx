import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { PersonIcon } from '@/assets/icons';

const BotonPerfil = ({ nombreUsuario }: { nombreUsuario: string }) => {
  return (
    <Link href={'/profile'} asChild>
      <Pressable className='flex-row items-center'>
        <Text className="text-text font-geist-bold mr-2 text-md">
          {nombreUsuario}
        </Text>
        <View className="p-1 rounded-full bg-[#4e4965] items-center justify-center">
          <PersonIcon color="#a59064" />
        </View>
      </Pressable>
    </Link>
  );
};

export default BotonPerfil;

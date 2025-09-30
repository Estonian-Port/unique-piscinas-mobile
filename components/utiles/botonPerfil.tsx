import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { User } from 'react-native-feather';

const BotonPerfil = ({ nombreUsuario }: { nombreUsuario: string }) => {
  return (
    <Link href={'/profile'} asChild>
      <Pressable className='flex-row items-center'>
        <Text className="text-text font-geist-bold mr-2 text-md">
          {nombreUsuario}
        </Text>
        <View className="p-1 rounded-full bg-[#4e4965] items-center justify-center">
          <User color="white" />
        </View>
      </Pressable>
    </Link>
  );
};

export default BotonPerfil;


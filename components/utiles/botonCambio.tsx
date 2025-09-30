import { Platform, Pressable, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Repeat } from 'react-native-feather';

const BotonCambio = () => {
  return (
    <Link href={'/pools'} asChild>
      {Platform.OS === "web" ? (
          <Pressable className="border rounded-md bg-[#222247]">
            <View className='flex flex-row items-center justify-center py-3 px-4'>
              <Repeat className="font-geist-semi-bold text-white me-2"/>
              <Text className="font-geist-semi-bold text-white">Cambiar de piscina</Text>
            </View>
          </Pressable>
      ) : (
        <Pressable className="border rounded-md bg-[#222247] items-center justify-center px-4">
          <Repeat color="#fff" className="font-geist-semi-bold text-center py-2 px-4"/>
        </Pressable>
      )}
    </Link>
  );
};

export default BotonCambio;

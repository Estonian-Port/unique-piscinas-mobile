import { View, Text, TextInput, Pressable } from 'react-native';
import React from 'react';
import { ScreenCard } from './ScreenCard';

const AltaUsuario = () => {
  return (
    <ScreenCard>
      <View className='mb-4'>
        <Text className='font-geist-semi-bold text-text text-3xl'>Alta Usuario</Text>
        <Text className='font-geist-light text-text text-base'>Registre un nuevo usuario en el sistema</Text>
      </View>

      <Text className='font-geist text-text text-base'>Correo electrónico *</Text>
      <TextInput
        className="bg-white border border-gray-300 rounded-md p-2 mb-2"
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text className='font-geist-light text-text text-base'>
        Se enviará un enlace de registro al correo electrónico proporcionado. El
        usuario deberá completar el formulario para finalizar el registro.
      </Text>
      <Pressable className='bg-black rounded-md py-3 mt-4 w-1/2 self-end'>
        <Text className='font-geist-semi-bold text-sm text-center text-white'>Enviar enlace de registro</Text>
      </Pressable>
    </ScreenCard>
  );
};

export default AltaUsuario;

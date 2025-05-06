import React from 'react';
import { ScreenTabs } from '@/components/Screen';
import AltaUsuario from '@/components/altaUsuario';
import UsuarioRegistrados from '@/components/usuarioRegistrados';
import { ScrollView, Text } from 'react-native';

const Users = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>
        <Text className="self-start font-geist-bold text-3xl text-text m-5">
          Panel de Administración
        </Text>
        <AltaUsuario />
        <UsuarioRegistrados />
      </ScreenTabs>
    </ScrollView>
  );
};

export default Users;

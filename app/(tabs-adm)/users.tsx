import React from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import { ScrollView, Text } from 'react-native';
import AltaUsuario from '@/components/users/altaUsuario';
import UsuarioRegistrados from '@/components/users/usuarioRegistrados';

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

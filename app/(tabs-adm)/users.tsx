import React from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import { ScrollView, Text } from 'react-native';
import UsuarioRegistrados from '@/components/users/usuarioRegistrados';
import PrivateScreen from '@/components/utiles/privateScreen';
import NuevoUsuarioForm from '@/components/users/nuevoUsuario';

const Users = () => {
  return (
    <PrivateScreen>
      <ScrollView className="flex-1 bg-white">
        <ScreenTabs>
          <Text className="self-start font-geist-bold text-3xl text-text m-5">
            Panel de Administración
          </Text>
          <NuevoUsuarioForm />
          <UsuarioRegistrados />
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  );
};

export default Users;

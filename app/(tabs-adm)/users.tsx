import { View, Text } from 'react-native';
import React from 'react';
import { ScreenTabs } from '@/components/Screen';
import AltaUsuario from '@/components/altaUsuario';

const Users = () => {
  return (
    <ScreenTabs>
      <AltaUsuario />
    </ScreenTabs>
  );
};

export default Users;

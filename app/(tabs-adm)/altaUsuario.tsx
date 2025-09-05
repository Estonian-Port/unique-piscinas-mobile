import React from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import { Platform, ScrollView, Text, View } from 'react-native';
import UsuarioRegistrados from '@/components/usuario/usuarioRegistrados';
import PrivateScreen from '@/components/utiles/privateScreen';
import NuevoUsuarioForm from '@/components/usuario/nuevoUsuario';
import WebTabBar from '@/components/utiles/webTabBar';
import UsuariosPendientes from '@/components/usuario/usuariosPendientes';

const Usuarios = () => {
  return (
    <PrivateScreen>
      <ScrollView className="flex-1 bg-white">
        <ScreenTabs>
          <View className='w-11/12'>
          
            <Text className="self-start font-geist-bold text-3xl text-text m-5">
              Panel de Administración
            </Text>

            <WebTabBar 
            isAdmin={true}
            />

            {Platform.OS === "web" ? (
              <View className="grid grid-cols-3 gap-3">
                <View className="col-span-2">
                  <NuevoUsuarioForm />
                </View>
                <UsuarioRegistrados />
                <UsuariosPendientes />
              </View>
            ) : (
              <>
                <NuevoUsuarioForm />
                <UsuarioRegistrados />
                <UsuariosPendientes />
              </>
            )}

          </View>
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  );
};

export default Usuarios;

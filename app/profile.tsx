import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import { Screen } from '@/components/utiles/Screen';
import { LogoutIcon } from '@/assets/icons';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context/authContext';
import ModalLogout from '@/components/utiles/modalLogout';

const Profile = () => {
  const { usuario: user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);

  const handleLogout = async () => {
    setModalVisible(false);
    logout;
  };

  if (!user) return null;

  return (
    <ScrollView className="bg-white">
      <Screen>
        <Text className="font-geist-semi-bold text-2xl text-text mt-4 ml-4 mb-2 self-start">
          Mi perfil
        </Text>
        <View className="border rounded-full border-gray-300 p-4 mt-4">
          <Image
            source={require('../assets/images/logotipo-unique.png')}
            style={{ width: 120, height: 120 }}
          />
        </View>
        <View className="w-11/12 items-center justify-between">
          <Text className="mt-4 font-geist text-text text-base">Nombre</Text>
          <TextInput
            className="border w-3/5 h-12 rounded-lg mt-2 px-2"
            value={user!.nombre}
            placeholder="Ingrese su nombre"
            placeholderTextColor="#9ca3af"
          />
          <Text className="mt-4 font-geist text-text text-base">Apellido</Text>
          <TextInput
            className="border w-3/5 h-12 rounded-lg mt-2 px-2"
            value={user!.apellido}
            placeholder="Ingrese su apellido"
            placeholderTextColor="#9ca3af"
          />
          <Text className="mt-4 font-geist text-text text-base">Email</Text>
          <TextInput
            className="border w-3/5 h-12 rounded-lg mt-2 px-2"
            value={user!.email}
            placeholder="Ingrese su email"
            placeholderTextColor="#9ca3af"
          />
          <Link asChild href={'/changePass'}>
            <Pressable className="mt-6 rounded-lg bg-red-alert p-4 w-3/5">
              <Text className="font-geist-semi-bold text-white text-lg text-center">
                Cambiar contraseña
              </Text>
            </Pressable>
          </Link>
          <Pressable className="mt-6 rounded-lg bg-gray-400 p-4 w-3/5">
            <Text className="font-geist-semi-bold text-text text-lg text-center">
              Guardar cambios
            </Text>
          </Pressable>
          <Pressable
            className="flex-row items-center justify-center mt-10 rounded-lg p-4 w-3/5"
            onPress={() => setModalVisible(true)}
          >
            <LogoutIcon color="#9ca3af" />
            <Text className="ml-2 font-geist-semi-bold text-gray-400 text-lg text-center">
              Cerrar sesión
            </Text>
          </Pressable>
        </View>
        <ModalLogout
          visible={modalVisible}
          message={'¿Desea cerrar sesión?'}
          onClose={handleLogout}
        />
      </Screen>
    </ScrollView>
  );
};

export default Profile;

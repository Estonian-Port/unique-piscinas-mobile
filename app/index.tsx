import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import ModalError from '@/components/utiles/modalError';
import { useRouter } from 'expo-router';
import { LoginIcon } from '@/assets/icons';
import LogoUnique from '../assets/images/01_LOGO_UNIQUE.svg';

type rolType = 'admin' | 'user';

const Index = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('12345');
  const [rol, setRol] = useState<rolType>('admin');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();

  const handleLogin = (username: String, password: String) => {
    if (!username || !password) {
      setModalMessage('Por favor, completa todos los campos.');
      setModalVisible(true);
      return;
    }
    if (username !== 'admin' || password !== '12345') {
      setModalMessage('Usuario o contraseña incorrectos.');
      setModalVisible(true);
      return;
    }
    if (rol === 'admin') {
      router.replace('./dashboard');
      return;
    }
    router.replace('./pools');
  };

  return (
    <>
      {/* Configuración específica del StatusBar para el login */}
      <StatusBar backgroundColor="#222247" barStyle="light-content" />

      <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
        <View className="flex-1 items-center justify-center bg-navy-unique h-full w-full">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View className="mb-4 items-center">
              <LogoUnique width={250} height={220} />
            </View>
            <View className="border border-gray-300 rounded-md mb-4 h-10">
              <TextInput
                placeholder="Username"
                placeholderTextColor="#888888"
                style={{ backgroundColor: '#fff', borderRadius: 5 }}
                className="h-full w-full text-center p-2"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View className="border border-gray-300 rounded-md mb-2 h-10">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888888"
                style={{ backgroundColor: '#fff', borderRadius: 5, width: '100%' }}
                secureTextEntry
                className="h-full w-full text-center p-2"
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleLogin(username, password)}
              className="bg-gold-unique rounded-full px-4 py-2 mt-4 flex-row items-center justify-center h-14"
            >
              <LoginIcon />
              <Text className="font-geist-semi-bold text-white ml-2">
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <ModalError
          visible={modalVisible}
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>
    </>
  );
};

export default Index;
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ModalError from '@/components/utiles/modalError';
import { router } from 'expo-router';
import LogoUnique from '../assets/images/01_LOGO_UNIQUE.svg';
import { useAuth } from '@/context/authContext';
import { Eye, EyeOff, LogIn } from 'react-native-feather';

const Index = () => {
  const [email, setEmail] = useState('leo@unique.com');
  const [password, setPassword] = useState('asd');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, usuario } = useAuth();

  useEffect(() => {
    if (usuario) {
      if (usuario.isAdmin) {
        router.replace('/dashboard');
      } else if (usuario.primerLogin) {
        router.replace('/registro');
      } else {
        router.replace('/pools');
      }
    }
  }, [usuario]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error: any) {
      setModalMessage(error.response.data.error);
      setModalVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
      <View className="flex-1 items-center justify-center bg-navy-unique h-full w-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View className="mb-4 items-center">
            <LogoUnique width={250} height={220} />
          </View>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            className="border-2 bg-white border-gray-300 rounded-md py-4 px-3 mb-5"
            value={email}
            onChangeText={setEmail}
          />

          <View className="relative">
            <TextInput
              className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
              value={password}
              placeholder="Ingrese su contraseña"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
            />
            <Pressable
              className="absolute right-4 top-4"
              onPress={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff width={20} height={20} />
              ) : (
                <Eye width={20} height={20} />
              )}
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => handleLogin(email, password)}
            className="bg-gold-unique rounded-full px-4 py-2 mt-4 flex-row items-center justify-center h-14"
          >
            <LogIn color={"white"}/>
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
  );
};

export default Index;

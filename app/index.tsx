import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react'; // <-- Importa useEffect
import ModalError from '@/components/utiles/modalError';
import { router } from 'expo-router';
import { LoginIcon } from '@/assets/icons';
import LogoUnique from '../assets/images/01_LOGO_UNIQUE.svg';
import { useAuth } from '@/context/authContext';

const Index = () => {
  const [email, setEmail] = useState('seba@unique.com');
  const [password, setPassword] = useState('asd');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { login, user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      if (user.isAdmin) {
        router.replace('/dashboard');
      } else {
        router.replace('/pools');
      }
    }
  }, [user, loading])

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (err: any) {
      setModalMessage(err.message);
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
          <View className="border border-gray-300 rounded-md mb-4 h-10">
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888888"
              style={{ backgroundColor: '#fff', borderRadius: 5 }}
              className="h-full w-full text-center p-2"
              value={email}
              onChangeText={setEmail}
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
            onPress={() => handleLogin(email, password)}
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
  );
};

export default Index;
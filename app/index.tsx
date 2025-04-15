import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import ModalError from '@/components/modalError';
import { useRouter } from 'expo-router';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter(); // Inicializa el router

  const handleLogin = (username: String, password: String) => {
    if (!username || !password) {
      setModalMessage('Por favor, completa todos los campos.');
      setModalVisible(true);
      return;
    }
    if (username !== 'admin' || password !== 'admin') {
      setModalMessage('Usuario o contraseña incorrectos.');
      setModalVisible(true);
      return;
    }
    router.replace('./home');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
      <View className="flex-1 items-center justify-center bg-[#0054ae] h-full w-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="mb-4 items-center">
              <Image 
              source={require('../assets/images/logo-unique.png')} 
              resizeMode='contain' 
              style={{ width: 250, height: 220 }} // Ajusta el tamaño de la imagen
              />
            </View>
            <View className="border border-gray-300 rounded-md mb-4 h-10">
              <TextInput
              placeholder="Username"
              placeholderTextColor="#888888"
              style={{ backgroundColor: '#fff' }}
              className="h-full w-full text-center p-2"
              value={username}
              onChangeText={setUsername}
              />
            </View>
            <View className="border border-gray-300 rounded-md mb-2 h-10">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888888"
                style={{ backgroundColor: '#fff' }}
                secureTextEntry
                className="h-full w-full text-center p-2"
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleLogin(username, password)}
              className="bg-[#A38E63] rounded-full px-4 py-2 mt-4 flex-row items-center justify-center h-14"
            >
              <FontAwesome name="sign-in" size={20} color="#fff" />
              <Text className="font-geist-semiBold text-white ml-2">
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

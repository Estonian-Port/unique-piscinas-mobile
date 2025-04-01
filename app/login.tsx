import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const login = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
      <View className='flex-1 items-center justify-center bg-white h-full w-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className='mb-4 items-center'>
          <FontAwesome name="tint" size={30} color="#00BFFF" />
          <Text className="font-geist-bold text-5xl text-primary text-center">Unique Piscinas</Text>
        </View>
        <View>
          <View className='border border-gray-300 rounded-md mb-4 h-10'>
            <TextInput placeholder="Username" className='h-full w-full text-center p-2' />
          </View>
          <View className='border border-gray-300 rounded-md mb-2 h-10'>
            <TextInput placeholder="Password" secureTextEntry className='h-full w-full text-center p-2' />
          </View>
          <TouchableOpacity onPress={() => console.log('Login pressed')}
            className='bg-primary rounded-full px-4 py-2 mt-4 flex-row items-center justify-center h-14'>
            <FontAwesome name="sign-in" size={20} color="#fff" />
            <Text className='font-geist-semiBold text-white ml-2'>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default login;

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import ModalError from '@/components/utiles/modalError';
import { router } from 'expo-router';
import LogoUnique from '../assets/images/01_LOGO_UNIQUE.svg';
import { useAuth } from '@/context/authContext';
import { Eye, EyeOff, LogIn } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <>
      <StatusBar style="light" backgroundColor="#1e1b4b" />
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100 }}
        className="bg-navy-unique"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{ flex: 1 }}
          className="bg-navy-unique"
          edges={['top']}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View className="flex-1 items-center justify-center px-4">
              <View className="mb-8 items-center">
                <LogoUnique width={250} height={220} />
              </View>

              <View style={{ width: 250 }}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9ca3af"
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3 mb-5 w-full"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />

                <View className="relative w-full mb-5">
                  <TextInput
                    className="border-2 bg-white border-gray-300 rounded-md py-4 px-3 w-full pr-12"
                    value={password}
                    placeholder="Ingrese su contraseña"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={() => handleLogin(email, password)}
                  />
                  <Pressable
                    className="absolute right-4 top-4"
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff width={20} height={20} stroke="#666" />
                    ) : (
                      <Eye width={20} height={20} stroke="#666" />
                    )}
                  </Pressable>
                </View>

                <TouchableOpacity
                  onPress={() => handleLogin(email, password)}
                  className="bg-gold-unique rounded-full px-4 py-2 flex-row items-center justify-center h-14 w-full"
                  activeOpacity={0.8}
                >
                  <LogIn color={'white'} />
                  <Text className="font-geist-semi-bold text-white ml-2">
                    Iniciar Sesión
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>

          <ModalError
            visible={modalVisible}
            message={modalMessage}
            onClose={() => setModalVisible(false)}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Index;

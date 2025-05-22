import { SplashScreen, Stack } from 'expo-router';
import './globals.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/utiles/header';
import BotonPerfil from '@/components/utiles/botonPerfil';
import BotonHome from '@/components/utiles/botonHome';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Geist-ExtraLight': require('../assets/fonts/Geist-ExtraLight.ttf'),
    'Geist-Light': require('../assets/fonts/Geist-Light.ttf'),
    'Geist-Regular': require('../assets/fonts/Geist-Regular.ttf'),
    'Geist-Bold': require('../assets/fonts/Geist-Bold.ttf'),
    'Geist-semiBold': require('../assets/fonts/Geist-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      {/* Configuración global del StatusBar */}
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }} className="bg-white">
        <Stack
          screenOptions={{
            headerLeft: () => <Header />,
            headerRight: () => <BotonPerfil />,
            headerTitle: () => '',
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerBackVisible: false }} />
          <Stack.Screen
            name="profile"
            options={{ headerRight: () => <BotonHome /> }}
          />
          <Stack.Screen
            name="changePass"
            options={{ headerRight: () => null }}
          />
          <Stack.Screen
            name="(tabs-adm)"
            options={{ headerRight: () => null }}
          />
          <Stack.Screen
            name="nuevaPiscina"
            options={{ headerRight: () => null }}
          />
          <Stack.Screen
            name="[idPiscinaEquipos]"
            options={{ headerRight: () => null }}
          />
          <Stack.Screen
            name="readings/[idPiscinaReadings]"
            options={{ headerRight: () => null }}
          />
        </Stack>
      </SafeAreaView>
    </>
  );
}

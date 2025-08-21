import { Slot, SplashScreen } from 'expo-router';
import './globals.css';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '@/components/utiles/navBar';
import { AuthProvider } from '@/context/authContext';

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
    <AuthProvider>
        <SafeAreaView style={{ flex: 1 }} className="bg-white">
          <NavBar />
          <Slot />
        </SafeAreaView>
    </AuthProvider>
  );
}

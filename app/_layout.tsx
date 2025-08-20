import { Slot, SplashScreen } from 'expo-router';
import './globals.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoolProvider } from '@/context/piscinaContext';
import { AuthProvider } from '@/context/authContext';
import NavBar from '@/components/utiles/navBar';

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
      <PoolProvider>
        <SafeAreaView style={{ flex: 1 }} className="bg-white">
          <NavBar />
          <Slot />
        </SafeAreaView>
      </PoolProvider>
    </AuthProvider>
  );
}

import { SplashScreen, Stack } from "expo-router";
import './globals.css';
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Geist-ExtraLight": require("../assets/fonts/Geist-ExtraLight.ttf"),
    "Geist-Light": require("../assets/fonts/Geist-Light.ttf"),
    "Geist-Regular": require("../assets/fonts/Geist-Regular.ttf"),
    "Geist-Bold": require("../assets/fonts/Geist-Bold.ttf"),
    "Geist-SemiBold": require("../assets/fonts/Geist-SemiBold.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </SafeAreaView>
      );
}

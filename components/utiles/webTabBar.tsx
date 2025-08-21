// components/CustomTabBar.tsx
import React from "react";
import { View, Pressable, Text, Platform } from "react-native";
import { useRouter, usePathname, Stack } from "expo-router";

const tabs = [
  { name: "Resumen", route: "/resume" },
  { name: "Equip.", route: "/equipment" },
  { name: "Programación", route: "/programation" },
  { name: "FAQ", route: "/faq" },
];

export default function WebTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = async (route: string) => {
    router.replace(`/(tabs)${route}`);
  }
    
  if (Platform.OS !== "web") return null;


  return (
    <View className="flex-row bg-gray-100 rounded-lg p-1 w-11/12 mb-4">
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
           <Pressable
                key={tab.name}
                onPress={() => handlePress(tab.route)}
                className={`flex-1 py-2 rounded-md items-center justify-center ${
                isActive ? "bg-white shadow" : ""
                }`}
            >
                <Text className={`font-semibold ${isActive ? "text-black" : "text-gray-500"}`}>
                {tab.name}
                </Text>
            </Pressable>
            );
      })}
    </View>
  );
}

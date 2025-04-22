import { View } from "react-native";

export function Screen({ children }: { children: any }) {
  return <View className="flex-1 items-center justify-center h-full">{children}</View>;
}

export function ScreenTabs({ children }: { children: any }) {
  return <View className="flex-1 items-center justify-center h-full mb-24">{children}</View>;
}
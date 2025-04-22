import { View } from "react-native";

export function ScreenCard({ children }: { children: any }) {
  return <View className="bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200">{children}</View>;
}
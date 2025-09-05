import { View } from "react-native";

export function ScreenCard({ children }: { children: any }) {

  return <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200 w-full">{children}</View>;
}
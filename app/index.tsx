import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <FontAwesome name="tint" size={30} color="#00BFFF" />
      <Text className="text-5xl font-bold text-cyan-800">Unique Piscinas</Text>
    </View>
  );
}

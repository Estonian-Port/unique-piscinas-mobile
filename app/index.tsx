import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import login from "./login";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white h-full">
      <FontAwesome name="tint" size={30} color="#00BFFF" />
      <Text className="text-5xl font-bold text-cyan-800">Unique Piscinas</Text>
      <TouchableOpacity>
        <Link href='/login'>
          <Text>Login</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

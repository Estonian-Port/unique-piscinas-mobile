import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CardStats from "@/components/cardStats";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white h-full">
      <FontAwesome name="tint" size={30} color="#00BFFF" />
      <Text className="text-5xl font-bold text-cyan-800">Unique Piscinas</Text>
      <CardStats title={"pH"} icon={"tint"} data={5.5} color={"#000"}></CardStats>
      <CardStats title={"Temperatura"} icon={"thermometer-half"} data={22.9} color={"#FF4500"}></CardStats>
    </View>
  );
}

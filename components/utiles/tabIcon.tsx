import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
      return (
        <View
          className="size-full justify-center items-center mt-4 rounded-full"
        >
            <MaterialIcons name={icon} size={25} color="#a59064"/>

        </View>
      );
    }
  
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <MaterialIcons name={icon} size={25} color="#222247"/>

      </View>
    );
  }

  export default TabIcon;

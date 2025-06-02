import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
      return (
        <View
          className="bg-white flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <MaterialIcons name={icon} size={15} color="#a59064"/>
          <Text className="text-unique text-sm font-semibold ml-2 text-navy-unique">
            {title}
          </Text>
        </View>
      );
    }
  
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <MaterialIcons name={icon} size={17} color="#a59064"/>
      </View>
    );
  }

  export default TabIcon;
import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
      return (
        <View
          className="bg-white flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <FontAwesome name={icon} size={15} color="#151312"/>
          <Text className="text-secondary text-sm font-semibold ml-2">
            {title}
          </Text>
        </View>
      );
    }
  
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <FontAwesome name={icon} size={17} color="#A8B5DB"/>
      </View>
    );
  }

  export default TabIcon;
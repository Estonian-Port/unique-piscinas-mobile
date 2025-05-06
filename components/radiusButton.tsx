import { View, Text, Pressable } from "react-native";

interface RadioButtonProps {
  value: any;
  label: string;
  selected: boolean;
  onPress: (value: any) => void;
}

const RadioButton = ({ value, label, selected, onPress }: RadioButtonProps) => {
  const handleOnPress = (value: any) => {
    onPress(value);
  };

  return (
    <Pressable onPress={() => handleOnPress(value)} className="flex-row items-center my-2 space-x-2">
      <Dot selected={selected} />
      <View>
        <Text className="text-base text-text font-geist ml-1">{label}</Text>
      </View>
    </Pressable>
  );
};

const Dot = ({ selected }: { selected: boolean }) => {
  return (
    <View className="w-5 h-5 rounded-full border-2 border-black items-center justify-center">
      <View
        className={`w-2.5 h-2.5 rounded-full ${
          selected ? "bg-black" : "bg-transparent"
        }`}
      />
    </View>
  );
};

export default RadioButton;
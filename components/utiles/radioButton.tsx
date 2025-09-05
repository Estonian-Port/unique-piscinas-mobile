import { View, Text, Pressable } from "react-native";

interface RadioButtonProps {
  value: any;
  label: string;
  selected: boolean;
  onPress: (value: any) => void;
  disabled?: boolean;
}

const RadioButton = ({ value, label, selected, onPress, disabled = false }: RadioButtonProps) => {
  const handleOnPress = (value: any) => {
    if (!disabled) onPress(value);
  };

  return (
    <Pressable
      onPress={() => handleOnPress(value)}
      className={`flex-row items-center my-2 space-x-2 ${disabled ? "opacity-50" : ""}`}
      disabled={disabled}
    >
      <Dot selected={selected} disabled={disabled} />
      <View>
        <Text className={`text-base font-geist ml-1 ${disabled ? "text-gray-400" : "text-text"}`}>{label}</Text>
      </View>
    </Pressable>
  );
};

const Dot = ({ selected, disabled }: { selected: boolean; disabled?: boolean }) => {
  return (
    <View className={`w-5 h-5 rounded-full border-2 ${disabled ? "border-gray-400" : "border-black"} items-center justify-center`}>
      <View
        className={`w-2.5 h-2.5 rounded-full ${
          selected ? (disabled ? "bg-gray-400" : "bg-black") : "bg-transparent"
        }`}
      />
    </View>
  );
};

export default RadioButton;
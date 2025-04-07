import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type CardFilterWaterProps = {
  icon: any;
  title: string;
  description: string;
  colorIcon: string;
  sizeIcon: number;
};

const CardFilterWater = ({ icon, title, description, colorIcon, sizeIcon }: CardFilterWaterProps) => {
  return (
    <TouchableOpacity>
      <View className="border border-gray-200 items-center justify-between bg-white rounded-sm p-4 my-2 w-full">
        <View style={{ backgroundColor: colorIcon }} className="w-min h-min bg-slate-300 rounded-full p-2 mb-3">
          <MaterialIcons name={icon} size={sizeIcon} color={'023236'} />
        </View>
        <Text className="font-geist-semiBold text-2xl text-text">{title}</Text>
        <Text className="font-geist-regular text-lg text-text">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardFilterWater;

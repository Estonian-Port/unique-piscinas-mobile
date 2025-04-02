import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type CardFilterProps = {
  icon: any;
  title: string;
  description: string;
};

const CardFilter = ({ icon, title, description }: CardFilterProps) => {
  return (
    <TouchableOpacity>
      <View className="border border-gray-200 items-center justify-between bg-white rounded-sm p-4 my-2 w-full">
        <View className="w-min h-min bg-slate-300 rounded-full p-2 mb-3">
          <MaterialIcons name={icon} size={24} color={'#6B2346'} />
        </View>
        <Text className="font-geist-semiBold text-2xl text-text">{title}</Text>
        <Text className="font-geist-regular text-l text-text">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardFilter;

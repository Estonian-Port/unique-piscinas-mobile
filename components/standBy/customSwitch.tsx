import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomSwitch = ({ isManual, setIsManual }: { isManual: boolean; setIsManual: (value: boolean) => void }) => {
  return (
    <View className="flex-row items-center justify-center bg-gray-200 rounded-lg p-1 w-full">
      <TouchableOpacity
        className={`flex-row justify-center items-center rounded-lg px-2 h-full w-1/2 ${
          isManual ? 'bg-black' : 'bg-transparent'
        }`}
        onPress={() => setIsManual(true)}
      >
        <MaterialIcons
          name="pan-tool"
          size={15}
          color={isManual ? '#fff' : '000'}
        />
        <Text
          className={`font-geist-semi-bold text-base ml-2 ${
            isManual ? 'text-white' : 'text-black'
          }`}
        >
          Manual
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`flex-row justify-center items-center rounded-lg py-3 h-full w-1/2 ${
          !isManual ? 'bg-black' : 'bg-transparent'
        }`}
        onPress={() => setIsManual(false)}
      >
        <MaterialIcons
          name="auto-fix-high"
          size={24}
          color={!isManual ? '#fff' : '#000'}
        />
        <Text
          className={`font-geist-semi-bold text-base ml-2 ${
            !isManual ? 'text-white' : 'text-black'
          }`}
        >
          Automático
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitch;

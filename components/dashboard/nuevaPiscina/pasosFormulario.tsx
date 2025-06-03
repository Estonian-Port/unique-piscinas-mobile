import { View, Text } from 'react-native';
import React from 'react';

const PasosFormulario = ({ paso }: { paso: number }) => {
  return (
    <View className="flex-row items-center gap-1">
      <View
        className={`w-7 h-7 p-1 rounded-full ${
          paso === 1 ? 'bg-purple-unique' : 'bg-gray-300'
        }`}
      >
        <Text className="text-white text-sm font-geist-semi-bold text-center">
          1
        </Text>
      </View>
      <View
        className={`w-7 h-7 p-1 rounded-full ${
          paso === 2 ? 'bg-purple-unique' : 'bg-gray-300'
        }`}
      >
        <Text className="text-white text-sm font-geist-semi-bold text-center">
          2
        </Text>
      </View>
      <View
        className={`w-7 h-7 p-1 rounded-full ${
          paso === 3 ? 'bg-purple-unique' : 'bg-gray-300'
        }`}
      >
        <Text className="text-white text-sm font-geist-semi-bold text-center">
          3
        </Text>
      </View>
    </View>
  );
};

export default PasosFormulario;

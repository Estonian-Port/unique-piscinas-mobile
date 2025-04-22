import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const BotonHome = () => {
  return (
    <Link href={'/pools'} asChild>
      <Pressable>
        <View className="p-1 border rounded-full bg-gray-200 items-center justify-center">
          <MaterialIcons name="home" size={24} color="#000" />
        </View>
        <Text className="font-geist-semiBold text-text text-sm text-center">
          Home
        </Text>
      </Pressable>
    </Link>
  );
};

export default BotonHome;

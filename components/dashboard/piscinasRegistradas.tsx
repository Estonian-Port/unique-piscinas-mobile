import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import TablaPiscinas from './tablaPiscinas';
import { Link } from 'expo-router';

const PiscinasRegistradas = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-text font-geist-semi-bold text-2xl">
          Piscinas Registradas
        </Text>
        <Link asChild href="/nuevaPiscina">
          <Pressable className="border rounded-lg bg-black p-2">
            <Text className="text-white font-geist-semi-bold text-sm">
              + Nueva Piscina
            </Text>
          </Pressable>
        </Link>
      </View>
      <TextInput
        className="border rounded-lg p-2 bg-white text-base border-gray-300 mb-5"
        placeholder="Buscar piscina por nombre o propietario"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        autoCapitalize="none"
      />
      <TablaPiscinas />
    </ScreenCard>
  );
};

export default PiscinasRegistradas;

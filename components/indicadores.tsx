import { View, Text } from 'react-native';
import React from 'react';
import { ScreenCard } from './ScreenCard';
import { MaterialIcons } from '@expo/vector-icons';

const indicadores: { title: string; icon: 'bolt' | 'lightbulb-outline' | 'water' | 'thermostat' }[] = [
  {
    title: 'UV',
    icon: 'bolt',
  },
  {
    title: 'ION',
    icon: 'lightbulb-outline',
  },
  {
    title: 'US',
    icon: 'water',
  },
  {
    title: 'Calentador',
    icon: 'thermostat',
  },
];

const Indicadores = () => {
  return (
    <ScreenCard>
      <View className="flex-row justify-between items-center">
        {indicadores.map((indicador, index) => (
          <View key={index} className='flex-1 items-center'>
            <View className="border border-orange-400 p-3 rounded-full bg-white items-center">
              <MaterialIcons name={indicador.icon} size={32} color="black" />
            </View>
            <Text className="font-geist-semi-bold text-base mt-1">{indicador.title}</Text>
          </View>
        ))}
      </View>
    </ScreenCard>
  );
};

export default Indicadores;

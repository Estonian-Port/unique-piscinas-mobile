import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import CardFilterWater from './cardFilterWater';

const entryWaterData = [
  {
    icon: 'water-drop',
    title: 'Fondo',
    description: 'Limpieza del fondo de la piscina',
  },
  {
    icon: 'bubble-chart',
    title: 'Barrefondo',
    description: 'Aspiración automática del fondo',
  },
  {
    icon: 'visibility',
    title: 'Skimmer',
    description: 'Limpieza de la superficie del agua',
  },
];

interface WaterControlProps {
  entryWater: waterInletsType[];
}

export default function EntryWater({ entryWater }: WaterControlProps) {
  const hasEntryWater = entryWater.length > 0 ? true : false;

  return (
    <View className="bg-white shadow-md rounded-lg p-4 mb-4 w-11/12">
      <View className="justify-between mb-4 flex-1">
        <Text className="font-geist-semiBold text-3xl text-text">
          Entradas de Agua
        </Text>
        <Text className="font-geist-regular text-sm text-text">
          Seleccione las entradas de agua para su sistema
        </Text>
      </View>
      <TouchableOpacity className="bg-white rounded-sm p-2 flex-row items-center border border-gray-200 justify-center mb-4">
        <MaterialIcons name="check-box" size={24} color="#000" />
        <Text className="font-geist-semiBold text-sm text-text ml-2">
          Seleccionar Todos
        </Text>
      </TouchableOpacity>
      {entryWaterData.map((entry, index) => (
        <CardFilterWater
          key={index}
          icon={entry.icon}
          title={entry.title}
          description={entry.description}
          colorIcon={'#dbeafe'}
          sizeIcon={40}
        />
      ))}
      {!hasEntryWater && (
        <View className="border border-gray-200 rounded-sm flex-row justify-between items-center py-3 px-1">
          <MaterialIcons name="info" size={24} color="#B87E9F" />
          <Text className="flex-1 font-geist-semiBold text-base text-text ml-2">
            Seleccione al menos una entrada de agua para activar el sistema de
            filtrado.
          </Text>
        </View>
      )}
    </View>
  );
}

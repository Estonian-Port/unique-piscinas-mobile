import { View, Text } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import CardFilterWater from './cardFilterWater';

const filterData = [
  {
    icon: 'filter-alt',
    title: 'Filtrar',
    description: 'Filtrado normal del agua',
  },
  {
    icon: 'replay',
    title: 'Retrolavar',
    description: 'Limpieza de filtro con flujo inverso',
  },
  {
    icon: 'waves',
    title: 'Enjuagar',
    description: 'Aclarado después del retrolavado',
  },
  {
    icon: 'delete',
    title: 'Desagotar',
    description: 'Vaciado del agua al desagüe',
  },
  {
    icon: 'autorenew',
    title: 'Recircular',
    description: 'Recirculación sin filtrado',
  },
];

interface FilterControlProps {
  waterEntryFilter: EntryFilter[];
}

export default function FilterControl({
  waterEntryFilter,
}: FilterControlProps) {
  const filterControl = waterEntryFilter.length > 0 ? true : false;

  return (
    <View className="bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-geist-semiBold text-3xl text-text">
          Control de Filtro
        </Text>
        {filterControl ? (
          <View className="bg-green-200 rounded-full p-2">
            <Text className="font-geist-semiBold text-sm text-text">
              Activado
            </Text>
          </View>
        ) : (
          <View className="bg-red-200 rounded-full p-2">
            <Text className="font-geist-semiBold text-sm text-text">
              Desactivado
            </Text>
          </View>
        )}
      </View>
      {!filterControl && (
        <View className="border border-gray-200 rounded-sm flex-row justify-between items-center py-3 px-1">
          <MaterialIcons name="info" size={24} color="#B87E9F" />
          <Text className="flex-1 font-geist-semiBold text-base text-text ml-2">
            Seleccione al menos una entrada de agua para activar el sistema de
            filtrado.
          </Text>
        </View>
      )}
      {filterData.map((filter, index) => (
        <CardFilterWater
          key={index}
          icon={filter.icon}
          title={filter.title}
          description={filter.description}
          colorIcon={'#b9d1d3'}
          sizeIcon={24}
        />
      ))}
    </View>
  );
}

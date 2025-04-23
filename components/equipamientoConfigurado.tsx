import { View, Text } from 'react-native';
import React from 'react';
import { ScreenCard } from './ScreenCard';
import { ConfigurationIcon, FilterIcon, PowerIcon, TintIcon } from '@/assets/icons';
import IndicadorEstado from './indicadorEstado';

const EquipamientoConfigurado = () => {
  return (
    <ScreenCard>
      <View className="flex-row items-center self-start mb-3">
        <ConfigurationIcon />
        <Text className="font-geist-semiBold text-text text-2xl ml-2">
          Equipamiento configurado
        </Text>
      </View>

      <View className="flex-row items-center self-start my-2">
        <PowerIcon />
        <Text className="font-geist-semiBold text-text text-lg ml-2">
          Bombas
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-lg ml-2">
            Bomba Principal
          </Text>
        </View>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-lg mx-1">
            Activa
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-lg ml-2">
            Bomba Auxiliar
          </Text>
        </View>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-lg mx-1">
            Inactiva
          </Text>
        </View>
      </View>

      <View className="flex-row items-center self-start my-2">
      <FilterIcon size={18} color={'blue'}/>
        <Text className="font-geist-semiBold text-text text-lg ml-2">
          Filtro
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-lg ml-2">
            Filtro Principal
          </Text>
        </View>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-lg mx-1">
            Activa
          </Text>
        </View>
      </View>

      <View className="flex-row items-center self-start my-2">
        <TintIcon size={18} color={'blue'}/>
        <Text className="font-geist-semiBold text-text text-lg ml-2">
          Válvulas
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-lg ml-2">
            Válvula Selectora
          </Text>
        </View>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-lg mx-1">
            Activa
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-lg ml-2">
            Válvula Skimmer
          </Text>
        </View>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-lg mx-1">
            Atención
          </Text>
        </View>
      </View>
    </ScreenCard>
  );
};

export default EquipamientoConfigurado;

import { View, Text } from 'react-native';
import React from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { ConfigurationIcon, FilterIcon, InfoIcon, PowerIcon, TintIcon } from '@/assets/icons';
import IndicadorEstado from './indicadorEstado';

const EquipamientoConfigurado = () => {
  return (
    <ScreenCard>
      <View className="flex-row items-center self-start mb-3">
        <ConfigurationIcon />
        <Text className="font-geist-semi-bold text-text text-2xl ml-2">
          Equipamiento configurado
        </Text>
      </View>

      <View className="flex-row items-center self-start my-2">
        <PowerIcon />
        <Text className="font-geist-semi-bold text-text text-lg ml-2">
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
          <Text className="font-geist text-text text-sm mx-1">
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
          <Text className="font-geist text-text text-sm mx-1">
            Inactiva
          </Text>
        </View>
      </View>

      <View className="flex-row items-center self-start my-2">
      <FilterIcon size={18} color={'blue'}/>
        <Text className="font-geist-semi-bold text-text text-lg ml-2">
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
          <Text className="font-geist text-text text-sm mx-1">
            Activa
          </Text>
        </View>
      </View>

      <View className="flex-row items-center self-start my-2">
        <TintIcon size={18} color={'blue'}/>
        <Text className="font-geist-semi-bold text-text text-lg ml-2">
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
          <Text className="font-geist text-text text-sm mx-1">
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
          <Text className="font-geist text-text text-sm mx-1">
            Atención
          </Text>
        </View>
      </View>

    <View className='w-full h-0.5 bg-gray-200 my-3' />

    <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-lg ml-2">
            Lámpara UV
          </Text>
        </View>
        <Text className="font-geist-light text-text text-base mx-1">
          1.5 horas
        </Text>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-sm mx-1">
            Reemplazo próximo
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-lg ml-2">
            Ionizador de Cobre
          </Text>
        </View>
        <Text className="font-geist-light text-text text-base mx-1">
          35% desgaste
        </Text>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-sm mx-1">
            Atención
          </Text>
        </View>
      </View>

      <View className='flex-row w-full items-center rounded-md bg-yellow-100 p-2 mt-3 gap-2'>
        <InfoIcon color={'orange'}/>
        <Text className="font-geist text-text text-sm flex-shrink">
          Algunos equipos requieren atención. Revise el estado de los componentes marcados.
        </Text>
      </View>

    </ScreenCard>
  );
};

export default EquipamientoConfigurado;

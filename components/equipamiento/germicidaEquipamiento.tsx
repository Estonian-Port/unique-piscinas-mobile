import { View, Text } from 'react-native';
import React from 'react';
import IndicadorEstado from './indicadorEstado';
import { Germicida } from '@/data/domain/piscina';

const GermicidaEquipamiento = ({ germicida }: { germicida: Germicida }) => {
  return (
    <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
        <IndicadorEstado />
      <View className='ml-2'>
          <Text className="font-geist text-text text-base">
            {germicida.tipo}
          </Text>
        <Text className="font-geist-light text-text text-sm">
          {germicida.vidaRestante} horas restantes
        </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
        <Text className="font-geist text-text text-sm mx-1">
          {germicida.estado}
        </Text>
      </View>
    </View>
  );
};

export default GermicidaEquipamiento;

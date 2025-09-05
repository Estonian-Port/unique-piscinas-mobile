import { View, Text } from 'react-native';
import React from 'react';
import IndicadorEstado from './indicadorEstado';
import { Valvula } from '@/data/domain/piscina';

const ValvulaCard = ({ valvula }: { valvula: Valvula }) => {
  return (
    <View className="flex-row items-center justify-between mb-1">
      <View className="flex-row items-center self-start">
        <IndicadorEstado />
        <Text className="font-geist text-text text-base ml-2">
          Válvula {valvula.tipo}
        </Text>
      </View>
      <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
        <Text className="font-geist text-text text-sm mx-1">{valvula.estado}</Text>
      </View>
    </View>
  );
};

export default ValvulaCard;

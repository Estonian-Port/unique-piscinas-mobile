import { View, Text } from 'react-native';
import React from 'react';
import IndicadorEstado from './indicadorEstado';
import { Filtro } from '@/data/domain/piscina';

const FiltroCard = ({ filtro }: { filtro: Filtro }) => {
  return (
    <View className="flex-row items-center justify-between mb-1">
      <View className="flex-row items-center self-start">
        <IndicadorEstado />
        <View className="ml-2">
          <Text className="font-geist text-text text-base">
            Filtro {filtro.marca}
          </Text>
          <Text className="font-geist-light text-text text-sm">
            {filtro.vidaRestante
              ? `Vida útil restante: ${filtro.vidaRestante == 1 ? '1 mes' : `${filtro.vidaRestante} meses`}`
              : ''}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
        <Text className="font-geist text-text text-sm mx-1">{filtro.activo ? 'Activo' : 'Inactivo'}</Text>
      </View>
    </View>
  );
};

export default FiltroCard;
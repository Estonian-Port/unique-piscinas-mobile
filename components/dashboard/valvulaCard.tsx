import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { Valvula } from '@/data/domain/piscina';
import { Edit2, RefreshCw } from 'react-native-feather';

const ValvulaCard = ({ valvula }: { valvula: Valvula }) => {
  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-base font-geist-semi-bold text-text">
          {valvula.nombre}
        </Text>
        <Pressable className="ml-2">
          <Edit2 />
        </Pressable>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-text font-geist text-base">Estado:</Text>
        <View
          className={`rounded-full px-2 ${
            valvula.estado === 'Operativa'
              ? 'bg-green-500'
              : valvula.estado === 'Requiere revisión'
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
        >
          <Text className="font-geist-semi-bold text-white text-sm">
            {valvula.estado}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Tipo:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {valvula.tipo}
        </Text>
      </View>
      <Pressable className="flex-row rounded-lg bg-black py-2 items-center justify-center mt-2">
        <RefreshCw color={'white'} height={20} width={20}  />
        <Text className="text-white font-geist text-base ml-2">
          Marcar como reemplazada
        </Text>
      </Pressable>
    </ScreenCard>
  );
};

export default ValvulaCard;

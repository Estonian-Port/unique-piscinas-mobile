import { View, Text } from 'react-native';
import React from 'react';
import { ScreenCard } from './ScreenCard';

const RegistroCard = ({ registro }: { registro: Registro }) => {
  return (
    <ScreenCard>
      <View className="p-2 bg-cyan-800 rounded-lg mb-2">
        <Text className="text-white font-geist-semi-bold text-lg">
          {registro.accion}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-2.5">
        <View className="flex-row items-center">
          <Text className="text-text font-geist-semi-bold text-base">Fecha: </Text>
          <Text className="font-geist tex-text text-base">
            {registro.fecha}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-text font-geist-semi-bold text-base">Dispositivo: </Text>
          <Text className="font-geist tex-text text-base">
            {registro.dispositivo}
          </Text>
        </View>
      </View>

      <View className="mb-2.5">
        <Text className="text-text font-geist-semi-bold text-base">Descripción: </Text>
        <Text className="font-geist tex-text text-base flex-shrink">
          {registro.descripcion}
        </Text>
      </View>

      <View className="flex-row items-center mb-2.5">
        <Text className="text-text font-geist-semi-bold text-base">Técnico: </Text>
        <Text className="font-geist tex-text text-base">
          {registro.tecnico}
        </Text>
      </View>
    </ScreenCard>
  );
};

export default RegistroCard;

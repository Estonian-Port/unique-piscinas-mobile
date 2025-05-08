import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { ThermostatIcon } from '@/assets/icons';

const CalefaccionCard = ({ calefaccion }: { calefaccion: Calefaccion }) => {
  const [isActive, setIsActive] = useState(calefaccion.activa);

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center">
          <ThermostatIcon color={'orange'} />
          <View className="mx-2">
            <Text className="text-base font-geist-semi-bold text-text">
              {calefaccion.nombre}
            </Text>
          </View>
        </View>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#000000' }}
          thumbColor='#fcdb99'
          ios_backgroundColor="#d3d3d3"
          onValueChange={() => setIsActive(!isActive)}
          value={isActive}
        />
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Tipo:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {calefaccion.tipo}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Marca:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {calefaccion.marca}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Modelo:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {calefaccion.modelo}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Potencia:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {calefaccion.potencia} kW
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-text font-geist text-base">Estado:</Text>
        <View
          className={`rounded-full px-2 ${
            isActive ? 'bg-green-500' : 'bg-gray-500'
          }`}
        >
          <Text className="font-geist-semi-bold text-white text-base">
            {isActive ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>
    </ScreenCard>
  );
};

export default CalefaccionCard;

import { View, Text, Switch, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { EditIcon, ThermostatIcon } from '@/assets/icons';
import { Calefaccion } from '@/data/domain/piscina';

const CalefaccionCard = ({ calefaccion }: { calefaccion: Calefaccion }) => {

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center">
          <ThermostatIcon color={'orange'} />
          <View className="flex-row mx-2">
            <Text className="text-base font-geist-semi-bold text-text">
              {calefaccion.tipo}
            </Text>
            <Pressable className="ml-2">
              <EditIcon />
            </Pressable>
          </View>
        </View>
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
            calefaccion.activa ? 'bg-green-500' : 'bg-gray-500'
          }`}
        >
          <Text className="font-geist-semi-bold text-white text-sm">
            {calefaccion.activa ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>
    </ScreenCard>
  );
};

export default CalefaccionCard;

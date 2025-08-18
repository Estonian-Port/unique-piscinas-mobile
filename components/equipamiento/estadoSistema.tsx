import { View, Text } from 'react-native';
import React from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import PressureGauge from './pressure';
import { PiscinaEquipamiento } from '@/data/domain/piscina';

const EstadoSistema = ({ pool }: { pool: PiscinaEquipamiento }) => {
  return (
    <ScreenCard>
      <Text className="font-geist-semi-bold text-text text-3xl mb-3">
        Estado del Sistema
      </Text>

      <View className="flex-row justify-between items-center w-full mb-3">
        <Text className="font-geist-semi-bold text-text text-base">
          Estado del filtro:
        </Text>
        <View className="bg-gray-200 rounded-full p-2">
          <Text className="font-geist-semi-bold text-sm text-text">
            {pool.filtro.activo ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="font-geist-semi-bold text-text text-base">
          Modo activo:
        </Text>
        <Text className="font-geist text-base text-text">
          {pool.funcionActiva.length === 0
            ? 'Ninguno'
            : pool.funcionActiva.join(', ')}
        </Text>
      </View>

      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="font-geist-semi-bold text-text text-base">
          Entradas activas:
        </Text>
        <Text className="font-geist text-base text-text">
          {pool.entradaAgua.length === 0
            ? 'Ninguno'
            : pool.entradaAgua.join(', ')}
        </Text>
      </View>

      <View className="border-t border-gray-300 my-2"></View>

      <PressureGauge
        currentValue={pool.presion}
        minValue={0}
        maxValue={3}
      ></PressureGauge>

      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="font-geist-semi-bold text-text text-base">
          Última actividad:
        </Text>
        <Text className="font-geist text-base text-text">
          {pool.ultimaActividad}
        </Text>
      </View>

      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className="font-geist-semi-bold text-text text-base">
          Próximo ciclo:
        </Text>
        <Text className="font-geist text-base text-text">
          {pool.proximoCiclo}
        </Text>
      </View>
    </ScreenCard>
  );
};

export default EstadoSistema;

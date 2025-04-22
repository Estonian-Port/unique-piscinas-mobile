import { View, Text } from 'react-native';
import React from 'react';
import PressureGauge from './pressure';

const EstadoSistema = () => {
  return (
    <View className="bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200">
      <Text className="font-geist-semiBold text-text text-3xl mb-3">
        Estado del Sistema
      </Text>

      <View className="flex-row justify-between items-center w-full mb-3">
        <Text className='font-geist-semiBold text-text text-base'>Estado del filtro:</Text>
        <View className="bg-gray-200 rounded-full p-2">
          <Text className="font-geist-semiBold text-sm text-text">
            En reposo
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className='font-geist-semiBold text-text text-base'>Modo activo:</Text>
        <Text className="font-geist text-base text-text">Ninguno</Text>
      </View>

      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className='font-geist-semiBold text-text text-base'>Entradas activas:</Text>
        <Text className="font-geist text-base text-text">Ninguna</Text>
      </View>

      <View className="border-t border-gray-300 my-2"></View>

      <PressureGauge
        currentValue={1.2}
        minValue={0}
        maxValue={3}
      ></PressureGauge>

      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className='font-geist-semiBold text-text text-base'>Última actividad:</Text>
        <Text className="font-geist text-base text-text">
          Hace 2 horas
        </Text>
      </View>

      <View className="flex-row justify-between items-center w-full mb-5">
        <Text className='font-geist-semiBold text-text text-base'>Próximo ciclo:</Text>
        <Text className="font-geist text-base text-text">
          En 4 horas
        </Text>
      </View>
    </View>
  );
};

export default EstadoSistema;

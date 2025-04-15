import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Bar from './bar';

const CardTransductor = () => {
  const [trasductor, setTrasductor] = useState(false);

  return (
    <View
      className={`bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200 ${
        trasductor ? '' : 'opacity-50'
      }`}
    >
      <View className="flex-row justify-between items-center w-full mb-2">
        <Text className="font-geist-bold text-text text-lg">
          Transductor de Ultrasonido
        </Text>
        {trasductor ? (
          <View className="bg-green-200 rounded-full p-2">
            <Text className="font-geist-semiBold text-sm text-text">
              Activado
            </Text>
          </View>
        ) : (
          <View className="bg-red-200 rounded-full p-2">
            <Text className="font-geist-semiBold text-sm text-text">
              Desactivado
            </Text>
          </View>
        )}
      </View>
      <View className="flex-row justify-between items-center w-full mb-3">
        <View className="flex-row items-center">
          <MaterialIcons name="water" size={18} color="#9B5278" />
          <Text className="font-geist text-text text-base ml-1">
            Estado del trasductor
          </Text>
        </View>
        <Text className="font-geist-semiBold text-lg text-green-400">
          Óptimo
        </Text>
      </View>
      <View className="flex-row justify-between items-center w-full mb-2">
        <Text className="font-geist text-text text-base">Vida restante</Text>
        <Text className="font-geist-semiBold text-lg text-green-400">
          68% restante
        </Text>
      </View>
      <Bar currentValue={68} colorBar={'black'}/>

      <View className="flex-row justify-between items-center w-full mt-5 mb-2">
        <Text className="font-geist text-text text-base">Potencia actual</Text>
        <Text className="font-geist-semiBold text-lg text-green-400">
          65% restante
        </Text>
      </View>
      <Bar currentValue={65} colorBar={'black'} />

      <View className="flex-row justify-between items-center w-full my-4">
        <View className="flex-row items-center">
          <MaterialIcons name="schedule" size={18} color="#9B5278" />
          <Text className="font-geist text-text text-sm ml-1">
            Horas usadas: 3200
          </Text>
        </View>

        <View className="flex-row items-center">
          <MaterialIcons name="schedule" size={18} color="#9B5278" />
          <Text className="font-geist text-text text-sm ml-1">
            Horas restantes: 6800
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center w-full mt-1 mb-2">
      <Text className='font-geist text-text text-md mb-1'>Efectividad germicida:</Text>
      <Text className="font-geist-semiBold text-lg text-green-400">
          65% restante
        </Text>
    </View>
      <Bar currentValue={72} colorBar={'green-400'} />
      <TouchableOpacity className="my-5">
        <View className="bg-gray-200 rounded-lg p-4 mb-1">
          <Text className="font-geist-semiBold text-text text-center">
            Resetear (despues de reemplazo)
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardTransductor;

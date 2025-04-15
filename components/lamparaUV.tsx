import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Bar from './bar';

const LamparaUV = () => {
  const [copperIonizer, setCopperIonizer] = useState(true);

  return (
    <View
      className={`bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200 ${
        copperIonizer ? '' : 'opacity-50'
      }`}
    >
      <View className="flex-row justify-between items-center w-full mb-1">
        <Text className="font-geist-bold text-text text-lg">Lámpara UV</Text>
        {copperIonizer ? (
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
      <View className="flex-row justify-between items-center w-full mb-1">
        <View className="flex-row items-center">
          <MaterialIcons name="bolt" size={24} color="#d4b14b" />
          <Text className="font-geist text-text text-lg">
            Estado lámpara
          </Text>
        </View>
        <Text className="font-geist-semiBold text-lg text-yellow-400">
          Reemplazo próximo
        </Text>
      </View>
      <View className="flex-row justify-between items-center w-full mt-5 mb-2">
        <Text className="font-geist text-text text-base">Vida restante</Text>
        <Text className="font-geist-semiBold text-lg text-yellow-400">
          23%
        </Text>
      </View>
      <Bar currentValue={23} colorBar={'black'} />

      <View className="flex-row justify-between items-center w-full my-4">
        <View className="flex-row items-center">
          <MaterialIcons name="schedule" size={18} color="#9B5278" />
          <Text className="font-geist text-text text-sm ml-1">
            Horas usadas: 6200
          </Text>
        </View>

        <View className="flex-row items-center">
          <MaterialIcons name="schedule" size={18} color="#9B5278" />
          <Text className="font-geist text-text text-sm ml-1">
            Horas restantes: 1800
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center w-full my-4 px-4">
        <MaterialIcons name="warning" size={18} color="#FFA500" />
        <Text className="font-geist text-orange-600 text-base ml-1">
          Se recomienda programar el reemplazo de la lámpara UV en las próximas
          semanas
        </Text>
      </View>

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

export default LamparaUV;

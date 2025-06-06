import { View, Text } from 'react-native';
import React from 'react';
import {
  BuildIcon,
  CalendarIcon,
  ClockIcon,
  ConfigurationIcon,
  InfoIcon,
  MonitorIcon,
  PersonIcon,
} from '@/assets/icons';

const RegistroCard = ({ registro }: { registro: Registro }) => {
  return (
    <View className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-4">
      {/* Encabezado con la acción */}
      <View className="bg-purple-unique px-4 py-3 border-b border-gray-100">
        <Text className="text-white font-geist-semi-bold text-base">
          {registro.accion}
        </Text>
      </View>

      {/* Contenido principal */}
      <View className="p-4">
        {/* Fecha y dispositivo */}
        <View className="flex-row mb-4">
          <View className="flex-1 flex-row items-center mr-2">
            <CalendarIcon size={16} color="#666" className="mr-2" />
            <View>
              <Text className="text-gray-500 text-xs mb-1">Fecha</Text>
              <Text className="text-gray-800 font-geist-semi-bold text-sm">
                {registro.fecha}
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-row items-center">
            <ConfigurationIcon size={16} color="#666" className="mr-2" />
            <View>
              <Text className="text-gray-500 text-xs mb-1">Dispositivo</Text>
              <Text className="text-gray-800 font-geist-semi-bold text-sm">
                {registro.dispositivo}
              </Text>
            </View>
          </View>
        </View>

        {/* Descripción */}
        <View className="mb-4 bg-gray-100 rounded-lg">
          <View className="flex-row items-center px-3 pt-3 mb-1">
            <InfoIcon size={14} color="#666" className="mr-1" />
            <Text className="text-gray-500 text-xs">Descripción</Text>
          </View>
          <Text className="text-gray-800 text-sm px-3 pb-3">
            {registro.descripcion}
          </Text>
        </View>

        {/* Técnico */}
        <View className="flex-row items-center bg-gray-100 rounded-lg">
          <View className="h-8 w-8 ml-3 rounded-full bg-gray-200 items-center justify-center mr-3">
            <BuildIcon size={16} color="#666" />
          </View>
          <View className="py-3">
            <Text className="text-gray-500 text-xs mb-1">Técnico</Text>
            <Text className="text-gray-800 font-geist-semi-bold text-sm">
              {registro.tecnico}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegistroCard;

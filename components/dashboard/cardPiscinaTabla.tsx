import { View, Text, Pressable, Settings } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import {
  BookIcon,
  ConfigurationIcon,
  EyeIcon,
  HistorialIcon,
  LoginIcon,
  PersonIcon,
  TagIcon,
  TintIcon,
} from '@/assets/icons';
import { piscinasMock } from '@/data/mock/piscinaMock';

// Componente para mostrar el estado del pH con color contextual
const PhIndicator = ({ value }: { value: number }) => {
  // Determinar el color basado en el valor del pH
  const getColor = () => {
    if (value < 7.2) return '#F44336'; // Ácido - rojo
    if (value > 7.8) return '#2196F3'; // Alcalino - azul
    return '#4CAF50'; // Ideal - verde
  };

  return (
    <View className="flex-row items-center">
      <View
        className="h-3 w-3 rounded-full mr-2"
        style={{ backgroundColor: getColor() }}
      />
      <Text className="font-geist-semi-bold text-base">{value}</Text>
    </View>
  );
};

// Componente para mostrar un equipo con su ícono y estado
const EquipmentItem = ({
  tipo,
  estado,
}: {
  tipo: string;
  estado: 'Operativo' | 'Alerta' | 'Atención urgente' | 'Inactivo';
}) => {
  const getIcon = () => {
    switch (tipo) {
      case 'Uv':
        return 'electric-bolt';
      case 'Ionizador':
        return 'lightbulb';
      case 'Trasductor':
        return 'waves';
      case 'Calentador':
        return 'thermostat';
      default:
        return 'device-unknown';
    }
  };

  const getStatusColor = () => {
    switch (estado) {
      case 'Operativo':
        return '#4CAF50';
      case 'Alerta':
        return '#FF9800';
      case 'Atención urgente':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <View className="items-center bg-gray-50 p-3 rounded-lg">
      <MaterialIcons name={getIcon()} size={24} color={getStatusColor()} />
      <Text className="font-geist text-text text-xs mt-1">{tipo}</Text>
      <View
        className="mt-1 px-2 py-1 rounded-full"
        style={{ backgroundColor: getStatusColor() + '20' }}
      >
        <Text
          className="text-xs font-geist-semi-bold"
          style={{ color: getStatusColor() }}
        >
          {estado}
        </Text>
      </View>
    </View>
  );
};

const PoolTableCard = ({ pool }: { pool: any }) => {
  return (
    <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mb-4">
      {/* Encabezado con nombre y tipo */}
      <Text
        className="font-geist-semi-bold text-text text-2xl"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {pool.nombre}
      </Text>

      {/* Información principal */}
      <View className="border-b border-gray-200 pb-4 mb-4 mt-2 gap-2">
        <View className="flex-row items-center">
          <PersonIcon size={16} color="#666" className="mr-2" />
          <Text className="text-gray-500 font-geist text-sm mr-2">
            Propietario:
          </Text>
          <Text className="text-text font-geist-semi-bold text-sm">
            {pool.propietario}
          </Text>
        </View>

        <View className="flex-row items-center">
          <TagIcon size={16} color="#666" className="mr-2" />
          <Text className="text-gray-500 font-geist text-sm mr-2">Tipo:</Text>
          <View className="bg-gray-900 rounded-full px-3 py-1">
            <Text className="font-geist-semi-bold text-white text-xs">
              {pool.tipo}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <TintIcon size={16} color="#666" className="mr-2" />
          <Text className="text-gray-500 font-geist text-sm mr-2">pH:</Text>
          <PhIndicator value={pool.ph} />
        </View>

                <View className="flex-row items-center">
          <BookIcon size={16} color="#666" className="mr-2" />
          <Text className="text-gray-500 font-geist text-sm mr-2">Lecturas</Text>
        </View>


              <View className="flex-row justify-between mt-2">
        <Link asChild href={`/readings/${pool.id}`}>
          <Pressable className="bg-grayish-unique rounded-lg py-3 flex-1 mr-3 flex-row items-center justify-center">
            <BookIcon size={16} className="mr-2" />
            <Text className="text-black font-geist-semi-bold text-sm">
              Nueva lectura
            </Text>
          </Pressable>
        </Link>
        <Link asChild href={`/readings/${pool.id}`}>
          <Pressable className="bg-grayish-unique rounded-lg py-3 flex-1 flex-row items-center justify-center">
            <HistorialIcon size={16} className="mr-2" />
            <Text className="text-black font-geist-semi-bold text-sm">
              Ver historial
            </Text>
          </Pressable>
        </Link>
      </View>


      </View>

      {/* Equipos */}
      <Text className="text-gray-700 font-geist-semi-bold text-sm mb-3">
        Equipos:
      </Text>
      <View className="flex-row flex-wrap justify-between mb-4">
        {pool.equipos.map(
          (
            equipo: { tipo: string; estado: string },
            index: React.Key | null | undefined
          ) => (
            <View key={index} className="w-[48%] mb-2">
              <EquipmentItem
                tipo={equipo.tipo}
                estado={
                  equipo.estado as
                    | 'Operativo'
                    | 'Inactivo'
                    | 'Atención urgente'
                    | 'Alerta'
                }
              />
            </View>
          )
        )}
      </View>

      {/* Acciones */}
      <View className="flex-row justify-between mt-2">
        <Link asChild href={`/(tabs)/${pool.id}`}>
          <Pressable className="bg-gray-900 rounded-lg py-3 flex-1 mr-3 flex-row items-center justify-center">
            <EyeIcon size={16} color="#fff" />
            <Text className="text-white font-geist-semi-bold text-sm ml-2">
              Panel
            </Text>
          </Pressable>
        </Link>
        <Link asChild href={`/${pool.id}`}>
          <Pressable className="bg-gray-900 rounded-lg py-3 flex-1 flex-row items-center justify-center">
            <ConfigurationIcon size={16} color="#fff" />
            <Text className="text-white font-geist-semi-bold text-sm ml-2">
              Equipos
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default PoolTableCard;

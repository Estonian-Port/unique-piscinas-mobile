import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { piscinaPrincipal } from '@/data/mock/piscinaMock';
import IndicadorEstado from '../equipamiento/indicadorEstado';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ConfigurationIcon, EyeIcon } from '@/assets/icons';

const CardPiscinaTabla = () => {
  const pool = {
    id: 1,
    nombre: `Piscina Principal`,
    propietario: `Jose Luis Perez`,
    tipo: 'Skimmer',
    ph: 5.5,
    equipos: [
      { tipo: 'Uv', estado: 'operativo' },
      { tipo: 'Ionizador', estado: 'inactivo' },
      {
        tipo: 'Trasductor',
        estado: 'operativo',
      },
      {
        tipo: 'Calentador',
        estado: 'operativo',
      },
    ],
  };

  return (
    <ScreenCard>
      <Text className="font-geist-semi-bold text-text text-3xl mb-5">
        {pool.nombre}
      </Text>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-text font-geist text-base">Propietario:</Text>
        <Text className="text- font-geist-semi-bold text-base">
          {pool.propietario}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-text font-geist text-base">Tipo:</Text>
        <View className="bg-black rounded-full px-2">
          <Text className="font-geist-semi-bold text-white text-sm">
            {pool.tipo}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-text font-geist text-base">pH:</Text>
        <View className="flex-row items-center gap-2">
          <IndicadorEstado />
          <Text className="text- font-geist-semi-bold text-base">
            {pool.ph}
          </Text>
        </View>
      </View>
      <Text className="text-text font-geist text-base">Equipos:</Text>
      <View className="flex-row items-center gap-3 justify-between self-center mt-3">
        {pool.equipos.map((equipo, index) => (
          <View className='items-center'>
            <MaterialIcons
              key={index}
              name={
                equipo.tipo === 'Uv'
                  ? 'electric-bolt'
                  : equipo.tipo === 'Ionizador'
                  ? 'lightbulb'
                  : equipo.tipo === 'Trasductor'
                  ? 'waves'
                  : 'thermostat'
              }
              size={28}
              color={
                equipo.estado === 'operativo'
                  ? '#4CAF50'
                  : equipo.estado === 'inactivo'
                  ? '#FF9800'
                  : '#F44336'
              }
            />
            <Text className='font-geist text-text text-sm'>{equipo.tipo}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row self-center mt-5">
        <Link asChild href={`../(tabs)/${pool.id}`}>
          <Pressable className="bg-white rounded-md py-3 px-4 w-32 flex-row items-center justify-center border border-gray-200 mr-2">
            <EyeIcon size={16} />
            <Text className="text-gray-800 text-sm ml-1">Panel</Text>
          </Pressable>
        </Link>
        <Link asChild href={`/${pool.id}`}>
          <Pressable className="bg-white rounded-md py-3 w-32 px-4 flex-row items-center justify-center border border-gray-200">
            <ConfigurationIcon size={16} />
            <Text className="text-gray-800 text-sm ml-1">Equipos</Text>
          </Pressable>
        </Link>
      </View>
    </ScreenCard>
  );
};

export default CardPiscinaTabla;

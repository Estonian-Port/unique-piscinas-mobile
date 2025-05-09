import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { piscinasMock } from '@/data/mock/piscinaMock';
import { leo } from '@/data/mock/userMock';
import { Link } from 'expo-router';
import { ScreenTabs } from '@/components/utiles/Screen';
import { ChangeIcon } from '@/assets/icons';
import EquipamientoConfigurado from '@/components/equipamiento/equipamientoConfigurado';
import EstadoSistema from '@/components/equipamiento/estadoSistema';
import BotonCambio from '@/components/utiles/botonCambio';

const Equipment = () => {
  const idPiscina = 1;
  const user = leo;

  const searchPool = (id: number) => {
    return piscinasMock.filter(
      (piscina) => piscina.id === Number(idPiscina)
    )[0];
  };

  const pool = searchPool(Number(idPiscina));

  return (
    <ScrollView className="flex-1">
      <ScreenTabs>
        <View className="w-11/12 my-3">
          <Text className="font-geist-bold text-2xl text-text">
            Hola, {user.name} bienvenido!
          </Text>
        </View>

        <View className="flex-row w-11/12 justify-between mb-3">
          {/* Contenedor del texto */}
          <View className="flex-1 pr-4">
            <Text className="font-geist-semi-bold text-xl text-text">
              {pool.name}
            </Text>
            <Text className="font-geist text-base text-text">
              Volumen de la piscina: {pool.volume} m3
            </Text>
          </View>

          {user.piscinas.length > 1 && !user.isAdmin && <BotonCambio />}
        </View>

        <EstadoSistema />
        <EquipamientoConfigurado />
      </ScreenTabs>
    </ScrollView>
  );
};

export default Equipment;

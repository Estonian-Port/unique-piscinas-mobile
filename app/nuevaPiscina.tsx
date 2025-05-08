import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { Screen } from '@/components/utiles/Screen';
import InformacionBasica from '@/components/dashboard/nuevaPiscina/informacionBasica';
import ConfiguracionPiscina from '@/components/dashboard/nuevaPiscina/configuracionPiscina';
import EquiposNuevaPiscina from '@/components/dashboard/nuevaPiscina/equiposNuevaPiscina';

const NuevaPiscina = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <Screen>
        <View className="flex-1 bg-white mt-5 w-11/12 px-2">
          <Text className="font-geist-semi-bold text-text text-3xl">
            Agregar Nueva Piscina
          </Text>
          <Text className="font-geist-light text-text text-sm">
            Complete la información para registrar una nueva piscina
          </Text>
          <InformacionBasica />
          <ConfiguracionPiscina />
          <EquiposNuevaPiscina />
        </View>
        <View className="flex-row items-center justify-center gap-5 mt-5">
          <Pressable className="border border-gray-200 rounded-md p-2 items-center justify-center">
            <Text className="text-text font-geist text-base">Cancelar</Text>
          </Pressable>
          <Pressable className="border border-gray-200 rounded-md p-2 items-center justify-center bg-black">
            <Text className="text-white text-base font-geist">
              Guardar Piscina
            </Text>
          </Pressable>
        </View>
      </Screen>
    </ScrollView>
  );
};

export default NuevaPiscina;

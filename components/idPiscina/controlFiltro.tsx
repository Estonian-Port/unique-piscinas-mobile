import { View, Text } from 'react-native';
import React from 'react';
import { BubbleIcon, EyeIcon, InfoIcon, TintIcon } from '@/assets/icons';
import { ScreenCard } from '../utiles/ScreenCard';
import FuncionFiltroScreen from '../resume/funcionFiltroScreen';

interface ControlFiltroProps {
  waterEntryFilter: EntryFilter[];
}

export default function ControlFiltro({
  waterEntryFilter,
}: ControlFiltroProps) {
  const filterControl = waterEntryFilter.length > 0 ? true : false;

  return (
    <ScreenCard>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-geist-semi-bold text-3xl text-text">
          Control de Filtro
        </Text>
        {filterControl ? (
          <View className="bg-green-200 rounded-full p-2">
            <Text className="font-geist-semi-bold text-sm text-text">
              Activado
            </Text>
          </View>
        ) : (
          <View className="bg-red-200 rounded-full p-2">
            <Text className="font-geist-semi-bold text-sm text-text">
              Desactivado
            </Text>
          </View>
        )}
      </View>

      {/*ENTRADAS DE AGUA */}
      <View className="flex-row justify-between gap-2">
        <View className="border border-orange-300 rounded-md items-center p-2 flex-1">
          <TintIcon size={32} />
          <Text className="font-geist-semi-bold text-base text-text mt-2">
            Fondo
          </Text>
        </View>
        <View className="border border-orange-300 rounded-md items-center p-2 flex-1">
          <BubbleIcon size={32} />
          <Text className="font-geist-semi-bold text-base text-text mt-2">
            Barrefondo
          </Text>
        </View>
        <View className="border border-orange-300 rounded-md items-center p-2 flex-1">
          <EyeIcon size={32} />
          <Text className="font-geist-semi-bold text-base text-text mt-2">
            Skimmer
          </Text>
        </View>
      </View>

      {/*MENSAJE DE ADVERTENCIA */}
      {!filterControl && (
        <View className="border border-gray-200 rounded-sm flex-row justify-between items-center py-3 px-1">
          <InfoIcon />
          <Text className="flex-1 font-geist-semi-bold text-base text-text ml-2">
            Seleccione al menos una entrada de agua para activar el sistema de
            filtrado.
          </Text>
        </View>
      )}

      {/*MODO DE FILTRO */}
      <FuncionFiltroScreen></FuncionFiltroScreen>
      
    </ScreenCard>
  );
}

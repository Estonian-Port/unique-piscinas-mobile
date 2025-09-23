import { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import PanelFuncionesFiltro from './funcionFiltro';
import { funcionFiltro, PiscinaResume } from '@/data/domain/piscina';

const FuncionFiltroScreen = ({
  piscina,
  entradaDeAguaActiva,
  skimmer,
  barrefondo,
  handleFuncionFiltroChange,
}: {
  piscina: PiscinaResume;
  entradaDeAguaActiva: boolean;
  skimmer: boolean;
  barrefondo: boolean;
  handleFuncionFiltroChange: (funcion: funcionFiltro) => void;
}) => {

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-2xl mb-8 text-text font-geist-semi-bold">
          Función del Filtro
        </Text>

        <PanelFuncionesFiltro
          botonesActivos={entradaDeAguaActiva}
          onChange={handleFuncionFiltroChange}
          funcionActiva={piscina.funcionActiva}
          opacidad={!entradaDeAguaActiva ? 0.4 : 1}
          skimmerActivo={skimmer}
          barrefondoActivo={barrefondo}
        />
      </View>
    </SafeAreaView>
  );
};

export default FuncionFiltroScreen;

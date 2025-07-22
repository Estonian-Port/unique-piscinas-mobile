import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Screen } from '@/components/utiles/Screen';
import InformacionBasica from '@/components/dashboard/nuevaPiscina/informacionBasica';
import ConfiguracionPiscina from '@/components/dashboard/nuevaPiscina/configuracionPiscina';
import EquiposNuevaPiscina from '@/components/dashboard/nuevaPiscina/equiposNuevaPiscina';
import { PiscinaNueva } from '@/data/domain/piscina';

const piscinaNuevaInicial: PiscinaNueva = {
  id: 0,
  nombre: '',
  direccion: '',
  ciudad: '',
  largo: 0,
  ancho: 0,
  profundidad: 0,
  volumen: 0,
  bomba: [],
  filtro: {
    marca: '',
    modelo: '',
    diametro: 0,
    estado: ''
  },
  valvulas: [],
  sistemaGermicida: [],
  cloroSalino: false,
  controlAutomaticoPH: false,
  orp: false
};

const NuevaPiscina = () => {
  const [step, setStep] = useState(1);
  const [nuevaPiscina, setNuevaPiscina] = useState<PiscinaNueva>(piscinaNuevaInicial);

  const handleCancel = () => {
    null;
  };
  const handleSave = () => {
    null;
  };

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
          {step === 1 && (
            <InformacionBasica
              onCancel={handleCancel}
              onNext={() => setStep(2)}
              nuevaPiscina={nuevaPiscina}
            />
          )}
          {step === 2 && (
            <ConfiguracionPiscina
              onCancel={handleCancel}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
              nuevaPiscina={nuevaPiscina}
            />
          )}
          {step === 3 && (
            <EquiposNuevaPiscina
              onCancel={handleCancel}
              onBack={() => setStep(2)}
              onSave={handleSave}
              nuevaPiscina={nuevaPiscina}
            />
          )}
        </View>
      </Screen>
    </ScrollView>
  );
};

export default NuevaPiscina;

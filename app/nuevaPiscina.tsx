import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Screen } from '@/components/utiles/Screen';
import InformacionBasica from '@/components/dashboard/nuevaPiscina/informacionBasica';
import ConfiguracionPiscina from '@/components/dashboard/nuevaPiscina/configuracionPiscina';
import EquiposNuevaPiscina from '@/components/dashboard/nuevaPiscina/equiposNuevaPiscina';
import { PiscinaNueva } from '@/data/domain/piscina';
import { router } from 'expo-router';
import BombaNuevaPiscina from '@/components/dashboard/nuevaPiscina/bombaNuevaPiscina';
import FiltroNuevaPiscina from '@/components/dashboard/nuevaPiscina/filtroNuevaPiscina';
import TratamientoNuevaPiscina from '@/components/dashboard/nuevaPiscina/tratamientoNuevaPiscina';
import CalefaccionNuevaPiscina from '@/components/dashboard/nuevaPiscina/calefaccionNuevaPiscina';

const piscinaNuevaInicial: PiscinaNueva = {
  id: 0,
  nombre: '',
  direccion: '',
  desbordante: false,
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
    estado: '',
    id: 0,
    tipo: 'Arena'
  },
  valvulas: [],
  sistemaGermicida: [],
  cloroSalino: false,
  controlAutomaticoPH: false,
  orp: false,
};

const NuevaPiscina = () => {
  const [step, setStep] = useState(1);
  const [nuevaPiscina, setNuevaPiscina] =
    useState<PiscinaNueva>(piscinaNuevaInicial);

  const handleCancel = () => {
    setNuevaPiscina(piscinaNuevaInicial);
    router.replace('/(tabs-adm)/dashboard');
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
              setNuevaPiscina={setNuevaPiscina}
            />
          )}
          {step === 2 && (
            <ConfiguracionPiscina
              onCancel={handleCancel}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
              nuevaPiscina={nuevaPiscina}
              setNuevaPiscina={setNuevaPiscina}
            />
          )}
          {step === 3 && (
            <BombaNuevaPiscina
              onCancel={handleCancel}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
              nuevaPiscina={nuevaPiscina}
              setNuevaPiscina={setNuevaPiscina}
            />
          )}
          {step === 4 && (
            <FiltroNuevaPiscina
              onCancel={handleCancel}
              onBack={() => setStep(3)}
              onNext={() => setStep(5)}
              nuevaPiscina={nuevaPiscina}
              setNuevaPiscina={setNuevaPiscina}
            />
          )}
          {step === 5 && (
            <TratamientoNuevaPiscina
              onCancel={handleCancel}
              onBack={() => setStep(4)}
              onNext={() => setStep(6)}
              nuevaPiscina={nuevaPiscina}
              setNuevaPiscina={setNuevaPiscina}
            />
          )}
          {step === 6 && (
            <CalefaccionNuevaPiscina
              onCancel={handleCancel}
              onBack={() => setStep(5)}
              onSave={handleSave}
              nuevaPiscina={nuevaPiscina}
              setNuevaPiscina={setNuevaPiscina}
            />
          )}
        </View>
      </Screen>
    </ScrollView>
  );
};

export default NuevaPiscina;

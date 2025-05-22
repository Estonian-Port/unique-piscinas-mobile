import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Screen } from '@/components/utiles/Screen';
import InformacionBasica from '@/components/dashboard/nuevaPiscina/informacionBasica';
import ConfiguracionPiscina from '@/components/dashboard/nuevaPiscina/configuracionPiscina';
import EquiposNuevaPiscina from '@/components/dashboard/nuevaPiscina/equiposNuevaPiscina';

const NuevaPiscina = () => {
  const [step, setStep] = useState(1);

  const handleCancel = () => {null};
  const handleSave = () => {null};

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
        />
      )}
      {step === 2 && (
        <ConfiguracionPiscina
          onCancel={handleCancel}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <EquiposNuevaPiscina
          onCancel={handleCancel}
          onBack={() => setStep(2)}
          onSave={handleSave}
        />
      )}
        </View>

      </Screen>
    </ScrollView>
  );
};

export default NuevaPiscina;

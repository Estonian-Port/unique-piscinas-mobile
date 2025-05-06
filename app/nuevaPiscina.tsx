import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '@/components/ScreenCard';
import { ScreenTabs } from '@/components/Screen';
import { CalculatorIcon } from '@/assets/icons';
import RadiusButton from '@/components/radiusButton';

const NuevaPiscina = () => {
  const [desbordante, setDesbordante] = useState(true);

  const tipoBomba = (): void => {
    console.log('Tipo de bomba');
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>
        <View className="flex-1 bg-white mt-5">
          <Text className="font-geist-semi-bold text-text text-3xl">
            Agregar Nueva Piscina
          </Text>
          <Text className="font-geist-light text-text text-sm">
            Complete la información para registrar una nueva piscina
          </Text>
          <View className="py-5 border-b border-gray-200">
            <Text className="font-geist-semi-bold text-text text-xl">
              Información Básica
            </Text>
            <Text className="font-geist text-text text-base mt-3">
              Nombre de la piscina
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Propietario
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Dirección
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">Ciudad</Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Notas adicionales
            </Text>
            <TextInput className="border border-gray-200 rounded-sm h-40"></TextInput>
          </View>

          <View className="py-5 border-b border-gray-200">
            <Text className="font-geist-semi-bold text-text text-xl">
              Configuracion de la Piscina
            </Text>
            <View className="flex-row items-center mt-3">
              <View className="bg-black h-5 w-5"></View>
              <Text className="font-geist text-text text-base ml-2">
                Piscina desbordante
              </Text>
            </View>
            <Text className="font-geist-light text-text text-sm">
              Pisicina de tipo desbordante o infinity
            </Text>
            <Text className="font-geist text-text text-base mt-3">
              Largo (m)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Ancho (m)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Profundidad (m)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <View className="flex-row items-center justify-between mt-3 mb-1.5">
              <Text className="font-geist text-text text-base">
                Volumen (m³)
              </Text>
              <Pressable className="p-2 border border-gray-200 rounded-md flex-row items-center justify-center">
                <CalculatorIcon />
                <Text>Calcular</Text>
              </Pressable>
            </View>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            {desbordante && (
              <>
                <Text className="font-geist text-text text-base mt-3">
                  Volumen T.C. (m³)
                </Text>
                <TextInput className="border border-gray-200 rounded-sm"></TextInput>
              </>
            )}
          </View>

          <View className="py-5 border-b border-gray-200">
            <Text className="font-geist-semi-bold text-text text-xl">
              Equipamiento
            </Text>
            <Text className="font-geist-semi-bold text-text text-lg mt-2">
              Bombas
            </Text>
            <Text className="font-geist text-text text-base mt-3">
              Configuración de bombas
            </Text>
            <RadiusButton title='Bomba única' onPress={tipoBomba}></RadiusButton>
            <RadiusButton title='Doble bomba' onPress={tipoBomba}></RadiusButton>
            <RadiusButton title='Bomba velocidad variable' onPress={tipoBomba}></RadiusButton>
            <Text className="font-geist text-text text-base mt-3">
              Marca
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>

            <Text className="font-geist text-text text-base mt-3">
              Modelo
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>

            <Text className="font-geist text-text text-base mt-3">
              Potencia (CV)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
          </View>

          <View className="py-5 border-b border-gray-200">
            <Text className="font-geist-semi-bold text-text text-xl">
              Información Básica
            </Text>
            <Text className="font-geist text-text text-base mt-3">
              Nombre de la piscina
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Propietario
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Dirección
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">Ciudad</Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Notas adicionales
            </Text>
            <TextInput className="border border-gray-200 rounded-sm h-40"></TextInput>
          </View>
        </View>
      </ScreenTabs>
    </ScrollView>
  );
};

export default NuevaPiscina;

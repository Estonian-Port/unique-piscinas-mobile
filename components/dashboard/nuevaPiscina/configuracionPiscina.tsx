import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { CalculatorIcon } from '@/assets/icons';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';

const ConfiguracionPiscina = ({
  onCancel,
  onBack,
  onNext,
}: {
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
}) => {
  const [desbordante, setDesbordante] = useState(false);
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [profundidad, setProfundidad] = useState('');
  const [volumen, setVolumen] = useState('');
  const [volumenTC, setVolumenTC] = useState('');

  const calcularVolumen = () => {
    if (largo && ancho && profundidad) {
      const largoNum = parseFloat(largo);
      const anchoNum = parseFloat(ancho);
      const profundidadNum = parseFloat(profundidad);
      const volumenNum = largoNum * anchoNum * profundidadNum;
      setVolumen(volumenNum.toString());
    }
  };

  return (
    <View className="py-5">
      <View className="flex-row items-center justify-between">
        <Text className="font-geist-semi-bold text-text text-xl">
          Configuración de la piscina
        </Text>
        <PasosFormulario paso={2} />
      </View>
      <Pressable
        onPress={() => setDesbordante(!desbordante)}
        className="flex-row items-center mt-3"
      >
        <Checkbox
          value={desbordante}
          onValueChange={() => setDesbordante(!desbordante)}
          color={desbordante ? '#0F0D23' : undefined}
        />
        <View className="ml-2">
          <Text className="font-geist text-text text-base">
            Piscina desbordante
          </Text>
          <Text className="font-geist-light text-text text-sm">
            Pisicina de tipo desbordante o infinity
          </Text>
        </View>
      </Pressable>

      <Text className="font-geist text-text text-base mt-3">Largo (m)</Text>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={largo}
        onChangeText={(number) => setLargo(number)}
        keyboardType="numeric"
        placeholder="Ej: 10"
      ></TextInput>
      <Text className="font-geist text-text text-base mt-3">Ancho (m)</Text>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={ancho}
        onChangeText={(number) => setAncho(number)}
        keyboardType="numeric"
        placeholder="Ej: 5"
      ></TextInput>
      <Text className="font-geist text-text text-base mt-3">
        Profundidad (m)
      </Text>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={profundidad}
        onChangeText={(number) => setProfundidad(number)}
        keyboardType="numeric"
        placeholder="Ej: 1.5"
      ></TextInput>
      <View className="flex-row items-center justify-between mt-3 mb-1.5">
        <Text className="font-geist text-text text-base">Volumen (m³)</Text>
        <Pressable
          className="p-2 border border-gray-200 rounded-md flex-row items-center justify-center"
          onPress={() => calcularVolumen()}
        >
          <CalculatorIcon />
          <Text>Calcular</Text>
        </Pressable>
      </View>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={volumen}
        onChangeText={(number) => setVolumen(number)}
        keyboardType="numeric"
        placeholder="Ej: 75"
      ></TextInput>
      {desbordante && (
        <>
          <Text className="font-geist text-text text-base mt-3">
            Volumen T.C. (m³)
          </Text>
          <TextInput
            className="border border-gray-200 rounded-md py-4 px-3"
            value={volumenTC}
            onChangeText={(number) => setVolumenTC(number)}
            keyboardType="numeric"
            placeholder="Ej: 15"
          ></TextInput>
        </>
      )}

      <View className="flex-row items-center justify-center gap-1 mt-5">
        <Link asChild href="/dashboard">
          <Pressable
            onPress={onCancel}
            className="border border-gray-200 rounded-md p-2 items-center justify-center w-1/3"
          >
            <Text className="text-text font-geist text-base">Cancelar</Text>
          </Pressable>
        </Link>
        <Pressable
          onPress={onBack}
          className="border border-gray-200 rounded-md p-2 items-center justify-center bg-black w-1/3"
        >
          <Text className="text-white text-base font-geist">Atrás</Text>
        </Pressable>
        <Pressable
          onPress={onNext}
          className="border border-gray-200 rounded-md p-2 items-center justify-center bg-blue-500 w-1/3"
        >
          <Text className="text-white text-base font-geist">Siguiente</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConfiguracionPiscina;

import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BubbleIcon, EyeIcon, InfoIcon, TintIcon } from '@/assets/icons';
import { ScreenCard } from '../utiles/ScreenCard';
import FuncionFiltroScreen from './funcionFiltroScreen';
import {
  entradaAgua,
  funcionFiltro,
  PiscinaResume,
} from '@/data/domain/piscina';
import ModalBarrefondo from './modalBarrefondo';
import { FuncionFiltro } from '@/data/domain/cicloFiltrado';
import { piscinaService } from '@/services/piscina.service';
import Toast from 'react-native-toast-message';

interface ControlFiltroProps {
  piscina: PiscinaResume;
  entradaAgua: entradaAgua[];
  funcionFiltro: funcionFiltro[];
}

export default function ControlFiltro({ piscina }: ControlFiltroProps) {
  const [modalBarrefondoVisible, setModalBarrefondoVisible] = useState(false);
  const [isBarrefondoActivo, setBarrefondoActivo] = useState(
    piscina.entradaAgua?.includes('Barrefondo')
  );
  const [isFondoActivo, setFondoActivo] = useState(
    piscina.entradaAgua?.includes('Fondo')
  );
  const [isSkimmerActivo, setSkimmerActivo] = useState(
    piscina.entradaAgua?.includes('Skimmer')
  );
  const [isTanqueActivo, setTanqueActivo] = useState(
    piscina.entradaAgua?.includes('Tanque')
  );

  const [hayEntradaDeAguaSeleccionada, setHayEntradaDeAguaSeleccionada] =
    useState(piscina.entradaAgua && piscina.entradaAgua.length > 0);

  useEffect(() => {
    setHayEntradaDeAguaSeleccionada(
      piscina.entradaAgua && piscina.entradaAgua.length > 0
    );
  }, [piscina]);

const actualizarEntradaDeAgua = async (entradasActivas: entradaAgua[]) => {
  console.log('Actualizando entradas de agua a:', entradasActivas);
  try {
    const response = await piscinaService.actualizarEntradaDeAgua(
      piscina.id,
      entradasActivas
    );
    const nuevasEntradas = response.data.entradaAgua;
    setHayEntradaDeAguaSeleccionada(nuevasEntradas.length > 0);
    setFondoActivo(nuevasEntradas.includes('Fondo'));
    setBarrefondoActivo(nuevasEntradas.includes('Barrefondo'));
    setSkimmerActivo(nuevasEntradas.includes('Skimmer'));
    setTanqueActivo(nuevasEntradas.includes('Tanque'));
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'No se pudo actualizar la entrada de agua.',
      position: 'bottom',
    });
  }
};

  const handleTanquePress = () => {
    console.log('Entradas antes de presionar Tanque:', piscina.entradaAgua);
    if (!isTanqueActivo) {
      setTanqueActivo(true);
      actualizarEntradaDeAgua(['Tanque', ...(piscina.entradaAgua || [])]);
    } else {
      const nuevasEntradas = (piscina.entradaAgua || []).filter(
        (e) => e !== 'Tanque'
      );
      setTanqueActivo(false);
      actualizarEntradaDeAgua(nuevasEntradas);
    }
  };

  const desactivarDesagotar = () => {
    if (piscina.funcionActiva.includes('drain')) {
      const nuevasFunciones = piscina.funcionActiva.filter(
        (f) => f !== 'drain'
      );
      piscinaService.actualizarFuncionFiltro(piscina.id, nuevasFunciones);
    }
  };

  const handleSkimmerPress = () => {
    if (!isSkimmerActivo) {
      setSkimmerActivo(true);
      actualizarEntradaDeAgua(['Skimmer', ...(piscina.entradaAgua || [])]);
      desactivarDesagotar();
    } else {
      const nuevasEntradas = (piscina.entradaAgua || []).filter(
        (e) => e !== 'Skimmer'
      );
      setSkimmerActivo(false);
      actualizarEntradaDeAgua(nuevasEntradas);
    }
  };

  const handleFondoPress = () => {
    if (!isFondoActivo) {
      setFondoActivo(true);
      actualizarEntradaDeAgua(['Fondo', ...(piscina.entradaAgua || [])]);
    } else {
      const nuevasEntradas = (piscina.entradaAgua || []).filter(
        (e) => e !== 'Fondo'
      );
      setFondoActivo(false);
      actualizarEntradaDeAgua(nuevasEntradas);
    }
  }

  const handleBarrefondoPress = () => {
    if (!isBarrefondoActivo) {
      setBarrefondoActivo(true);
      actualizarEntradaDeAgua(['Barrefondo', ...(piscina.entradaAgua || [])]);
    } else {
      const nuevasEntradas = (piscina.entradaAgua || []).filter(
        (e) => e !== 'Barrefondo'
      );
      setBarrefondoActivo(false);
      actualizarEntradaDeAgua(nuevasEntradas);
    }
  };

  return (
    <ScreenCard>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-geist-semi-bold text-3xl text-text">
          Control de Filtro
        </Text>
        {hayEntradaDeAguaSeleccionada ? (
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
        <Pressable
          className={`rounded-md items-center p-2 flex-1 ${
            isFondoActivo
              ? 'border-2 border-blue-500 bg-blue-100'
              : 'border border-grayish-unique'
          }`}
          onPress={() => handleFondoPress()}
        >
          <TintIcon size={32} />
          <Text className="font-geist-semi-bold text-base text-text mt-2">
            Fondo
          </Text>
        </Pressable>

        <Pressable
          className={`rounded-md items-center p-2 flex-1 ${
            isBarrefondoActivo
              ? 'border-2 border-blue-500 bg-blue-100'
              : 'border border-grayish-unique'
          }`}
          onPress={() => setModalBarrefondoVisible(true)}
        >
          <BubbleIcon size={32} />
          <Text className="font-geist-semi-bold text-base text-text mt-2">
            Barrefondo
          </Text>
        </Pressable>
        <ModalBarrefondo
          visible={modalBarrefondoVisible}
          onClose={() => setModalBarrefondoVisible(false)}
          onSave={() => handleBarrefondoPress()}
        />
        {piscina.esDesbordante ? (
          <Pressable
            className={`rounded-md items-center p-2 flex-1 ${
              isTanqueActivo
                ? 'border-2 border-blue-500 bg-blue-100'
                : 'border border-grayish-unique'
            }`}
            onPress={() => handleTanquePress()}
          >
            <EyeIcon size={32} />
            <Text className="font-geist-semi-bold text-base text-text mt-2">
              Tanque
            </Text>
          </Pressable>
        ) : (
          <Pressable
            className={`rounded-md items-center p-2 flex-1 ${
              isSkimmerActivo
                ? 'border-2 border-blue-500 bg-blue-100'
                : 'border border-grayish-unique'
            }`}
            onPress={() => handleSkimmerPress()}
          >
            <EyeIcon size={32} />
            <Text className="font-geist-semi-bold text-base text-text mt-2">
              Skimmer
            </Text>
          </Pressable>
        )}
      </View>

      {/*MENSAJE DE ADVERTENCIA */}
      {!hayEntradaDeAguaSeleccionada && (
        <View className="border border-gray-200 rounded-sm flex-row justify-between items-center py-3 px-1">
          <InfoIcon />
          <Text className="flex-1 font-geist-semi-bold text-base text-text ml-2">
            Seleccione al menos una entrada de agua para activar el sistema de
            filtrado.
          </Text>
        </View>
      )}

      {/*MODO DE FILTRO */}
      <FuncionFiltroScreen
        piscina={piscina}
        entradaDeAguaActiva={hayEntradaDeAguaSeleccionada}
      ></FuncionFiltroScreen>
    </ScreenCard>
  );
}

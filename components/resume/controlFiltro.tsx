import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { BubbleIcon, EyeIcon, InfoIcon, TintIcon } from '@/assets/icons';
import { ScreenCard } from '../utiles/ScreenCard';
import FuncionFiltroScreen from './funcionFiltroScreen';
import type { entradaAgua, funcionFiltro, PiscinaResume } from '@/data/domain/piscina';
import ModalBarrefondo from './modalBarrefondo';
import { piscinaService } from '@/services/piscina.service';
import Toast from 'react-native-toast-message';

interface ControlFiltroProps {
  piscina: PiscinaResume;
  entradaAgua: entradaAgua[];
  funcionFiltro: funcionFiltro | null;
  setPiscina: Dispatch<SetStateAction<PiscinaResume | null>>;
}

export default function ControlFiltro({ piscina, setPiscina }: ControlFiltroProps) {
  const [funcionActiva, setFuncionActiva] = useState(piscina.funcionActiva);
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
    try {
      const response = await piscinaService.actualizarEntradaDeAgua(
        piscina.id,
        entradasActivas
      );
      const nuevasEntradas = response.data.entradaAgua;
      setPiscina((prevPiscina) => ({
        ...prevPiscina!,
        entradaAgua: nuevasEntradas,
      }));
      verificarFuncionFiltro();
      setHayEntradaDeAguaSeleccionada(nuevasEntradas.length > 0);
      setFondoActivo(nuevasEntradas.includes('Fondo'));
      setBarrefondoActivo(nuevasEntradas.includes('Barrefondo'));
      setSkimmerActivo(nuevasEntradas.includes('Skimmer'));
      setTanqueActivo(nuevasEntradas.includes('Tanque'));
      Toast.show({
        type: 'success',
        text1: 'Éxito',
        text2: 'Entrada de agua actualizada correctamente.',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo actualizar la entrada de agua.',
        position: 'bottom',
      });
    }
  };

  const actualizarFuncionFiltro = async (funcion: funcionFiltro) => {
    try {
      if (funcion === piscina.funcionActiva) {
        const response = await piscinaService.actualizarFuncionFiltro(
          piscina.id,
          'REPOSO'
        );
        setFuncionActiva('REPOSO');
        setPiscina((prevPiscina) => ({
          ...prevPiscina!,
          funcionActiva: 'REPOSO',
        }));
      } else {
        const response = await piscinaService.actualizarFuncionFiltro(
          piscina.id,
          funcion
        );
        setFuncionActiva(funcion);
        setPiscina((prevPiscina) => ({
          ...prevPiscina!,
          funcionActiva: funcion,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verificarFuncionFiltro = async () => {
    if (piscina.entradaAgua && piscina.entradaAgua.length === 0) {
      try {
        await piscinaService.actualizarFuncionFiltro(piscina.id, 'REPOSO');
        setFuncionActiva('REPOSO');
        setPiscina((prevPiscina) => ({
          ...prevPiscina!,
          funcionActiva: 'REPOSO',
        }));
        Toast.show({
          type: 'info',
          text1: 'Información',
          text2: 'La función del filtro se ha detenido.',
          position: 'bottom',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudo actualizar la función del filtro.',
          position: 'bottom',
        });
      }
    }
  };

  const handleTanquePress = () => {
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

  const handleSkimmerPress = () => {
    if (!isSkimmerActivo) {
      setSkimmerActivo(true);
      actualizarEntradaDeAgua(['Skimmer', ...(piscina.entradaAgua || [])]);
      if (piscina.funcionActiva === 'DESAGOTAR') {
        actualizarFuncionFiltro('REPOSO');
      }
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
  };

  const handleBarrefondoPress = () => {
    if (!isBarrefondoActivo) {
      setModalBarrefondoVisible(true);
    } else {
      const nuevasEntradas = (piscina.entradaAgua || []).filter(
        (e) => e !== 'Barrefondo'
      );
      setBarrefondoActivo(false);
      actualizarEntradaDeAgua(nuevasEntradas);
    }
  };

  const onSaveBarrefondo = () => {
    actualizarEntradaDeAgua(['Barrefondo', ...(piscina.entradaAgua || [])]);
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
        <Text className="text-2xl mb-2 text-text font-geist-semi-bold">
          Entradas de Agua
        </Text>
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
          onPress={() => handleBarrefondoPress()}
        >
          <BubbleIcon size={32} />
          <Text className="font-geist-semi-bold text-base text-text mt-2">
            Barrefondo
          </Text>
        </Pressable>
        <ModalBarrefondo
          visible={modalBarrefondoVisible}
          onClose={() => setModalBarrefondoVisible(false)}
          onSave={() => onSaveBarrefondo()}
          onSelected={(funcion: funcionFiltro) =>
            actualizarFuncionFiltro(funcion)
          }
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
        <View className="flex-row items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-sm p-4 my-4 mx-1">
          <View className="mt-0.5">
            <InfoIcon size={22} color="#b45309" />
          </View>
          <Text className="flex-1 font-geist-semi-bold text-base text-yellow-900 ml-3">
            Seleccione al menos una entrada de agua para activar el sistema de
            filtrado.
          </Text>
        </View>
      )}

      {/*MODO DE FILTRO */}
      <FuncionFiltroScreen
        piscina={piscina}
        entradaDeAguaActiva={hayEntradaDeAguaSeleccionada}
        skimmer={isSkimmerActivo}
        barrefondo={isBarrefondoActivo}
        handleFuncionFiltroChange={(funcion: funcionFiltro) =>
          actualizarFuncionFiltro(funcion)
        }
      />
    </ScreenCard>
  );
}

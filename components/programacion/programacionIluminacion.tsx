import { View, Text, Pressable, Switch } from 'react-native';
import React, { useState } from 'react';
import {
  dateToLocalTimeString,
  Programacion,
  ProgramacionType,
} from '@/data/domain/cicloFiltrado';
import { ScreenCard } from '../utiles/ScreenCard';
import { ClockIcon, HandIcon, LightIcon } from '@/assets/icons';
import Schedule from './schedule';
import ModalProgramacion from './modalProgramacion';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/context/authContext';
import { piscinaService } from '@/services/piscina.service';

const ProgramacionIluminacion = ({
  programacion,
  actualizarPiscina,
}: {
  programacion: Programacion[];
  actualizarPiscina: () => Promise<void>;
}) => {
  const { selectedPool } = useAuth();
  const [isManual, setIsManual] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const programacionVacia: Programacion = {
    id: 0,
    horaInicio: dateToLocalTimeString(new Date()),
    horaFin: dateToLocalTimeString(new Date()),
    dias: [],
    activa: true,
    tipo: ProgramacionType.ILUMINACION,
  };

  const hasCicles = programacion.length > 0;

  const handleAddCicle = async (nuevoCiclo: Programacion) => {
    try {
      const response = await piscinaService.addProgramacion(
        selectedPool!.id,
        nuevoCiclo.tipo === ProgramacionType.FILTRADO,
        nuevoCiclo
      );
      Toast.show({
        type: 'success',
        text1: 'Ciclo añadido',
        text2: 'El ciclo se ha añadido correctamente',
        position: 'bottom',
        bottomOffset: 80,
      });
      actualizarPiscina();
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding cycle:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El ciclo no se ha podido añadir correctamente',
        position: 'bottom',
        bottomOffset: 80,
      });
    }
  };

  const handleEditCicle = async (cicloEditado: Programacion) => {
    try {
      const response = await piscinaService.updateProgramacion(
        selectedPool!.id,
        cicloEditado.tipo === ProgramacionType.FILTRADO,
        cicloEditado
      );
      Toast.show({
        type: 'success',
        text1: 'Ciclo editado',
        text2: 'El ciclo se ha editado correctamente',
        position: 'bottom',
        bottomOffset: 80,
      });
      actualizarPiscina();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se ha podiado editar el ciclo de programación',
        position: 'bottom',
        bottomOffset: 80,
      });
    }
  };

  const handleDeleteCicle = async (cicloId: number, esFiltrado: boolean) => {
    try {
      const response = await piscinaService.deleteProgramacion(
        selectedPool!.id,
        cicloId,
        esFiltrado
      );
      Toast.show({
        type: 'success',
        text1: 'Ciclo eliminado',
        text2: 'El ciclo se ha eliminado correctamente',
        position: 'bottom',
        bottomOffset: 80,
      });
      actualizarPiscina();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El ciclo no se ha podido eliminar correctamente',
        position: 'bottom',
        bottomOffset: 80,
      });
    }
  };

  return (
    <ScreenCard>
      <View className="flex-row items-center  mb-4">
        <LightIcon color="orange" size={24} />
        <Text className="font-geist-semi-bold text-text text-2xl ml-1">
          Control de Iluminación
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <HandIcon size={18} color="light-blue" />
          <Text className="font-geist-semi-bold text-text text-base ml-1">
            Control Manual
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#000000' }}
          thumbColor={isManual ? '#fcdb99' : '#ffffff'}
          ios_backgroundColor="#d3d3d3"
          onValueChange={() => setIsManual(!isManual)}
          value={isManual}
        />
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <ClockIcon size={18} color="light-blue" />
          <Text className="font-geist-semi-bold text-text text-base ml-1">
            Horarios programados
          </Text>
        </View>
        <Pressable
          className="border border-gray-200 rounded-md p-2 items-center justify-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className="font-geist text-text text-base">+ Añadir</Text>
        </Pressable>
        {modalVisible && (
          <ModalProgramacion
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleAddCicle}
            cicle={programacionVacia}
            hasCicleMode={false}
          />
        )}
      </View>

      {hasCicles ? (
        <View className="items-center justify-between gap-2">
          {programacion.map((ciclo) => (
            <Schedule
              cicle={ciclo}
              key={ciclo.id}
              editCicle={handleEditCicle}
              deleteCicle={handleDeleteCicle}
            />
          ))}
        </View>
      ) : (
        <View className="flex-row items-center justify-center mt-4 mb-4">
          <Text className="font-geist-semi-bold text-text text-base text-center">
            No hay horarios programados.{'\n'}
            Presione el botón +Añadir para agregar uno.
          </Text>
        </View>
      )}
    </ScreenCard>
  );
};

export default ProgramacionIluminacion;

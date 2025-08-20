import { View, Text, Pressable, Switch } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { ClockIcon, FilterIcon } from '@/assets/icons';
import Schedule from './schedule';
import { Programacion, ProgramacionType } from '@/data/domain/cicloFiltrado';
import { ciclosFiltradoMock } from '@/data/mock/cicloFiltradoMock';
import ModalProgramacion from './modalProgramacion';

const ProgramacionFiltrado = ({programacion} : {programacion: Programacion[]}) => {
  const [programaciones, setProgramaciones] = useState<Programacion[]>(programacion);
  const [modalVisible, setModalVisible] = useState(false);

  const programacionVacia: Programacion = {
    id: 0,
    horaInicio: new Date().toISOString(),
    horaFin: new Date().toISOString(),
    dias: [],
    funcionFiltro: null,
    activa: false,
    tipo: ProgramacionType.FILTRADO,
  };

  const hasCicles = programaciones.length > 0;

  const handleAddCicle = (nuevoCiclo: Programacion) => {
    //actualizar el back
    ciclosFiltradoMock.push(nuevoCiclo);
  };

  const handleEditCicle = (cicloEditado: Programacion) => {
    //actualizar el back
    setProgramaciones((prev) =>
      prev.map((c) => (c.id === cicloEditado.id ? cicloEditado : c))
    );
  };

  const handleDeleteCicle = (cicloId: number) => {
    //actualizar el back
    setProgramaciones((prev) => prev.filter((c) => c.id !== cicloId));
  };

  return (
    <ScreenCard>
      <View className="flex-row items-center  mb-4">
        <FilterIcon color="cyan" size={24} />
        <Text className="font-geist-semi-bold text-text text-2xl ml-1">
          Programación de Filtrado
        </Text>
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <ClockIcon size={18} color="light-blue" />
          <Text className="font-geist-semi-bold text-text text-base ml-1">
            Ciclos programados
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
            hasCicleMode={true}
            cicle={programacionVacia}
          />
        )}
      </View>

      {hasCicles ? (
        <View className="items-center justify-between gap-2">
          {programaciones.map((ciclo) => (
            <Schedule
              cicle={ciclo}
              editCicle={handleEditCicle}
              deleteCicle={handleDeleteCicle}
              key={ciclo.id}
            ></Schedule>
          ))}
        </View>
      ) : (
        <View className="flex-row items-center justify-center mt-4 mb-4">
          <Text className="font-geist-semi-bold text-text text-base text-center">
            No hay ciclos programados.{'\n'}
            Presione el botón +Añadir para agregar uno.
          </Text>
        </View>
      )}
    </ScreenCard>
  );
};

export default ProgramacionFiltrado;

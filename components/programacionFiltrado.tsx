import { View, Text, Pressable, Switch } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from './ScreenCard';
import { ClockIcon, FilterIcon } from '@/assets/icons';
import Schedule from './schedule';
import { Cicle } from '@/data/cicloFiltrado';
import { ciclosFiltradoMock } from '@/data/mock/cicloFiltradoMock';
import ModalProgramacion from './modalProgramacion';

const ProgramacionFiltrado = () => {
  const ciclosProgramados: Cicle[] = ciclosFiltradoMock;
  const [modalVisible, setModalVisible] = useState(false);

  const hasCicles = ciclosProgramados.length > 0;

  const addSchedule = () => null;

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
          />
        )}
      </View>

      {hasCicles ? (
        <View className="items-center justify-between gap-2">
          {ciclosProgramados.map((ciclo) => (
            <Schedule cicle={ciclo} key={ciclo.id}></Schedule>
          ))}
        </View>
      ) : (
        <View className="flex-row items-center justify-between mt-4 mb-4">
          <Text className="font-geist-semi-bold text-text text-base">
            No hay ciclos programados
          </Text>
        </View>
      )}
    </ScreenCard>
  );
};

export default ProgramacionFiltrado;

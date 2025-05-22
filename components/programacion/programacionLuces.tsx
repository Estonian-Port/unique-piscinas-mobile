import { View, Text, Pressable, Switch } from 'react-native';
import React, { useState } from 'react';
import { Cicle } from '@/data/cicloFiltrado';
import { ScreenCard } from '../utiles/ScreenCard';
import { ClockIcon, HandIcon, LightIcon } from '@/assets/icons';
import Schedule from './schedule';
import { ciclosLucesMock } from '@/data/mock/cicloLucesMock';
import ModalProgramacion from './modalProgramacion';

const ProgramacionLuces = () => {
  const [ciclos, setCiclos] = useState<Cicle[]>(ciclosLucesMock);
  const [isManual, setIsManual] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const cicloVacioDeLuces: Cicle = {
    id: 0,
    startTime: new Date(),
    endTime: new Date(),
    activeDays: [],
    mode: null,
    isActive: false,
    isFilterCicle: true,
  };

  const hasCicles = ciclos.length > 0;

  const handleAddCicle = (nuevoCiclo: Cicle) => {
    ciclos.push(nuevoCiclo);
  };

  const handleEditCicle = (cicloEditado: Cicle) => {
    setCiclos((prev) =>
      prev.map((c) => (c.id === cicloEditado.id ? cicloEditado : c))
    );
  };

  const handleDeleteCicle = (cicloId: number) => {
    setCiclos((prev) => prev.filter((c) => c.id !== cicloId));
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
            cicle={cicloVacioDeLuces}
            hasCicleMode={false}
          />
        )}
      </View>

        {hasCicles ? (
          <View className="items-center justify-between gap-2">
            {ciclos.map((ciclo) => (
              <Schedule
                cicle={ciclo}
                key={ciclo.id}
                editCicle={handleEditCicle}
                deleteCicle={handleDeleteCicle}
              ></Schedule>
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

export default ProgramacionLuces;

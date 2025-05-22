import { View, Text, Pressable, Switch, Modal } from 'react-native';
import React, { useState } from 'react';
import { ClockIcon, DeleteIcon, EditIcon } from '@/assets/icons';
import { Cicle, Day } from '@/data/cicloFiltrado';
import ModalProgramacion from './modalProgramacion';

const Schedule = ({
  cicle,
  editCicle,
}: {
  cicle: Cicle;
  editCicle: (cicloEditado: Cicle) => void;
}) => {
  const daysOfWeek: Day[] = [
    Day.LUNES,
    Day.MARTES,
    Day.MIERCOLES,
    Day.JUEVES,
    Day.VIERNES,
    Day.SABADO,
    Day.DOMINGO,
  ];
  const [isActive, setIsActive] = useState(cicle.isActive);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const isActiveDay = (day: Day) => {
    return cicle.activeDays.includes(day);
  };

  const deleteSchedule = () => null;

  return (
    <View className="w-full rounded-md bg-white p-2 border border-gray-200">
      <View className="flex-row flex-1 justify-between">
        <View className="flex-row items-center">
          <ClockIcon size={14} color="black" />
          <Text className="font-geist text-text text-sm mx-2">
            {cicle.startTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}{' '}
            -{' '}
            {cicle.endTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}{' '}
            horas
          </Text>
        </View>
        {cicle.isFilterCicle && (
          <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
            <Text className="font-geist text-text text-sm mx-1">
              {cicle.mode}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between flex-1">
        <View className="flex-row items-center justify-between flex-1">
          {daysOfWeek.map((day) => (
            <View
              key={day}
              className={`flex-row items-center flex-1 justify-center rounded-full mx-0.5 p-0.5 border ${
                isActiveDay(day) ? 'bg-black' : 'bg-white'
              } ${isActive ? '' : 'opacity-50'}`}
            >
              <Text
                className={`font-geist-semi-bold text-base ${
                  isActiveDay(day) ? 'text-white' : 'text-black'
                }`}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-row items-center justify-around gap-3">
          <Switch
            trackColor={{ false: '#d3d3d3', true: '#000000' }}
            thumbColor={isActive ? '#fcdb99' : '#ffffff'}
            ios_backgroundColor="#d3d3d3"
            onValueChange={() => setIsActive(!isActive)}
            value={isActive}
          />
          <Pressable onPress={() => setOpenModalEdit(!openModalEdit)}>
            <EditIcon color="black" />
          </Pressable>
          {openModalEdit && (
            <ModalProgramacion
              visible={openModalEdit}
              onClose={() => setOpenModalEdit(false)}
              onSave={editCicle}
              hasCicleMode={true}
              cicle={cicle}
            />
          )}
          <Pressable onPress={deleteSchedule()}>
            <DeleteIcon color="red" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Schedule;

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SaveIcon } from '@/assets/icons';
import { Cicle, Day, ModeCicle } from '@/data/cicloFiltrado';
import TimeInput from '../utiles/timeInput';
import DropDownPicker from 'react-native-dropdown-picker';

type ModalProgramacionProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (cicle: Cicle) => void;
  hasCicleMode: boolean;
  cicle: Cicle;
};

const actionsMode = [
  { id: 1, name: ModeCicle.DESAGOTAR },
  { id: 2, name: ModeCicle.RETROLAVAR },
  { id: 3, name: ModeCicle.FILTRAR },
  { id: 4, name: ModeCicle.RECIRCULAR },
  { id: 5, name: ModeCicle.ENJUAGAR },
];

const ModalProgramacion = ({
  visible,
  onClose,
  onSave,
  hasCicleMode,
  cicle,
}: ModalProgramacionProps) => {
  const [daysSelected, setDaysSelected] = useState<Day[]>(cicle.activeDays);
  const [startTime, setStartTime] = useState(cicle.startTime);
  const [endTime, setEndTime] = useState(cicle.endTime);
  const [selectedCicleMode, setSelectedCicleMode] = useState(cicle.mode);
  const [openAction, setOpenAction] = useState(false);

  const daysOfWeek: Day[] = [
    Day.LUNES,
    Day.MARTES,
    Day.MIERCOLES,
    Day.JUEVES,
    Day.VIERNES,
    Day.SABADO,
    Day.DOMINGO,
  ];

  const save = (): void => {
    if (hasCicleMode) {
      const cicloActualizado: Cicle = {
        ...cicle,
        activeDays: daysSelected,
        mode: selectedCicleMode,
        startTime,
        endTime,
      };
      onSave(cicloActualizado);
    } else {
      const cicloActualizado: Cicle = {
        ...cicle,
        activeDays: daysSelected,
        isFilterCicle: false,
        startTime,
        endTime,
      };
      onSave(cicloActualizado);
    }
    onClose();
  };

  const toggleDay = (day: Day): void => {
    if (daysSelected.includes(day)) {
      setDaysSelected(daysSelected.filter((d) => d !== day));
    } else {
      setDaysSelected([...daysSelected, day]);
    }
  };

  const isDaySelected = (day: Day): boolean => {
    return daysSelected.includes(day);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-4/5 max-w-md">
            <View className="flex-row items-center justify-between mb-4">
              {daysOfWeek.map((day) => (
                <Pressable
                  key={day}
                  className={`items-center justify-center rounded-full p-1 px-2.5 border ${
                    isDaySelected(day) ? 'bg-black' : 'bg-white'
                  }`}
                  onPress={() => toggleDay(day)}
                >
                  <Text
                    className={`font-geist-semi-bold text-lg ${
                      isDaySelected(day) ? 'text-white' : 'text-black'
                    }`}
                  >
                    {day}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View className="flex-row justify-around w-full mb-3">
              <TimeInput
                title={'Hora de encendido'}
                timeSchedule={startTime}
                onChange={setStartTime}
              />
              <TimeInput
                title={'Hora de apagado'}
                timeSchedule={endTime}
                onChange={setEndTime}
              />
            </View>

            {hasCicleMode && (
              <View>
                <Text className="font-geist-semi-bold text-base mb-1">
                  Modo
                </Text>
                <DropDownPicker
                  open={openAction}
                  value={selectedCicleMode}
                  items={actionsMode.map((item) => ({
                    id: item.id,
                    label: item.name,
                    value: item.name,
                  }))}
                  setOpen={setOpenAction}
                  setValue={setSelectedCicleMode}
                  placeholder="Seleccione el modo"
                  style={{ borderColor: '#e5e7eb' }}
                  dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
                  zIndex={3000}
                  zIndexInverse={1000}
                />
              </View>
            )}

            <View className="flex-row justify-between gap-3 mt-3">
              <Pressable
                onPress={onClose}
                className="bg-gray-400 rounded-lg flex-1 items-center justify-center h-12"
              >
                <Text className="text-white text-center font-geist-semi-bold">
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                onPress={save}
                className="bg-blue-500 rounded-lg flex-1 items-center justify-center h-12"
              >
                <View className="flex-row items-center justify-center">
                  <SaveIcon color="white" />
                  <Text className="text-white text-center font-geist-semi-bold ml-2">
                    Guardar
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalProgramacion;

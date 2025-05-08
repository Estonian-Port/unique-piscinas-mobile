import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SaveIcon } from '@/assets/icons';
import { Day } from '@/data/cicloFiltrado';
import TimeInput from '../utiles/timeInput';

type ModalProgramacionProps = {
  visible: boolean;
  onClose: () => void;
};

const ModalProgramacion = ({ visible, onClose }: ModalProgramacionProps) => {
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
    onClose();
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
                  className="items-center justify-center rounded-full p-1 px-2.5 border bg-white"
                >
                  <Text className="font-geist-semi-bold text-lg text-black">
                    {day}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View className="flex-row justify-around w-full mb-6">
              <TimeInput title={'Hora de encendido'} />
              <TimeInput title={'Hora de apagado'} />
            </View>

            <View className="flex-row justify-between gap-3">
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

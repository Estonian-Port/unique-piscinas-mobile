import React from 'react';
import { View, Text, Modal, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import TimeInput from './timeInput';
import { SaveIcon } from '@/assets/icons';

type ModalProgramacionProps = {
  visible: boolean;
  onClose: () => void;
};

const ModalProgramacion = ({ visible, onClose }: ModalProgramacionProps) => {
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
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-lg font-geist-bold text-center mb-4">L M X J V S D</Text>
            <View className="flex-row items-center justify-between mb-4">
              <TimeInput title={'Hora de encendido'} />
              <TimeInput title={'Hora de apagado'} />
            </View>
            <View className="flex-row items-center justify-center mb-4 gap-3">
              <Pressable
                onPress={onClose}
                className="bg-gray-400 py-4 px-4 rounded-lg w-1/2"
              >
                <Text className="text-white text-center font-geist-semiBold">Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={save}
                className="bg-blue-500 py-3 px-4 rounded-lg w-1/2"
              >
                <View className="flex-row items-center justify-center">
                  <SaveIcon color="white" />
                  <Text className="text-white text-center font-geist-semiBold ml-2">Guardar</Text>
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
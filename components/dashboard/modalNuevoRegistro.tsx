import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

type ModalNuevoRegistroProps = {
  visible: boolean;
  onClose: () => void;
};

const ModalNuevoRegistro = ({ visible, onClose }: ModalNuevoRegistroProps) => {
  const [showDatePicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

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
            <Text className="text-text text-xl font-geist-bold mb-2 text-center">
              Nuevo Registro
            </Text>

            <Text className='text-text text-base font-geist mb-1'>Fecha</Text>

            <Pressable onPress={() => setShowPicker(true)}>
              <Text className='text-text text-base font-geist-semi-bold'>{date.toLocaleDateString()}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                date={date}
                mode="date"
                display="default"
                isVisible={showDatePicker}
                onConfirm={(selectedDate) => {
                  setShowPicker(false);
                  setDate(selectedDate);
                }}
                onCancel={() => setShowPicker(false)}
              />
            )}

            <Text className='text-text text-base font-geist mb-1'>Dispositivo</Text>
            <TextInput className='border border-grayish-unique rounded-lg p-2' placeholder='Ej: Bomba principal' />

            <Text className='text-text text-base font-geist mb-1'>Descripción</Text>
            <TextInput
                className='border border-grayish-unique rounded-lg p-2 h-28'
                multiline
                numberOfLines={4}
                maxLength={500}
                textAlignVertical="top"
                placeholder="Breve descripción"
            />

            <Text className='text-text text-base font-geist mb-1'>Técnico</Text>
            <TextInput className='border border-grayish-unique rounded-lg p-2' placeholder='Nombre y apellido del técnico' />


            <View className="flex-row justify-between gap-3 mt-5">
              <Pressable
                onPress={onClose}
                className="bg-grayish-unique rounded-lg flex-1 items-center justify-center h-12"
              >
                <Text className="text-text text-center font-geist-semi-bold">
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                onPress={save}
                className="bg-red-alert rounded-lg flex-1 items-center justify-center h-12"
              >
                <View className="flex-row items-center justify-center">
                  <Text className="text-white text-center font-geist-semi-bold ml-2">
                    Añadir Registro
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

export default ModalNuevoRegistro;

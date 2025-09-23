import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from 'react-native';
import React from 'react';
import { funcionFiltro } from '@/data/domain/piscina';

const ModalBarrefondo = ({
  visible,
  onClose,
  onSave,
  onSelected,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onSelected: (funcion: funcionFiltro) => void;
}) => {

  const handleFiltrarPress = () => {
    onSave();
    onSelected('FILTRAR');
    onClose();
  };

  const handleDesagotarPress = () => {
    onSave();
    onSelected('DESAGOTAR');
    onClose();
  }

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
            <Text className="text-lg font-geist-semi-bold text-text mb-4">
              Seleccione función de filtro para Barrefondo
            </Text>

            <View className="flex-row justify-between gap-3 mt-3">
              <Pressable
                onPress={onClose}
                className="bg-gray-400 rounded-lg flex-1 items-center justify-center h-12"
              >
                <Text className="text-text text-center font-geist-semi-bold">
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                onPress={handleFiltrarPress}
                className="bg-purple-unique rounded-lg flex-1 items-center justify-center h-12"
              >
                <View className="flex-row items-center justify-center">
                  <Text className="text-white text-center font-geist-semi-bold ml-2">
                    Filtrar
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={handleDesagotarPress}
                className="bg-purple-unique rounded-lg flex-1 items-center justify-center h-12"
              >
                <View className="flex-row items-center justify-center">
                  <Text className="text-white text-center font-geist-semi-bold ml-2">
                    Desagotar
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

export default ModalBarrefondo;

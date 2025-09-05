import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type CustomModalProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const ModalError = ({ visible, message, onClose }: CustomModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg w-4/5">
          <Text className="text-lg font-geist-bold text-center mb-4">{message}</Text>
          
          <TouchableOpacity
            onPress={onClose}
            className="bg-red-400 p-4 rounded-lg">
            <Text className="text-white text-center font-geist-semi-bold">Cerrar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default ModalError;
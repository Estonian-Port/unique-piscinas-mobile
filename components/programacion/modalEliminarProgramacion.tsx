import { View, Text, Pressable, KeyboardAvoidingView, Platform, Modal } from 'react-native'
import React from 'react'
import { DeleteIcon } from '@/assets/icons'

type ModalEliminarProgramacionProps = {
  visible: boolean
  onClose: () => void
  onDelete: () => void
}

const ModalEliminarProgramacion = ({visible, onClose, onDelete} : ModalEliminarProgramacionProps) => {
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
            <Text className="text-center font-geist-semi-bold text-lg">
              ¿Estás seguro de que deseas eliminar la programación?
            </Text>           

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
                onPress={onDelete}
                className="bg-red-500 rounded-lg flex-1 items-center justify-center h-12"
              >
                <View className="flex-row items-center justify-center">
                  <DeleteIcon color="white" />
                  <Text className="text-white text-center font-geist-semi-bold ml-2">
                    Eliminar
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
)}


export default ModalEliminarProgramacion
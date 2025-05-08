import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { piscinasMock } from '@/data/mock/piscinaMock';
import DropDownPicker from 'react-native-dropdown-picker';

type ModalAñadirPiscinaProps = {
  visible: boolean;
  onClose: () => void;
  nombreUsuario: string;
  apellidoUsuario: string;
};

const ModalAñadirPiscina = ({
  visible,
  onClose,
  nombreUsuario,
  apellidoUsuario,
}: ModalAñadirPiscinaProps) => {
  const [open, setOpen] = useState(false);
  const [piscinaSeleccionada, setPisicinaSeleccionada] = useState(null);

  const poolsDisponibles = piscinasMock.filter(
    (pool) => pool.propietario == null
  );

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
          <Text className="text-text text-lg font-geist-semi-bold mb-5">
            Añadir Piscina a {nombreUsuario + ' ' + apellidoUsuario}
          </Text>
          <DropDownPicker
            open={open}
            value={piscinaSeleccionada}
            items={poolsDisponibles.map((pool) => ({
              label: pool.name,
              value: pool.id,
            }))}
            setOpen={setOpen}
            setValue={setPisicinaSeleccionada}
            placeholder="Seleccione una piscina"
            style={{ borderColor: '#e5e7eb' }}
            dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
          />
          <View className="flex-row justify-between gap-3 mt-5">
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
                <Text className="text-white text-center font-geist-semi-bold ml-2">
                  Añadir Piscina
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

export default ModalAñadirPiscina;

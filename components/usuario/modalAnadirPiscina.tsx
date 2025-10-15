import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { administracionService } from '@/services/administracion.service';
import { PiscinaListItem } from '@/data/domain/piscina';
import Toast from 'react-native-toast-message';

type ModalAnadirPiscinaProps = {
  visible: boolean;
  onClose: () => void;
  idUsuario: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  onActualizarPiscinasAsignadas: () => void;
};

const ModalAnadirPiscina = ({
  visible,
  onClose,
  idUsuario,
  nombreUsuario,
  apellidoUsuario,
  onActualizarPiscinasAsignadas
}: ModalAnadirPiscinaProps) => {
  const [open, setOpen] = useState(false);
  const [piscinaSeleccionadaId, setPiscinaSeleccionadaId] = useState<number | null>(null);
  const [piscinasDisponibles, setPiscinasDisponibles] = useState<PiscinaListItem[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await administracionService.getPiscinasDisponibles();
          setPiscinasDisponibles(response);

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchData();
  }, []);

  const save = async () => {
    if (piscinaSeleccionadaId) {
      try {
        await administracionService.asignarPiscina(idUsuario, piscinaSeleccionadaId);
        Toast.show({
          type: 'success',
          text1: 'Piscina asignada',
          text2: 'La piscina ha sido asignada correctamente al usuario.',
          position: 'bottom',
        });
        onClose();
        onActualizarPiscinasAsignadas && onActualizarPiscinasAsignadas();
      } catch (error) {
        console.error('Error al agregar piscina:', error);
      }
    }
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
            value={piscinaSeleccionadaId}
            items={piscinasDisponibles.map((pool) => ({
              label: pool.direccion,
              value: pool.id,
            }))}
            setOpen={setOpen}
            setValue={setPiscinaSeleccionadaId}
            placeholder="Seleccione una piscina"
            style={{ borderColor: '#e5e7eb' }}
            dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
            ListEmptyComponent={() => (
              <Text style={{ padding: 10, color: '#888' }}>No hay piscinas disponibles</Text>
            )}
          />
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
              className="bg-purple-unique rounded-lg flex-1 items-center justify-center h-12"
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

export default ModalAnadirPiscina;

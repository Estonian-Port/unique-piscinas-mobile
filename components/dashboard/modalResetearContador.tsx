import { administracionService } from '@/services/administracion.service';
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import Toast from 'react-native-toast-message';

type ModalResetearContadorProps = {
  visible: boolean;
  onSave: () => void;
  onClose: () => void;
};

const ModalResetearContador = ({
  visible,
  onSave,
  onClose,
}: ModalResetearContadorProps) => {
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
              ¿Desea resetear el contador de vida restante?
            </Text>
            <Text className="text-text text-sm font-geist">
              Esta acción no se puede deshacer. Asegurese de haber cambiado el
              componente.
            </Text>
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
                onPress={onSave}
                className="bg-red-alert rounded-lg flex-1 items-center justify-center h-12"
              >
                <View className="flex-row items-center justify-center">
                  <Text className="text-white text-center font-geist-semi-bold ml-2">
                    Aceptar
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

export default ModalResetearContador;

import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EmailIcon,
  EyeIcon,
  RemoveIcon,
  TelephoneIcon,
} from '@/assets/icons';
import { Pressable, View, Text } from 'react-native';
import ModalAñadirPiscina from './modalAñadirPiscina';
import { useState } from 'react';
import ModalDesvincularPiscina from './modalDesvincularPiscina';
import ModalEliminarUsuario from './modalEliminarUsuario';
import { router } from 'expo-router';
import { UsuarioRegistrado } from '@/data/domain/user';
import { useAuth } from '@/context/authContext';

const UserItem = ({
  usuario,
  isExpanded,
  onToggleExpand,
  onActualizarPiscinasAsignadas,
}: {
  usuario: UsuarioRegistrado;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onActualizarPiscinasAsignadas: () => void;
}) => {
  const { seleccionarPiscina } = useAuth();
  const [modalNuevaPiscina, setModalNuevaPiscina] = useState(false);
  const [modalEliminarUsuario, setModalEliminarUsuario] = useState(false);
  const [modalDesvincularPiscina, setModalDesvincularPiscina] = useState(false);

  const handlePanel = async (poolId: number) => {
    try {
      await seleccionarPiscina(poolId);
      router.push('/(tabs)/resume');
    } catch (error) {
      console.error('Error seleccionando piscina:', error);
    }
  };

  return (
    <View className="border-b border-gray-200 py-5">
      <Pressable
        className="flex-row justify-between items-center"
        onPress={onToggleExpand}
      >
        <View>
          <Text className="font-geist-semi-bold text-text text-base">
            {usuario.nombre + ' ' + usuario.apellido}
          </Text>
          <View className="flex-row gap-1 items-center">
            <EmailIcon size={12} />
            <Text className="font-geist text-gray-500 text-sm">{usuario.email}</Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <TelephoneIcon size={12} />
            <Text className="font-geist text-gray-500 text-sm">{usuario.celular}</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <View
            className={`rounded-full px-2 py-1 ${
              usuario.estado === 'ACTIVO'
                ? 'bg-green-400'
                : usuario.estado === 'INACTIVO'
                ? 'bg-red-400'
                : 'bg-gray-300'
            }`}
          >
            <Text className="font-geist-semi-bold text-text text-sm text-center">
              {usuario.estado.charAt(0).toUpperCase() +
                usuario.estado.slice(1).toLowerCase()}
            </Text>
          </View>
          <Pressable onPress={() => setModalEliminarUsuario(true)}>
            <DeleteIcon size={26} color={'red'}></DeleteIcon>
          </Pressable>
          {modalEliminarUsuario && (
            <ModalEliminarUsuario
              visible={modalEliminarUsuario}
              onClose={() => setModalEliminarUsuario(false)}
              idUsuario={usuario.id}
              nombreUsuario={usuario.nombre}
              apellidoUsuario={usuario.apellido}
              piscinasAsignadas={usuario.piscinasAsignadas.length > 0}
              actualizarUsuariosRegistrados={onActualizarPiscinasAsignadas}
            />
          )}
          {isExpanded ? (
            <ChevronUpIcon size={20} color="#333" />
          ) : (
            <ChevronDownIcon size={20} color="#333" />
          )}
        </View>
      </Pressable>

      {isExpanded && (
        <View>
          <View className="flex-row justify-between items-center mt-5">
            <Text className="font-geist-semi-bold text-text text-base flex-1 pr-2">
              Piscinas asignadas
            </Text>
            <Pressable
              className="border border-gray-300 rounded-md p-2 flex-row items-center justify-center"
              onPress={() => setModalNuevaPiscina(true)}
            >
              <Text> + Añadir Piscina</Text>
            </Pressable>
            {modalNuevaPiscina && (
              <ModalAñadirPiscina
                visible={modalNuevaPiscina}
                onClose={() => setModalNuevaPiscina(false)}
                idUsuario={usuario.id}
                nombreUsuario={usuario.nombre}
                apellidoUsuario={usuario.apellido}
                onActualizarPiscinasAsignadas={onActualizarPiscinasAsignadas}
              />
            )}
          </View>

          {usuario.piscinasAsignadas.length === 0 ? (
            <Text className="font-geist text-gray-500 mt-4 text-center">
              Usuario sin piscinas asignadas
            </Text>
          ) : (
            usuario.piscinasAsignadas.map((piscina) => (
              <View
                className="flex-row justify-between items-center bg-gray-200 rounded-sm mx-1 p-2 mt-3"
                key={piscina.id}
              >
                <View>
                  <Text className="font-geist-semi-bold text-text text-sm">
                    {piscina.direccion}
                  </Text>
                  <Text className="font-geist text-text text-sm">
                    {Math.round(piscina.volumen)} m³
                  </Text>
                </View>
                <View className="flex-row items-center justify-between gap-3">
                  <Pressable
                    className="justify-center items-center h-12 w-12"
                    onPress={() => handlePanel(piscina.id)}
                  >
                    <EyeIcon size={22}></EyeIcon>
                  </Pressable>
                  <Pressable
                    className="justify-center items-center h-12 w-12"
                    onPress={() => setModalDesvincularPiscina(true)}
                  >
                    <RemoveIcon size={20}></RemoveIcon>
                  </Pressable>
                  {modalDesvincularPiscina && (
                    <ModalDesvincularPiscina
                      piscinaSeleccionadaId={piscina.id}
                      idUsuario={usuario.id}
                      visible={modalDesvincularPiscina}
                      onClose={() => setModalDesvincularPiscina(false)}
                      onActualizarPiscinasAsignadas={onActualizarPiscinasAsignadas}
                    />
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
};

export default UserItem;

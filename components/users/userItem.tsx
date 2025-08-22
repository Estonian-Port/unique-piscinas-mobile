import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EyeIcon,
  RemoveIcon,
} from '@/assets/icons';
import { Pressable, View, Text } from 'react-native';
import ModalAñadirPiscina from './modalAñadirPiscina';
import { useState } from 'react';
import ModalDesvincularPiscina from './modalDesvincularPiscina';
import ModalEliminarUsuario from './modalEliminarUsuario';
import { Link } from 'expo-router';
import { Usuario } from '@/data/domain/user';

const UserItem = ({
  usuario: usuario,
  isExpanded,
  onToggleExpand,
}: {
  usuario: Usuario;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  const [modalNuevaPiscina, setModalNuevaPiscina] = useState(false);
  const [modalEliminarUsuario, setModalEliminarUsuario] = useState(false);
  const [modalDesvincularPiscina, setModalDesvincularPiscina] = useState(false);

  return (
    <View className="border-b border-gray-200 py-5">
      <Pressable
        className="flex-row justify-between items-center"
        onPress={onToggleExpand}
      >
        <View>
          <Text className="font-geist-semi-bold text-text text-base">
            {usuario.name + ' ' + usuario.lastname}
          </Text>
          <Text className="font-geist text-gray-500">{usuario.email}</Text>
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <View className="rounded-full bg-black px-2 py-1">
            <Text className="font-geist-semi-bold text-white text-sm text-center">
              Activo
            </Text>
          </View>
          <Pressable onPress={() => setModalEliminarUsuario(true)}>
            <DeleteIcon size={26} color={'red'}></DeleteIcon>
          </Pressable>
          {modalEliminarUsuario && (
            <ModalEliminarUsuario
              visible={modalEliminarUsuario}
              onClose={() => setModalEliminarUsuario(false)}
              nombreUsuario={usuario.name}
              apellidoUsuario={usuario.lastname}
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
                nombreUsuario={usuario.name}
                apellidoUsuario={usuario.lastname}
              />
            )}
          </View>

          {usuario.piscinas.map((piscina) => (
            <View
              className="flex-row justify-between items-center bg-gray-200 rounded-sm mx-1 p-2 mt-3"
              key={piscina.id}
            >
              <View className="">
                <Text
                  key={piscina.id}
                  className="font-geist-semi-bold text-text text-sm"
                >
                  {piscina.name}
                </Text>
                <Text className="font-geist text-text text-sm">
                  {piscina.volume} m3
                </Text>
              </View>
              <View className="flex-row items-center justify-between gap-3">
                <Link asChild href={`/(tabs)/${piscina.id}`}>
                  <Pressable className="justify-center items-center h-12 w-12">
                    <EyeIcon size={22}></EyeIcon>
                  </Pressable>
                </Link>
                <Pressable
                  className="justify-center items-center h-12 w-12"
                  onPress={() => setModalDesvincularPiscina(true)}
                >
                  <RemoveIcon size={20}></RemoveIcon>
                </Pressable>
                {modalDesvincularPiscina && (
                  <ModalDesvincularPiscina
                    visible={modalDesvincularPiscina}
                    onClose={() => setModalDesvincularPiscina(false)}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default UserItem;

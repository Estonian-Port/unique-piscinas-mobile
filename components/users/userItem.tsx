import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EyeIcon,
} from '@/assets/icons';
import { Pressable, View, Text } from 'react-native';
import ModalAñadirPiscina from './modalAñadirPiscina';
import { useState } from 'react';

const UserItem = ({
  user,
  isExpanded,
  onToggleExpand,
}: {
  user: User;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="border-b border-gray-200 py-5">
      <Pressable
        className="flex-row justify-between items-center"
        onPress={onToggleExpand}
      >
        <View>
          <Text className="font-geist-semi-bold text-text text-base">
            {user.name + ' ' + user.lastname}
          </Text>
          <Text className="font-geist text-text text-base">{user.email}</Text>
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <View className="rounded-full bg-black px-2 py-1">
            <Text className="font-geist-semi-bold text-white text-sm text-center">
              Activo
            </Text>
          </View>
          <Pressable>
            <DeleteIcon size={26} color={'red'}></DeleteIcon>
          </Pressable>
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
              onPress={() => setModalVisible(true)}
            >
              <Text> + Añadir Piscina</Text>
            </Pressable>
            {modalVisible && (
              <ModalAñadirPiscina
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                nombreUsuario={user.name}
                apellidoUsuario={user.lastname}
              />
            )}
          </View>

          {user.piscinas.map((piscina) => (
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
              <View className="flex-row items-center justify-between gap-5">
                <Pressable>
                  <EyeIcon size={26}></EyeIcon>
                </Pressable>
                <Pressable>
                  <DeleteIcon size={26} color={'red'}></DeleteIcon>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default UserItem;

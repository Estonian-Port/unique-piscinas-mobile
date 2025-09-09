import { View, Text, Switch, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { AutorenewIcon, DeleteIcon, EditIcon } from '@/assets/icons';
import { Germicida, PiscinaEquipos } from '@/data/domain/piscina';
import ModalEditarGermicida from './modalEditarGermicida';
import Toast from 'react-native-toast-message';
import { piscinaService } from '@/services/piscina.service';
import ModalEliminarEquipamiento from './modalEliminarEquipamiento';

const GermicidaCard = ({
  germicida,
  piscina,
  actualizarPiscina,
}: {
  germicida: Germicida;
  piscina: PiscinaEquipos;
  actualizarPiscina: () => void;
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleSaveGermicida = async (germicidaEditado: Germicida) => {
    try {
      const response = await piscinaService.updateGermicida(
        piscina.id,
        germicidaEditado
      );
      setModalEditOpen(false);
      await actualizarPiscina();
      Toast.show({
        type: 'success',
        text1: 'Germicida actualizado',
        text2: response.message,
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al actualizar el germicida',
        text2: 'Intente nuevamente más tarde.',
        position: 'bottom',
      });
    }
  };

  const handleDeleteGermicida = async () => {
    try {
      const response = await piscinaService.deleteGermicida(piscina.id, germicida.id);
      setModalDeleteOpen(false);
      await actualizarPiscina();
      Toast.show({
        type: 'success',
        text1: 'Germicida eliminado',
        text2: response.message,
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al eliminar el germicida',
        text2: 'Intente nuevamente más tarde.',
        position: 'bottom',
      });
    }
  };

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center justify-between w-full">
          <Text className="text-text font-geist-semi-bold text-lg">
            {germicida.tipo}
          </Text>
          <View className='flex-row items-center'>
            <Pressable className="ml-2" onPress={() => setModalEditOpen(true)}>
              <EditIcon />
            </Pressable>
            <Pressable
              className="ml-2"
              onPress={() => setModalDeleteOpen(true)}
            >
              <DeleteIcon />
            </Pressable>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-text font-geist text-base">Estado:</Text>
        <View
          className={`rounded-full px-2 ${
            germicida.activo ? 'bg-green-500' : 'bg-gray-500'
          }`}
        >
          <Text className="font-geist-semi-bold text-white text-sm">
            {germicida.activo ? 'Activa' : 'Inactiva'}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between my-1">
        <Text className="text-text font-geist text-base">Marca:</Text>
        <Text className="font-geist-semi-bold text-text text-base">
          {germicida.marca}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">
          {germicida.tipo == 'UV' || germicida.tipo == 'Trasductor'
            ? 'Potencia:'
            : 'Electrodos:'}
        </Text>
        <Text className="font-geist-semi-bold text-text text-base">
          {germicida.datoExtra} kW
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Vida restante:</Text>
        <Text className="font-geist-semi-bold text-text text-base">
          {germicida.vidaRestante} hs restantes - {germicida.estado}
        </Text>
      </View>
      <Pressable className="flex-row rounded-lg bg-black py-2 items-center justify-center mt-2">
        <AutorenewIcon color={'white'} size={20} />
        <Text className="text-white font-geist text-base ml-2">
          Resetear contador
        </Text>
      </Pressable>
      {modalEditOpen && (
        <ModalEditarGermicida
          visible={modalEditOpen}
          germicida={germicida}
          onClose={() => setModalEditOpen(false)}
          onSave={handleSaveGermicida}
        />
      )}
      {modalDeleteOpen && (
        <ModalEliminarEquipamiento
          visible={modalDeleteOpen}
          equipamiento={`Germicida ${germicida.tipo}`}
          onClose={() => setModalDeleteOpen(false)}
          onDelete={handleDeleteGermicida}
        />
      )}
    </ScreenCard>
  );
};

export default GermicidaCard;

import { View, Text, Switch, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { AutorenewIcon, EditIcon } from '@/assets/icons';
import { Germicida, PiscinaEquipos } from '@/data/domain/piscina';
import ModalEditarGermicida from './modalEditarGermicida';

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

  const handleSaveGermicida = async (germicidaEditado: Germicida) => {
    // Lógica para guardar los cambios del germicida
    // Puedes llamar a un servicio o actualizar el estado según sea necesario
    setModalEditOpen(false);
    await actualizarPiscina();
  };

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center">
          <Text className="text-text font-geist-semi-bold text-lg">
            {germicida.tipo}
          </Text>
          <Pressable className="ml-2" onPress={() => setModalEditOpen(true)}>
            <EditIcon />
          </Pressable>
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
          {germicida.vidaRestante} %
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
    </ScreenCard>
  );
};

export default GermicidaCard;

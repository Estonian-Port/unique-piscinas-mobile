import { View, Text, Switch, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { EditIcon, FilterIcon } from '@/assets/icons';
import { Filtro } from '@/data/domain/piscina';
import ModalEditarFiltro from './modalEditarFiltro';

const FiltroCard = ({ filtro }: { filtro: Filtro }) => {
  const [isActive, setIsActive] = useState(true);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  const handleSaveFiltro = async (filtroEditado: Filtro) => {
    console.log('Filtro editado:', filtroEditado);
  };

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center">
          <FilterIcon color={'cyan'} />
          <View className="mx-2">
            <Text className="text-base font-geist-semi-bold text-text">
              Filtro de {filtro.tipo}
            </Text>
          </View>
          <Pressable onPress={() => setModalEditOpen(true)}>
            <EditIcon />
          </Pressable>
        </View>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#000000' }}
          thumbColor="#fcdb99"
          ios_backgroundColor="#d3d3d3"
          onValueChange={() => setIsActive(!isActive)}
          value={isActive}
        />
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Marca:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {filtro.marca}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Modelo:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {filtro.modelo}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Diámetro:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {filtro.diametro}
        </Text>
      </View>
      {filtro.tipo !== 'Diatomeas' && (
        <View className="flex-row items-center justify-between mb-1">
          <Text className="font-geist text-text text-base">
            {filtro.tipo === 'Arena'
              ? 'Cantidad de arena (kg)'
              : filtro.tipo === 'Vidrio'
              ? 'Cantidad de vidrio (kg)'
              : 'Micras del cartucho'}
          </Text>
          <Text className="font-geist-semi-bold tex-text text-base">
            {filtro.datoExtra}
          </Text>
        </View>
      )}

      <View className="flex-row items-center justify-between">
        <Text className="text-text font-geist text-base">Estado:</Text>
        <View
          className={`rounded-full px-2 ${
            isActive ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <Text className="font-geist-semi-bold text-white text-sm">
            {isActive ? 'Activa' : 'Inactiva'}
          </Text>
        </View>
      </View>
      {modalEditOpen && (
        <ModalEditarFiltro
          visible={modalEditOpen}
          filtro={filtro}
          onClose={() => setModalEditOpen(false)}
          onSave={handleSaveFiltro}
        />
      )}
    </ScreenCard>
  );
};

export default FiltroCard;

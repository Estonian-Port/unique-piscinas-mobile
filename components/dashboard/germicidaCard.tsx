import { View, Text, Switch, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { AutorenewIcon, EditIcon } from '@/assets/icons';
import { Germicida } from '@/data/domain/piscina';

const GermicidaCard = ({ germicida }: { germicida: Germicida }) => {
  const [isActive, setIsActive] = useState(germicida.estado);

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center">
          <Pressable className='ml-2'>
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
      <View className="flex-row items-center justify-between">
        <Text className="text-text font-geist text-base">Estado:</Text>
        <View
          className={`rounded-full px-2 ${
            isActive ? 'bg-green-500' : 'bg-gray-500'
          }`}
        >
          <Text className="font-geist-semi-bold text-white text-sm">
            {isActive ? 'Activa' : 'Inactiva'}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-text font-geist text-base">Vida restante:</Text>
        <Text className="font-geist-semi-bold tex-text text-base">
          {germicida.vidaRestante} %
        </Text>
      </View>
      <Pressable className="flex-row rounded-lg bg-black py-2 items-center justify-center mt-2">
        <AutorenewIcon color={'white'} size={20} />
        <Text className="text-white font-geist text-base ml-2">
          Resetear contador
        </Text>
      </Pressable>
    </ScreenCard>
  );
};

export default GermicidaCard;

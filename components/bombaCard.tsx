import { View, Text, Switch, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from './ScreenCard';
import { EditIcon, TintIcon } from '@/assets/icons';

const BombaCard = ({ bomba }: { bomba: Bomba }) => {
  const [isActive, setIsActive] = useState(bomba.activa);

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TintIcon color={'cyan'} />
          <View className="mx-2">
            <Text className="text-base font-geist-semi-bold text-text">
              {bomba.nombre}
            </Text>
            <Text className="text-base font-geist-light text-text">
              Bomba de filtración
            </Text>
          </View>
          <Pressable>
            <EditIcon />
          </Pressable>
        </View>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#000000' }}
          thumbColor="#ffffff"
          ios_backgroundColor="#d3d3d3"
          onValueChange={() => setIsActive(!isActive)}
          value={isActive}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className='text-text font-geist text-base'>Marca:</Text>
        <Text className='font-geist-semi-bold tex-text text-base'>{bomba.marca}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className='text-text font-geist text-base'>Modelo:</Text>
        <Text className='font-geist-semi-bold tex-text text-base'>{bomba.modelo}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className='text-text font-geist text-base'>Potencia:</Text>
        <Text className='font-geist-semi-bold tex-text text-base'>{bomba.potencia}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className='text-text font-geist text-base'>Estado:</Text>
        <Text className='font-geist-semi-bold tex-text text-base'>{isActive ? 'Activa' : 'Inactiva'}</Text>
      </View>
    </ScreenCard>
  );
};

export default BombaCard;

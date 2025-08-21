import React from 'react';
import { View, Text } from 'react-native';
import BotonCambio from './botonCambio';

type HeaderProps = {
  userName: string
  poolName: string
  poolVolumen : string
  moreThan1Pool : boolean
  isAdmin : boolean
};

const Header = ({ userName, poolName, poolVolumen, moreThan1Pool, isAdmin }: HeaderProps) => {
  return (
    <>
      <View className="w-11/12 my-3">
        <Text className="font-geist-bold text-2xl text-text">
          Hola, {userName} bienvenido!
        </Text>
      </View>
      <View className="flex-row w-11/12 justify-between mb-3">
        <View className="flex-1 pr-4">
          <Text className="font-geist-semi-bold text-xl text-text">
            {poolName}
          </Text>
          <Text className="font-geist text-base text-text">
            Volumen de la piscina: {poolVolumen} m3
          </Text>
        </View>
        {moreThan1Pool && !isAdmin && <BotonCambio />}
      </View>
    </>
  );
};

export default Header;

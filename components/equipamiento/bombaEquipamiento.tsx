import { View, Text } from 'react-native'
import React from 'react'
import IndicadorEstado from './indicadorEstado'
import { Bomba } from '@/data/domain/piscina'

const BombaCard = ({ bomba, esBombaPrincipal }: { bomba: Bomba, esBombaPrincipal: boolean }) => {
  return (
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado verde={bomba.activa} gris={!bomba.activa} />
          <Text className="font-geist text-text text-base ml-2">
            {esBombaPrincipal ? 'Bomba Principal' : 'Bomba Secundaria'}
          </Text>
        </View>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-sm mx-1">
            {bomba.activa ? 'Activa' : 'Inactiva'}
          </Text>
        </View>
      </View>
  )
}

export default BombaCard
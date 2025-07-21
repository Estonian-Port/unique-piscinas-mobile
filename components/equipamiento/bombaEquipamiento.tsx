import { View, Text } from 'react-native'
import React from 'react'
import IndicadorEstado from './indicadorEstado'
import { Bomba } from '@/data/domain/piscina'

const BombaCard = ({ bomba }: { bomba: Bomba }) => {
  return (
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-base ml-2">
            {bomba.nombre}
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
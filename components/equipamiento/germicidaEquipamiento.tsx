import { View, Text } from 'react-native'
import React from 'react'
import IndicadorEstado from './indicadorEstado'
import { Germicida } from '@/data/domain/piscina'

const GermicidaEquipamiento = ({germicida} : {germicida:Germicida}) => {
  return (
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center self-start">
          <IndicadorEstado />
          <Text className="font-geist text-text text-base ml-2">
            Lámpara UV
          </Text>
        </View>
        <Text className="font-geist-light text-text text-base mx-1">
          1.5 horas
        </Text>
        <View className="flex-row items-center justify-center border border-gray-200 rounded-xl p-0.5">
          <Text className="font-geist text-text text-sm mx-1">
            Reemplazo próximo
          </Text>
        </View>
      </View>
  )
}

export default GermicidaEquipamiento
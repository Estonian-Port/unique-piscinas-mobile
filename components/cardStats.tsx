import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'


type CardStatsProps = {
    title: string;
    icon: any;
    data: number;
    color: string;
}

const CardStats = ({ title, icon, data, color}: CardStatsProps) => {
    const min = Math.floor(data) - 2; // Dos puntos hacia atrás
    const max = Math.ceil(data) + 2; // Dos puntos hacia adelante
    
    const progress = (data - min) / (max - min); // Calcula el progreso como un valor entre 0 y 1
    
    const differenceLastData = () => {
        const lastData = data - 0.1; // Simulando un valor anterior
        if (lastData < data) {
          return `+${(data - lastData).toFixed(1)} desde la ultima medición`;
        }
        if (lastData > data) {
          return `-${(lastData - data).toFixed(1)}`;
        }
        return `0`;
      };

  return (
    <View className='bg-white shadow-md rounded-lg p-4 mb-4 w-11/12'>
        <View className='flex-row justify-between items-center w-full'>
            <Text className='font-geist-semiBold text-text text-l mb-3'>{title}</Text>
            <FontAwesome name={icon} size={24} color={color} />
        </View>
        <Text className='font-geist-semiBold text-text text-3xl'>{data}</Text>
        <Text className='font-geist-light text-text text-base'>{differenceLastData()}</Text>
        <View className="w-full bg-gray-200 h-2 rounded-full mt-4">
        <View
          style={{
            width: `${progress * 100}%`,
            backgroundColor: color,
            height: '100%',
            borderRadius: 4,
          }}
        />
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-gray-500 text-sm">{min}</Text>
        <Text className="text-gray-500 text-sm">{(min + max) / 2}</Text>
        <Text className="text-gray-500 text-sm">{max}</Text>
      </View>
    </View>
  )
}

export default CardStats
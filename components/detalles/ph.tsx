import { View, Text } from 'react-native'
import React from 'react'
import { TintIcon } from '@/assets/icons';


type PhProps = {
    title: string;
    icon: any;
    data: number;
    color: string;
    isTemperature?: boolean;
}

const Ph = ({ data}: {data : number}) => {
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
    <View className='bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200'>
        <View className='flex-row justify-between items-center w-full'>
            <Text className='font-geist-semi-bold text-text text-l mb-3'>pH</Text>
            <TintIcon/>
        </View>
        <Text className='font-geist-semi-bold text-text text-3xl'>{data}</Text>
        <Text className='font-geist-light text-text text-base'>{differenceLastData()}</Text>
        <View className="w-full bg-gray-200 h-2 rounded-full mt-4">
        <View
          style={{
            width: `${progress * 100}%`,
            backgroundColor: 'black',
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

export default Ph
import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

type CardClimaProps = {
  temperature: number;
    weatherIcon: any;
    colorIcon: string;
    location: string;
    weatherStatus: string;
    humidity: number;
    wind: number;
}

const CardClima = ({temperature, weatherIcon, colorIcon, location, weatherStatus, humidity, wind} : CardClimaProps) => {
  return (
    <View className='bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12'>
        <Text className='font-geist-semiBold text-text text-lg mb-3'>Clima Local</Text>
        <View className='flex-row justify-between items-center w-full mb-1'>
            <Text className='font-geist-semiBold text-text text-3xl'>{temperature} °C</Text>
            <MaterialIcons name={weatherIcon} size={30} color={colorIcon} />                                             
        </View>
            <Text className='font-geist-light text-text text-sm'>{location}</Text>
            <Text className='font-geist-semiBold text-text text-xl'>{weatherStatus}</Text>
    <View className="flex-row justify-between mt-2">
      <View className="flex-row items-center">
        <MaterialIcons name="water-drop" size={18} color="#9B5278" />
        <Text className="text-text text-sm ml-1">Humedad: {humidity}%</Text>
      </View>
      <View className="flex-row items-center">
        <MaterialIcons name="air" size={18} color="#9B5278" />
        <Text className="text-text text-sm ml-1">Viento: {wind} km/h</Text>
      </View>
    </View>
    </View>
  )
}

export default CardClima
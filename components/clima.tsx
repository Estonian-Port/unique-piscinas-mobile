import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AirIcon, TintIcon } from '@/assets/icons';

type ClimaProps = {
  temperature: number;
    weatherIcon: any;
    colorIcon: string;
    location: string;
    weatherStatus: string;
    humidity: number;
    wind: number;
}

const Clima = ({temperature, weatherIcon, colorIcon, location, weatherStatus, humidity, wind} : ClimaProps) => {
  return (
    <View className='bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200'>
        <Text className='font-geist-semiBold text-text text-lg mb-3'>Clima Local</Text>
        <View className='flex-row justify-between items-center w-full mb-1'>
            <Text className='font-geist-semiBold text-text text-3xl'>{temperature} °C</Text>
            <MaterialIcons name={weatherIcon} size={30} color={colorIcon} />                                             
        </View>
            <Text className='font-geist-light text-text text-sm'>{location}</Text>
            <Text className='font-geist-semiBold text-text text-xl'>{weatherStatus}</Text>
    <View className="flex-row justify-between mt-2">
      <View className="flex-row items-center">
        <TintIcon color="#9B5278" size={18}/>
        <Text className="text-text text-sm ml-1">Humedad: {humidity}%</Text>
      </View>
      <View className="flex-row items-center">
        <AirIcon/>
        <Text className="text-text text-sm ml-1">Viento: {wind} km/h</Text>
      </View>
    </View>
    </View>
  )
}

export default Clima
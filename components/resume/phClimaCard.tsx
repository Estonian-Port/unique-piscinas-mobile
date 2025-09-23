import { View, Text } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenCard } from '../utiles/ScreenCard';
import { Droplet, Wind } from 'react-native-feather';

type PhClimaProps = {
  ph: number;
  diferenciaPh: number;
  temperature: number;
  weatherIcon: any;
  colorIcon: string;
  location: string;
  weatherStatus: string;
  humidity: number;
  wind: number;
};

const PhClimaCard = ({
  ph,
  diferenciaPh,
  temperature,
  weatherIcon,
  colorIcon,
  location,
  weatherStatus,
  humidity,
  wind,
}: PhClimaProps) => {
  const min = 0
  const max = 14
  //const min = Math.floor(ph) - 2; // Dos puntos hacia atrás
  //const max = Math.ceil(ph) + 2; // Dos puntos hacia adelante

  const progress = (ph - min) / (max - min); // Calcula el progreso como un valor entre 0 y 1

  return (
    <ScreenCard>
    <View className="flex-row">
      <View className="bg-white p-2 border-r-gray-200 flex-1">
        <Text className="font-geist-semi-bold text-text text-lg mb-3">pH</Text>
        <Text className="font-geist-semi-bold text-text text-3xl">{ph}</Text>
        <Text className="font-geist-light text-text text-sm">
          {diferenciaPh.toFixed(2)} desde la última medición
        </Text>
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

      <View className="bg-white p-2 flex-1">
        <Text className="font-geist-semi-bold text-text text-lg mb-2">
          Clima Local
        </Text>
        <View className="flex-row justify-between items-center w-full mb-1">
          <Text className="font-geist-semi-bold text-text text-3xl">
            {temperature} °C
          </Text>
          <MaterialIcons name={weatherIcon} size={30} color={colorIcon} />
        </View>
        <Text className="font-geist-light text-text text-sm">{location}</Text>
        <Text className="font-geist-semi-bold text-text text-xl">
          {weatherStatus}
        </Text>
        <View className="mt-2 gap-3">
          <View className="flex-row items-center">
            <Droplet color="#9B5278" />
            <Text className="text-text text-sm ml-1">Humedad: {humidity}%</Text>
          </View>
          <View className="flex-row items-center">
            <Wind />
            <Text className="text-text text-sm ml-1">Viento: {wind} km/h</Text>
          </View>
        </View>
      </View>
    </View>
    </ScreenCard>
  );
};

export default PhClimaCard;

import { View, Text } from 'react-native';
import React from 'react';
import { AirIcon, TintIcon } from '@/assets/icons';
import { MaterialIcons } from '@expo/vector-icons';

type PhClimaProps = {
  ph: number;
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
  temperature,
  weatherIcon,
  colorIcon,
  location,
  weatherStatus,
  humidity,
  wind,
}: PhClimaProps) => {
  const min = Math.floor(ph) - 2; // Dos puntos hacia atrás
  const max = Math.ceil(ph) + 2; // Dos puntos hacia adelante

  const progress = (ph - min) / (max - min); // Calcula el progreso como un valor entre 0 y 1

  const differenceLastData = () => {
    const lastData = ph - 0.1; // Simulando un valor anterior
    if (lastData < ph) {
      return `+${(ph - lastData).toFixed(1)} desde la ultima medición`;
    }
    if (lastData > ph) {
      return `-${(lastData - ph).toFixed(1)}`;
    }
    return `0`;
  };

  return (
    <View className="flex-row self-center bg-white shadow-xl rounded-lg p-2 mb-4 w-11/12 border-gray-200">
      <View className="bg-white p-4 border-r-gray-200 flex-1">
        <Text className="font-geist-semi-bold text-text text-lg mb-3">pH</Text>
        <Text className="font-geist-semi-bold text-text text-3xl">{ph}</Text>
        <Text className="font-geist-light text-text text-">
          {differenceLastData()}
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

      <View className="bg-white p-4 flex-1">
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
            <TintIcon color="#9B5278" size={18} />
            <Text className="text-text text-sm ml-1">Humedad: {humidity}%</Text>
          </View>
          <View className="flex-row items-center">
            <AirIcon />
            <Text className="text-text text-sm ml-1">Viento: {wind} km/h</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PhClimaCard;

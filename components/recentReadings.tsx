import { View, Text } from 'react-native';
import React from 'react';
import CardReading from './cardReading';

const RecentReadingsData = [
  {
    icon: 'opacity',
    mainData: 'pH: 7.2',
    timeData: 'Hoy, 09:30',
    maintenanceData: 'Mantenimiento: Fondo, Skimmer',
    status: 'Normal',
  },
  {
    icon: 'thermostat',
    mainData: 'Temperatura: 24.5°C',
    timeData: 'Hoy, 09:30',
    maintenanceData: 'Mantenimiento: Barrefondo',
    status: 'Normal',
  },
  {
    icon: 'opacity',
    mainData: 'pH: 7.1',
    timeData: 'Ayer, 15:45',
    maintenanceData: 'Mantenimiento: Barrefondo, Skimmer',
    status: 'Normal',
  },
  {
    icon: 'thermostat',
    mainData: 'Temperatura: 24.8°C',
    timeData: 'Ayer, 15:45',
    maintenanceData: 'Mantenimiento: Fondo',
    status: 'Normal',
  },
];

const RecentReadings = () => {
  return (
    <View className="bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200">
      <Text className="font-geist-semiBold text-text text-3xl">
        Lecturas recientes
      </Text>
      <Text className="font-geist text-sm text-text mb-3">
              Últimas lecturas realizadas
        </Text>
      {RecentReadingsData.map((reading, index) => (
        <CardReading
          icon={reading.icon}
          key={index}
          mainData={reading.mainData}
          timeData={reading.timeData}
          maintenanceData={reading.maintenanceData}
          status={reading.status}
        ></CardReading>
      ))}
    </View>
  );
};

export default RecentReadings;

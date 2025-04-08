import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import TimeInput from './timeInput';

const LightSchedule = () => {
  const daysOfWeek = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
  const [activeDays, setActiveDays] = useState<string[]>([]);

  const isActiveDay = (day: string) => {
    return activeDays.includes(day);
  };

  const toggleDay = (day: string) => {
    if (isActiveDay(day)) {
      setActiveDays(activeDays.filter((d) => d !== day));
    } else {
      setActiveDays([...activeDays, day]);
    }
  };

  return (
      <>
      <View className="flex-row items-center justify-between mx-3 mt-10 mb-2">
          <TimeInput title={'Hora de encendido'} />
          <TimeInput title={'Hora de apagado'} />
      </View>
      <Text className="font-geist text-text text-lg mb-2">Dias activos</Text>
      <View className="flex-row items-center justify-between w-full mb-3">
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            className={`flex-row items-center flex-1 justify-center rounded-sm py-4 mx-0.5 ${
              isActiveDay(day) ? 'bg-slate-400' : 'bg-black'
            }`}
            onPress={() => toggleDay(day)}
          >
            <Text className="font-geist-semiBold text-white text-base">
              {day}
            </Text>
          </TouchableOpacity>))}
          </View>
        </>
  );
}

export default LightSchedule;
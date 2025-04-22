import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import CustomSwitch from './standBy/customSwitch';
import LightSchedule from './lightSchedule';

const ControlLuces = () => {
  const [isOn, setIsOn] = useState(false);
  const [isManual, setIsManual] = useState(false);

  const changeSwitch = () => setIsOn((previousState) => !previousState);

  return (
    <View className="bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200">
      <View className="flex-row justify-between mb-4 w-full">
        <Text className="font-geist-semiBold text-text text-3xl">
          Control de Luces
        </Text>
        <View className="flex-row items-center justify-between">
          {isOn ? (
            <MaterialIcons name="lightbulb" size={24} color="#FF4500" />
          ) : (
            <MaterialIcons name="lightbulb-outline" size={24} color="#FF4500" />
          )}
          <Switch
            trackColor={{ false: '#D3D3D3', true: '#000' }}
            thumbColor="ffffff"
            ios_backgroundColor="#D3D3D3"
            onValueChange={changeSwitch}
            value={isOn}
          />
        </View>
      </View>
      <CustomSwitch isManual={isManual} setIsManual={setIsManual} />
      {isOn && isManual && (
        <View className="items-center justify-between m-10">
          <View className="bg-gray-200 p-7 items-center rounded-full">
            <MaterialIcons name="lightbulb" size={50} color="#FF4500" />
          </View>
          <Text className="font-geist-light text-text text-lg mt-5">
            Luces Encendidas
          </Text>
        </View>
      )}
      {!isOn && isManual && (
        <View className="items-center justify-between m-10 opacity-50">
          <View className="bg-gray-200 p-7 items-center rounded-full">
            <MaterialIcons name="lightbulb-outline" size={50} color="#FF4500" />
          </View>
          <Text className="font-geist-light text-text text-lg mt-5">
            Luces Apagadas
          </Text>
        </View>
      )}
      {isOn && !isManual && <LightSchedule/>}
      {!isOn && !isManual && (
        <View className="opacity-50" pointerEvents="none">
          <LightSchedule/>
        </View>
      )}
    </View>
  );
};

export default ControlLuces;

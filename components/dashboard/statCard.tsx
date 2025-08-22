import { View, Text } from 'react-native';
import React from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { MaterialIcons } from '@expo/vector-icons';

type StatCardProps = {
  title: string;
  value: number;
  unity?: string;
  label: string;
  icon: any;
};

const StatCard = ({
  title,
  value,
  unity = '',
  label,
  icon,
}: StatCardProps) => {
  return (
    <ScreenCard>
      <View className="flex-row justify-between mb-2">
        <Text className="font-geist-semi-bold text-xl text-text">{title}</Text>
        <MaterialIcons name={icon} size={20} color="black" />
      </View>
      <Text className="font-geist-semi-bold text-3xl text-text mb-1">{`${value} ${unity}`}</Text>
      <Text className="font-geist-light text-base text-gray-500">{label}</Text>
    </ScreenCard>
  );
};

export default StatCard;
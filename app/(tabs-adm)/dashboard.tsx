import { ScrollView, Text } from 'react-native';
import React from 'react';
import { ScreenTabs } from '@/components/Screen';
import StatCard from '@/components/statCard';
import { statsMocks } from '@/data/mock/statMock';
import PiscinasRegistradas from '@/components/piscinasRegistradas';

const Dashboard = () => {
  const stats = statsMocks;
  return (
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>
        <Text className="self-start font-geist-bold text-3xl text-text m-5">
          Panel de Administración
        </Text>
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            unity={stat.unity}
          />
        ))}
        <PiscinasRegistradas />
      </ScreenTabs>
    </ScrollView>
  );
};

export default Dashboard;

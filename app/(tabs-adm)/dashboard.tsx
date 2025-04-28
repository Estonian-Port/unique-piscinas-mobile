import { Text } from 'react-native';
import React from 'react';
import { ScreenTabs } from '@/components/Screen';
import StatCard from '@/components/statCard';
import { statsMocks } from '@/data/mock/statMock';

const Dashboard = () => {
  const stats = statsMocks;
  return (
    <ScreenTabs>
      <Text className='self-start ml-5 font-geist-bold text-3xl text-text mb-4'>Panel de Administración</Text>
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
    </ScreenTabs>
  );
};

export default Dashboard;

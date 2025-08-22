import React from 'react';
import { Stack, Tabs } from 'expo-router';
import TabIcon from '../../components/utiles/tabIcon';
import { Platform } from 'react-native';

const _Layout = () => {
  return (
    Platform.OS === "web" ? (
    <Stack screenOptions={{ headerShown: false }} />
    ) : (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',          
        },
        tabBarStyle: {
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderTopColor: '#222247',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="dashboard" title="Dashboard" />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Usuarios',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="people" title="Usuarios" />
          ),
        }}
      />
    </Tabs>
  ));
};

export default _Layout;

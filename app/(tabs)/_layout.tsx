import React from 'react';
import { Tabs } from 'expo-router';
import TabIcon from '../../components/utiles/tabIcon';

const _Layout = () => {
  return (

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
          backgroundColor: '#222247',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#222247',
        },
      }}
    >
      <Tabs.Screen
        name="[idPiscina]"
        options={{
          title: 'Detalles',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="article" title="Detalles" />
          ),
        }}
      />
      <Tabs.Screen
        name="equipment"
        options={{
          title: 'Equipos',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="build" title="Equipamiento" />
          ),
        }}
      />
      <Tabs.Screen
        name="programation"
        options={{
          title: 'Programación',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="calendar-month" title="Programación" />
          ),
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          title: 'FAQ',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="question-answer" title="FAQ" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;

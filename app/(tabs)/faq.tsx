import { ScrollView } from 'react-native';
import React from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import PreguntasFrecuentes from '@/components/faq/preguntasFrecuentes';
import WebTabBar from '@/components/utiles/webTabBar';
import Header from '@/components/utiles/header';
import { useAuth } from '@/context/authContext';

const FAQ = () => {
  const { usuario, selectedPool } = useAuth();

  return (
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>

          <Header 
            usuario={usuario!} 
            piscina={selectedPool!} 
          />

          <WebTabBar />
          
        <PreguntasFrecuentes />
      </ScreenTabs>
    </ScrollView>
  );
};

export default FAQ;

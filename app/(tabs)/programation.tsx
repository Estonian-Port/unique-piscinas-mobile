import {View,ScrollView, ActivityIndicator,} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import ProgramacionIluminacion from '@/components/programacion/programacionIluminacion';
import ProgramacionFiltrado from '@/components/programacion/programacionFiltrado';
import { piscinaService } from '@/services/piscina.service';
import { PiscinaProgramacion } from '@/data/domain/piscina';
import PrivateScreen from '@/components/utiles/privateScreen';
import { useAuth } from '@/context/authContext';
import WebTabBar from '@/components/utiles/webTabBar';
import Header from '@/components/utiles/header';

const Programation = () => {
  const { user, selectedPoolId } = useAuth();
  const [pool, setPool] = useState<PiscinaProgramacion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPool = async () => {
      try {
        const data = await piscinaService.getPiscinaProgramacionById(
          selectedPoolId!
        );
        setPool(data);
        console.log('Piscina cargada:', data);
      } catch (error) {
        console.error('Error cargando la piscina:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedPoolId) fetchPool();
  }, [selectedPoolId]);

  if (loading || !pool) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <PrivateScreen>
      <ScrollView className="flex-1 bg-white">
        <ScreenTabs>

          <Header userName={user!.nombre} poolName={pool.nombre} 
          poolVolumen={pool.volumen} moreThan1Pool={user!.piscinasId.length > 1} isAdmin={user!.isAdmin}  />

          <WebTabBar />

          <ProgramacionFiltrado programacion={pool.programacionFiltrado} />
          <ProgramacionIluminacion programacion={pool.programacionIluminacion} />
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  );
};

export default Programation;

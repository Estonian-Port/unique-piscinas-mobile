import {
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import EquipamientoConfigurado from '@/components/equipamiento/equipamientoConfigurado';
import EstadoSistema from '@/components/equipamiento/estadoSistema';
import { piscinaService } from '@/services/piscina.service';
import { PiscinaEquipamiento } from '@/data/domain/piscina';
import PrivateScreen from '@/components/utiles/privateScreen';
import { useAuth } from '@/context/authContext';
import WebTabBar from '@/components/utiles/webTabBar';
import Header from '@/components/utiles/header';

const Equipment = () => {
  const { user, selectedPoolId } = useAuth();
  const [pool, setPool] = useState<PiscinaEquipamiento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPool = async () => {
      try {
        if (selectedPoolId !== null) {
          const data = await piscinaService.getPiscinaEquipamientoById(
            selectedPoolId
          );
          setPool(data);
        }
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

          <EstadoSistema pool={pool} />
          <EquipamientoConfigurado pool={pool} />
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  );
};

export default Equipment;

import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import ProgramacionIluminacion from '@/components/programacion/programacionIluminacion';
import ProgramacionFiltrado from '@/components/programacion/programacionFiltrado';
import BotonCambio from '@/components/utiles/botonCambio';
import { piscinaService } from '@/services/piscina.service';
import { useAuth } from '@/context/authContext';
import { usePool } from '@/context/piscinaContext';
import { PiscinaProgramacion } from '@/data/domain/piscina';
import { Programacion } from '@/data/domain/cicloFiltrado';
import PrivateScreen from '@/components/utiles/privateScreen';

const Programation = () => {
  const { selectedPoolId } = usePool();
  const { user } = useAuth();

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
          <View className="w-11/12 my-3">
            <Text className="font-geist-bold text-2xl text-text">
              Hola, {user?.nombre} bienvenido!
            </Text>
          </View>

          <View className="flex-row w-11/12 justify-between mb-3">
            <View className="flex-1 pr-4">
              <Text className="font-geist-semi-bold text-xl text-text">
                {pool.nombre}
              </Text>
              <Text className="font-geist text-base text-text">
                Volumen de la piscina: {pool.volumen} m3
              </Text>
            </View>

            {user!.piscinasId.length > 1 && !user!.isAdmin && <BotonCambio />}
          </View>

          <ProgramacionFiltrado programacion={pool.programacionFiltrado} />
          <ProgramacionIluminacion programacion={pool.programacionIluminacion} />
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  );
};

export default Programation;

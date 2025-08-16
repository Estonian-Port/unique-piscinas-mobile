import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import EquipamientoConfigurado from '@/components/equipamiento/equipamientoConfigurado';
import EstadoSistema from '@/components/equipamiento/estadoSistema';
import BotonCambio from '@/components/utiles/botonCambio';
import { usePool } from '@/context/piscinaContext';
import { useAuth } from '@/context/authContext';
import { piscinaService } from '@/services/piscina.service';
import { PiscinaEquipamiento } from '@/data/domain/piscina';

const Equipment = () => {
  const { selectedPoolId } = usePool();
  const { user } = useAuth();

  const [pool, setPool] = useState<PiscinaEquipamiento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPool = async () => {
      try {
        const data = await piscinaService.getPiscinaEquipamientoById(selectedPoolId!);
        setPool(data);
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
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>
        <View className="w-11/12 my-3">
          <Text className="font-geist-bold text-2xl text-text">
            Hola, {user?.nombre} bienvenido!
          </Text>
        </View>

        <View className="flex-row w-11/12 justify-between mb-3">
          {/* Contenedor del texto */}
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

        <EstadoSistema pool={pool} />
        <EquipamientoConfigurado pool={pool} />
      </ScreenTabs>
    </ScrollView>
  );
};

export default Equipment;

import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { ScreenTabs } from '@/components/utiles/Screen';
import Indicadores from '@/components/resume/indicadores';
import ControlFiltro from '@/components/resume/controlFiltro';
import BotonCambio from '@/components/utiles/botonCambio';
import PhClimaCard from '@/components/resume/phClimaCard';
import { usePool } from '@/context/piscinaContext';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { piscinaService } from '@/services/piscina.service';
import { PiscinaResume } from '@/data/domain/piscina';

export default function Resume() {
  const { selectedPoolId } = usePool();
  const { user } = useAuth();

  const [pool, setPool] = useState<PiscinaResume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPool = async () => {
      try {
        const data = await piscinaService.getPiscinaResumeById(selectedPoolId!);
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
            Hola, {user!.nombre} bienvenido!
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

          {user!.idPiscinas.length > 1 && !user!.isAdmin && <BotonCambio />}
        </View>

        <PhClimaCard
          ph={5.5}
          temperature={28}
          weatherIcon={'sunny'}
          colorIcon={'#F19E39'}
          location={'Buenos Aires, Argentina'}
          weatherStatus={'Soleado'}
          humidity={45}
          wind={12}
        />

        <ControlFiltro entradaAgua={pool.entradaAgua} funcionFiltro={pool.funcionActiva} />
        <Indicadores />
      </ScreenTabs>
    </ScrollView>
  );
}

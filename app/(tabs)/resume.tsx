import { ActivityIndicator, ScrollView, View } from 'react-native';
import { ScreenTabs } from '@/components/utiles/Screen';
import Indicadores from '@/components/resume/indicadores';
import ControlFiltro from '@/components/resume/controlFiltro';
import PhClimaCard from '@/components/resume/phClimaCard';
import React, { useEffect, useState } from 'react';
import { piscinaService } from '@/services/piscina.service';
import { PiscinaResume } from '@/data/domain/piscina';
import PrivateScreen from '@/components/utiles/privateScreen';
import { useAuth } from '@/context/authContext';
import WebTabBar from '@/components/utiles/webTabBar';
import Header from '@/components/utiles/header';

export default function Resume() {
  const { usuario, selectedPool } = useAuth();
  const [piscina, setPiscina] = useState<PiscinaResume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedPool) {
      setLoading(true);
      const fetchPool = async () => {
        try {
          const data = await piscinaService.getPiscinaResume(selectedPool.id);
          const dataPh = await piscinaService.getPiscinaResumePhById(
            selectedPool.id
          );
          setPiscina({ ...data, ...dataPh });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPool();
    }
  }, [selectedPool]);

  if (loading || !usuario || !selectedPool || !piscina) {
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
          <View className="w-11/12">
            <Header usuario={usuario} piscina={selectedPool} />
            <WebTabBar />

            <PhClimaCard
              ph={piscina!.ph}
              diferenciaPh={piscina!.diferenciaPh}
              temperature={28}
              weatherIcon={'sunny'}
              colorIcon={'#F19E39'}
              location={'Buenos Aires, Argentina'}
              weatherStatus={'Soleado'}
              humidity={45}
              wind={12}
            />

            <ControlFiltro
              piscina={piscina!}
              setPiscina={setPiscina}
              entradaAgua={piscina!.entradaAgua}
              funcionFiltro={piscina!.funcionActiva}
            />
            <Indicadores piscina={piscina!} />
          </View>
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  );
}

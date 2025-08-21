import { ActivityIndicator, ScrollView, View } from 'react-native';
import { ScreenTabs } from '@/components/utiles/Screen';
import Indicadores from '@/components/resume/indicadores';
import ControlFiltro from '@/components/resume/controlFiltro';
import PhClimaCard from '@/components/resume/phClimaCard';
import { useEffect, useState } from 'react';
import { piscinaService } from '@/services/piscina.service';
import { PiscinaResume } from '@/data/domain/piscina';
import { handleAxiosError } from '@/util/errorHandler';
import PrivateScreen from '@/components/utiles/privateScreen';
import { useAuth } from '@/context/authContext';
import WebTabBar from '@/components/utiles/webTabBar';
import Header from '@/components/utiles/header';

export default function Resume() {
  const { user, selectedPoolId } = useAuth();

  const [pool, setPool] = useState<PiscinaResume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPool = async () => {
      try {
        const data = await piscinaService.getPiscinaResumeById(selectedPoolId!);
        try {
          const dataPh = await piscinaService.getPiscinaResumePhById(selectedPoolId!)
          data.ph = dataPh.ph
          data.diferenciaPh = dataPh.diferenciaPh
        } catch (error) {
          handleAxiosError(error);
        }
        setPool(data);
      } catch (error) {
        // TODO deberiamos tener un cartel de error al cargar la pileta, no deberia pero ponele caso de q se caiga el servidor
        // igual eso se gestiona con interceptor tambien tipo si devuelve un 403 o 404, que entienda q se cayo el server y borre
        // token y desloguee
        handleAxiosError(error);
      }

      setLoading(false);
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

          <PhClimaCard
            ph={pool!.ph}
            diferenciaPh={pool!.diferenciaPh}
            temperature={28}
            weatherIcon={'sunny'}
            colorIcon={'#F19E39'}
            location={'Buenos Aires, Argentina'}
            weatherStatus={'Soleado'}
            humidity={45}
            wind={12}
          />

          <ControlFiltro
            entradaAgua={pool.entradaAgua}
            funcionFiltro={pool.funcionActiva}
          />
          <Indicadores />
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  );
}

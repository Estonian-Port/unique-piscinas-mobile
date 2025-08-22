import { ActivityIndicator, ScrollView, View } from 'react-native';
import { ScreenTabs } from '@/components/utiles/Screen';
import Indicadores from '@/components/resume/indicadores';
import ControlFiltro from '@/components/resume/controlFiltro';
import PhClimaCard from '@/components/resume/phClimaCard';
import { useEffect, useState } from 'react';
import { piscinaService } from '@/services/piscina.service';
import { PiscinaResume } from '@/data/domain/piscina';
import PrivateScreen from '@/components/utiles/privateScreen';
import { useAuth } from '@/context/authContext';
import WebTabBar from '@/components/utiles/webTabBar';
import Header from '@/components/utiles/header';

export default function Resume() {

  const { usuario, selectedPool } = useAuth()
  const [piscina, setPiscina] = useState<PiscinaResume | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!piscina) {
      const fetchPool = async () => {
        try {
          const data = await piscinaService.getPiscinaResumeById(selectedPool!.id)
          setPiscina(data)
        } catch (error) {
          console.error("Error al cargar el resumen de la piscina:", error)
        } finally {
        setLoading(false)
      }
      }
      fetchPool()
    }
  }, [piscina])

  if (loading || !usuario || !selectedPool || !piscina) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <PrivateScreen>
      <ScrollView className="flex-1 bg-white">
        <ScreenTabs>

          <Header 
            usuario={usuario} 
            piscina={selectedPool} 
          />
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
            entradaAgua={piscina!.entradaAgua}
            funcionFiltro={piscina!.funcionActiva}
          />
          <Indicadores />
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  );
}

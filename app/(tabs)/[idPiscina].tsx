import { ScrollView, Text, View, Image, Pressable } from 'react-native';
import Ph from '@/components/detalles/phClimaCard';
import Clima from '@/components/detalles/clima';
import { Link, useLocalSearchParams } from 'expo-router';
import { piscinasMock } from '@/data/mock/piscinaMock';
import { gabi, leo } from '@/data/mock/userMock';
import { ScreenTabs } from '@/components/utiles/Screen';
import { ChangeIcon } from '@/assets/icons';
import Indicadores from '@/components/detalles/indicadores';
import ControlFiltro from '@/components/detalles/controlFiltro';
import BotonCambio from '@/components/utiles/botonCambio';
import PhClimaCard from '@/components/detalles/phClimaCard';

export default function ParamsPiscina() {
  const { idPiscina } = useLocalSearchParams();
  const user = leo;

  const searchPool = (id: number) => {
    return piscinasMock.filter(
      (piscina) => piscina.id === Number(idPiscina)
    )[0];
  };

  const pool = searchPool(Number(idPiscina));

  return (
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>
        <View className="w-11/12 my-3">
          <Text className="font-geist-bold text-2xl text-text">
            Hola, {user.name} bienvenido!
          </Text>
        </View>

        <View className="flex-row w-11/12 justify-between mb-3">
          {/* Contenedor del texto */}
          <View className="flex-1 pr-4">
            <Text className="font-geist-semi-bold text-xl text-text">
              {pool.name}
            </Text>
            <Text className="font-geist text-base text-text">
              Volumen de la piscina: {pool.volume} m3
            </Text>
          </View>

          {user.piscinas.length > 1 && !user.isAdmin && <BotonCambio />}
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

        <ControlFiltro waterEntryFilter={['filter']} />
        <Indicadores />
      </ScreenTabs>
    </ScrollView>
  );
}

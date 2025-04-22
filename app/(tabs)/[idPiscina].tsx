import { ScrollView, Text, View, Image, Pressable } from 'react-native';
import Ph from '@/components/ph';
import ControlFiltro from '@/components/controlFiltro';
import Clima from '@/components/clima';
import { Link, useLocalSearchParams } from 'expo-router';
import { piscinas } from '@/data/mock/piscinaMock';
import { gabi, leo } from '@/data/mock/userMock';
import { Screen } from '@/components/Screen';
import { ChangeIcon } from '@/assets/icons';
import Indicadores from '@/components/indicadores';

export default function ParamsPiscina() {
  const { idPiscina } = useLocalSearchParams();
  const user = leo;

  const searchPool = (id: number) => {
    return piscinas.filter((piscina) => piscina.id === Number(idPiscina))[0];
  };

  const pool = searchPool(Number(idPiscina));

  return (
    <ScrollView className="flex-1 bg-white">
      <Screen>
        <View className="w-11/12 my-3">
          <Text className="font-geist-bold text-2xl text-text">
            Hola, {user.name} bienvenido!
          </Text>
        </View>

        {/*
          {user.piscinas.length > 1 && (
        <Link href={'/pools'} asChild>
            <Pressable
              className="w-11/12 items-center p-2 mb-3 border"
              style={{
                borderRadius: 5,
                backgroundColor: '#94a3b8',
                borderColor: '#94a3bd',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Text className="font-geist-semiBold text-text text-lg">
                Volver a la lista de piscinas
              </Text>
            </Pressable>
        </Link>
          )}
        */}

        <View className="flex-row w-11/12 justify-between mb-3">
          {/* Contenedor del texto */}
          <View className="flex-1 pr-4">
            <Text className="font-geist-semiBold text-xl text-text">
              {pool.name}
            </Text>
            <Text className="font-geist text-base text-text">
              Volumen de la piscina: {pool.volume} m3
            </Text>
          </View>

          {/* Botón redondo */}
          {user.piscinas.length > 1 && (
            <Link href={'/pools'} asChild>
              <Pressable
                className="items-center justify-center rounded-full bg-[#0054ae]"
                style={{
                  width: 50,
                  height: 50,
                }}
              >
                <ChangeIcon/>
              </Pressable>
            </Link>
          )}
        </View>

        <Ph data={5.5} />
        <Clima
          temperature={28}
          weatherIcon={'sunny'}
          colorIcon={'#F19E39'}
          location={'Buenos Aires, Argentina'}
          weatherStatus={'Soleado'}
          humidity={45}
          wind={12}
        />
        <ControlFiltro waterEntryFilter={['filter']}/>
        <Indicadores/>
      </Screen>
    </ScrollView>
  );
}

import { ScrollView, Text, FlatList, View, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { piscinasMock } from '@/data/mock/piscinaMock';
import { gabi, leo } from '@/data/mock/userMock';
import { Screen } from '@/components/utiles/Screen';
import BombaCard from '@/components/dashboard/bombaCard';
import CalefaccionCard from '@/components/dashboard/calefaccionCard';
import GermicidaCard from '@/components/dashboard/germicidaCard';
import ValvulaCard from '@/components/dashboard/valvulaCard';
import RegistroCard from '@/components/dashboard/registroCard';
import { ScreenCard } from '@/components/utiles/ScreenCard';
import { RegisterIcon } from '@/assets/icons';
import { useState } from 'react';
import ModalNuevoRegistro from '@/components/dashboard/modalNuevoRegistro';
import FiltroCard from '@/components/dashboard/filtroCard';
import PrivateScreen from '@/components/utiles/privateScreen';

export default function Equipos() {
  const [modalNuevoRegistro, setModalNuevoRegistro] = useState(false);
  const { piscinasIdEquipos } = useLocalSearchParams();
  const user = leo;

  const searchPool = (id: number) => {
    return piscinasMock.filter(
      (piscina) => piscina.id === Number(piscinasIdEquipos)
    )[0];
  };

  const pool = searchPool(Number(piscinasIdEquipos));

  if (!pool) {
    return (
      <PrivateScreen>
        <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-lg text-red-500">Piscina no encontrada</Text>
        </View>
      </PrivateScreen>
    );
  }
  return (
    <PrivateScreen>
      <ScrollView className="flex-1 bg-white">
        <Screen>
          <Text className="self-start p-5 text-text font-geist-semi-bold text-2xl">
            Editar Equipamiento - {pool.name}
          </Text>
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Bombas de filtración
          </Text>
          {pool.bombas.map((item) => (
            <BombaCard
              key={item.id}
              bomba={{
                id: item.id,
                nombre: item.nombre,
                marca: item.marca,
                modelo: item.modelo,
                activa: item.activa,
                potencia: item.potencia,
              }}
            />
          ))}
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Filtro
          </Text>
          <FiltroCard filtro={pool.filtro} />
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Sistemas germicidas
          </Text>
          {pool.germicidas.map((item) => (
            <GermicidaCard
              key={item.id}
              germicida={{
                id: item.id,
                nombre: item.nombre,
                vidaRestante: item.vidaRestante,
                estado: item.estado,
              }}
            />
          ))}
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Válvulas
          </Text>
          {pool.valvulas.map((item) => (
            <ValvulaCard
              key={item.id}
              valvula={{
                id: item.id,
                nombre: item.nombre,
                tipo: item.tipo,
                estado: item.estado,
              }}
            />
          ))}
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Calefacción
          </Text>
          <CalefaccionCard calefaccion={pool.calefaccion} />

          <View className="flex-row items-center justify-between mb-4 w-11/12 self-center">
            <Text className="text-text font-geist-semi-bold text-xl">
              Registros
            </Text>
            <Pressable
              onPress={() => setModalNuevoRegistro(true)}
              className="bg-white border border-grayish-unique rounded-lg py-3 px-2 flex-row items-center justify-center"
            >
              <RegisterIcon size={16} className="mr-2" />
              <Text className="text-black font-geist-semi-bold text-sm">
                Nuevo Registro
              </Text>
            </Pressable>
            {modalNuevoRegistro && (
              <ModalNuevoRegistro
                visible={modalNuevoRegistro}
                onClose={() => setModalNuevoRegistro(false)}
              />
            )}
          </View>

          <ScreenCard>
            {pool.registro.map((item) => (
              <RegistroCard
                key={item.id}
                registro={{
                  id: item.id,
                  fecha: item.fecha,
                  dispositivo: item.dispositivo,
                  accion: item.accion,
                  descripcion: item.descripcion,
                  tecnico: item.tecnico,
                }}
              />
            ))}
          </ScreenCard>
        </Screen>
      </ScrollView>
    </PrivateScreen>
  );
}

import { ScrollView, Text, FlatList, View } from 'react-native';
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

export default function Equipos() {
  const { idPiscinaEquipos } = useLocalSearchParams();
  const user = leo;

  const searchPool = (id: number) => {
    return piscinasMock.filter(
      (piscina) => piscina.id === Number(idPiscinaEquipos)
    )[0];
  };

  const pool = searchPool(Number(idPiscinaEquipos));

  return (
    <ScrollView className="flex-1 bg-white">
      <Screen>
        <Text className="self-start p-5 text-text font-geist-semi-bold text-2xl">
          Editar Equipamiento - {pool.name}
        </Text>
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Bombas de filtración
          </Text>
          <FlatList
            data={pool.bombas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BombaCard
                bomba={{
                  id: item.id,
                  nombre: item.nombre,
                  marca: item.marca,
                  modelo: item.modelo,
                  activa: item.activa,
                  potencia: item.potencia,
                }}
              />
            )}
            style={{ width: '100%' }}
          />
        <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
          Sistemas germicidas
        </Text>
        <FlatList
          data={pool.germicidas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <GermicidaCard
              germicida={{
                id: item.id,
                nombre: item.nombre,
                vida: item.vida,
                activa: item.activa,
              }}
            />
          )}
          style={{ width: '100%' }}
        />
        <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
          Válvulas
        </Text>
        <FlatList
          data={pool.valvulas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ValvulaCard
              valvula={{
                id: item.id,
                nombre: item.nombre,
                tipo: item.tipo,
                estado: item.estado,
              }}
            />
          )}
          style={{ width: '100%' }}
        />
        <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
          Calefacción
        </Text>
        <CalefaccionCard calefaccion={pool.calefaccion} />
        <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
          Registros
        </Text>
        <ScreenCard>
        <FlatList
          data={pool.registro}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RegistroCard
              registro={{
                id: item.id,
                fecha: item.fecha,
                dispositivo: item.dispositivo,
                accion: item.accion,
                descripcion: item.descripcion,
                tecnico: item.tecnico,
              }}
            />
          )}
          style={{ width: '100%' }}
        />
        </ScreenCard>
      </Screen>
    </ScrollView>
  );
}

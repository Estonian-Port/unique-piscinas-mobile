import {
  ScrollView,
  Text,
  FlatList,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { piscinasMock } from '@/data/mock/piscinaMock';
import { leo } from '@/data/mock/userMock';
import { Screen } from '@/components/utiles/Screen';
import BombaCard from '@/components/dashboard/bombaCard';
import CalefaccionCard from '@/components/dashboard/calefaccionCard';
import GermicidaCard from '@/components/dashboard/germicidaCard';
import RegistroCard from '@/components/dashboard/registroCard';
import { ScreenCard } from '@/components/utiles/ScreenCard';
import { RegisterIcon } from '@/assets/icons';
import { useEffect, useState } from 'react';
import ModalNuevoRegistro from '@/components/dashboard/modalNuevoRegistro';
import FiltroCard from '@/components/dashboard/filtroCard';
import PrivateScreen from '@/components/utiles/privateScreen';
import { PiscinaEquipamiento, PiscinaEquipos } from '@/data/domain/piscina';
import { useAuth } from '@/context/authContext';
import { administracionService } from '@/services/administracion.service';

export default function Equipos() {
  const [modalNuevoRegistro, setModalNuevoRegistro] = useState(false);
  const { usuario, selectedPool } = useAuth();
  const [pool, setPool] = useState<PiscinaEquipos | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Agregar estado de loading

  const fetchPool = async () => {
    if (!selectedPool) return;

    try {
      setIsLoading(true); // Iniciar loading
      const data = await administracionService.getPiscinaEquiposById(
        usuario!.id,
        selectedPool.id
      );
      console.log('Fetched pool data:', data);
      setPool(data);
    } catch (error) {
      console.error('Error fetching pool data:', error);
    } finally {
      setIsLoading(false); // Finalizar loading
    }
  };

  useEffect(() => {
    fetchPool();
  }, [selectedPool, usuario]);

  // Mostrar loading mientras carga
  if (isLoading || !selectedPool || !pool) {
    return (
      <PrivateScreen>
        <View className="flex-1 justify-center items-center bg-gray-50">
          <ActivityIndicator size="large" color="#000" />
          <Text className="mt-4 text-gray-600 font-geist">
            Cargando equipos...
          </Text>
        </View>
      </PrivateScreen>
    );
  }

  return (
    <PrivateScreen>
      <ScrollView className="flex-1 bg-white">
        <Screen>
          <Text className="self-start p-5 text-text font-geist-semi-bold text-2xl">
            Editar Equipamiento - {pool.direccion}
          </Text>
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Bombas de filtración
          </Text>
          {pool!.bombas.map((item) => (
            <BombaCard key={item.id} piscina={pool} bomba={item} actualizarPiscina={fetchPool} />
          ))}
          {pool.bombas.length < 3 && (
            <Pressable className="bg-gray-200 rounded-lg p-3 w-3/4 items-center mb-3">
              <Text className="font-geist-semi-bold text-text">
                + Agregar bomba
              </Text>
            </Pressable>
          )}
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Filtro
          </Text>
          <FiltroCard filtro={pool.filtro} piscina={pool} actualizarPiscina={fetchPool} />
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Sistemas germicidas
          </Text>
          {pool.sistemasGermicidas.map((item) => (
            <GermicidaCard key={item.id} germicida={item} piscina={pool} actualizarPiscina={fetchPool} />
          ))}
          {pool.sistemasGermicidas.length < 3 && (
            <Pressable className="bg-gray-200 rounded-lg p-3 w-3/4 items-center mb-3">
              <Text className="font-geist-semi-bold text-text">
                + Agregar sistema germicida
              </Text>
            </Pressable>
          )}
          <Text className="self-start pl-5 mb-2 text-text font-geist-semi-bold text-xl">
            Calefacción
          </Text>
          {pool.calefaccion ? (
            <CalefaccionCard calefaccion={pool.calefaccion} piscina={pool} actualizarPiscina={fetchPool} />
          ) : (
            <Pressable className="bg-gray-200 rounded-lg p-3 w-3/4 items-center mb-3">
              <Text className="font-geist-semi-bold text-text">
                + Agregar Calefacción
              </Text>
            </Pressable>
          )}

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

          {pool.registros.length === 0 && (
            <View className="flex-1 justify-center items-center py-4">
              <Text className="text-gray-500 font-geist">
                No hay registros cargados.
              </Text>
            </View>
          )}

          <ScreenCard>
            {pool.registros.map((item) => (
              <RegistroCard key={item.id} registro={item} />
            ))}
          </ScreenCard>
        </Screen>
      </ScrollView>
    </PrivateScreen>
  );
}

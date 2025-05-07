import {
  ScrollView,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { piscinas } from '@/data/mock/piscinaMock';
import { gabi, leo } from '@/data/mock/userMock';
import { Screen } from '@/components/Screen';
import BombaCard from '@/components/bombaCard';

export default function Equipos() {
  const { idPiscinaEquipos } = useLocalSearchParams();
  const user = leo;

  const searchPool = (id: number) => {
    return piscinas.filter(
      (piscina) => piscina.id === Number(idPiscinaEquipos)
    )[0];
  };

  const pool = searchPool(Number(idPiscinaEquipos));

  return (
    <ScrollView className="flex-1 bg-white">
      <Screen>
        <Text>EQUIPOS</Text>
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
          contentContainerStyle={{
            gap: 20, // Espacio entre los elementos
            flexGrow: 1, // Asegura que el contenedor ocupe todo el espacio disponible
            paddingBottom: 15, // Espacio al final de la lista
          }}
          style={{ width: '100%' }}
        />
      </Screen>
    </ScrollView>
  );
}

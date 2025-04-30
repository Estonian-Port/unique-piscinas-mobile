import { ScrollView, Text, View, Image, Pressable } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { piscinas } from '@/data/mock/piscinaMock';
import { gabi, leo } from '@/data/mock/userMock';
import { ScreenTabs } from '@/components/Screen';

export default function Equipos() {
  const { idPiscinaEquipos } = useLocalSearchParams();
  const user = leo;

  const searchPool = (id: number) => {
    return piscinas.filter((piscina) => piscina.id === Number(idPiscinaEquipos))[0];
  };

  const pool = searchPool(Number(idPiscinaEquipos));

  return (
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>
        <Text>EQUIPOS</Text>
      </ScreenTabs>
    </ScrollView>
  );
}

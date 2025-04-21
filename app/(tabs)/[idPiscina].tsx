import { ScrollView, Text, View, Image, Pressable } from 'react-native';
import CardStats from '@/components/cardStats';
import FilterControl from '@/components/filterControl';
import EntryWater from '@/components/entryWater';
import CardClima from '@/components/cardClima';
import { Link, useLocalSearchParams } from 'expo-router';
import { piscinas } from '@/data/mock/piscinaMock';
import { gabi, leo } from '@/data/mock/userMock';
import { MaterialIcons } from '@expo/vector-icons';

export default function ParamsPiscina() {
  const { idPiscina } = useLocalSearchParams();
  const user = leo;

  const searchPool = (id: number) => {
    return piscinas.filter((piscina) => piscina.id === Number(idPiscina))[0];
  };

  const pool = searchPool(Number(idPiscina));

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center h-full mb-24">
        <View className="w-full shadow-xl items-center">
          <Image
            source={require('../../assets/images/logo-unique-encabezado.png')}
            resizeMode="contain"
            style={{ width: 280, height: 100 }} // Ajusta el tamaño de la imagen
          />
        </View>
        <View className="w-11/12 my-3">
          <Text className="font-geist-semiBold text-2xl text-text">
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
            <Text className="font-geist-bold text-2xl text-text">
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
                <MaterialIcons name="compare-arrows" size={24} color="#fff" />
              </Pressable>
            </Link>
          )}
        </View>

        <CardStats title={'pH'} icon={'tint'} data={5.5} color={'#000'} />
        <CardClima
          temperature={28}
          weatherIcon={'sunny'}
          colorIcon={'#F19E39'}
          location={'Buenos Aires, Argentina'}
          weatherStatus={'Soleado'}
          humidity={45}
          wind={12}
        />
        <EntryWater entryWater={['skimmer']}></EntryWater>
        <FilterControl waterEntryFilter={['filter']}></FilterControl>
      </View>
    </ScrollView>
  );
}

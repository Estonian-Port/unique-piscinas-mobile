import { ScrollView, Text, View, Image } from 'react-native';
import CardStats from '@/components/cardStats';
import FilterControl from '@/components/filterControl';
import EntryWater from '@/components/entryWater';
import CardClima from '@/components/cardClima';
import { useLocalSearchParams } from 'expo-router';

export default function ParamsPiscina() {
  const { idPiscina } = useLocalSearchParams();

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
          <Text className="font-geist-semiBold text-2xl text-text mb-3">
            Hola, Leo bienvenido!
          </Text>
        </View>
        <Text className="font-geist text-base text-text mb-3">
          Volumen de la piscina: 48 m3
        </Text>
        <Text className="font-geist text-base text-text mb-3">
          {idPiscina}
        </Text>

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

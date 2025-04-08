import { ScrollView, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CardStats from '@/components/cardStats';
import FilterControl from '@/components/filterControl';
import Graphics from '@/components/graphics';
import EntryWater from '@/components/entryWater';
import CardClima from '@/components/cardClima';
import PickerPool from '@/components/pickerPool';
import { useState } from 'react';
import SystemStatus from '@/components/systemStatus';
import RecentReadings from '@/components/recentReadings';

export default function Home() {
  const [isPoolSelected, setIsPoolSelected] = useState(false);


  return (
    <ScrollView className="flex-1 bg-white mb-32">
      <View className="flex-1 items-center justify-center bg- h-full">
        <View className='w-full bg-cyan-100 shadow-xl items-center'>
        <FontAwesome name="tint" size={30} color="#00BFFF" />
        <Text className="font-geist-bold text-5xl text-cyan-800 my-3">
          Unique Piscinas
        </Text>
        </View>
        <View className="w-11/12 bg-white my-3">
        <Text className="font-geist-semiBold text-2xl text-text mb-3">
          Hola, Leo bienvenido!
        </Text>
            <PickerPool setIsPoolSelected={setIsPoolSelected}></PickerPool>
        
        </View>
        {isPoolSelected && (
        <>
        <Text className="font-geist-bold text-3xl text-text">
          Parámetros del Agua
        </Text>
        <Text className="font-geist text-base text-text mb-3"> 
          Volumen de la piscina: 48 m3
          </Text>
        <CardStats
          title={'pH'}
          icon={'tint'}
          data={5.5}
          color={'#000'}
        />
        <CardStats
          title={'Temperatura'}
          icon={'thermometer-half'}
          data={22.9}
          color={'#FF4500'}
          isTemperature={true}
        />
        <CardClima temperature={28} weatherIcon={"sunny"} colorIcon={'#F19E39'} location={'Buenos Aires, Argentina'} weatherStatus={'Soleado'} humidity={45} wind={12} />
        <SystemStatus></SystemStatus>
        <EntryWater entryWater={['skimmer']}></EntryWater>
        <FilterControl waterEntryFilter={['filter']}></FilterControl>
        <Graphics></Graphics>
        <RecentReadings></RecentReadings>
        </>)}
      </View>
    </ScrollView>
  );
}

import { ScrollView, Text, View, Image } from 'react-native';
import CardStats from '@/components/cardStats';
import FilterControl from '@/components/filterControl';
import Graphics from '@/components/graphics';
import EntryWater from '@/components/entryWater';
import CardClima from '@/components/cardClima';
import PickerPool from '@/components/pickerPool';
import { useState } from 'react';
import SystemStatus from '@/components/systemStatus';
import RecentReadings from '@/components/recentReadings';
import LightControlCard from '@/components/controlLuces';
import CardIonizador from '@/components/cardIonizador';
import CardTransductor from '@/components/cardTransductor';
import LamparaUV from '@/components/lamparaUV';

export default function Home() {
  const [isPoolSelected, setIsPoolSelected] = useState(true);


  return (
    <ScrollView className="flex-1 bg-white mb-32">
      <View className="flex-1 items-center justify-center bg- h-full">
        <View className='w-full shadow-xl items-center'>
          <Image 
                        source={require('../../assets/images/logo-unique-encabezado.png')} 
                        resizeMode='contain' 
                        style={{ width: 280, height: 100 }} // Ajusta el tamaño de la imagen
                        />
                                </View>
        <View className="w-11/12 my-3">
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
        <LamparaUV/>
        <CardIonizador/>
        <CardTransductor/>
        <LightControlCard/>
        <Graphics></Graphics>
        <RecentReadings></RecentReadings>
        </>)}
      </View>
    </ScrollView>
  );
}

import { View, Text } from 'react-native';
import React from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import {
  ConfigurationIcon,
  FilterIcon,
  InfoIcon,
  PowerIcon,
  TintIcon,
} from '@/assets/icons';
import { PiscinaEquipamiento } from '@/data/domain/piscina';
import BombaCard from './bombaEquipamiento';
import FiltroCard from './filtroEquipamiento';
import ValvulaCard from './valvulaEquipamiento';
import GermicidaEquipamiento from './germicidaEquipamiento';

const EquipamientoConfigurado = ({ pool }: { pool: PiscinaEquipamiento }) => {
  return (
    <ScreenCard>
      <View className="flex-row items-center self-start mb-3">
        <ConfigurationIcon />
        <Text className="font-geist-semi-bold text-text text-2xl ml-2">
          Equipamiento configurado
        </Text>
      </View>

      <View className="flex-row items-center self-start my-2">
        <PowerIcon size={18} color={'#60C3FF'} />
        <Text className="font-geist-semi-bold text-text text-lg ml-2">
          Bombas
        </Text>
      </View>
      {pool.bombas.map((bomba) => (
        <BombaCard key={bomba.id} bomba={bomba} />
      ))}

      <View className="flex-row items-center self-start my-2">
        <FilterIcon size={18} color={'#60C3FF'} />
        <Text className="font-geist-semi-bold text-text text-lg ml-2">
          Filtro
        </Text>
      </View>
      <FiltroCard filtro={pool.filtro} />

      <View className="flex-row items-center self-start my-2">
        <TintIcon size={18} color={'#60C3FF'} />
        <Text className="font-geist-semi-bold text-text text-lg ml-2">
          Válvulas
        </Text>
      </View>
      {pool.valvulas.map((valvula) => (
        <ValvulaCard key={valvula.id} valvula={valvula} />
      ))}

      <View className="w-full h-0.5 bg-gray-200 my-3" />

      {pool.sistemasGermicidas.map((germicida) => (
        <GermicidaEquipamiento key={germicida.id} germicida={germicida} />
      ))}

      <View className="flex-row w-full items-center rounded-md bg-yellow-100 p-2 mt-3 gap-2">
        <InfoIcon color={'orange'} />
        <Text className="font-geist text-text text-sm flex-shrink">
          Algunos equipos requieren atención. Revise el estado de los
          componentes marcados.
        </Text>
      </View>
    </ScreenCard>
  );
};

export default EquipamientoConfigurado;

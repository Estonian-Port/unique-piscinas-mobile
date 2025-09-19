import { View, Text } from 'react-native';
import React from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { MaterialIcons } from '@expo/vector-icons';
import { PiscinaResume, sistemaGermicida } from '@/data/domain/piscina';

const indicadores: { name: string; title: string; icon: 'bolt' | 'lightbulb-outline' | 'water' | 'thermostat' }[] = [
  {
    name: 'UV',
    title: 'UV',
    icon: 'bolt',
  },
  {
    name: 'Ionizador',
    title: 'ION',
    icon: 'lightbulb-outline',
  },
  {
    name: 'Trasductor',
    title: 'US',
    icon: 'water',
  },
  {
    name: 'Calefaccion',
    title: 'Calentador',
    icon: 'thermostat',
  },
];

const Indicadores = ({piscina} : {piscina: PiscinaResume}) => {

  const funcionesActivas = piscina.funcionActiva.includes('filter') || piscina.funcionActiva.includes('recirculate')
  const encendido = (germicida: sistemaGermicida) => funcionesActivas && piscina.sistemasGermicidas.includes(germicida)

  return (
    <ScreenCard>
      <View className="flex-row justify-between items-center">
        {indicadores.map((indicador, index) => (
            <View key={index} className='flex-1 items-center'>
            <View
              className={`border p-3 rounded-full items-center ${
              encendido(indicador.name as sistemaGermicida)
                ? 'border-green-500 bg-green-100'
                : 'border-grayish-unique bg-white'
              }`}
            >
              <MaterialIcons
              name={indicador.icon}
              size={32}
              color={encendido(indicador.name as sistemaGermicida) ? 'green' : 'black'}
              />
            </View>
            <Text
              className={`font-geist-semi-bold text-base mt-1 ${
              encendido(indicador.name as sistemaGermicida) ? 'text-green-600' : ''
              }`}
            >
              {indicador.title}
            </Text>
            </View>
        ))}
      </View>
    </ScreenCard>
  );
};

export default Indicadores;

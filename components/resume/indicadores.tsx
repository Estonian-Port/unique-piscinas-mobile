import { View, Text, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import { MaterialIcons } from '@expo/vector-icons';
import { PiscinaResume, sistemaGermicida } from '@/data/domain/piscina';

const indicadores: {
  name: string;
  title: string;
  icon: 'bolt' | 'lightbulb-outline' | 'water' | 'thermostat';
}[] = [
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

const Indicadores = ({ piscina }: { piscina: PiscinaResume }) => {
  const funcionesActivas = useMemo(
    () =>
      piscina.funcionActiva === 'FILTRAR' ||
      piscina.funcionActiva === 'RECIRCULAR',
    [piscina.funcionActiva]
  );

  const estadoIndicador = (germicida: sistemaGermicida) => {
    if (!piscina.sistemasGermicidas.includes(germicida)) return 'no-existe';
    if (funcionesActivas) return 'encendido';
    return 'apagado';
  };

  const hola = () => {
    console.log(funcionesActivas);
    console.log(piscina.sistemasGermicidas);
    console.log(piscina.funcionActiva);
  };

  return (
    <ScreenCard>
      <Pressable onPress={() => hola()}>
        <View className="flex-row justify-between items-center">
          {indicadores.map((indicador, index) => {
            const estado = estadoIndicador(indicador.name as sistemaGermicida);
            let borderColor = 'border-grayish-unique';
            let bgColor = 'bg-white';
            let iconColor = 'black';
            let iconOpacity = 1;
            let textColor = '';
            if (estado === 'encendido') {
              borderColor = 'border-green-500';
              bgColor = 'bg-green-100';
              iconColor = 'green';
              textColor = 'text-green-600';
            } else if (estado === 'no-existe') {
              iconColor = '#A3A3A3'; // gris
              iconOpacity = 0.4;
            }
            return (
              <View key={index} className="flex-1 items-center">
                <View className={`border p-3 rounded-full items-center ${borderColor} ${bgColor}`}>
                  <MaterialIcons
                    name={indicador.icon}
                    size={32}
                    color={iconColor}
                    style={{ opacity: iconOpacity }}
                  />
                </View>
                <Text
                  className={`font-geist-semi-bold text-base mt-1 ${textColor}`}
                  style={estado === 'no-existe' ? { opacity: 0.4, color: '#A3A3A3' } : {}}
                >
                  {indicador.title}
                </Text>
              </View>
            );
          })}
        </View>
      </Pressable>
    </ScreenCard>
  );
};

export default Indicadores;

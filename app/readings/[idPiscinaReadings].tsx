import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { leo } from '@/data/mock/userMock';
import { piscinasMock } from '@/data/mock/piscinaMock';
import LecturaCard from '@/components/dashboard/readingCard';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
  SearchIcon,
} from '@/assets/icons';
import { Screen } from '@/components/utiles/Screen';

const lecturasEjemplo = [
  {
    id: 1,
    fecha: '2023-06-15T09:30:00',
    ph: 7.2,
    temperatura: 24.5,
    redox: 750,
    cloro: 1.2,
    modoFiltro: 'Filtrar',
    presion: 1.2,
    uv: 'Encendida' as const,
    ionizador: 'Encendido' as const,
    mantenimiento: 'Fondo, Skimmer',
  },
  {
    id: 2,
    fecha: '2023-06-14T15:45:00',
    ph: 7.1,
    temperatura: 24.8,
    redox: 735,
    cloro: 1.0,
    modoFiltro: 'Retrolavar',
    presion: 1.5,
    uv: 'Apagada' as const,
    ionizador: 'Apagado' as const,
    mantenimiento: 'Barrefondo',
  },
  {
    id: 3,
    fecha: '2023-06-13T10:15:00',
    ph: 7.3,
    temperatura: 25.2,
    redox: 760,
    cloro: 1.1,
    modoFiltro: 'Filtrar',
    presion: 1.1,
    uv: 'Encendida' as const,
    ionizador: 'Encendido' as const,
    mantenimiento: 'Skimmer',
  },
  {
    id: 4,
    fecha: '2023-06-12T14:20:00',
    ph: 6.9,
    temperatura: 23.8,
    redox: 720,
    cloro: 0.8,
    modoFiltro: 'Filtrar',
    presion: 1.3,
    uv: 'Encendida' as const,
    ionizador: 'Apagado' as const,
    mantenimiento: 'Fondo',
  },
];

const HistorialLecturas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { idPiscinaReadings } = useLocalSearchParams();
  const user = leo;

  const searchPool = (id: number) => {
    return piscinasMock.filter(
      (piscina) => piscina.id === Number(idPiscinaReadings)
    )[0];
  };

  const pool = searchPool(Number(idPiscinaReadings));

  // Filtrar lecturas según la búsqueda
  const filteredLecturas = lecturasEjemplo.filter(
    (lectura) =>
      lectura.modoFiltro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lectura.mantenimiento.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lectura.fecha.includes(searchQuery)
  );

  // Ordenar lecturas por fecha
  const sortedLecturas = [...filteredLecturas].sort((a, b) => {
    const dateA = new Date(a.fecha).getTime();
    const dateB = new Date(b.fecha).getTime();
    return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Cambiar dirección de ordenamiento
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-2 py-4">
      <View className="px-4 pt-2 pb-4">
        <Text className="font-geist-semi-bold text-3xl text-gray-900 mb-1">
          {pool.name}
        </Text>
        <Text className="font-geist-semi-bold text-xl text-gray-900 mb-1">
          Todas las Lecturas
        </Text>
        <Text className="text-gray-500 text-sm mb-4">
          Historial completo de mediciones de parámetros del agua
        </Text>

        {/* Barra de búsqueda */}
        <View className="flex-row mb-4">
          <View className="flex-row items-center bg-white rounded-lg px-3 flex-1 mr-2 border border-gray-200">
            <SearchIcon size={18} color="#999" />
            <TextInput
              className="flex-1 py-2 px-2 font-geist text-base"
              placeholder="Buscar por fecha, modo filtro..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Pressable
            className="bg-white p-3 rounded-lg border border-gray-200 mr-2"
            onPress={toggleSortDirection}
          >
            {sortDirection === 'desc' ? (
              <ChevronDownIcon size={18} color="#666" />
            ) : (
              <ChevronUpIcon size={18} color="#666" />
            )}
          </Pressable>
        </View>

        {/* Indicador de resultados */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-500 text-sm">
            {filteredLecturas.length}{' '}
            {filteredLecturas.length === 1 ? 'lectura' : 'lecturas'} encontradas
          </Text>
          <Text className="text-gray-500 text-sm">
            {sortDirection === 'desc' ? 'Más reciente' : 'Más antiguo'}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {sortedLecturas.map((lectura) => (
          <LecturaCard key={lectura.id} lectura={lectura} />
        ))}

        {sortedLecturas.length === 0 && (
          <View className="items-center justify-center py-10">
            <CalendarIcon size={48} color="#ccc" />
            <Text className="text-gray-500 font-geist text-base mt-2">
              No se encontraron lecturas
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistorialLecturas;

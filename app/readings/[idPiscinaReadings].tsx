import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { leo } from '@/data/mock/userMock';
import { piscinasMock } from '@/data/mock/piscinaMock';
import {
  BubbleIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  ConfigurationIcon,
  FilterIcon,
  SearchIcon,
  ThermostatIcon,
  ThunderIcon,
  TintIcon,
} from '@/assets/icons';
import { Screen } from '@/components/utiles/Screen';
import LecturaCard from '@/components/dashboard/readingCard';

type Lectura = {
  id: number;
  fecha: string;
  ph: number;
  temperatura: number;
  redox: number;
  cloro: number;
  modoFiltro: string;
  presion: number;
  uv: 'Encendida' | 'Apagada';
  ionizador: 'Encendido' | 'Apagado';
  mantenimiento: string;
};

const lecturasEjemplo = [
  {
    id: 1,
    fecha: '2025-08-15T09:30:00',
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
    fecha: '2025-08-14T15:45:00',
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
    fecha: '2025-07-28T10:15:00',
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
    fecha: '2025-07-15T14:20:00',
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
  {
    id: 5,
    fecha: '2024-12-20T11:30:00',
    ph: 7.4,
    temperatura: 26.1,
    redox: 780,
    cloro: 1.3,
    modoFiltro: 'Filtrar',
    presion: 1.0,
    uv: 'Encendida' as const,
    ionizador: 'Encendido' as const,
    mantenimiento: 'Fondo, Paredes',
  },
  {
    id: 6,
    fecha: '2024-12-10T16:45:00',
    ph: 7.0,
    temperatura: 20.5,
    redox: 740,
    cloro: 0.9,
    modoFiltro: 'Filtrar',
    presion: 1.4,
    uv: 'Apagada' as const,
    ionizador: 'Apagado' as const,
    mantenimiento: 'Skimmer',
  },
];



// Función para generar los últimos 12 meses
const generarUltimos12Meses = () => {
  const meses = [];
  const ahora = new Date();
  
  for (let i = 0; i < 12; i++) {
    const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
    meses.push({
      año: fecha.getFullYear(),
      mes: fecha.getMonth(),
      nombreMes: fecha.toLocaleDateString('es-ES', { month: 'long' }),
      clave: `${fecha.getFullYear()}-${fecha.getMonth()}`,
    });
  }
  
  return meses;
};

// Función para formatear el nombre del mes
const formatearMesAño = (año: number, mes: number) => {
  const fecha = new Date(año, mes, 1);
  return fecha.toLocaleDateString('es-ES', { 
    month: 'long', 
    year: 'numeric' 
  }).replace(/^\w/, c => c.toUpperCase());
};

const HistorialLecturas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { idPiscinaReadings } = useLocalSearchParams();
  const user = leo;
  
  // Estado para el mes seleccionado
  const mesesDisponibles = generarUltimos12Meses();
  const [mesSeleccionado, setMesSeleccionado] = useState(mesesDisponibles[0]);

  const searchPool = (id: number) => {
    return piscinasMock.filter(
      (piscina) => piscina.id === Number(idPiscinaReadings)
    )[0];
  };

  const pool = searchPool(Number(idPiscinaReadings));

  // Filtrar lecturas por mes y búsqueda
  const lecturasFiltradas = useMemo(() => {
    return lecturasEjemplo.filter((lectura) => {
      const fechaLectura = new Date(lectura.fecha);
      const mesLectura = fechaLectura.getMonth();
      const añoLectura = fechaLectura.getFullYear();
      
      // Filtrar por mes seleccionado
      const coincideMes = mesLectura === mesSeleccionado.mes && 
                         añoLectura === mesSeleccionado.año;
      
      // Filtrar por búsqueda
      const coincideBusqueda = searchQuery === '' || 
        lectura.modoFiltro.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lectura.mantenimiento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lectura.fecha.includes(searchQuery);
      
      return coincideMes && coincideBusqueda;
    });
  }, [mesSeleccionado, searchQuery]);

  // Ordenar lecturas por fecha
  const lecturasOrdenadas = useMemo(() => {
    return [...lecturasFiltradas].sort((a, b) => {
      const dateA = new Date(a.fecha).getTime();
      const dateB = new Date(b.fecha).getTime();
      return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [lecturasFiltradas, sortDirection]);

  // Cambiar dirección de ordenamiento
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  // Navegación entre meses
  const navegarMes = (direccion: 'anterior' | 'siguiente') => {
    const indiceActual = mesesDisponibles.findIndex(
      m => m.clave === mesSeleccionado.clave
    );
    
    if (direccion === 'anterior' && indiceActual < mesesDisponibles.length - 1) {
      setMesSeleccionado(mesesDisponibles[indiceActual + 1]);
    } else if (direccion === 'siguiente' && indiceActual > 0) {
      setMesSeleccionado(mesesDisponibles[indiceActual - 1]);
    }
  };

  const puedeIrAnterior = mesesDisponibles.findIndex(
    m => m.clave === mesSeleccionado.clave
  ) < mesesDisponibles.length - 1;
  
  const puedeIrSiguiente = mesesDisponibles.findIndex(
    m => m.clave === mesSeleccionado.clave
  ) > 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-2 py-4">
      <View className="px-4 pt-2 pb-4">
        <Text className="font-geist-semi-bold text-3xl text-gray-900 mb-1">
          {pool.name}
        </Text>
        <Text className="font-geist-semi-bold text-xl text-gray-900 mb-1">
          Historial de Lecturas
        </Text>
        <Text className="text-gray-500 text-sm mb-4">
          Mediciones de parámetros del agua por mes
        </Text>

        {/* Navegador de meses */}
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
          <View className="flex-row items-center justify-between">
            <Pressable
              className={`p-2 rounded-lg ${puedeIrAnterior ? 'bg-blue-50' : 'bg-gray-100'}`}
              onPress={() => navegarMes('anterior')}
              disabled={!puedeIrAnterior}
            >
              <ChevronLeftIcon 
                size={20} 
                color={puedeIrAnterior ? '#2563eb' : '#9ca3af'} 
              />
            </Pressable>
            
            <View className="flex-1 mx-4">
              <Text className="font-geist-semi-bold text-lg text-gray-900 text-center">
                {formatearMesAño(mesSeleccionado.año, mesSeleccionado.mes)}
              </Text>
              <Text className="text-gray-500 text-sm text-center">
                {lecturasFiltradas.length} lecturas
              </Text>
            </View>
            
            <Pressable
              className={`p-2 rounded-lg ${puedeIrSiguiente ? 'bg-blue-50' : 'bg-gray-100'}`}
              onPress={() => navegarMes('siguiente')}
              disabled={!puedeIrSiguiente}
            >
              <ChevronRightIcon 
                size={20} 
                color={puedeIrSiguiente ? '#2563eb' : '#9ca3af'} 
              />
            </Pressable>
          </View>
        </View>

        {/* Barra de búsqueda y filtros */}
        <View className="flex-row mb-4">
          <View className="flex-row items-center bg-white rounded-lg px-3 flex-1 mr-2 border border-gray-200">
            <SearchIcon size={18} color="#999" />
            <TextInput
              className="flex-1 py-2 px-2 font-geist text-base"
              placeholder="Buscar por modo filtro, mantenimiento..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Pressable
            className="bg-white p-3 rounded-lg border border-gray-200"
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
            {lecturasOrdenadas.length}{' '}
            {lecturasOrdenadas.length === 1 ? 'lectura encontrada' : 'lecturas encontradas'}
          </Text>
          <Text className="text-gray-500 text-sm">
            {sortDirection === 'desc' ? 'Más reciente' : 'Más antiguo'}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {lecturasOrdenadas.map((lectura) => (
          <LecturaCard key={lectura.id} lectura={lectura} />
        ))}

        {lecturasOrdenadas.length === 0 && (
          <View className="items-center justify-center py-10">
            <CalendarIcon size={48} color="#ccc" />
            <Text className="text-gray-500 font-geist text-base mt-2">
              {searchQuery ? 
                'No se encontraron lecturas con esos criterios' : 
                'No hay lecturas para este mes'
              }
            </Text>
            {searchQuery && (
              <Pressable
                className="mt-3 bg-blue-500 px-4 py-2 rounded-lg"
                onPress={() => setSearchQuery('')}
              >
                <Text className="text-white font-geist-semi-bold">
                  Limpiar búsqueda
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistorialLecturas;
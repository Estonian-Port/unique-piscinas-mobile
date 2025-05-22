import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { piscinasMock } from '@/data/mock/piscinaMock';
import { leo } from '@/data/mock/userMock';
import { useLocalSearchParams } from 'expo-router';
import { BubbleIcon, CalendarIcon, ClockIcon, ConfigurationIcon, ThermostatIcon, ThunderIcon, TintIcon } from '@/assets/icons';

type Lectura = {
  id: number
  fecha: string
  ph: number
  temperatura: number
  redox: number
  cloro: number
  modoFiltro: string
  presion: number
  uv: "Encendida" | "Apagada"
  ionizador: "Encendido" | "Apagado"
  mantenimiento: string
}

// Función para formatear fecha y hora
const formatearFechaHora = (fechaStr: string) => {
  try {
    const fecha = new Date(fechaStr)
    return {
      fecha: fecha.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      hora: fecha.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  } catch (e) {
    return { fecha: fechaStr, hora: "" }
  }
}

// Función para obtener el color del pH
const obtenerColorPH = (ph: number) => {
  if (ph < 7.2) return "#F44336" // Ácido - rojo
  if (ph > 7.8) return "#2196F3" // Alcalino - azul
  return "#4CAF50" // Ideal - verde
}

// Componente para mostrar un parámetro con valor y unidad
const ParametroItem = ({
  icono,
  label,
  valor,
  unidad,
  color = "#666",
}: {
  icono: React.ReactNode
  label: string
  valor: string | number
  unidad?: string
  color?: string
}) => (
  <View className="bg-gray-50 p-3 rounded-lg flex-1 mx-1">
    <View className="flex-row items-center mb-1">
      {icono}
      <Text className="text-gray-500 text-xs ml-1">{label}</Text>
    </View>
    <View className="flex-row items-baseline justify-center">
      <Text className="font-geist-semi-bold text-base" style={{ color }}>
        {valor}
      </Text>
      {unidad && <Text className="text-gray-500 text-xs ml-1">{unidad}</Text>}
    </View>
  </View>
)

// Componente para mostrar estado de equipos
const EstadoEquipo = ({
  nombre,
  estado,
}: { nombre: string; estado: "Encendida" | "Apagada" | "Encendido" | "Apagado" }) => {
  const isActive = estado === "Encendida" || estado === "Encendido"
const color = isActive ? "#4CAF50" : "#BDBDBD"

  return (
    <View className="flex-row items-center bg-gray-50 p-2 rounded-lg flex-1 mx-1">
      <View className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: color }} />
      <View className="flex-1">
        <Text className="text-gray-500 text-xs">{nombre}</Text>
        <Text className="font-geist-semi-bold text-sm" style={{ color }}>
          {estado}
        </Text>
      </View>
    </View>
  )
}

const LecturaCard = ({ lectura }: { lectura: Lectura }) => {

  const { fecha, hora } = formatearFechaHora(lectura.fecha)
  const colorPH = obtenerColorPH(lectura.ph)

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      {/* Encabezado con fecha y hora */}
      <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <View className="flex-row items-center">
          <CalendarIcon size={16} color="#666" className="mr-2" />
          <Text className="font-geist-semi-bold text-base text-gray-800">{fecha}</Text>
        </View>
        <View className="flex-row items-center">
          <ClockIcon size={16} color="#666" className="mr-2" />
          <Text className="text-gray-600 text-sm">{hora}</Text>
        </View>
      </View>

      {/* Parámetros químicos principales */}
      <Text className="text-gray-700 font-geist-semi-bold text-sm mb-3">Parámetros Químicos</Text>
      <View className="flex-row mb-4">
        <ParametroItem
          icono={<TintIcon size={14} color={colorPH} />}
          label="pH"
          valor={lectura.ph}
          color={colorPH}
        />
        <ParametroItem
          icono={<TintIcon size={14} color="#2196F3" />}
          label="Cloro"
          valor={lectura.cloro}
          unidad="ppm"
          color="#2196F3"
        />
        <ParametroItem
          icono={<ThunderIcon size={14} color="#FF9800" />}
          label="Redox"
          valor={lectura.redox}
          unidad="mV"
          color="#FF9800"
        />
      </View>

      {/* Parámetros físicos */}
      <Text className="text-gray-700 font-geist-semi-bold text-sm mb-3">Parámetros Físicos</Text>
      <View className="flex-row mb-4">
        <ParametroItem
          icono={<ThermostatIcon size={14} color="#F44336" />}
          label="Temperatura"
          valor={lectura.temperatura}
          unidad="°C"
          color="#F44336"
        />
        <ParametroItem
          icono={<BubbleIcon size={14} color="#9C27B0" />}
          label="Presión"
          valor={lectura.presion}
          unidad="bar"
          color="#9C27B0"
        />
        <View className="bg-gray-50 p-3 rounded-lg flex-1 mx-1">
          <View className="flex-row items-center mb-1">
            <ConfigurationIcon size={14} color="#666" />
            <Text className="text-gray-500 text-xs ml-1">Modo Filtro</Text>
          </View>
          <Text className="font-geist-semi-bold text-sm text-gray-800 text-center">{lectura.modoFiltro}</Text>
        </View>
      </View>

      {/* Estado de equipos */}
      <Text className="text-gray-700 font-geist-semi-bold text-sm mb-3">Estado de Equipos</Text>
      <View className="flex-row mb-4">
        <EstadoEquipo nombre="UV" estado={lectura.uv} />
        <EstadoEquipo nombre="Ionizador" estado={lectura.ionizador} />
      </View>

      {/* Mantenimiento */}
      <View className="bg-blue-50 p-3 rounded-lg">
        <View className="flex-row items-center mb-1">
          <ConfigurationIcon size={14} color="#2196F3" />
          <Text className="text-blue-600 text-xs ml-1 font-geist-semi-bold">Mantenimiento</Text>
        </View>
        <Text className="text-blue-800 text-sm">{lectura.mantenimiento}</Text>
      </View>
    </View>
  )
}

export default LecturaCard
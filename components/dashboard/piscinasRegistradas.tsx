import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ScreenCard } from '../utiles/ScreenCard';
import TablaPiscinas from './tablaPiscinas';
import { Link } from 'expo-router';
import CardPiscinaTabla from './cardPiscinaTabla';
import PoolTableCard from './cardPiscinaTabla';

const PiscinasRegistradas = () => {
  const [searchQuery, setSearchQuery] = useState("")

  // Datos de ejemplo
  const pools = [
    {
      id: 1,
      nombre: "Piscina Principal",
      propietario: "Jose Luis Perez",
      tipo: "Skimmer",
      ph: 7.4,
      equipos: [
        { tipo: "Uv", estado: "Operativo" },
        { tipo: "Ionizador", estado: "Inactivo" },
        { tipo: "Trasductor", estado: "Operativo" },
        { tipo: "Calentador", estado: "Alerta" },
      ],
    },
    {
      id: 2,
      nombre: "Piscina Infantil",
      propietario: "Maria Rodriguez",
      tipo: "Desborde",
      ph: 6.8,
      equipos: [
        { tipo: "Uv", estado: "Operativo" },
        { tipo: "Ionizador", estado: "Atención urgente" },
        { tipo: "Trasductor", estado: "Inactivo" },
      ],
    },
  ]

  // Filtrar piscinas según la búsqueda
  const filteredPools = pools.filter(
    (pool) =>
      pool.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pool.propietario.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <ScreenCard>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-text font-geist-semi-bold text-2xl">
          Piscinas Registradas
        </Text>
        <Link asChild href="/nuevaPiscina">
          <Pressable className="border rounded-lg bg-black p-2">
            <Text className="text-white font-geist-semi-bold text-sm">
              + Nueva Piscina
            </Text>
          </Pressable>
        </Link>
      </View>
      <TextInput
        className="border rounded-lg p-2 bg-white text-base border-gray-300 mb-5"
        placeholder="Buscar piscina por nombre o propietario"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        autoCapitalize="none"
      />
      <ScrollView className="flex-1 px-4">
        {filteredPools.map((pool) => (
          <PoolTableCard key={pool.id} pool={pool} />
        ))}

        {filteredPools.length === 0 && (
          <View className="items-center justify-center py-10">
            <Text className="text-gray-500 font-geist text-base">No se encontraron piscinas</Text>
          </View>
        )}
      </ScrollView>
    </ScreenCard>
  );
};

export default PiscinasRegistradas;

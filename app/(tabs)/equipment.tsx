import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { piscinas } from '@/data/mock/piscinaMock';
import { leo } from '@/data/mock/userMock';
import { Link } from 'expo-router';
import { ScreenTabs } from '@/components/Screen';
import EstadoSistema from '@/components/estadoSistema';
import { ChangeIcon } from '@/assets/icons';
import EquipamientoConfigurado from '@/components/equipamientoConfigurado';

const Equipment = () => {
  const idPiscina = 1;
  const user = leo;

  const searchPool = (id: number) => {
    return piscinas.filter((piscina) => piscina.id === Number(idPiscina))[0];
  };

  const pool = searchPool(Number(idPiscina));

  return (
    <ScrollView className='flex-1'>
      <ScreenTabs>
        <View className="w-11/12 my-3">
          <Text className="font-geist-bold text-2xl text-text">
            Hola, {user.name} bienvenido!
          </Text>
        </View>

        {/*
          {user.piscinas.length > 1 && (
        <Link href={'/pools'} asChild>
            <Pressable
              className="w-11/12 items-center p-2 mb-3 border"
              style={{
                borderRadius: 5,
                backgroundColor: '#94a3b8',
                borderColor: '#94a3bd',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Text className="font-geist-semiBold text-text text-lg">
                Volver a la lista de piscinas
              </Text>
            </Pressable>
        </Link>
          )}
        */}

        <View className="flex-row w-11/12 justify-between mb-3">
          {/* Contenedor del texto */}
          <View className="flex-1 pr-4">
            <Text className="font-geist-semiBold text-xl text-text">
              {pool.name}
            </Text>
            <Text className="font-geist text-base text-text">
              Volumen de la piscina: {pool.volume} m3
            </Text>
          </View>

          {/* Botón redondo */}
          {user.piscinas.length > 1 && (
            <Link href={'/pools'} asChild>
              <Pressable
                className="items-center justify-center rounded-full bg-[#0054ae]"
                style={{
                  width: 50,
                  height: 50,
                }}
              >
                <ChangeIcon />
              </Pressable>
            </Link>
          )}
        </View>

        <EstadoSistema />
        <EquipamientoConfigurado />
      </ScreenTabs>
    </ScrollView>
  );
};

export default Equipment;

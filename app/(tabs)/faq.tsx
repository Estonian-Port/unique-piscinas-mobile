import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { ChangeIcon } from '@/assets/icons';
import { Screen, ScreenTabs } from '@/components/Screen';
import { piscinas } from '@/data/mock/piscinaMock';
import { leo } from '@/data/mock/userMock';
import PreguntasFrecuentes from '@/components/preguntasFrecuentes';

const FAQ = () => {
  const idPiscina = 1;
  const user = leo;

  const searchPool = (id: number) => {
    return piscinas.filter((piscina) => piscina.id === Number(idPiscina))[0];
  };

  const pool = searchPool(Number(idPiscina));

  return (
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>
        <View className="w-11/12 my-3">
          <Text className="font-geist-bold text-2xl text-text">
            Hola, {user.name} bienvenido!
          </Text>
        </View>

        <View className="flex-row w-11/12 justify-between mb-3">
          {/* Contenedor del texto */}
          <View className="flex-1 pr-4">
            <Text className="font-geist-semi-bold text-xl text-text">
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
        <PreguntasFrecuentes />
      </ScreenTabs>
    </ScrollView>
  );
};

export default FAQ;

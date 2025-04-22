import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import { Screen } from '@/components/Screen';
import { piscinas } from '@/data/mock/piscinaMock';
import { leo } from '@/data/mock/userMock';

const Profile = () => {
  const idPiscina = 1;
  const user = leo;

  const searchPool = (id: number) => {
    return piscinas.filter((piscina) => piscina.id === Number(idPiscina))[0];
  };

  const pool = searchPool(Number(idPiscina));

  return (
    <ScrollView className="flex-1 bg-white">
      <Screen>
        <View className='border rounded-full border-gray-300 p-4 mt-4'>
          <Image
            source={require('../assets/images/logotipo-unique.png')}
            style={{ width: 120, height: 120}}
          />
        </View>

      </Screen>
    </ScrollView>
  );
}

export default Profile
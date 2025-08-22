import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';  // Añadir useState
import { diego, gabi, leo, seba } from '@/data/mock/userMock';
import { ScreenCard } from '../utiles/ScreenCard';
import UserItem from './userItem';

const UsuarioRegistrados = () => {
  const users = [gabi, leo, seba, diego];
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const handleToggleExpand = (userId: number) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <ScreenCard>
      <View className="mb-4">
        <Text className="font-geist-semi-bold text-text text-3xl">
          Usuarios Registrados
        </Text>
        <Text className="font-geist-light text-text text-base">
          Gestion de usuarios y sus piscinas
        </Text>
      </View>
      {users.map((user) => (
        <UserItem 
          key={user.id}
          usuario={user}
          isExpanded={expandedUserId === user.id}
          onToggleExpand={() => handleToggleExpand(user.id)}
        />
      ))}
    </ScreenCard>
  );
};

export default UsuarioRegistrados;

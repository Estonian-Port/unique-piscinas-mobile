import { Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { ChangeIcon } from '@/assets/icons';

const BotonCambio = () => {
  return (
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
  );
};

export default BotonCambio;

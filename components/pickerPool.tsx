import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

const pools = [
    { id: 1, name: 'Piscina Principal' },
    { id: 2, name: 'Piscina Secundaria' },
    { id: 3, name: 'Piscina de Niños' },
  ];

const PickerPool = ({ setIsPoolSelected } : {setIsPoolSelected: (value: boolean) => void}) => {

    const poolOptions = pools.map((pool) => ({
      label: pool.name,
      value: pool.id,
    }));
  
    return (
      <View className="w-full bg-white shadow-xl rounded-lg p-4 mb-4 border border-gray-200">
        <Text className='font-geist text-text text-lg'>Selecciona una piscina:</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            setIsPoolSelected(value !== null);
          }}
          items={poolOptions}
          placeholder={{ label: 'Selecciona una opción...', value: null }}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
          }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    input: {
      fontSize: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
    },
  });

export default PickerPool
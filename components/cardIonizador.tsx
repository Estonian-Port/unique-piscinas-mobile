import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import Bar from './bar'

const CardIonizador = () => {
    const [copperIonizer, setCopperIonizer] = useState (false)

    return (
      <View className={`bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200 ${copperIonizer ? '' : 'opacity-50'}`}>
            <View className='flex-row justify-between items-center w-full mb-1'>
                <Text className='font-geist-bold text-text text-lg'>Ionizador de Cobre</Text>
                {copperIonizer ? (
                          <View className="bg-green-200 rounded-full p-2">
                            <Text className="font-geist-semiBold text-sm text-text">
                              Activado
                            </Text>
                          </View>
                        ) : (
                            <View className="bg-red-200 rounded-full p-2">
                            <Text className="font-geist-semiBold text-sm text-text">
                              Desactivado
                            </Text>
                          </View>
                        )}
            </View>
            <View className='flex-row justify-between items-center w-full mb-1'>
                <View className='flex-row items-center'>
                    <MaterialIcons name="bolt" size={18} color="#9B5278" />
                    <Text className='font-geist text-text text-base'>Electrodo Positivo (+)</Text>
                </View>
                <Text className='font-geist-semiBold text-lg text-green-400'>65% restante</Text>
            </View>
            <Bar currentValue={65} colorBar={"black"}/>
            <TouchableOpacity className='my-5'>
                <View className='bg-gray-200 rounded-lg p-4 mb-1'>
                    <Text className='font-geist-semiBold text-text text-center'>Resetear (despues de reemplazo)</Text>
                </View>
            </TouchableOpacity>

            <View className='flex-row justify-between items-center w-full mb-1'>
                <View className='flex-row items-center'>
                    <MaterialIcons name="bolt" size={18} color="#9B5278" />
                    <Text className='font-geist text-text text-base'>Electrodo Negativo (-)</Text>
                </View>
                <Text className='font-geist-semiBold text-lg text-green-400'>65% restante</Text>
            </View>
            <Bar currentValue={65} colorBar={"black"}/>
            <TouchableOpacity className='my-5'>
                <View className='bg-gray-200 rounded-lg p-4 mb-1'>
                    <Text className='font-geist-semiBold text-text text-center'>Resetear (despues de reemplazo)</Text>
                </View>
            </TouchableOpacity>

            <View className='flex-row justify-between items-center w-full mb-1'>
              <View className='flex-row items-center'>
                <MaterialIcons name="analytics" size={20} color="#9B5278" />
                <Text className='font-geist-semiBold text-text text-lg ml-1'>Nivel de iones de cobre:</Text>
              </View>
                <Text className='font-geist-semiBold text-text text-lg'>0.3 ppm</Text>
            </View>
        </View>
      )
}

export default CardIonizador
import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

type LecturaProps = {
    icon: any;
    mainData: string;
    timeData: string;
    maintenanceData: string;
    status: string;
};

const Lectura = ({ icon, mainData, timeData, maintenanceData, status }: LecturaProps) => {
    return (
        <View className='w-full bg-white flex-row items-center justify-between my-3'>
                <View className="w-min h-min bg-slate-300 rounded-full p-2 mb-3">
                    <MaterialIcons name={icon} size={20} color={'000'} />
                </View>
                <View className='items-start justify-start flex-1 mx-3'>
                        <Text className='font-geist-semiBold text-text text-lg'>{mainData}</Text>
                        <Text className='font-geist-light text-text text-base'>{timeData}</Text>
                        <Text className='font-geist-ligth text-text text-sm'>{maintenanceData}</Text>
                </View>
                <Text className='font-geist-semiBold text-text text-lg'>{status}</Text>
        </View>
    )
}

export default Lectura
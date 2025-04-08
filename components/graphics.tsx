import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';

const Graphics = () => {
  return (
    <View className="bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200">
      <Text className="font-geist-bold text-3xl text-text mb-1">
        Tendencias de Parámetros
      </Text>
      <Text className="font-geist text-sm text-text mb-4">
        Evolución de los parámetros en los últimos 7 días
      </Text>
        <LineChart
          data={{
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [
              {
                data: [7.2, 7.4, 7.3, 7.5, 7.6, 7.4, 7.3],
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                strokeWidth: 2,
              },
              {
                data: [26, 27, 27.5, 28, 28.2, 27.8, 27.5],
                color: (opacity = 1) => `rgba(255, 69, 58, ${opacity})`,
                strokeWidth: 2,
              },
            ],
            legend: ['pH', 'Temperatura (°C)'],
          }}
          width={Dimensions.get('window').width * 0.75} // Ajusta el ancho al 90% de la pantalla
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ffffff',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
    </View>
  );
};

export default Graphics;

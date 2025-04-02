import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';

const Graphics = () => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-md">
      <Text className="text-lg font-bold text-black mb-1">Tendencias de Parámetros</Text>
      <Text className="text-sm text-gray-500 mb-4">
        Evolución de los parámetros en los últimos 7 días
      </Text>
      <LineChart
        data={{
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], // Días de la semana
          datasets: [
            {
              data: [7.2, 7.4, 7.3, 7.5, 7.6, 7.4, 7.3], // Datos de pH
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Azul para pH
              strokeWidth: 2,
            },
            {
              data: [26, 27, 27.5, 28, 28.2, 27.8, 27.5], // Datos de temperatura
              color: (opacity = 1) => `rgba(255, 69, 58, ${opacity})`, // Rojo para temperatura
              strokeWidth: 2,
            },
          ],
          legend: ['pH', 'Temperatura (°C)'], // Leyenda
        }}
        width={Dimensions.get('window').width - 32} // Ancho del gráfico
        height={220} // Alto del gráfico
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1, // Cantidad de decimales
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de las líneas del gráfico
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de las etiquetas
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#ffffff',
          },
        }}
        bezier // Suaviza las líneas del gráfico
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Graphics;
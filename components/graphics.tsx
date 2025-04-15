import { View, Text, Dimensions, Alert } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';

const Graphics = () => {
  const screenWidth = Dimensions.get('window').width * 0.75; // Ajusta el ancho al 75% de la pantalla

  const handleDataPointClick = (data: { value: any; index: any; }) => {
    Alert.alert(
      'Dato seleccionado',
      `Valor: ${data.value}\nÍndice: ${data.index}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View className="bg-white shadow-xl rounded-lg p-4 mb-4 w-11/12 border border-gray-200">
      <Text className="font-geist-bold text-3xl text-text mb-1">
        Tendencias de Parámetros
      </Text>
      <Text className="font-geist text-sm text-text mb-4">
        Evolución de los parámetros en los últimos 7 días
      </Text>

      {/* Gráfico de pH */}
      <Text className="font-geist-bold text-lg text-text mb-2">pH</Text>
      <LineChart
        data={{
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
          datasets: [
            {
              data: [7.2, 7.4, 7.3, 7.5, 7.6, 7.4, 7.3],
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Color de la línea
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth}
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
        onDataPointClick={handleDataPointClick} // Maneja el clic en un punto de datos
      />

      {/* Gráfico de Temperatura */}
      <Text className="font-geist-bold text-lg text-text mt-6 mb-2">Temperatura (°C)</Text>
      <LineChart
        data={{
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
          datasets: [
            {
              data: [26, 27, 27.5, 28, 28.2, 27.8, 27.5],
              color: (opacity = 1) => `rgba(255, 69, 58, ${opacity})`, // Color de la línea
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth}
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
        onDataPointClick={handleDataPointClick} // Maneja el clic en un punto de datos
      />
    </View>
  );
};

export default Graphics;
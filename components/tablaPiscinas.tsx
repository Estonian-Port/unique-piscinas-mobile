import { View, ScrollView, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Tipos para nuestros datos
interface EquipoEstado {
  tipo: 'power' | 'light' | 'water-outline' | 'temperature-high' | 'waves';
  estado: 'optimo' | 'atencion' | 'error';
}

interface PiscinaData {
  id: number;
  nombre: string;
  propietario: string;
  tipo: 'Desborde' | 'Skimmer';
  ph: string;
  equipos: EquipoEstado[];
}

const TablaPiscinas = () => {
  const [busqueda, setBusqueda] = useState('');
  const [ordenColumna, setOrdenColumna] = useState<string>('Nombre');
  const [ordenDireccion, setOrdenDireccion] = useState<'asc' | 'desc'>('asc');
  const [piscinasData, setPiscinasData] = useState<PiscinaData[]>(piscinasMock);
  const [datosFiltrados, setDatosFiltrados] = useState<PiscinaData[]>(piscinasMock);

  // Encabezados y anchos de columna
  const encabezados = ['Nombre', 'Propietario', 'Tipo', 'pH', 'Estado Equipos', 'Acciones'];
  const anchoCol = [150, 150, 100, 60, 150, 180];

  // Función para buscar piscinas
  const buscarPiscinas = (texto: string) => {
    setBusqueda(texto);
    if (texto.trim() === '') {
      setDatosFiltrados(piscinasData);
      return;
    }

    const filtrados = piscinasData.filter(piscina => 
      piscina.nombre.toLowerCase().includes(texto.toLowerCase()) || 
      piscina.propietario.toLowerCase().includes(texto.toLowerCase())
    );
    setDatosFiltrados(filtrados);
  };

  // Función para ordenar piscinas
  const ordenarPiscinas = (columna: string) => {
    let nuevaDireccion: 'asc' | 'desc' = 'asc';
    
    if (ordenColumna === columna) {
      nuevaDireccion = ordenDireccion === 'asc' ? 'desc' : 'asc';
    }
    
    setOrdenColumna(columna);
    setOrdenDireccion(nuevaDireccion);
    
    const ordenados = [...datosFiltrados].sort((a, b) => {
      let comparacion = 0;
      
      switch (columna) {
        case 'Nombre':
          comparacion = a.nombre.localeCompare(b.nombre);
          break;
        case 'Propietario':
          comparacion = a.propietario.localeCompare(b.propietario);
          break;
        case 'Tipo':
          comparacion = a.tipo.localeCompare(b.tipo);
          break;
        case 'pH':
          comparacion = parseFloat(a.ph) - parseFloat(b.ph);
          break;
      }
      
      return nuevaDireccion === 'asc' ? comparacion : -comparacion;
    });
    
    setDatosFiltrados(ordenados);
  };

  // Renderizar encabezado con ícono de ordenamiento
  const renderEncabezado = (texto: string) => (
    <Pressable 
      onPress={() => ordenarPiscinas(texto)}
      className="flex-row items-center justify-center"
    >
      <Text className="font-bold text-black">{texto}</Text>
      {ordenColumna === texto && (
        <Text className="ml-1">
          {ordenDireccion === 'asc' ? '↑' : '↓'}
        </Text>
      )}
    </Pressable>
  );

  // Renderizado del tipo de piscina (badge)
  const renderTipo = (tipo: 'Desborde' | 'Skimmer') => (
    <View className={`px-3 py-1 rounded-full items-center ${tipo === 'Desborde' ? 'bg-gray-800' : 'bg-black'}`}>
      <Text className="text-white font-medium text-xs">{tipo}</Text>
    </View>
  );

  // Renderizado del pH con indicador de color
  const renderPH = (ph: string) => {
    const phNum = parseFloat(ph);
    let color = 'green';
    
    if (phNum < 7.0) color = 'red';
    if (phNum > 7.4) color = 'green';
    
    return (
      <View className="flex-row items-center justify-center">
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, marginRight: 5 }} />
        <Text>{ph}</Text>
      </View>
    );
  };

  // Renderización de estado de equipos
  const renderEstadoEquipos = (equipos: EquipoEstado[]) => (
    <View className="flex-row justify-center space-x-1">
      {equipos.map((equipo, index) => {
        let IconComponent: any = MaterialCommunityIcons;
        let iconName = equipo.tipo;
        let color = equipo.estado === 'optimo' ? '#4CAF50' : equipo.estado === 'atencion' ? '#FF9800' : '#F44336';
        
        if (equipo.tipo === 'temperature-high') {
          IconComponent = FontAwesome5;
        } else if (equipo.tipo === 'water-outline') {
          IconComponent = Ionicons;
        } else if (equipo.tipo === 'waves') {
          IconComponent = MaterialIcons;
          iconName = 'waves';
        }
        
        return (
          <IconComponent 
            key={index}
            name={iconName as any}
            size={18} 
            color={color}
          />
        );
      })}
    </View>
  );

  // Renderizado de acciones
  const renderAcciones = () => (
    <View className="flex-row justify-center space-x-2">
      <Pressable className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
        <Ionicons name="eye-outline" size={16} color="#333" />
        <Text className="text-xs font-medium text-gray-700 ml-1">Panel</Text>
      </Pressable>
      
      <Pressable className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
        <MaterialIcons name="settings" size={16} color="#333" />
        <Text className="text-xs font-medium text-gray-700 ml-1">Equipos</Text>
      </Pressable>
    </View>
  );

  return (
    <View className="flex-1 p-4">

      
      {/* Tabla con scroll horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        <View>
          {/* Encabezados de la tabla */}
          <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb' }}>
            <Row
              data={encabezados.map((header) => renderEncabezado(header))}
              widthArr={anchoCol}
              height={45}
              style={{ backgroundColor: '#f9fafb' }}
            />
          </Table>
          
          {/* Datos de la tabla con scroll vertical */}
          <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator={false}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb' }}>
              {datosFiltrados.map((piscina, index) => (
                <TableWrapper 
                  key={piscina.id} 
                  style={{ 
                    flexDirection: 'row', 
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                    minHeight: 50,
                    alignItems: 'center'
                  }}
                >
                  <Cell 
                    data={piscina.nombre} 
                    width={anchoCol[0]} 
                    textStyle={{ textAlign: 'center', color: '#374151' }}
                  />
                  <Cell 
                    data={piscina.propietario} 
                    width={anchoCol[1]} 
                    textStyle={{ textAlign: 'center', color: '#374151' }}
                  />
                  <Cell 
                    data={renderTipo(piscina.tipo)}
                    width={anchoCol[2]}
                  />
                  <Cell 
                    data={renderPH(piscina.ph)}
                    width={anchoCol[3]}
                  />
                  <Cell 
                    data={renderEstadoEquipos(piscina.equipos)}
                    width={anchoCol[4]}
                  />
                  <Cell 
                    data={renderAcciones()}
                    width={anchoCol[5]}
                  />
                </TableWrapper>
              ))}
            </Table>
          </ScrollView>
          
          {/* Mensaje si no hay datos */}
          {datosFiltrados.length === 0 && (
            <View className="p-4 border border-gray-200 bg-gray-50">
              <Text className="text-center text-gray-500">No se encontraron piscinas</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TablaPiscinas;

// Datos de ejemplo que coinciden con la imagen
const piscinasMock: PiscinaData[] = [
  {
    id: 1,
    nombre: 'Piscina Comunitaria 1',
    propietario: 'Carlos Rodríguez',
    tipo: 'Desborde',
    ph: '6.8',
    equipos: [
      { tipo: 'power', estado: 'optimo' },
      { tipo: 'light', estado: 'atencion' }, 
      { tipo: 'waves', estado: 'optimo' },
      { tipo: 'temperature-high', estado: 'optimo' }
    ]
  },
  {
    id: 2,
    nombre: 'Piscina Comunitaria 2',
    propietario: 'Carlos Rodríguez',
    tipo: 'Skimmer',
    ph: '7.3',
    equipos: [
      { tipo: 'power', estado: 'optimo' }
    ]
  },
  {
    id: 3,
    nombre: 'Piscina Comunitaria 3',
    propietario: 'Carlos Rodríguez',
    tipo: 'Skimmer',
    ph: '7.2',
    equipos: [
      { tipo: 'light', estado: 'optimo' },
      { tipo: 'waves', estado: 'optimo' }
    ]
  },
  {
    id: 4,
    nombre: 'Piscina Familiar',
    propietario: 'Ana Martínez',
    tipo: 'Skimmer',
    ph: '7.4',
    equipos: [
      { tipo: 'power', estado: 'optimo' },
      { tipo: 'light', estado: 'atencion' },
      { tipo: 'temperature-high', estado: 'optimo' }
    ]
  },
  {
    id: 5,
    nombre: 'Piscina Principal',
    propietario: 'Juan Pérez',
    tipo: 'Skimmer',
    ph: '7.2',
    equipos: [
      { tipo: 'power', estado: 'optimo' },
      { tipo: 'light', estado: 'optimo' },
      { tipo: 'waves', estado: 'atencion' },
      { tipo: 'temperature-high', estado: 'optimo' }
    ]
  },
  {
    id: 6,
    nombre: 'Piscina Residencial',
    propietario: 'María García',
    tipo: 'Skimmer',
    ph: '7.1',
    equipos: [
      { tipo: 'power', estado: 'optimo' },
      { tipo: 'waves', estado: 'optimo' },
      { tipo: 'temperature-high', estado: 'optimo' }
    ]
  },
  {
    id: 7,
    nombre: 'Piscina Terraza',
    propietario: 'Juan Pérez',
    tipo: 'Desborde',
    ph: '7.5',
    equipos: [
      { tipo: 'power', estado: 'error' },
      { tipo: 'light', estado: 'optimo' }
    ]
  }
];
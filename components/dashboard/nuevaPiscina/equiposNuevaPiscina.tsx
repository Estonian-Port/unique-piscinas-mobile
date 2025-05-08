import { View, Text, TextInput, Switch } from 'react-native';
import React, { useState } from 'react';
import RadioButton from '../../utiles/radioButton';
import {
  LightIcon,
  ThermostatIcon,
  ThunderIcon,
  WavesIcon,
} from '@/assets/icons';
import DropDownPicker from 'react-native-dropdown-picker';

type TipoBomba = 'Bomba única' | 'Doble bomba' | 'Bomba de velocidad variable';
type TipoFiltro = 'Arena' | 'Vidrio' | 'Cartucho' | 'Diatomeas';

const marcasBomba = [
  { id: 1, name: 'Astral' },
  { id: 2, name: 'Hayward' },
  { id: 3, name: 'Pentair' },
  { id: 4, name: 'Otra' },
];

const modelosBomba = [
  { id: 1, name: 'Victoria Plus' },
  { id: 2, name: 'Sena' },
  { id: 3, name: 'Glass Plus' },
  { id: 4, name: 'Otro' },
];

const marcasFiltro = [
  { id: 1, name: 'Astral' },
  { id: 2, name: 'Hayward' },
  { id: 3, name: 'Pentair' },
  { id: 4, name: 'Otra' },
];

const modelosFiltro = [
  { id: 1, name: 'Aster' },
  { id: 2, name: 'Cantabric' },
  { id: 3, name: 'Berlin' },
  { id: 4, name: 'Otro' },
];

const EquiposNuevaPiscina = () => {
  const [tipoBomba, setTipoBomba] = useState<TipoBomba>('Bomba única');
  const [tipoFiltro, setTipoFiltro] = useState<TipoFiltro>('Arena');
  const [cloradorSalino, setCloradorSalino] = useState(false);
  const [controlPh, setControlPh] = useState(false);
  const [controlOrp, setControlOrp] = useState(false);
  const [calefaccion, setCalefaccion] = useState(false);
  const [uv, setUv] = useState(false);
  const [ionizador, setIonizador] = useState(false);
  const [trasductor, setTrasductor] = useState(false);

  const [marcaBomba, setMarcaBomba] = useState(null);
  const [modeloBomba, setModeloBomba] = useState(null);
  const [marcaFiltro, setMarcaFiltro] = useState(null);
  const [modeloFiltro, setModeloFiltro] = useState(null);

  const [openMarcaBomba, setOpenMarcaBomba] = useState(false);
  const [openModeloBomba, setOpenModeloBomba] = useState(false);
  const [openMarcaFiltro, setOpenMarcaFiltro] = useState(false);
  const [openModeloFiltro, setOpenModeloFiltro] = useState(false);

  const [potenciaCV, setPotenciaCV] = useState('');
  const [diametroFiltro, setDiametroFiltro] = useState('');
  const [arena, setArena] = useState('');

  return (
    <View className="py-5 border-b border-gray-200">
      <Text className="font-geist-semi-bold text-text text-xl">
        Equipamiento
      </Text>
      <Text className="font-geist-semi-bold text-text text-lg mt-2">
        Bombas
      </Text>
      <Text className="font-geist-semi-bold text-text text-base mt-3">
        Configuración de bombas
      </Text>
      <RadioButton
        value={'Bomba única'}
        label={'Bomba única'}
        selected={tipoBomba == 'Bomba única'}
        onPress={(value) => setTipoBomba(value)}
      />
      <RadioButton
        value={'Doble bomba'}
        label={'Doble bomba'}
        selected={tipoBomba == 'Doble bomba'}
        onPress={(value) => setTipoBomba(value)}
      />
      <RadioButton
        value={'Bomba de velocidad variable'}
        label={'Bomba de velocidad variable'}
        selected={tipoBomba == 'Bomba de velocidad variable'}
        onPress={(value) => setTipoBomba(value)}
      />
      <Text className="font-geist text-text text-base mt-3">Marca</Text>
      <DropDownPicker
        open={openMarcaBomba}
        value={marcaBomba}
        items={marcasBomba.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        setOpen={setOpenMarcaBomba}
        setValue={setMarcaBomba}
        placeholder="Seleccione una marca"
        style={{ borderColor: '#e5e7eb' }}
        dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text className="font-geist text-text text-base mt-3">Modelo</Text>
      <DropDownPicker
        open={openModeloBomba}
        value={modeloBomba}
        items={modelosBomba.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        setOpen={setOpenModeloBomba}
        setValue={setModeloBomba}
        placeholder="Seleccione un modelo"
        style={{ borderColor: '#e5e7eb' }}
        dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
        zIndex={2000}
        zIndexInverse={2000}
      />

      <Text className="font-geist text-text text-base mt-3">Potencia (CV)</Text>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={potenciaCV}
        onChangeText={(number) => setPotenciaCV(number)}
        keyboardType="numeric"
        placeholder="Ej: 15"
      ></TextInput>

      <Text className="font-geist-semi-bold text-text text-lg mt-2">
        Filtro
      </Text>
      <Text className="font-geist-semi-bold text-text text-base mt-3">
        Tipo de filtro
      </Text>
      <RadioButton
        value={'Arena'}
        label={'Arena'}
        selected={tipoFiltro == 'Arena'}
        onPress={(value) => setTipoFiltro(value)}
      />
      <RadioButton
        value={'Vidrio'}
        label={'Vidrio'}
        selected={tipoFiltro == 'Vidrio'}
        onPress={(value) => setTipoFiltro(value)}
      />
      <RadioButton
        value={'Cartucho'}
        label={'Cartucho'}
        selected={tipoFiltro == 'Cartucho'}
        onPress={(value) => setTipoFiltro(value)}
      />
      <RadioButton
        value={'Diatomeas'}
        label={'Diatomeas'}
        selected={tipoFiltro == 'Diatomeas'}
        onPress={(value) => setTipoFiltro(value)}
      />
      <Text className="font-geist text-text text-base mt-3">Marca</Text>
      <DropDownPicker
        open={openMarcaFiltro}
        value={marcaFiltro}
        items={marcasFiltro.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        setOpen={setOpenMarcaFiltro}
        setValue={setMarcaFiltro}
        placeholder="Seleccione una marca"
        style={{ borderColor: '#e5e7eb' }}
        dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text className="font-geist text-text text-base mt-3">Modelo</Text>
      <DropDownPicker
        open={openModeloFiltro}
        value={modeloFiltro}
        items={modelosFiltro.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        setOpen={setOpenModeloFiltro}
        setValue={setModeloFiltro}
        placeholder="Seleccione un modelo"
        style={{ borderColor: '#e5e7eb' }}
        dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
        zIndex={2000}
        zIndexInverse={2000}
      />

      <Text className="font-geist text-text text-base mt-3">Diametro (mm)</Text>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={diametroFiltro}
        onChangeText={(number) => setDiametroFiltro(number)}
        keyboardType="numeric"
        placeholder="Ej: 500"
      ></TextInput>

      <Text className="font-geist text-text text-base mt-3">Arena (kg)</Text>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={arena}
        onChangeText={(number) => setArena(number)}
        keyboardType="numeric"
        placeholder="Ej: 75"
      ></TextInput>

      <Text className="font-geist-semi-bold text-text text-lg mt-2">
        Tratamiento
      </Text>
      <View className="border-b border-gray-200">
        <Text className="font-geist-semi-bold text-text text-base mt-3">
          Dosificación química
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-text text-base font-geist">
            Clorador salino
          </Text>
          <Switch
            trackColor={{ false: '#d3d3d3', true: '#000000' }}
            thumbColor="#fcdb99"
            ios_backgroundColor="#d3d3d3"
            onValueChange={() => setCloradorSalino(!cloradorSalino)}
            value={cloradorSalino}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-text text-base font-geist">
            Control automático de pH
          </Text>
          <Switch
            trackColor={{ false: '#d3d3d3', true: '#000000' }}
            thumbColor="#fcdb99"
            ios_backgroundColor="#d3d3d3"
            onValueChange={() => setControlPh(!controlPh)}
            value={controlPh}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-text text-base font-geist">Control de ORP</Text>
          <Switch
            trackColor={{ false: '#d3d3d3', true: '#000000' }}
            thumbColor="#fcdb99"
            ios_backgroundColor="#d3d3d3"
            onValueChange={() => setControlOrp(!controlOrp)}
            value={controlOrp}
          />
        </View>
      </View>
      <View className="border-b border-gray-200">
        <Text className="font-geist-semi-bold text-text text-base mt-3">
          Sistemas germicidas
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <ThunderIcon size={18} color={'green'} />
            <Text className="text-text text-base font-geist ml-1">
              Sistema UV
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#d3d3d3', true: '#000000' }}
            thumbColor="#fcdb99"
            ios_backgroundColor="#d3d3d3"
            onValueChange={() => setUv(!uv)}
            value={uv}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <LightIcon size={18} color={'orange'} />
            <Text className="text-text text-base font-geist ml-1">
              Ionizador de cobre
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#d3d3d3', true: '#000000' }}
            thumbColor="#fcdb99"
            ios_backgroundColor="#d3d3d3"
            onValueChange={() => setIonizador(!ionizador)}
            value={ionizador}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <WavesIcon size={18} color={'blue'} />
            <Text className="text-text text-base font-geist ml-1">
              Trasductor ultrasónico
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#d3d3d3', true: '#000000' }}
            thumbColor="#fcdb99"
            ios_backgroundColor="#d3d3d3"
            onValueChange={() => setTrasductor(!trasductor)}
            value={trasductor}
          />
        </View>
      </View>
      <View>
        <Text className="font-geist-semi-bold text-text text-base mt-3">
          Calefacción
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <ThermostatIcon size={18} color={'orange'} />
            <Text className="text-text text-base font-geist ml-1">
              Sistema de Calefacción
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#d3d3d3', true: '#000000' }}
            thumbColor="#fcdb99"
            ios_backgroundColor="#d3d3d3"
            onValueChange={() => setCalefaccion(!calefaccion)}
            value={calefaccion}
          />
        </View>
      </View>
    </View>
  );
};

export default EquiposNuevaPiscina;

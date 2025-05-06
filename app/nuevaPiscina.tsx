import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
} from 'react-native';
import React, { useState } from 'react';
import { Screen } from '@/components/Screen';
import {
  CalculatorIcon,
  LightIcon,
  ThermostatIcon,
  ThunderIcon,
  WavesIcon,
} from '@/assets/icons';
import RadioButton from '@/components/radiusButton';

type TipoBomba = 'Bomba única' | 'Doble bomba' | 'Bomba de velocidad variable';
type TipoFiltro = 'Arena' | 'Vidrio' | 'Cartucho' | 'Diatomeas';

const NuevaPiscina = () => {
  const [desbordante, setDesbordante] = useState(true);
  const [tipoBomba, setTipoBomba] = useState<TipoBomba>('Bomba única');
  const [tipoFiltro, setTipoFiltro] = useState<TipoFiltro>('Arena');
  const [cloradorSalino, setCloradorSalino] = useState(false);
  const [controlPh, setControlPh] = useState(false);
  const [controlOrp, setControlOrp] = useState(false);
  const [calefaccion, setCalefaccion] = useState(false);
  const [uv, setUv] = useState(false);
  const [ionizador, setIonizador] = useState(false);
  const [trasductor, setTrasductor] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white">
      <Screen>
        <View className="flex-1 bg-white mt-5">
          <Text className="font-geist-semi-bold text-text text-3xl">
            Agregar Nueva Piscina
          </Text>
          <Text className="font-geist-light text-text text-sm">
            Complete la información para registrar una nueva piscina
          </Text>
          <View className="py-5 border-b border-gray-200">
            <Text className="font-geist-semi-bold text-text text-xl">
              Información Básica
            </Text>
            <Text className="font-geist text-text text-base mt-3">
              Nombre de la piscina
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Propietario
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Dirección
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">Ciudad</Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Notas adicionales
            </Text>
            <TextInput className="border border-gray-200 rounded-sm h-40"></TextInput>
          </View>

          <View className="py-5 border-b border-gray-200">
            <Text className="font-geist-semi-bold text-text text-xl">
              Configuracion de la Piscina
            </Text>
            <View className="flex-row items-center mt-3">
              <View className="bg-black h-5 w-5"></View>
              <Text className="font-geist text-text text-base ml-2">
                Piscina desbordante
              </Text>
            </View>
            <Text className="font-geist-light text-text text-sm">
              Pisicina de tipo desbordante o infinity
            </Text>
            <Text className="font-geist text-text text-base mt-3">
              Largo (m)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Ancho (m)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Profundidad (m)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <View className="flex-row items-center justify-between mt-3 mb-1.5">
              <Text className="font-geist text-text text-base">
                Volumen (m³)
              </Text>
              <Pressable className="p-2 border border-gray-200 rounded-md flex-row items-center justify-center">
                <CalculatorIcon />
                <Text>Calcular</Text>
              </Pressable>
            </View>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            {desbordante && (
              <>
                <Text className="font-geist text-text text-base mt-3">
                  Volumen T.C. (m³)
                </Text>
                <TextInput className="border border-gray-200 rounded-sm"></TextInput>
              </>
            )}
          </View>

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
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>

            <Text className="font-geist text-text text-base mt-3">Modelo</Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>

            <Text className="font-geist text-text text-base mt-3">
              Potencia (CV)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>

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
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>

            <Text className="font-geist text-text text-base mt-3">Modelo</Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>

            <Text className="font-geist text-text text-base mt-3">
              Diametro (mm)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>
            <Text className="font-geist text-text text-base mt-3">
              Cantidad de arena (kg)
            </Text>
            <TextInput className="border border-gray-200 rounded-sm"></TextInput>

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
                  thumbColor="#ffffff"
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
                  thumbColor="#ffffff"
                  ios_backgroundColor="#d3d3d3"
                  onValueChange={() => setControlPh(!controlPh)}
                  value={controlPh}
                />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-text text-base font-geist">
                  Control de ORP
                </Text>
                <Switch
                  trackColor={{ false: '#d3d3d3', true: '#000000' }}
                  thumbColor="#ffffff"
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
                  thumbColor="#ffffff"
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
                  thumbColor="#ffffff"
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
                  thumbColor="#ffffff"
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
              <View className='flex-row items-center'>
                <ThermostatIcon size={18} color={'orange'}/>
                <Text className="text-text text-base font-geist ml-1">
                  Sistema de Calefacción
                </Text>
                </View>
                <Switch
                  trackColor={{ false: '#d3d3d3', true: '#000000' }}
                  thumbColor="#ffffff"
                  ios_backgroundColor="#d3d3d3"
                  onValueChange={() => setCalefaccion(!calefaccion)}
                  value={calefaccion}
                />
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row items-center justify-center gap-5 mt-5">
          <Pressable className="border border-gray-200 rounded-md p-2 items-center justify-center">
            <Text className="text-text font-geist text-base">Cancelar</Text>
          </Pressable>
          <Pressable className="border border-gray-200 rounded-md p-2 items-center justify-center bg-black">
            <Text className="text-white text-base font-geist">
              Guardar Piscina
            </Text>
          </Pressable>
        </View>
      </Screen>
    </ScrollView>
  );
};

export default NuevaPiscina;

import { View, Text, TextInput, Pressable, Switch } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import {
  GermicidaIonizador,
  GermicidaTrasductor,
  GermicidaUV,
  PiscinaNueva,
} from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LightIcon, ThunderIcon, WavesIcon } from '@/assets/icons';

export const marcasUV = [
  { id: 1, name: 'Astral' },
  { id: 2, name: 'Hayward' },
  { id: 3, name: 'Otra' },
];

export const marcasIonizador = [
  { id: 1, name: 'Copper Ionizer' },
  { id: 2, name: 'Otra' },
];

export const marcasTrasductor = [
  { id: 1, name: 'Sonic Wave' },
  { id: 2, name: 'Otra' },
];

const uv: GermicidaUV = {
  id: 0,
  tipo: 'uv',
  marca: '',
  vida: 100,
  activa: false,
  potencia: 0,
};

const ionizador: GermicidaIonizador = {
  id: 1,
  tipo: 'ionizador',
  marca: '',
  vida: 100,
  activa: false,
  electrodos: 0,
};

const trasductor: GermicidaTrasductor = {
  id: 2,
  tipo: 'trasductor',
  marca: '',
  vida: 100,
  activa: false,
  potencia: 0,
};

const validationSchema = Yup.object().shape({
  marcaUV: Yup.string().when('$uvSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de lámpara UV'),
    otherwise: (schema) => schema.notRequired(),
  }),
  potenciaUV: Yup.number().when('$uvSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  marcaIonizador: Yup.string().when('$ionizadorSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de ionizador'),
    otherwise: (schema) => schema.notRequired(),
  }),
  electrodosIonizador: Yup.number().when('$ionizadorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la cantidad de electrodos')
        .typeError('La cantidad de electrodos debe ser un número')
        .min(1, 'La cantidad de electrodos debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  marcaTrasductor: Yup.string().when('$trasductorSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca del trasductor'),
    otherwise: (schema) => schema.notRequired(),
  }),
  potenciaTrasductor: Yup.number().when('$trasductorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia del trasductor')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const TratamientoNuevaPiscina = ({
  onCancel,
  onBack,
  onNext,
  nuevaPiscina,
  setNuevaPiscina,
}: {
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
  nuevaPiscina: PiscinaNueva;
  setNuevaPiscina: (piscina: PiscinaNueva) => void;
}) => {
  const [cloradorSalino, setCloradorSalino] = useState(false);
  const [controlPh, setControlPh] = useState(false);
  const [controlOrp, setControlOrp] = useState(false);
  const [uvSwitch, setUvSwitch] = useState(false);
  const [ionizadorSwitch, setIonizadorSwitch] = useState(false);
  const [trasductorSwitch, setTrasductorSwitch] = useState(false);
  const [openMarcaUV, setOpenMarcaUV] = useState(false);
  const [openMarcaIonizador, setOpenMarcaIonizador] = useState(false);
  const [openMarcaTrasductor, setOpenMarcaTrasductor] = useState(false);

  return (
    <Formik
      initialValues={{
        cloradorSalino: nuevaPiscina.cloroSalino,
        controlPh: nuevaPiscina.controlAutomaticoPH,
        controlOrp: nuevaPiscina.orp,
        uvMarca: uv.marca,
        uvPotencia: uv.potencia === 0 ? '' : uv.potencia.toString(),
        ionizadorMarca: ionizador.marca,
        ionizadorElectrodos: ionizador.electrodos === 0 ? '' : ionizador.electrodos.toString(),
        trasductorMarca: trasductor.marca,
        trasductorPotencia: trasductor.potencia === 0 ? '' : trasductor.potencia.toString(),
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setNuevaPiscina({
          ...nuevaPiscina,
          cloroSalino: values.cloradorSalino,
          controlAutomaticoPH: values.controlPh,
          orp: values.controlOrp,
          sistemaGermicida: [
            ...(uvSwitch ? [uv] : []),
            ...(ionizadorSwitch ? [ionizador] : []),
            ...(trasductorSwitch ? [trasductor] : []),
          ],
        });
        onNext();
      }}
      enableReinitialize={true}
      validationContext={{
        uvSwitch,
        ionizadorSwitch,
        trasductorSwitch,
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <View className="py-5">
            <View className="flex-row items-center justify-between">
              <Text className="font-geist-semi-bold text-text text-xl">
                Equipamiento
              </Text>
              <PasosFormulario paso={5} />
            </View>
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
                  thumbColor={cloradorSalino ? '#fcdb99' : '#ffffff'}
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
                  thumbColor={controlPh ? '#fcdb99' : '#ffffff'}
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
                  thumbColor={controlOrp ? '#fcdb99' : '#ffffff'}
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
              <View className="items-center justify-between">
                <View className="flex-row items-center justify-between w-full py-2">
                  <View className="flex-row items-center">
                    <ThunderIcon size={18} color={'green'} />
                    <Text className="text-text text-base font-geist ml-1">
                      Sistema UV
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: '#d3d3d3', true: '#000000' }}
                    thumbColor={uvSwitch ? '#fcdb99' : '#ffffff'}
                    ios_backgroundColor="#d3d3d3"
                    onValueChange={() => setUvSwitch(!uvSwitch)}
                    value={uvSwitch}
                  />
                </View>
                {uvSwitch && (
                  <View className="items-start w-full">
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaUV}
                      value={values.uvMarca}
                      items={marcasUV.map((item) => ({
                        label: item.name,
                        value: item.id.toString(),
                      }))}
                      setOpen={setOpenMarcaUV}
                      setValue={(callback) => {
                        const val = callback(values.uvMarca);
                        setFieldValue('uvMarca', val);
                        setFieldTouched('uvMarca', true);
                      }}
                      placeholder="Seleccione una marca"
                      style={{ borderColor: '#e5e7eb' }}
                      dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
                      zIndex={3000}
                      zIndexInverse={1000}
                    />
                    {errors.uvMarca && touched.uvMarca && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors.uvMarca}
                      </Text>
                    )}
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Potencia (W)
                      </Text>
                      <TextInput
                        className="border border-gray-200 rounded-md py-4 px-3 w-full"
                        value={values.uvPotencia}
                        onChangeText={handleChange('uvPotencia')}
                        onBlur={handleBlur('uvPotencia')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      ></TextInput>
                      {errors.uvPotencia && touched.uvPotencia && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.uvPotencia}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
              <View className="items-center justify-between">
                <View className="flex-row items-center justify-between w-full py-2">
                  <View className="flex-row items-center">
                    <LightIcon size={18} color={'orange'} />
                    <Text className="text-text text-base font-geist ml-1">
                      Ionizador de cobre
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: '#d3d3d3', true: '#000000' }}
                    thumbColor={ionizadorSwitch ? '#fcdb99' : '#ffffff'}
                    ios_backgroundColor="#d3d3d3"
                    onValueChange={() => setIonizadorSwitch(!ionizadorSwitch)}
                    value={ionizadorSwitch}
                  />
                </View>
                {ionizadorSwitch && (
                  <View className="items-start w-full">
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaIonizador}
                      value={values.ionizadorMarca}
                      items={marcasIonizador.map((item) => ({
                        label: item.name,
                        value: item.id.toString(),
                      }))}
                      setOpen={setOpenMarcaIonizador}
                      setValue={(callback) => {
                        const val = callback(values.ionizadorMarca);
                        setFieldValue('ionizadorMarca', val);
                        setFieldTouched('ionizadorMarca', true);
                      }}
                      placeholder="Seleccione una marca"
                      style={{ borderColor: '#e5e7eb' }}
                      dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
                      zIndex={3000}
                      zIndexInverse={1000}
                    />
                    {errors.ionizadorMarca && touched.ionizadorMarca && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors.ionizadorMarca}
                      </Text>
                    )}
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Electrodos
                      </Text>
                      <TextInput
                        className="border border-gray-200 rounded-md py-4 px-3 w-full"
                        value={values.ionizadorElectrodos}
                        onChangeText={handleChange('ionizadorElectrodos')}
                        onBlur={handleBlur('ionizadorElectrodos')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      ></TextInput>
                      {errors.ionizadorElectrodos &&
                        touched.ionizadorElectrodos && (
                          <Text className="text-red-500 text-xs mt-1">
                            {errors.ionizadorElectrodos}
                          </Text>
                        )}
                    </View>
                  </View>
                )}
              </View>
              <View className="items-center justify-between">
                <View className="flex-row items-center justify-between w-full py-2">
                  <View className="flex-row items-center">
                    <WavesIcon size={18} color={'blue'} />
                    <Text className="text-text text-base font-geist ml-1">
                      Trasductor ultrasónico
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: '#d3d3d3', true: '#000000' }}
                    thumbColor={trasductorSwitch ? '#fcdb99' : '#ffffff'}
                    ios_backgroundColor="#d3d3d3"
                    onValueChange={() => setTrasductorSwitch(!trasductorSwitch)}
                    value={trasductorSwitch}
                  />
                </View>
                {trasductorSwitch && (
                  <View className="items-start w-full mt-2">
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaTrasductor}
                      value={values.trasductorMarca}
                      items={marcasTrasductor.map((item) => ({
                        label: item.name,
                        value: item.id.toString(),
                      }))}
                      setOpen={setOpenMarcaTrasductor}
                      setValue={(callback) => {
                        const val = callback(values.trasductorMarca);
                        setFieldValue('trasductorMarca', val);
                        setFieldTouched('trasductorMarca', true);
                      }}
                      placeholder="Seleccione una marca"
                      style={{ borderColor: '#e5e7eb' }}
                      dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
                      zIndex={3000}
                      zIndexInverse={1000}
                    />
                    {errors.trasductorMarca && touched.trasductorMarca && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors.trasductorMarca}
                      </Text>
                    )}
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Potencia (W)
                      </Text>
                      <TextInput
                        className="border border-gray-200 rounded-md py-4 px-3 w-full"
                        value={values.trasductorPotencia}
                        onChangeText={handleChange('trasductorPotencia')}
                        onBlur={handleBlur('trasductorPotencia')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      ></TextInput>
                      {errors.trasductorPotencia &&
                        touched.trasductorPotencia && (
                          <Text className="text-red-500 text-xs mt-1">
                            {errors.trasductorPotencia}
                          </Text>
                        )}
                    </View>
                  </View>
                )}
              </View>
            </View>

            <View className="flex-row items-center justify-center gap-1 mt-5">
              <Link asChild href="/dashboard">
                <Pressable
                  onPress={onCancel}
                  className="border border-gray-200 rounded-md p-2 items-center justify-center w-1/3"
                >
                  <Text className="text-text font-geist text-base">
                    Cancelar
                  </Text>
                </Pressable>
              </Link>
              <Pressable
                onPress={onBack}
                className="border border-gray-200 rounded-md p-2 items-center justify-center bg-grayish-unique w-1/3"
              >
                <Text className="text-text text-base font-geist">Atrás</Text>
              </Pressable>
              <Pressable
                onPress={handleSubmit as any}
                className="border border-gray-200 rounded-md p-2 items-center justify-center bg-purple-unique w-1/3"
              >
                <Text className="text-white text-base font-geist">
                  Siguiente
                </Text>
              </Pressable>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default TratamientoNuevaPiscina;

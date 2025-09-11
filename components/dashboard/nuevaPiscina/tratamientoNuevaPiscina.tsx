import { View, Text, TextInput, Pressable, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import { PiscinaNueva, GermicidaNuevo } from '@/data/domain/piscina';
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

const validationSchema = Yup.object().shape({
  uvMarca: Yup.string().when('uvSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de lámpara UV'),
    otherwise: (schema) => schema.notRequired(),
  }),
  uvPotencia: Yup.number().when('uvSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ionizadorMarca: Yup.string().when('ionizadorSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de ionizador'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ionizadorElectrodos: Yup.number().when('ionizadorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la cantidad de electrodos')
        .typeError('La cantidad de electrodos debe ser un número')
        .min(1, 'La cantidad de electrodos debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  trasductorMarca: Yup.string().when('trasductorSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca del trasductor'),
    otherwise: (schema) => schema.notRequired(),
  }),
  trasductorPotencia: Yup.number().when('trasductorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia del trasductor')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  trasductorTiempoVidaUtil: Yup.number().when('trasductorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese el tiempo de vida útil del trasductor')
        .typeError('El tiempo de vida útil debe ser un número')
        .min(1, 'El tiempo de vida útil debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ionizadorTiempoVidaUtil: Yup.number().when('ionizadorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese el tiempo de vida útil del ionizador')
        .typeError('El tiempo de vida útil debe ser un número')
        .min(1, 'El tiempo de vida útil debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  uvTiempoVidaUtil: Yup.number().when('uvSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese el tiempo de vida útil del UV')
        .typeError('El tiempo de vida útil debe ser un número')
        .min(1, 'El tiempo de vida útil debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  // Campos para los switches
  cloradorSalino: Yup.boolean(),
  controlPh: Yup.boolean(),
  controlOrp: Yup.boolean(),
  uvSwitch: Yup.boolean(),
  ionizadorSwitch: Yup.boolean(),
  trasductorSwitch: Yup.boolean(),
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
  const [openMarcaUV, setOpenMarcaUV] = useState(false);
  const [openMarcaIonizador, setOpenMarcaIonizador] = useState(false);
  const [openMarcaTrasductor, setOpenMarcaTrasductor] = useState(false);

  // Función para obtener los valores iniciales basados en el estado actual de nuevaPiscina
  const getInitialValues = () => {
    const sistemaGermicida = nuevaPiscina.sistemaGermicida || [];
    const uvExistente = sistemaGermicida.find((s) => s.tipo === 'uv');
    const ionizadorExistente = sistemaGermicida.find(
      (s) => s.tipo === 'ionizador'
    );
    const trasductorExistente = sistemaGermicida.find(
      (s) => s.tipo === 'trasductor'
    );

    return {
      cloradorSalino: nuevaPiscina.cloroSalino ?? false,
      controlPh: nuevaPiscina.controlAutomaticoPH ?? false,
      controlOrp: nuevaPiscina.orp ?? false,
      uvSwitch: !!uvExistente,
      uvMarca: uvExistente?.marca ?? '',
      uvPotencia: uvExistente?.datoExtra
        ? uvExistente.datoExtra.toString()
        : '',
      uvTiempoVidaUtil: uvExistente?.tiempoVidaUtil.toString() ?? '',
      ionizadorSwitch: !!ionizadorExistente,
      ionizadorMarca: ionizadorExistente?.marca ?? '',
      ionizadorElectrodos: ionizadorExistente?.datoExtra
        ? ionizadorExistente.datoExtra.toString()
        : '',
      ionizadorTiempoVidaUtil:
        ionizadorExistente?.tiempoVidaUtil.toString() ?? '',
      trasductorSwitch: !!trasductorExistente,
      trasductorMarca: trasductorExistente?.marca ?? '',
      trasductorPotencia: trasductorExistente?.datoExtra
        ? trasductorExistente.datoExtra.toString()
        : '',
      trasductorTiempoVidaUtil:
        trasductorExistente?.tiempoVidaUtil.toString() ?? '',
    };
  };

  const initialValues = getInitialValues();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const sistemaGermicida = [];

        if (values.uvSwitch) {
          const uv: GermicidaNuevo = {
            id: null,
            tipo: 'UV',
            marca: values.uvMarca,
            activa: true,
            datoExtra: parseFloat(values.uvPotencia),
            tiempoVidaUtil: parseInt(values.uvTiempoVidaUtil),
          };
          sistemaGermicida.push(uv);
        }

        if (values.ionizadorSwitch) {
          const ionizador: GermicidaNuevo = {
            id: null,
            tipo: 'IONIZADOR',
            marca: values.ionizadorMarca,
            activa: true,
            datoExtra: parseInt(values.ionizadorElectrodos),
            tiempoVidaUtil: parseInt(values.ionizadorTiempoVidaUtil),
          };
          sistemaGermicida.push(ionizador);
        }

        if (values.trasductorSwitch) {
          const trasductor: GermicidaNuevo = {
            id: null,
            tipo: 'TRASDUCTOR',
            marca: values.trasductorMarca,
            activa: true,
            datoExtra: parseFloat(values.trasductorPotencia),
            tiempoVidaUtil: parseInt(values.trasductorTiempoVidaUtil),
          };
          sistemaGermicida.push(trasductor);
        }

        setNuevaPiscina({
          ...nuevaPiscina,
          cloroSalino: values.cloradorSalino,
          controlAutomaticoPH: values.controlPh,
          orp: values.controlOrp,
          sistemaGermicida: sistemaGermicida,
        });
        onNext();
      }}
      enableReinitialize={false} // Cambiado a false para mantener el estado
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
        validateForm,
      }) => {
        // Efecto para revalidar cuando cambian los switches
        useEffect(() => {
          validateForm();
        }, [
          values.uvSwitch,
          values.ionizadorSwitch,
          values.trasductorSwitch,
          validateForm,
        ]);

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
                  thumbColor={values.cloradorSalino ? '#fcdb99' : '#ffffff'}
                  ios_backgroundColor="#d3d3d3"
                  onValueChange={(value) => {
                    setFieldValue('cloradorSalino', value);
                  }}
                  value={values.cloradorSalino}
                />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-text text-base font-geist">
                  Control automático de pH
                </Text>
                <Switch
                  trackColor={{ false: '#d3d3d3', true: '#000000' }}
                  thumbColor={values.controlPh ? '#fcdb99' : '#ffffff'}
                  ios_backgroundColor="#d3d3d3"
                  onValueChange={(value) => {
                    setFieldValue('controlPh', value);
                  }}
                  value={values.controlPh}
                />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-text text-base font-geist">
                  Control de ORP
                </Text>
                <Switch
                  trackColor={{ false: '#d3d3d3', true: '#000000' }}
                  thumbColor={values.controlOrp ? '#fcdb99' : '#ffffff'}
                  ios_backgroundColor="#d3d3d3"
                  onValueChange={(value) => {
                    setFieldValue('controlOrp', value);
                  }}
                  value={values.controlOrp}
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
                    thumbColor={values.uvSwitch ? '#fcdb99' : '#ffffff'}
                    ios_backgroundColor="#d3d3d3"
                    onValueChange={(value) => {
                      setFieldValue('uvSwitch', value);
                    }}
                    value={values.uvSwitch}
                  />
                </View>
                {values.uvSwitch && (
                  <View className="items-start w-4/5">
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaUV}
                      value={values.uvMarca}
                      items={marcasUV.map((item) => ({
                        label: item.name,
                        value: item.name, // Cambiado para consistencia
                      }))}
                      setOpen={setOpenMarcaUV}
                      setValue={(callback) => {
                        const val = callback(values.uvMarca);
                        setFieldValue('uvMarca', val);
                        setFieldTouched('uvMarca', true);
                      }}
                      placeholder="Seleccione una marca"
                      zIndex={3000}
                      zIndexInverse={1000}
                      onOpen={() => {
                        setOpenMarcaIonizador(false);
                        setOpenMarcaTrasductor(false);
                      }}
                      listMode="SCROLLVIEW"
                      style={{
                        borderColor: '#d1d5db', // un violeta más notorio
                        borderWidth: 2,
                        borderRadius: 6,
                        backgroundColor: '#fff',
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                      }}
                      dropDownContainerStyle={{
                        borderColor: '#d1d5db',
                        borderWidth: 2,
                        borderRadius: 6,
                        backgroundColor: '#f3f4f6',
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: '#ede9fe', // violeta claro para el seleccionado
                      }}
                      selectedItemLabelStyle={{
                        fontWeight: 'bold',
                        color: '#7c3aed',
                      }}
                      placeholderStyle={{
                        color: '#333333',
                      }}
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
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.uvPotencia}
                        onChangeText={handleChange('uvPotencia')}
                        onBlur={handleBlur('uvPotencia')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      />
                      {errors.uvPotencia && touched.uvPotencia && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.uvPotencia}
                        </Text>
                      )}
                    </View>
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Tiempo de vida útil en horas
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.uvTiempoVidaUtil}
                        onChangeText={handleChange('uvTiempoVidaUtil')}
                        onBlur={handleBlur('uvTiempoVidaUtil')}
                        keyboardType="numeric"
                        placeholder="Ej: 150"
                      />
                      {errors.uvTiempoVidaUtil && touched.uvTiempoVidaUtil && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.uvTiempoVidaUtil}
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
                    thumbColor={values.ionizadorSwitch ? '#fcdb99' : '#ffffff'}
                    ios_backgroundColor="#d3d3d3"
                    onValueChange={(value) => {
                      setFieldValue('ionizadorSwitch', value);
                    }}
                    value={values.ionizadorSwitch}
                  />
                </View>
                {values.ionizadorSwitch && (
                  <View className="items-start w-4/5">
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaIonizador}
                      value={values.ionizadorMarca}
                      items={marcasIonizador.map((item) => ({
                        label: item.name,
                        value: item.name, // Cambiado para consistencia
                      }))}
                      setOpen={setOpenMarcaIonizador}
                      setValue={(callback) => {
                        const val = callback(values.ionizadorMarca);
                        setFieldValue('ionizadorMarca', val);
                        setFieldTouched('ionizadorMarca', true);
                      }}
                      placeholder="Seleccione una marca"
                      zIndex={2000}
                      zIndexInverse={2000}
                      onOpen={() => {
                        setOpenMarcaUV(false);
                        setOpenMarcaTrasductor(false);
                      }}
                      listMode="SCROLLVIEW"
                      style={{
                        borderColor: '#d1d5db', // un violeta más notorio
                        borderWidth: 2,
                        borderRadius: 6,
                        backgroundColor: '#fff',
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                      }}
                      dropDownContainerStyle={{
                        borderColor: '#d1d5db',
                        borderWidth: 2,
                        borderRadius: 6,
                        backgroundColor: '#f3f4f6',
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: '#ede9fe', // violeta claro para el seleccionado
                      }}
                      selectedItemLabelStyle={{
                        fontWeight: 'bold',
                        color: '#7c3aed',
                      }}
                      placeholderStyle={{
                        color: '#333333',
                      }}
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
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.ionizadorElectrodos}
                        onChangeText={handleChange('ionizadorElectrodos')}
                        onBlur={handleBlur('ionizadorElectrodos')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      />
                      {errors.ionizadorElectrodos &&
                        touched.ionizadorElectrodos && (
                          <Text className="text-red-500 text-xs mt-1">
                            {errors.ionizadorElectrodos}
                          </Text>
                        )}
                    </View>
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Tiempo de vida útil en horas
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.ionizadorTiempoVidaUtil}
                        onChangeText={handleChange('ionizadorTiempoVidaUtil')}
                        onBlur={handleBlur('ionizadorTiempoVidaUtil')}
                        keyboardType="numeric"
                        placeholder="Ej: 150"
                      />
                      {errors.ionizadorTiempoVidaUtil &&
                        touched.ionizadorTiempoVidaUtil && (
                          <Text className="text-red-500 text-xs mt-1">
                            {errors.ionizadorTiempoVidaUtil}
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
                    thumbColor={values.trasductorSwitch ? '#fcdb99' : '#ffffff'}
                    ios_backgroundColor="#d3d3d3"
                    onValueChange={(value) => {
                      setFieldValue('trasductorSwitch', value);
                    }}
                    value={values.trasductorSwitch}
                  />
                </View>
                {values.trasductorSwitch && (
                  <View className="items-start w-4/5 my-2">
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaTrasductor}
                      value={values.trasductorMarca}
                      items={marcasTrasductor.map((item) => ({
                        label: item.name,
                        value: item.name, // Cambiado para consistencia
                      }))}
                      setOpen={setOpenMarcaTrasductor}
                      setValue={(callback) => {
                        const val = callback(values.trasductorMarca);
                        setFieldValue('trasductorMarca', val);
                        setFieldTouched('trasductorMarca', true);
                      }}
                      placeholder="Seleccione una marca"
                      zIndex={1000}
                      zIndexInverse={3000}
                      onOpen={() => {
                        setOpenMarcaUV(false);
                        setOpenMarcaIonizador(false);
                      }}
                      listMode="SCROLLVIEW"
                      style={{
                        borderColor: '#d1d5db', // un violeta más notorio
                        borderWidth: 2,
                        borderRadius: 6,
                        backgroundColor: '#fff',
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                      }}
                      dropDownContainerStyle={{
                        borderColor: '#d1d5db',
                        borderWidth: 2,
                        borderRadius: 6,
                        backgroundColor: '#f3f4f6',
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: '#ede9fe', // violeta claro para el seleccionado
                      }}
                      selectedItemLabelStyle={{
                        fontWeight: 'bold',
                        color: '#7c3aed',
                      }}
                      placeholderStyle={{
                        color: '#333333',
                      }}
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
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.trasductorPotencia}
                        onChangeText={handleChange('trasductorPotencia')}
                        onBlur={handleBlur('trasductorPotencia')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      />
                      {errors.trasductorPotencia &&
                        touched.trasductorPotencia && (
                          <Text className="text-red-500 text-xs mt-1">
                            {errors.trasductorPotencia}
                          </Text>
                        )}
                    </View>
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Tiempo de vida útil en horas
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.trasductorTiempoVidaUtil}
                        onChangeText={handleChange('trasductorTiempoVidaUtil')}
                        onBlur={handleBlur('trasductorTiempoVidaUtil')}
                        keyboardType="numeric"
                        placeholder="Ej: 150"
                      />
                      {errors.trasductorTiempoVidaUtil &&
                        touched.trasductorTiempoVidaUtil && (
                          <Text className="text-red-500 text-xs mt-1">
                            {errors.trasductorTiempoVidaUtil}
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

import { View, Text, TextInput, Pressable, Switch } from 'react-native';
import React, { useState } from 'react';
import RadioButton from '../../utiles/radioButton';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import { Calefaccion, PiscinaNueva } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ThermostatIcon } from '@/assets/icons';

export type TipoCalefaccion = 'Bomba de calor' | 'Bomba a gas';

const nuevaCalefaccion: Calefaccion = {
  id: 0,
  nombre: '',
  tipo: '',
  marca: '',
  modelo: '',
  potencia: 0,
  activa: false,
};

const validationSchema = Yup.object().shape({
  tipoCalefaccion: Yup.string().when('$tieneCalefaccion', {
    is: true,
    then: (schema) => schema.required('Seleccione un tipo de calefacción'),
    otherwise: (schema) => schema.notRequired(),
  }),
  marcaCalefaccion: Yup.string().when('$tieneCalefaccion', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de calefacción'),
    otherwise: (schema) => schema.notRequired(),
  }),
  modeloCalefaccion: Yup.string().when('$tieneCalefaccion', {
    is: true,
    then: (schema) => schema.required('Seleccione un modelo de calefacción'),
    otherwise: (schema) => schema.notRequired(),
  }),
  potenciaCalefaccion: Yup.number()
    .typeError('La potencia debe ser un número')
    .when('$tieneCalefaccion', {
      is: true,
      then: (schema) =>
        schema
          .required('Ingrese la potencia de la calefacción')
          .min(1, 'La potencia debe ser mayor que 0'),
      otherwise: (schema) => schema.notRequired(),
    }),
  estadoCalefaccion: Yup.string().notRequired(),
});

const CalefaccionNuevaPiscina = ({
  onCancel,
  onBack,
  onSave,
  nuevaPiscina,
  setNuevaPiscina,
}: {
  onCancel: () => void;
  onBack: () => void;
  onSave: () => void;
  nuevaPiscina: PiscinaNueva;
  setNuevaPiscina: (piscina: PiscinaNueva) => void;
}) => {
  const [tieneCalefaccion, setTieneCalefaccion] = useState(false);
  const [tipoCalefaccion, setTipoCalefaccion] =
    useState<TipoCalefaccion>('Bomba de calor');

  return (
    <Formik
      initialValues={{
        tipoCalefaccion: nuevaCalefaccion.tipo,
        marcaCalefaccion: nuevaCalefaccion.marca,
        modeloCalefaccion: nuevaCalefaccion.modelo,
        potenciaCalefaccion:
          nuevaCalefaccion.potencia === 0
            ? ''
            : nuevaCalefaccion.potencia.toString(),
      }}
      validationSchema={validationSchema}
      validationContext={{ tieneCalefaccion }}
      onSubmit={(values) => {
        setNuevaPiscina({
          ...nuevaPiscina,
          calefaccion: tieneCalefaccion ? nuevaCalefaccion : undefined,
        });
        onSave();
      }}
      enableReinitialize={true}
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
              <PasosFormulario paso={6} />
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
                  thumbColor={tieneCalefaccion ? '#fcdb99' : '#ffffff'}
                  ios_backgroundColor="#d3d3d3"
                  onValueChange={() => setTieneCalefaccion(!tieneCalefaccion)}
                  value={tieneCalefaccion}
                />
              </View>
              <View className="mx-2">
                <Text
                  className={`font-geist text-text text-base mt-3 ${
                    !tieneCalefaccion ? 'text-gray-300' : ''
                  }`}
                >
                  Tipo:
                </Text>
                <RadioButton
                  value={'Bomba de calor'}
                  label={'Bomba de calor'}
                  selected={tipoCalefaccion == 'Bomba de calor'}
                  onPress={(value) => {
                    setTipoCalefaccion(value);
                    setFieldValue('tipoCalefaccion', value);
                    setFieldTouched('tipoCalefaccion', true);
                  }}
                  disabled={!tieneCalefaccion}
                />

                <RadioButton
                  value={'Bomba a gas'}
                  label={'Bomba a gas'}
                  selected={tipoCalefaccion == 'Bomba a gas'}
                  onPress={(value) => {
                    setTipoCalefaccion(value);
                    setFieldValue('tipoCalefaccion', value);
                    setFieldTouched('tipoCalefaccion', true);
                  }}
                  disabled={!tieneCalefaccion}
                />

                {tieneCalefaccion &&
                  touched.tipoCalefaccion &&
                  errors.tipoCalefaccion && (
                    <Text className="text-red-500 mt-2">
                      {errors.tipoCalefaccion}
                    </Text>
                  )}

                <Text
                  className={`font-geist text-text text-base mt-3 ${
                    !tieneCalefaccion ? 'text-gray-300' : ''
                  }`}
                >
                  Marca
                </Text>
                <TextInput
                  className={`border border-gray-200 rounded-md py-4 px-3 ${
                    !tieneCalefaccion ? 'text-gray-400' : ''
                  }`}
                  value={values.marcaCalefaccion}
                  onChangeText={handleChange('marcaCalefaccion')}
                  onBlur={handleBlur('marcaCalefaccion')}
                  placeholder="Ej: Hayward"
                  editable={tieneCalefaccion}
                  placeholderTextColor={!tieneCalefaccion ? '#a3a3a3' : '#888'}
                ></TextInput>
                {tieneCalefaccion &&
                  touched.marcaCalefaccion &&
                  errors.marcaCalefaccion && (
                    <Text className="text-red-500 mt-2">
                      {errors.marcaCalefaccion}
                    </Text>
                  )}

                <Text
                  className={`font-geist text-text text-base mt-3 ${
                    !tieneCalefaccion ? 'text-gray-300' : ''
                  }`}
                >
                  Modelo
                </Text>
                <TextInput
                  className={`border border-gray-200 rounded-md py-4 px-3 ${
                    !tieneCalefaccion ? 'text-gray-400' : ''
                  }`}
                  value={values.modeloCalefaccion}
                  onChangeText={handleChange('modeloCalefaccion')}
                  onBlur={handleBlur('modeloCalefaccion')}
                  placeholder="Ej: EnergyLine Pro"
                  editable={tieneCalefaccion}
                  placeholderTextColor={!tieneCalefaccion ? '#a3a3a3' : '#888'}
                ></TextInput>
                {tieneCalefaccion &&
                  touched.modeloCalefaccion &&
                  errors.modeloCalefaccion && (
                    <Text className="text-red-500 mt-2">
                      {errors.modeloCalefaccion}
                    </Text>
                  )}

                <Text
                  className={`font-geist text-text text-base mt-3 ${
                    !tieneCalefaccion ? 'text-gray-300' : ''
                  }`}
                >
                  Potencia (kW)
                </Text>
                <TextInput
                  className={`border border-gray-200 rounded-md py-4 px-3 ${
                    !tieneCalefaccion ? 'text-gray-400' : ''
                  }`}
                  value={values.potenciaCalefaccion}
                  onChangeText={handleChange('potenciaCalefaccion')}
                  onBlur={handleBlur('potenciaCalefaccion')}
                  keyboardType="numeric"
                  placeholder="Ej: 13.5"
                  editable={tieneCalefaccion}
                  placeholderTextColor={!tieneCalefaccion ? '#a3a3a3' : '#888'}
                ></TextInput>
                {tieneCalefaccion &&
                  touched.potenciaCalefaccion &&
                  errors.potenciaCalefaccion && (
                    <Text className="text-red-500 mt-2">
                      {errors.potenciaCalefaccion}
                    </Text>
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
                  Añadir Piscina
                </Text>
              </Pressable>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default CalefaccionNuevaPiscina;

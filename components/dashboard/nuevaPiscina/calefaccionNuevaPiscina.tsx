import { View, Text, TextInput, Pressable, Switch } from 'react-native';
import React, { useEffect, useRef } from 'react';
import RadioButton from '../../utiles/radioButton';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import {
  Calefaccion,
  CalefaccionNueva,
  PiscinaNueva,
} from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ThermostatIcon } from '@/assets/icons';

export type TipoCalefaccion = 'Bomba de calor' | 'Bomba a gas';

const validationSchema = Yup.object().shape({
  tipoCalefaccion: Yup.string().when('tieneCalefaccion', {
    is: true,
    then: (schema) => schema.required('Seleccione un tipo de calefacción'),
    otherwise: (schema) => schema.notRequired(),
  }),
  marcaCalefaccion: Yup.string().when('tieneCalefaccion', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de calefacción'),
    otherwise: (schema) => schema.notRequired(),
  }),
  modeloCalefaccion: Yup.string().when('tieneCalefaccion', {
    is: true,
    then: (schema) => schema.required('Seleccione un modelo de calefacción'),
    otherwise: (schema) => schema.notRequired(),
  }),
  potenciaCalefaccion: Yup.number()
    .typeError('La potencia debe ser un número')
    .when('tieneCalefaccion', {
      is: true,
      then: (schema) =>
        schema
          .required('Ingrese la potencia de la calefacción')
          .min(0.1, 'La potencia debe ser mayor que 0'),
      otherwise: (schema) => schema.notRequired(),
    }),
  tieneCalefaccion: Yup.boolean(),
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
  const formikRef = useRef<any>(null);

  const parsearTipo = (tipo: string): string => {
    if (tipo === 'Bomba de calor') return 'BOMBA_CALOR';
    if (tipo === 'Bomba a gas') return 'CALENTADOR_GAS';
    return tipo;
  };

  // Función para obtener los valores iniciales basados en el estado actual de nuevaPiscina
  const getInitialValues = () => {
    const calefaccionExistente = nuevaPiscina.calefaccion;

    return {
      tieneCalefaccion: !!calefaccionExistente,
      tipoCalefaccion: calefaccionExistente?.tipo ?? 'Bomba de calor',
      marcaCalefaccion: calefaccionExistente?.marca ?? '',
      modeloCalefaccion: calefaccionExistente?.modelo ?? '',
      potenciaCalefaccion: calefaccionExistente?.potencia
        ? calefaccionExistente.potencia.toString()
        : '',
    };
  };

  const initialValues = getInitialValues();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (values.tieneCalefaccion) {
          const calefaccionNueva: CalefaccionNueva = {
            id: null,
            tipo: parsearTipo(values.tipoCalefaccion),
            marca: values.marcaCalefaccion,
            modelo: values.modeloCalefaccion,
            potencia: parseFloat(values.potenciaCalefaccion),
            activa: true,
          };

          nuevaPiscina.calefaccion = calefaccionNueva;
        } else {
          setNuevaPiscina({
            ...nuevaPiscina,
            calefaccion: null,
          });
        }
        onSave();
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
        setTouched,
      }) => {
        // Efecto para revalidar cuando cambia tieneCalefaccion
        useEffect(() => {
          validateForm();
        }, [values.tieneCalefaccion, validateForm]);

        const handleSwitchChange = (value: boolean) => {
          setFieldValue('tieneCalefaccion', value);

          // Si se desactiva la calefacción, limpiar los touched de los campos relacionados
          if (!value) {
            setTouched({
              ...touched,
              tipoCalefaccion: false,
              marcaCalefaccion: false,
              modeloCalefaccion: false,
              potenciaCalefaccion: false,
            });

            // También limpiar los valores para un mejor UX
            setFieldValue('tipoCalefaccion', 'Bomba de calor');
            setFieldValue('marcaCalefaccion', '');
            setFieldValue('modeloCalefaccion', '');
            setFieldValue('potenciaCalefaccion', '');
          }
        };

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
                  thumbColor={values.tieneCalefaccion ? '#fcdb99' : '#ffffff'}
                  ios_backgroundColor="#d3d3d3"
                  onValueChange={handleSwitchChange}
                  value={values.tieneCalefaccion}
                />
              </View>
              <View className="mx-2">
                <Text
                  className={`font-geist text-text text-base mt-3 ${
                    !values.tieneCalefaccion ? 'text-gray-300' : ''
                  }`}
                >
                  Tipo:
                </Text>
                <RadioButton
                  value={'Bomba de calor'}
                  label={'Bomba de calor'}
                  selected={values.tipoCalefaccion === 'Bomba de calor'}
                  onPress={(value) => {
                    setFieldValue('tipoCalefaccion', value);
                    setFieldTouched('tipoCalefaccion', true);
                  }}
                  disabled={!values.tieneCalefaccion}
                />

                <RadioButton
                  value={'Bomba a gas'}
                  label={'Bomba a gas'}
                  selected={values.tipoCalefaccion === 'Bomba a gas'}
                  onPress={(value) => {
                    setFieldValue('tipoCalefaccion', value);
                    setFieldTouched('tipoCalefaccion', true);
                  }}
                  disabled={!values.tieneCalefaccion}
                />

                {values.tieneCalefaccion &&
                  touched.tipoCalefaccion &&
                  errors.tipoCalefaccion && (
                    <Text className="text-red-500 mt-2">
                      {errors.tipoCalefaccion}
                    </Text>
                  )}

                <Text
                  className={`font-geist text-text text-base mt-3 ${
                    !values.tieneCalefaccion ? 'text-gray-300' : ''
                  }`}
                >
                  Marca
                </Text>
                <TextInput
                  className={`border border-gray-200 rounded-md py-4 px-3 ${
                    !values.tieneCalefaccion ? 'text-gray-400' : ''
                  }`}
                  value={values.marcaCalefaccion}
                  onChangeText={handleChange('marcaCalefaccion')}
                  onBlur={handleBlur('marcaCalefaccion')}
                  placeholder="Ej: Hayward"
                  editable={values.tieneCalefaccion}
                  placeholderTextColor={
                    !values.tieneCalefaccion ? '#a3a3a3' : '#888'
                  }
                />
                {values.tieneCalefaccion &&
                  touched.marcaCalefaccion &&
                  errors.marcaCalefaccion && (
                    <Text className="text-red-500 mt-2">
                      {errors.marcaCalefaccion}
                    </Text>
                  )}

                <Text
                  className={`font-geist text-text text-base mt-3 ${
                    !values.tieneCalefaccion ? 'text-gray-300' : ''
                  }`}
                >
                  Modelo
                </Text>
                <TextInput
                  className={`border border-gray-200 rounded-md py-4 px-3 ${
                    !values.tieneCalefaccion ? 'text-gray-400' : ''
                  }`}
                  value={values.modeloCalefaccion}
                  onChangeText={handleChange('modeloCalefaccion')}
                  onBlur={handleBlur('modeloCalefaccion')}
                  placeholder="Ej: EnergyLine Pro"
                  editable={values.tieneCalefaccion}
                  placeholderTextColor={
                    !values.tieneCalefaccion ? '#a3a3a3' : '#888'
                  }
                />
                {values.tieneCalefaccion &&
                  touched.modeloCalefaccion &&
                  errors.modeloCalefaccion && (
                    <Text className="text-red-500 mt-2">
                      {errors.modeloCalefaccion}
                    </Text>
                  )}

                <Text
                  className={`font-geist text-text text-base mt-3 ${
                    !values.tieneCalefaccion ? 'text-gray-300' : ''
                  }`}
                >
                  Potencia (kW)
                </Text>
                <TextInput
                  className={`border border-gray-200 rounded-md py-4 px-3 ${
                    !values.tieneCalefaccion ? 'text-gray-400' : ''
                  }`}
                  value={values.potenciaCalefaccion}
                  onChangeText={handleChange('potenciaCalefaccion')}
                  onBlur={handleBlur('potenciaCalefaccion')}
                  keyboardType="numeric"
                  placeholder="Ej: 13.5"
                  editable={values.tieneCalefaccion}
                  placeholderTextColor={
                    !values.tieneCalefaccion ? '#a3a3a3' : '#888'
                  }
                />
                {values.tieneCalefaccion &&
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

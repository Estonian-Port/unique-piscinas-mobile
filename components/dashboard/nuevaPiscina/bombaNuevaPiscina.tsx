import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import { BombaNuevo, PiscinaNueva } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';
import Divider from '@/components/utiles/divider';

const validationSchema = Yup.object().shape({
  marcaBombaPrimaria: Yup.string().required('Seleccione una marca de bomba'),
  modeloBombaPrimaria: Yup.string().required('Seleccione un modelo de bomba'),
  potenciaCVPrimaria: Yup.number()
    .required('Ingrese la potencia en CV')
    .typeError('La potencia debe ser un número')
    .min(1, 'La potencia debe ser mayor que 0'),

  // Validación condicional para la segunda bomba
  marcaBombaSecundaria: Yup.string().when('tieneBombaSecundaria', {
    is: true,
    then: (schema) => schema.required('Ingrese la marca de la bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  modeloBombaSecundaria: Yup.string().when('tieneBombaSecundaria', {
    is: true,
    then: (schema) => schema.required('Ingrese el modelo de la bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  potenciaCVSecundaria: Yup.number().when('tieneBombaSecundaria', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia en CV')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tieneBombaSecundaria: Yup.boolean(),

  // Validación condicional para la segunda bomba
  marcaBombaHidromasaje: Yup.string().when('tieneBombaHidromasaje', {
    is: true,
    then: (schema) => schema.required('Ingrese la marca de la bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  modeloBombaHidromasaje: Yup.string().when('tieneBombaHidromasaje', {
    is: true,
    then: (schema) => schema.required('Ingrese el modelo de la bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  potenciaCVHidromasaje: Yup.number().when('tieneBombaHidromasaje', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia en CV')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tieneBombaHidromasaje: Yup.boolean(),

  // Validación condicional para la segunda bomba
  marcaBombaCascada: Yup.string().when('tieneBombaCascada', {
    is: true,
    then: (schema) => schema.required('Ingrese la marca de la bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  modeloBombaCascada: Yup.string().when('tieneBombaCascada', {
    is: true,
    then: (schema) => schema.required('Ingrese el modelo de la bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  potenciaCVCascada: Yup.number().when('tieneBombaCascada', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia en CV')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tieneBombaCascada: Yup.boolean(),
});

const BombaNuevaPiscina = ({
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
  const formikRef = useRef<any>(null);

  // Función para obtener los valores iniciales basados en el estado actual de nuevaPiscina
  const getInitialValues = () => {
    const bombaPrimaria = nuevaPiscina.bomba?.find(
      (bomba) => bomba.tipo === 'Primaria'
    );
    const bombaSecundaria = nuevaPiscina.bomba?.find(
      (bomba) => bomba.tipo === 'Secundaria'
    );
    const bombaCascada = nuevaPiscina.bomba?.find(
      (bomba) => bomba.tipo === 'Cascada'
    );
    const bombaHidromasaje = nuevaPiscina.bomba?.find(
      (bomba) => bomba.tipo === 'Hidromasaje'
    );

    const tieneBombaSecundaria = nuevaPiscina.bomba?.some(
      (bomba) => bomba.tipo === 'Secundaria'
    );
    const tieneBombaCascada = nuevaPiscina.bomba?.some(
      (bomba) => bomba.tipo === 'Cascada'
    );
    const tieneBombaHidromasaje = nuevaPiscina.bomba?.some(
      (bomba) => bomba.tipo === 'Hidromasaje'
    );

    return {
      marcaBombaPrimaria: bombaPrimaria?.marca ?? '',
      modeloBombaPrimaria: bombaPrimaria?.modelo ?? '',
      potenciaCVPrimaria: bombaPrimaria?.potencia
        ? bombaPrimaria.potencia.toString()
        : '',

      marcaBombaSecundaria: bombaSecundaria?.marca ?? '',
      modeloBombaSecundaria: bombaSecundaria?.modelo ?? '',
      potenciaCVSecundaria: bombaSecundaria?.potencia
        ? bombaSecundaria.potencia.toString()
        : '',

      marcaBombaCascada: bombaCascada?.marca ?? '',
      modeloBombaCascada: bombaCascada?.modelo ?? '',
      potenciaCVCascada: bombaCascada?.potencia
        ? bombaCascada.potencia.toString()
        : '',

      marcaBombaHidromasaje: bombaHidromasaje?.marca ?? '',
      modeloBombaHidromasaje: bombaHidromasaje?.modelo ?? '',
      potenciaCVHidromasaje: bombaHidromasaje?.potencia
        ? bombaHidromasaje.potencia.toString()
        : '',

      tieneBombaSecundaria: tieneBombaSecundaria,
      tieneBombaCascada: tieneBombaCascada,
      tieneBombaHidromasaje: tieneBombaHidromasaje,
    };
  };

  const initialValues = getInitialValues();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const bombaPrimaria: BombaNuevo = {
          id: null,
          marca: values.marcaBombaPrimaria,
          modelo: values.modeloBombaPrimaria,
          potencia: parseFloat(values.potenciaCVPrimaria),
          activa: false,
          tipo: 'PRINCIPAL',
        };

        const bombas: BombaNuevo[] = [bombaPrimaria];

        if (values.tieneBombaSecundaria) {
          const bombaSecundaria: BombaNuevo = {
            id: null,
            marca: values.marcaBombaSecundaria,
            modelo: values.modeloBombaSecundaria,
            potencia: parseFloat(values.potenciaCVSecundaria),
            activa: false,
            tipo: 'SECUNDARIA',
          };
          bombas.push(bombaSecundaria);
        }

        if (values.tieneBombaCascada) {
          const bombaCascada: BombaNuevo = {
            id: null,
            marca: values.marcaBombaCascada,
            modelo: values.modeloBombaCascada,
            potencia: parseFloat(values.potenciaCVCascada),
            activa: false,
            tipo: 'CASCADA',
          };
          bombas.push(bombaCascada);
        }

        if (values.tieneBombaHidromasaje) {
          const bombaHidromasaje: BombaNuevo = {
            id: null,
            marca: values.marcaBombaHidromasaje,
            modelo: values.modeloBombaHidromasaje,
            potencia: parseFloat(values.potenciaCVHidromasaje),
            activa: false,
            tipo: 'HIDROMASAJE',
          };
          bombas.push(bombaHidromasaje);
        }

        setNuevaPiscina({
          ...nuevaPiscina,
          bomba: bombas,
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
        validateForm,
      }) => {
        // Efecto para revalidar cuando cambia tieneDobleBomba
        useEffect(() => {
          validateForm();
        }, [
          values.tieneBombaSecundaria,
          values.tieneBombaCascada,
          values.tieneBombaHidromasaje,
          validateForm,
        ]);

        return (
          <View className="py-5">
            <View className="flex-row items-center justify-between">
              <Text className="font-geist-semi-bold text-text text-xl">
                Equipamiento
              </Text>
              <PasosFormulario paso={3} />
            </View>
            <Text className="font-geist-semi-bold text-text text-lg mt-2">
              Configuración de Bombas
            </Text>
            <Text className="font-geist-semi-bold text-text text-md mt-3">
              Bomba principal
            </Text>

            <Text className="font-geist text-text text-base mt-3">Marca</Text>
            <TextInput
              className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
              value={values.marcaBombaPrimaria}
              onChangeText={handleChange('marcaBombaPrimaria')}
              onBlur={handleBlur('marcaBombaPrimaria')}
              placeholder="Ingrese la marca de la bomba"
            />
            {touched.marcaBombaPrimaria && errors.marcaBombaPrimaria && (
              <Text className="text-red-500 mt-2">
                {errors.marcaBombaPrimaria}
              </Text>
            )}

            <Text className="font-geist text-text text-base mt-3">Modelo</Text>
            <TextInput
              className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
              value={values.modeloBombaPrimaria}
              onChangeText={handleChange('modeloBombaPrimaria')}
              onBlur={handleBlur('modeloBombaPrimaria')}
              placeholder="Ingrese el modelo de la bomba"
            />
            {touched.modeloBombaPrimaria && errors.modeloBombaPrimaria && (
              <Text className="text-red-500 mt-2">
                {errors.modeloBombaPrimaria}
              </Text>
            )}

            <Text className="font-geist text-text text-base mt-3">
              Potencia (CV)
            </Text>
            <TextInput
              className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
              value={values.potenciaCVPrimaria}
              onChangeText={handleChange('potenciaCVPrimaria')}
              onBlur={handleBlur('potenciaCVPrimaria')}
              keyboardType="numeric"
              placeholder="Ej: 15"
            />
            {touched.potenciaCVPrimaria && errors.potenciaCVPrimaria && (
              <Text className="text-red-500 mt-2">
                {errors.potenciaCVPrimaria}
              </Text>
            )}
            <Divider />

            <View className="flex-row items-center">
              <Checkbox
                value={values.tieneBombaSecundaria}
                onValueChange={(value) => {
                  setFieldValue('tieneBombaSecundaria', value);
                }}
                color={values.tieneBombaSecundaria ? '#0F0D23' : undefined}
              />
              <Pressable
                onPress={() =>
                  setFieldValue(
                    'tieneBombaSecundaria',
                    !values.tieneBombaSecundaria
                  )
                }
                className="ml-2"
              >
                <Text className="font-geist text-text text-base">
                  Agregar bomba Secundaria
                </Text>
              </Pressable>
            </View>

            {values.tieneBombaSecundaria && (
              <>
                <Text className="font-geist-semi-bold text-text text-sm mt-3">
                  Bomba secundaria
                </Text>
                <Text className="font-geist text-text text-base mt-3">
                  Marca
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.marcaBombaSecundaria}
                  onChangeText={handleChange('marcaBombaSecundaria')}
                  onBlur={handleBlur('marcaBombaSecundaria')}
                  placeholder="Ingrese la marca de la bomba"
                />

                {touched.marcaBombaSecundaria &&
                  errors.marcaBombaSecundaria && (
                    <Text className="text-red-500 mt-2">
                      {errors.marcaBombaSecundaria}
                    </Text>
                  )}

                <Text className="font-geist text-text text-base mt-3">
                  Modelo
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.modeloBombaSecundaria}
                  onChangeText={handleChange('modeloBombaSecundaria')}
                  onBlur={handleBlur('modeloBombaSecundaria')}
                  placeholder="Ingrese el modelo de la bomba"
                />
                {touched.modeloBombaSecundaria &&
                  errors.modeloBombaSecundaria && (
                    <Text className="text-red-500 mt-2">
                      {errors.modeloBombaSecundaria}
                    </Text>
                  )}

                <Text className="font-geist text-text text-base mt-3">
                  Potencia (CV)
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.potenciaCVSecundaria}
                  onChangeText={handleChange('potenciaCVSecundaria')}
                  onBlur={handleBlur('potenciaCVSecundaria')}
                  keyboardType="numeric"
                  placeholder="Ej: 15"
                />
                {touched.potenciaCVSecundaria &&
                  errors.potenciaCVSecundaria && (
                    <Text className="text-red-500 mt-2">
                      {errors.potenciaCVSecundaria}
                    </Text>
                  )}
                <Divider />
              </>
            )}

            <View className="flex-row items-center mt-4">
              <Checkbox
                value={values.tieneBombaCascada}
                onValueChange={(value) => {
                  setFieldValue('tieneBombaCascada', value);
                }}
                color={values.tieneBombaCascada ? '#0F0D23' : undefined}
              />
              <Pressable
                onPress={() =>
                  setFieldValue('tieneBombaCascada', !values.tieneBombaCascada)
                }
                className="ml-2"
              >
                <Text className="font-geist text-text text-base">
                  Agregar bomba Cascada
                </Text>
              </Pressable>
            </View>

            {values.tieneBombaCascada && (
              <>
                <Text className="font-geist-semi-bold text-text text-sm mt-3">
                  Bomba de cascada
                </Text>
                <Text className="font-geist text-text text-base mt-3">
                  Marca
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.marcaBombaCascada}
                  onChangeText={handleChange('marcaBombaCascada')}
                  onBlur={handleBlur('marcaBombaCascada')}
                  placeholder="Ingrese la marca de la bomba"
                />

                {touched.marcaBombaCascada && errors.marcaBombaCascada && (
                  <Text className="text-red-500 mt-2">
                    {errors.marcaBombaCascada}
                  </Text>
                )}

                <Text className="font-geist text-text text-base mt-3">
                  Modelo
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.modeloBombaCascada}
                  onChangeText={handleChange('modeloBombaCascada')}
                  onBlur={handleBlur('modeloBombaCascada')}
                  placeholder="Ingrese el modelo de la bomba"
                />
                {touched.modeloBombaCascada && errors.modeloBombaCascada && (
                  <Text className="text-red-500 mt-2">
                    {errors.modeloBombaCascada}
                  </Text>
                )}

                <Text className="font-geist text-text text-base mt-3">
                  Potencia (CV)
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.potenciaCVCascada}
                  onChangeText={handleChange('potenciaCVCascada')}
                  onBlur={handleBlur('potenciaCVCascada')}
                  keyboardType="numeric"
                  placeholder="Ej: 15"
                />
                {touched.potenciaCVCascada && errors.potenciaCVCascada && (
                  <Text className="text-red-500 mt-2">
                    {errors.potenciaCVCascada}
                  </Text>
                )}
                <Divider />
              </>
            )}

            <View className="flex-row items-center mt-4">
              <Checkbox
                value={values.tieneBombaHidromasaje}
                onValueChange={(value) => {
                  setFieldValue('tieneBombaHidromasaje', value);
                }}
                color={values.tieneBombaHidromasaje ? '#0F0D23' : undefined}
              />
              <Pressable
                onPress={() =>
                  setFieldValue(
                    'tieneBombaHidromasaje',
                    !values.tieneBombaHidromasaje
                  )
                }
                className="ml-2"
              >
                <Text className="font-geist text-text text-base">
                  Agregar bomba Hidromasaje
                </Text>
              </Pressable>
            </View>

            {values.tieneBombaHidromasaje && (
              <>
                <Text className="font-geist-semi-bold text-text text-sm mt-3">
                  Bomba de hidromasaje
                </Text>
                <Text className="font-geist text-text text-base mt-3">
                  Marca
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.marcaBombaHidromasaje}
                  onChangeText={handleChange('marcaBombaHidromasaje')}
                  onBlur={handleBlur('marcaBombaHidromasaje')}
                  placeholder="Ingrese la marca de la bomba"
                />

                {touched.marcaBombaHidromasaje &&
                  errors.marcaBombaHidromasaje && (
                    <Text className="text-red-500 mt-2">
                      {errors.marcaBombaHidromasaje}
                    </Text>
                  )}

                <Text className="font-geist text-text text-base mt-3">
                  Modelo
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.modeloBombaHidromasaje}
                  onChangeText={handleChange('modeloBombaHidromasaje')}
                  onBlur={handleBlur('modeloBombaHidromasaje')}
                  placeholder="Ingrese el modelo de la bomba"
                />
                {touched.modeloBombaHidromasaje &&
                  errors.modeloBombaHidromasaje && (
                    <Text className="text-red-500 mt-2">
                      {errors.modeloBombaHidromasaje}
                    </Text>
                  )}

                <Text className="font-geist text-text text-base mt-3">
                  Potencia (CV)
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.potenciaCVHidromasaje}
                  onChangeText={handleChange('potenciaCVHidromasaje')}
                  onBlur={handleBlur('potenciaCVHidromasaje')}
                  keyboardType="numeric"
                  placeholder="Ej: 15"
                />
                {touched.potenciaCVHidromasaje &&
                  errors.potenciaCVHidromasaje && (
                    <Text className="text-red-500 mt-2">
                      {errors.potenciaCVHidromasaje}
                    </Text>
                  )}
                <Divider />
              </>
            )}

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

export default BombaNuevaPiscina;

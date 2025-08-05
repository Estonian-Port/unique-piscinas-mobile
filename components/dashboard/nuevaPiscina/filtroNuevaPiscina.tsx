import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import RadioButton from '../../utiles/radioButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import { Filtro, PiscinaNueva, Valvula } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';

export type TipoFiltro = 'Arena' | 'Vidrio' | 'Cartucho' | 'Diatomeas';

export const marcasFiltro = [
  { id: 1, name: 'Astral' },
  { id: 2, name: 'Hayward' },
  { id: 3, name: 'Pentair' },
  { id: 4, name: 'Otra' },
];

export const modelosFiltro = [
  { id: 1, name: 'Aster' },
  { id: 2, name: 'Cantabric' },
  { id: 3, name: 'Berlin' },
  { id: 4, name: 'Otro' },
];

const validationSchema = Yup.object().shape({
  tipoFiltro: Yup.string().required('Seleccione un tipo de filtro'),
  marcaFiltro: Yup.string().required('Seleccione una marca de filtro'),
  modeloFiltro: Yup.string().required('Seleccione un modelo de filtro'),
  diametro: Yup.number()
    .required('Ingrese el diámetro del filtro')
    .typeError('El diámetro debe ser un número')
    .min(0.1, 'El diámetro debe ser mayor que 0'),
  datoExtra: Yup.number().when('tipoFiltro', {
    is: (tipo: string) => tipo !== 'Diatomeas',
    then: (schema) =>
      schema
        .required('Este campo es obligatorio para este tipo de filtro')
        .typeError('El valor debe ser un número')
        .min(0.1, 'El valor debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const FiltroNuevaPiscina = ({
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
  const [openMarcaFiltro, setOpenMarcaFiltro] = useState(false);
  const [openModeloFiltro, setOpenModeloFiltro] = useState(false);
  const formikRef = useRef<any>(null);

  // Función para obtener los valores iniciales basados en el estado actual de nuevaPiscina
  const getInitialValues = () => {
    const filtroExistente = nuevaPiscina.filtro;
    const valvulasExistentes = nuevaPiscina.valvulas || [];

    // Verificar si ya existen válvulas de cada tipo
    const tieneSelectora = valvulasExistentes.some(
      (v) => v.tipo === 'Selectora'
    );
    const tieneBola = valvulasExistentes.some((v) => v.tipo === 'Bola');

    return {
      tipoFiltro: filtroExistente?.tipo ?? 'Arena',
      marcaFiltro: filtroExistente?.marca ?? '',
      modeloFiltro: filtroExistente?.modelo ?? '',
      diametro: filtroExistente?.diametro
        ? filtroExistente.diametro.toString()
        : '',
      datoExtra: filtroExistente?.datoExtra
        ? filtroExistente.datoExtra.toString()
        : '',
      tieneSelectora: tieneSelectora,
      tieneBola: tieneBola,
    };
  };

  const initialValues = getInitialValues();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const filtroNuevo: Filtro = {
          id: 0,
          tipo: values.tipoFiltro as TipoFiltro,
          marca: values.marcaFiltro,
          modelo: values.modeloFiltro,
          diametro: Number(values.diametro),
          datoExtra: values.datoExtra ? Number(values.datoExtra) : undefined,
        };

        const valvulas: Valvula[] = [];

        if (values.tieneSelectora) {
          valvulas.push({
            id: 1,
            tipo: 'Selectora',
            estado: 'Activa',
          });
        }

        if (values.tieneBola) {
          valvulas.push({
            id: valvulas.length + 1,
            tipo: 'Bola',
            estado: 'Activa',
          });
        }

        setNuevaPiscina({
          ...nuevaPiscina,
          filtro: filtroNuevo,
          valvulas: valvulas,
        });
        onNext();
      }}
      enableReinitialize={false}
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
        // Efecto para revalidar cuando cambia el tipo de filtro
        useEffect(() => {
          validateForm();
        }, [values.tipoFiltro, validateForm]);

        return (
          <View className="py-5">
            <View className="flex-row items-center justify-between">
              <Text className="font-geist-semi-bold text-text text-xl">
                Equipamiento
              </Text>
              <PasosFormulario paso={4} />
            </View>

            <Text className="font-geist-semi-bold text-text text-lg mt-2">
              Filtro
            </Text>
            <Text className="font-geist-semi-bold text-text text-base mt-3">
              Tipo de filtro
            </Text>

            <RadioButton
              value={'Arena'}
              label={'Arena'}
              selected={values.tipoFiltro === 'Arena'}
              onPress={(value) => {
                setFieldValue('tipoFiltro', value);
                setFieldTouched('tipoFiltro', true);
              }}
            />
            <RadioButton
              value={'Vidrio'}
              label={'Vidrio'}
              selected={values.tipoFiltro === 'Vidrio'}
              onPress={(value) => {
                setFieldValue('tipoFiltro', value);
                setFieldTouched('tipoFiltro', true);
              }}
            />
            <RadioButton
              value={'Cartucho'}
              label={'Cartucho'}
              selected={values.tipoFiltro === 'Cartucho'}
              onPress={(value) => {
                setFieldValue('tipoFiltro', value);
                setFieldTouched('tipoFiltro', true);
              }}
            />
            <RadioButton
              value={'Diatomeas'}
              label={'Diatomeas'}
              selected={values.tipoFiltro === 'Diatomeas'}
              onPress={(value) => {
                setFieldValue('tipoFiltro', value);
                setFieldTouched('tipoFiltro', true);
              }}
            />

            {touched.tipoFiltro && errors.tipoFiltro && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.tipoFiltro}
              </Text>
            )}

            <Text className="font-geist text-text text-base mt-3">Marca</Text>
            <DropDownPicker
              open={openMarcaFiltro}
              value={values.marcaFiltro}
              items={marcasFiltro.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
              setOpen={setOpenMarcaFiltro}
              setValue={(callback) => {
                const val = callback(values.marcaFiltro);
                setFieldValue('marcaFiltro', val);
              }}
              placeholder="Seleccione una marca"
              zIndex={3000}
              zIndexInverse={1000}
              onOpen={() => setOpenModeloFiltro(false)}
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
            {errors.marcaFiltro && touched.marcaFiltro && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.marcaFiltro}
              </Text>
            )}

            <Text className="font-geist text-text text-base mt-3">Modelo</Text>
            <DropDownPicker
              open={openModeloFiltro}
              value={values.modeloFiltro}
              items={modelosFiltro.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
              setOpen={setOpenModeloFiltro}
              setValue={(callback) => {
                const val = callback(values.modeloFiltro);
                setFieldValue('modeloFiltro', val);
              }}
              placeholder="Seleccione un modelo"
              zIndex={2000}
              zIndexInverse={2000}
              onOpen={() => setOpenMarcaFiltro(false)}
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
            {errors.modeloFiltro && touched.modeloFiltro && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.modeloFiltro}
              </Text>
            )}

            <Text className="font-geist text-text text-base mt-3">
              Diámetro (mm)
            </Text>
            <TextInput
              className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
              value={values.diametro}
              onChangeText={handleChange('diametro')}
              onBlur={handleBlur('diametro')}
              keyboardType="numeric"
              placeholder="Ej: 500"
            />
            {errors.diametro && touched.diametro && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.diametro}
              </Text>
            )}

            {values.tipoFiltro !== 'Diatomeas' && (
              <>
                <Text className="font-geist text-text text-base mt-3">
                  {values.tipoFiltro === 'Arena'
                    ? 'Cantidad de arena (kg)'
                    : values.tipoFiltro === 'Vidrio'
                    ? 'Cantidad de vidrio (kg)'
                    : 'Micras del cartucho'}
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.datoExtra}
                  onChangeText={handleChange('datoExtra')}
                  onBlur={handleBlur('datoExtra')}
                  keyboardType="numeric"
                  placeholder="Ej: 75"
                />
                {errors.datoExtra && touched.datoExtra && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.datoExtra}
                  </Text>
                )}
              </>
            )}

            <Text className="font-geist-semi-bold text-text text-lg mt-4">
              Válvulas
            </Text>
            <Text className="font-geist text-text text-sm mt-1 mb-3">
              Seleccione las válvulas que tiene la piscina
            </Text>

            <View className="flex-row items-center mt-2">
              <Checkbox
                value={values.tieneSelectora}
                onValueChange={(value) => {
                  setFieldValue('tieneSelectora', value);
                }}
                color={values.tieneSelectora ? '#0F0D23' : undefined}
              />
              <Pressable
                onPress={() =>
                  setFieldValue('tieneSelectora', !values.tieneSelectora)
                }
                className="ml-2 flex-1"
              >
                <Text className="font-geist text-text text-base">
                  Válvula Selectora
                </Text>
              </Pressable>
            </View>

            <View className="flex-row items-center mt-3">
              <Checkbox
                value={values.tieneBola}
                onValueChange={(value) => {
                  setFieldValue('tieneBola', value);
                }}
                color={values.tieneBola ? '#0F0D23' : undefined}
              />
              <Pressable
                onPress={() => setFieldValue('tieneBola', !values.tieneBola)}
                className="ml-2 flex-1"
              >
                <Text className="font-geist text-text text-base">
                  Válvula de Bola
                </Text>
              </Pressable>
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

export default FiltroNuevaPiscina;

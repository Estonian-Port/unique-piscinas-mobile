import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import RadioButton from '../../utiles/radioButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import { Bomba, PiscinaNueva } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';

export type TipoBomba =
  | 'Bomba principal'
  | 'Bomba secundaria'
  | 'Doble bomba'
  | 'Bomba de velocidad variable';

export const marcasBomba = [
  { id: 1, name: 'Astral' },
  { id: 2, name: 'Hayward' },
  { id: 3, name: 'Pentair' },
  { id: 4, name: 'Otra' },
];

export const modelosBomba = [
  { id: 1, name: 'Victoria Plus' },
  { id: 2, name: 'Sena' },
  { id: 3, name: 'Glass Plus' },
  { id: 4, name: 'Otro' },
];

const validationSchema = Yup.object().shape({
  tipoBombaPrimaria: Yup.string().required('Seleccione un tipo de bomba'),
  marcaBombaPrimaria: Yup.string().required('Seleccione una marca de bomba'),
  modeloBombaPrimaria: Yup.string().required('Seleccione un modelo de bomba'),
  potenciaCVPrimaria: Yup.number()
    .required('Ingrese la potencia en CV')
    .typeError('La potencia debe ser un número')
    .min(1, 'La potencia debe ser mayor que 0'),

  // Validación condicional para la segunda bomba
  tipoBombaSecundaria: Yup.string().when('$tieneDobleBomba', {
    is: true,
    then: (schema) => schema.required('Seleccione un tipo de bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  marcaBombaSecundaria: Yup.string().when('$tieneDobleBomba', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  modeloBombaSecundaria: Yup.string().when('$tieneDobleBomba', {
    is: true,
    then: (schema) => schema.required('Seleccione un modelo de bomba'),
    otherwise: (schema) => schema.notRequired(),
  }),
  potenciaCVSecundaria: Yup.number().when('$tieneDobleBomba', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia en CV')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const nuevaBombaPrimaria: Bomba = {
  id: 0,
  nombre: 'Bomba principal',
  marca: '',
  modelo: '',
  potencia: 0,
  activa: true,
};

const nuevaBombaSecundaria: Bomba = {
  id: 1,
  nombre: 'Bomba secundaria',
  marca: '',
  modelo: '',
  potencia: 0,
  activa: true,
};

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
  const [openMarcaBomba, setOpenMarcaBomba] = useState(false);
  const [openModeloBomba, setOpenModeloBomba] = useState(false);
  const [tipoBombaPrimaria, setTipoBombaPrimaria] =
    useState<TipoBomba>('Bomba principal');
  const [tipoBombaSecundaria, setTipoBombaSecundaria] =
    useState<TipoBomba>('Bomba secundaria');
  const [tieneDobleBomba, setTieneDobleBomba] = useState(false);
  const formikRef = useRef<any>(null);

  return (
    <Formik
      initialValues={{
        tipoBombaPrimaria: nuevaBombaPrimaria.nombre ?? '',
        marcaBombaPrimaria: nuevaBombaPrimaria.marca ?? '',
        modeloBombaPrimaria: nuevaBombaPrimaria.modelo ?? '',
        potenciaCVPrimaria:
          nuevaBombaPrimaria.potencia === 0
            ? ''
            : nuevaBombaPrimaria.potencia.toString(),
        tipoBombaSecundaria: nuevaBombaSecundaria.nombre ?? '',
        marcaBombaSecundaria: nuevaBombaSecundaria.marca ?? '',
        modeloBombaSecundaria: nuevaBombaSecundaria.modelo ?? '',
        potenciaCVSecundaria:
          nuevaBombaSecundaria.potencia === 0
            ? ''
            : nuevaBombaSecundaria.potencia.toString(),
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const bombaPrimaria: Bomba = {
          ...nuevaBombaPrimaria,
          nombre: tipoBombaPrimaria,
          marca: values.marcaBombaPrimaria ?? '',
          modelo: values.modeloBombaPrimaria,
          potencia: parseFloat(values.potenciaCVPrimaria),
        };

        const bombaSecundaria: Bomba = {
          ...nuevaBombaSecundaria,
          nombre: tipoBombaSecundaria,
          marca: values.marcaBombaSecundaria ?? '',
          modelo: values.modeloBombaSecundaria,
          potencia: parseFloat(values.potenciaCVSecundaria),
        };

        setNuevaPiscina({
          ...nuevaPiscina,
          bomba: tieneDobleBomba
            ? [bombaPrimaria, bombaSecundaria]
            : [bombaPrimaria],
        });
        onNext();
      }}
      enableReinitialize={true}
      validationContext={{ tieneDobleBomba }}
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
              <PasosFormulario paso={3} />
            </View>
            <Text className="font-geist-semi-bold text-text text-lg mt-2">
              Bombas
            </Text>
            <Text className="font-geist-semi-bold text-text text-base mt-3">
              Configuración de bombas
            </Text>
            <Text className="font-geist-semi-bold text-text text-sm mt-3">
              Bomba principal
            </Text>
            <RadioButton
              value={'Bomba principal'}
              label={'Bomba principal'}
              selected={tipoBombaPrimaria == 'Bomba principal'}
              onPress={(value) => {
                setTipoBombaPrimaria(value);
                setFieldValue('tipoBombaPrimaria', value);
                setFieldTouched('tipoBombaPrimaria', true);
              }}
            />
            <RadioButton
              value={'Bomba de velocidad variable'}
              label={'Bomba de velocidad variable'}
              selected={tipoBombaPrimaria == 'Bomba de velocidad variable'}
              onPress={(value) => {
                setTipoBombaPrimaria(value);
                setFieldValue('tipoBombaPrimaria', value);
                setFieldTouched('tipoBombaPrimaria', true);
              }}
            />
            <Text className="font-geist text-text text-base mt-3">Marca</Text>
            <DropDownPicker
              open={openMarcaBomba}
              value={values.marcaBombaPrimaria}
              items={marcasBomba.map((item) => ({
                label: item.name,
                value: item.id.toString(),
              }))}
              setOpen={setOpenMarcaBomba}
              setValue={(callback) => {
                const val = callback(values.marcaBombaPrimaria);
                setFieldValue('marcaBombaPrimaria', val);
                setFieldTouched('marcaBombaPrimaria', true);
              }}
              placeholder="Seleccione una marca"
              style={{ borderColor: '#e5e7eb' }}
              dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
              zIndex={3000}
              zIndexInverse={1000}
            />
            {touched.marcaBombaPrimaria && errors.marcaBombaPrimaria && (
              <Text className="text-red-500 mt-2">
                {errors.marcaBombaPrimaria}
              </Text>
            )}

            <Text className="font-geist text-text text-base mt-3">Modelo</Text>
            <DropDownPicker
              open={openModeloBomba}
              value={values.modeloBombaPrimaria}
              items={modelosBomba.map((item) => ({
                label: item.name,
                value: item.id.toString(),
              }))}
              setOpen={setOpenModeloBomba}
              setValue={(callback) => {
                const val = callback(values.modeloBombaPrimaria);
                setFieldValue('modeloBombaPrimaria', val);
                setFieldTouched('modeloBombaPrimaria', true);
              }}
              placeholder="Seleccione un modelo"
              style={{ borderColor: '#e5e7eb' }}
              dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
              zIndex={2000}
              zIndexInverse={2000}
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
              className="border border-gray-200 rounded-md py-4 px-3"
              value={values.potenciaCVPrimaria}
              onChangeText={handleChange('potenciaCVPrimaria')}
              onBlur={handleBlur('potenciaCVPrimaria')}
              keyboardType="numeric"
              placeholder="Ej: 15"
            ></TextInput>
            {touched.potenciaCVPrimaria && errors.potenciaCVPrimaria && (
              <Text className="text-red-500 mt-2">
                {errors.potenciaCVPrimaria}
              </Text>
            )}

            <View className="flex-row items-center mt-4">
              <Checkbox
                value={tieneDobleBomba}
                onValueChange={() => {
                  setTieneDobleBomba(!tieneDobleBomba);
                  setTimeout(() => {
                    formikRef.current?.validateForm();
                  }, 0);
                }}
                color={tieneDobleBomba ? '#0F0D23' : undefined}
              />
              <Pressable
                onPress={() => setTieneDobleBomba(!tieneDobleBomba)}
                className="ml-2"
              >
                <Text className="font-geist text-text text-base">
                  Agregar bomba secundaria
                </Text>
              </Pressable>
            </View>

            {tieneDobleBomba && (
              <>
                <Text className="font-geist-semi-bold text-text text-sm mt-3">
                  Bomba secundaria
                </Text>
                <RadioButton
                  value={'Bomba secundaria'}
                  label={'Bomba secundaria'}
                  selected={tipoBombaSecundaria == 'Bomba secundaria'}
                  onPress={(value) => {
                    setTipoBombaSecundaria(value);
                    setFieldValue('tipoBombaSecundaria', value);
                    setFieldTouched('tipoBombaSecundaria', true);
                  }}
                />
                <RadioButton
                  value={'Bomba de velocidad variable'}
                  label={'Bomba de velocidad variable'}
                  selected={
                    tipoBombaSecundaria == 'Bomba de velocidad variable'
                  }
                  onPress={(value) => {
                    setTipoBombaSecundaria(value);
                    setFieldValue('tipoBombaSecundaria', value);
                    setFieldTouched('tipoBombaSecundaria', true);
                  }}
                />
                <Text className="font-geist text-text text-base mt-3">
                  Marca
                </Text>
                <DropDownPicker
                  open={openMarcaBomba}
                  value={values.marcaBombaSecundaria}
                  items={marcasBomba.map((item) => ({
                    label: item.name,
                    value: item.id.toString(),
                  }))}
                  setOpen={setOpenMarcaBomba}
                  setValue={(callback) => {
                    const val = callback(values.marcaBombaSecundaria);
                    setFieldValue('marcaBombaSecundaria', val);
                    setFieldTouched('marcaBombaSecundaria', true);
                  }}
                  placeholder="Seleccione una marca"
                  style={{ borderColor: '#e5e7eb' }}
                  dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
                  zIndex={3000}
                  zIndexInverse={1000}
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
                <DropDownPicker
                  open={openModeloBomba}
                  value={values.modeloBombaSecundaria}
                  items={modelosBomba.map((item) => ({
                    label: item.name,
                    value: item.id.toString(),
                  }))}
                  setOpen={setOpenModeloBomba}
                  setValue={(callback) => {
                    const val = callback(values.modeloBombaSecundaria);
                    setFieldValue('modeloBombaSecundaria', val);
                    setFieldTouched('modeloBombaSecundaria', true);
                  }}
                  placeholder="Seleccione un modelo"
                  style={{ borderColor: '#e5e7eb' }}
                  dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
                  zIndex={2000}
                  zIndexInverse={2000}
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
                  className="border border-gray-200 rounded-md py-4 px-3"
                  value={values.potenciaCVSecundaria}
                  onChangeText={handleChange('potenciaCVSecundaria')}
                  onBlur={handleBlur('potenciaCVSecundaria')}
                  keyboardType="numeric"
                  placeholder="Ej: 15"
                ></TextInput>
                {touched.potenciaCVSecundaria &&
                  errors.potenciaCVSecundaria && (
                    <Text className="text-red-500 mt-2">
                      {errors.potenciaCVSecundaria}
                    </Text>
                  )}
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

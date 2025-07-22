import { View, Text, Pressable, TextInput } from 'react-native';
import React from 'react';
import Checkbox from 'expo-checkbox';
import { CalculatorIcon } from '@/assets/icons';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import { PiscinaNueva } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
  largo: Yup.number()
    .required('El largo es obligatorio')
    .typeError('El valor debe ser un numérico')
    .min(1, 'El largo debe ser mayor que 0'),
  ancho: Yup.number()
    .required('El ancho es obligatorio')
    .typeError('El valor debe ser un numérico')
    .min(1, 'El ancho debe ser mayor que 0'),
  profundidad: Yup.number()
    .required('La profundidad es obligatoria')
    .typeError('El valor debe ser un numérico')
    .min(1, 'La profundidad debe ser mayor que 0'),
  volumen: Yup.number()
    .required('El volumen es obligatorio')
    .typeError('El valor debe ser un numérico')
    .min(1, 'El volumen debe ser mayor que 0'),
  desbordante: Yup.boolean().required(),
  volumenTC: Yup.number().when('desbordante', {
    is: true,
    then: (schema) =>
      schema
        .required('El volumen T.C. es obligatorio')
        .typeError('El valor debe ser un numérico')
        .min(1, 'El volumen T.C. debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const ConfiguracionPiscina = ({
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
  return (
    <Formik
      initialValues={{
        largo: nuevaPiscina.largo === 0 ? '' : nuevaPiscina.largo.toString(),
        ancho: nuevaPiscina.ancho === 0 ? '' : nuevaPiscina.ancho.toString(),
        profundidad:
          nuevaPiscina.profundidad === 0
            ? ''
            : nuevaPiscina.profundidad.toString(),
        volumen:
          nuevaPiscina.volumen === 0 ? '' : nuevaPiscina.volumen.toString(),
        desbordante: nuevaPiscina.desbordante,
        volumenTC:
          nuevaPiscina.volumenTC === 0
            ? ''
            : nuevaPiscina.volumenTC?.toString() ?? '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setNuevaPiscina({
          ...nuevaPiscina,
          largo: parseFloat(values.largo),
          ancho: parseFloat(values.ancho),
          profundidad: parseFloat(values.profundidad),
          volumen: parseFloat(values.volumen),
          desbordante: values.desbordante,
          volumenTC: values.desbordante ? parseFloat(values.volumenTC) : 0,
        });
        onNext();
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
      }) => {
        const calcularVolumen = () => {
          const { largo, ancho, profundidad } = values;
          if (largo && ancho && profundidad) {
            const largoNum = parseFloat(largo);
            const anchoNum = parseFloat(ancho);
            const profundidadNum = parseFloat(profundidad);
            if (
              !isNaN(largoNum) &&
              !isNaN(anchoNum) &&
              !isNaN(profundidadNum)
            ) {
              const volumenNum = largoNum * anchoNum * profundidadNum;
              setFieldValue('volumen', volumenNum.toString());
            }
          }
        };
        return (
          <View className="py-5">
            <View className="flex-row items-center justify-between">
              <Text className="font-geist-semi-bold text-text text-xl">
                Configuración de la piscina
              </Text>
              <PasosFormulario paso={2} />
            </View>
            <Pressable
              onPress={() => setFieldValue('desbordante', !values.desbordante)}
              className="flex-row items-center mt-3"
            >
              <Checkbox
                value={values.desbordante}
                onValueChange={() =>
                  setFieldValue('desbordante', !values.desbordante)
                }
                color={values.desbordante ? '#0F0D23' : undefined}
              />
              <View className="ml-2">
                <Text className="font-geist text-text text-base">
                  Piscina desbordante
                </Text>
                <Text className="font-geist-light text-text text-sm">
                  Pisicina de tipo desbordante o infinity
                </Text>
              </View>
            </Pressable>

            <Text className="font-geist text-text text-base mt-3">
              Largo (m)
            </Text>
            <TextInput
              className="border border-gray-200 rounded-md py-4 px-3"
              value={values.largo}
              onChangeText={handleChange('largo')}
              onBlur={handleBlur('largo')}
              keyboardType="numeric"
              placeholder="Ej: 10"
            />
            {touched.largo && errors.largo && (
              <Text className="text-red-500 mt-2">{errors.largo}</Text>
            )}

            <Text className="font-geist text-text text-base mt-3">
              Ancho (m)
            </Text>
            <TextInput
              className="border border-gray-200 rounded-md py-4 px-3"
              value={values.ancho}
              onChangeText={handleChange('ancho')}
              onBlur={handleBlur('ancho')}
              keyboardType="numeric"
              placeholder="Ej: 5"
            />
            {touched.ancho && errors.ancho && (
              <Text className="text-red-500 mt-2">{errors.ancho}</Text>
            )}

            <Text className="font-geist text-text text-base mt-3">
              Profundidad (m)
            </Text>
            <TextInput
              className="border border-gray-200 rounded-md py-4 px-3"
              value={values.profundidad}
              onChangeText={handleChange('profundidad')}
              onBlur={handleBlur('profundidad')}
              keyboardType="numeric"
              placeholder="Ej: 1.5"
            />
            {touched.profundidad && errors.profundidad && (
              <Text className="text-red-500 mt-2">{errors.profundidad}</Text>
            )}

            <View className="flex-row items-center justify-between mt-3 mb-1.5">
              <Text className="font-geist text-text text-base">
                Volumen (m³)
              </Text>
              <Pressable
                className="p-2 border border-gray-200 rounded-md flex-row items-center justify-center"
                onPress={() => calcularVolumen()}
              >
                <CalculatorIcon />
                <Text>Calcular</Text>
              </Pressable>
            </View>

            <TextInput
              className="border border-gray-200 rounded-md py-4 px-3"
              value={values.volumen}
              onChangeText={handleChange('volumen')}
              onBlur={handleBlur('volumen')}
              keyboardType="numeric"
              placeholder="Ej: 75"
            />
            {touched.volumen && errors.volumen && (
              <Text className="text-red-500 mt-2">{errors.volumen}</Text>
            )}
            {values.desbordante && (
              <>
                <Text className="font-geist text-text text-base mt-3">
                  Volumen T.C. (m³)
                </Text>
                <TextInput
                  className="border border-gray-200 rounded-md py-4 px-3"
                  value={values.volumenTC}
                  onChangeText={handleChange('volumenTC')}
                  onBlur={handleBlur('volumenTC')}
                  keyboardType="numeric"
                  placeholder="Ej: 15"
                />
                {touched.volumenTC && errors.volumenTC && (
                  <Text className="text-red-500 mt-2">{errors.volumenTC}</Text>
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

export default ConfiguracionPiscina;

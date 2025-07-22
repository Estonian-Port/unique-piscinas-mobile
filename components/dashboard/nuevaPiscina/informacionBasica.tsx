import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { users } from '@/data/mock/userMock';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import { PiscinaNueva } from '@/data/domain/piscina';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  direccion: Yup.string().required('La dirección es obligatoria'),
  ciudad: Yup.string().required('La ciudad es obligatoria'),
  notas: Yup.string().max(100, 'Máximo 100 caracteres'),
});

const InformacionBasica = ({
  onCancel,
  onNext,
  nuevaPiscina,
  setNuevaPiscina,
}: {
  onCancel: () => void;
  onNext: () => void;
  nuevaPiscina: PiscinaNueva;
  setNuevaPiscina: (piscina: PiscinaNueva) => void;
}) => {
  const usuarios = users.filter((user) => user.isAdmin === false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Asignar propietario más tarde', value: 0 },
    ...usuarios.map((usuario) => ({
      label: usuario.name + ' ' + usuario.lastname,
      value: usuario.id,
    })),
  ]);

  return (
    <Formik
      initialValues={{
        nombre: nuevaPiscina.nombre,
        direccion: nuevaPiscina.direccion,
        ciudad: nuevaPiscina.ciudad,
        notas: nuevaPiscina.notas ?? '',
        administradorId: nuevaPiscina.administradorId ?? undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setNuevaPiscina({
          ...nuevaPiscina,
          nombre: values.nombre,
          direccion: values.direccion,
          ciudad: values.ciudad,
          notas: values.notas,
          administradorId: values.administradorId,
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
      }) => (
        <View className="py-5">
          <View className="flex-row items-center justify-between">
            <Text className="font-geist-semi-bold text-text text-xl">
              Información Básica
            </Text>
            <PasosFormulario paso={1} />
          </View>
          <Text className="font-geist text-text text-base mt-3">
            Nombre de la piscina
          </Text>
          <TextInput
            className="border border-gray-200 rounded-md py-4 px-3"
            value={values.nombre}
            onChangeText={handleChange('nombre')}
            onBlur={handleBlur('nombre')}
            placeholder="Ej: Piscina Principal"
          />
          {touched.nombre && errors.nombre && (
            <Text className="text-red-500 mt-2">{errors.nombre}</Text>
          )}

          <Text className="font-geist text-text text-base mt-3">
            Propietario
          </Text>
          <DropDownPicker
            open={open}
            value={values.administradorId}
            items={items}
            setOpen={setOpen}
            setValue={(callback) => {
              const val = callback(values.administradorId);
              setFieldValue('administradorId', val);
            }}
            setItems={setItems}
            placeholder="Seleccione un propietario"
            style={{ borderColor: '#e5e7eb' }}
            dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
          />

          <Text className="font-geist text-text text-base mt-3">Dirección</Text>
          <TextInput
            className="border border-gray-200 rounded-md py-4 px-3"
            value={values.direccion}
            onChangeText={handleChange('direccion')}
            onBlur={handleBlur('direccion')}
            placeholder="Ej: Av San Martin 1234"
          />
          {touched.direccion && errors.direccion && (
            <Text className="text-red-500 mt-2">{errors.direccion}</Text>
          )}

          <Text className="font-geist text-text text-base mt-3">Ciudad</Text>
          <TextInput
            className="border border-gray-200 rounded-md py-4 px-3"
            value={values.ciudad}
            onChangeText={handleChange('ciudad')}
            onBlur={handleBlur('ciudad')}
            placeholder="Ej: Buenos Aires"
          />
          {touched.ciudad && errors.ciudad && (
            <Text className="text-red-500 mt-2">{errors.ciudad}</Text>
          )}

          <Text className="font-geist text-text text-base mt-3">
            Notas adicionales
          </Text>
          <TextInput
            className="border border-gray-200 rounded-md px-3 h-40"
            value={values.notas}
            onChangeText={handleChange('notas')}
            onBlur={handleBlur('notas')}
            placeholder="Alguna información adicional que quieras agregar..."
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
          {touched.notas && errors.notas && (
            <Text className="text-red-500">{errors.notas}</Text>
          )}

          <View className="flex-row items-center justify-center gap-1 mt-5">
            <Link asChild href="/dashboard">
              <Pressable
                onPress={onCancel}
                className="border border-gray-200 rounded-md p-2 items-center justify-center w-1/3"
              >
                <Text className="text-text font-geist text-base">Cancelar</Text>
              </Pressable>
            </Link>
            <Pressable
              onPress={handleSubmit as any}
              className="border border-gray-200 rounded-md p-2 items-center justify-center bg-purple-unique w-1/3"
            >
              <Text className="text-white text-base font-geist">Siguiente</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default InformacionBasica;

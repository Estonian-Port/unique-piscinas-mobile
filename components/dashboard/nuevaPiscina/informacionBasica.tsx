import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState, useRef } from 'react';
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
  administradorId: Yup.number().nullable(),
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
  const formikRef = useRef<any>(null);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Asignar propietario más tarde', value: null },
    ...usuarios.map((usuario) => ({
      label: usuario.name + ' ' + usuario.lastname,
      value: usuario.id,
    })),
  ]);

  // Función para obtener los valores iniciales basados en el estado actual de nuevaPiscina
  const getInitialValues = () => {
    return {
      nombre: nuevaPiscina.nombre ?? '',
      direccion: nuevaPiscina.direccion ?? '',
      ciudad: nuevaPiscina.ciudad ?? '',
      notas: nuevaPiscina.notas ?? '',
      administradorId: nuevaPiscina.administradorId ?? null,
    };
  };

  const initialValues = getInitialValues();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
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
            className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
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
            placeholder="Asignar un propietario más tarde"
            zIndex={3000}
            zIndexInverse={1000}
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

          <Text className="font-geist text-text text-base mt-3">Dirección</Text>
          <TextInput
            className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
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
            className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
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
            className="border-2 bg-white border-gray-300 rounded-md px-3 h-40"
            value={values.notas}
            onChangeText={handleChange('notas')}
            onBlur={handleBlur('notas')}
            placeholder="Alguna información adicional que quieras agregar..."
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
          {touched.notas && errors.notas && (
            <Text className="text-red-500 mt-2">{errors.notas}</Text>
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

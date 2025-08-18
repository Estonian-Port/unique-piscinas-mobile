import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from 'react-native';
import { Filtro, Piscina, PiscinaNueva } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  direccion: Yup.string().required('La dirección es obligatoria'),
  ciudad: Yup.string().required('La ciudad es obligatoria'),
  administradorId: Yup.number().nullable(),
});

const ModalEditarInfoGeneral = ({
  visible,
  onClose,
  pool,
  onSave, // Nueva prop
}: {
  visible: boolean;
  onClose: () => void;
  pool: PiscinaNueva;
  onSave: (poolEditado: PiscinaNueva) => void;
}) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Formik
        initialValues={{
          nombre: pool.nombre,
          direccion: pool.direccion,
          ciudad: pool.ciudad,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave({
            ...pool,
            nombre: values.nombre,
            direccion: values.direccion,
            ciudad: values.ciudad,
          });
          onClose();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white p-6 rounded-lg w-4/5 max-w-md">
                <Text className="text-lg font-geist-semi-bold text-text mb-4">
                  Editar Información General
                </Text>

                <Text className="font-geist text-text text-base mt-3">
                  Nombre
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={pool.nombre}
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  placeholder="Ej: Piscina Principal"
                />
                {errors.nombre && touched.nombre && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.nombre}
                  </Text>
                )}

                <Text className="font-geist text-text text-base mt-3">
                  Dirección
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={pool.direccion}
                  onChangeText={handleChange('direccion')}
                  onBlur={handleBlur('direccion')}
                  placeholder="Ej: Calle Falsa 123"
                />
                {errors.direccion && touched.direccion && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.direccion}
                  </Text>
                )}

                <Text className="font-geist text-text text-base mt-3">
                  Ciudad
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={pool.ciudad}
                  onChangeText={handleChange('ciudad')}
                  onBlur={handleBlur('ciudad')}
                  placeholder="Ej: Ciudad de México"
                />
                {errors.ciudad && touched.ciudad && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.ciudad}
                  </Text>
                )}

                <View className="flex-row justify-between gap-3 mt-3">
                  <Pressable
                    onPress={onClose}
                    className="bg-gray-400 rounded-lg flex-1 items-center justify-center h-12"
                  >
                    <Text className="text-white text-center font-geist-semi-bold">
                      Cancelar
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={handleSubmit as any}
                    className="bg-purple-unique rounded-lg flex-1 items-center justify-center h-12"
                  >
                    <View className="flex-row items-center justify-center">
                      <Text className="text-white text-center font-geist-semi-bold ml-2">
                        Guardar cambios
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalEditarInfoGeneral;

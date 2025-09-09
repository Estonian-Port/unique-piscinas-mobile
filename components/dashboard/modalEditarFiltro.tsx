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
import DropDownPicker from 'react-native-dropdown-picker';
import { Filtro } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import RadioButton from '../utiles/radioButton';

export type TipoFiltro = 'Arena' | 'Vidrio' | 'Cartucho';

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
  datoExtra: Yup.number()
        .required('Este campo es obligatorio para este tipo de filtro')
        .typeError('El valor debe ser un número')
        .min(0.1, 'El valor debe ser mayor que 0'),
});

const ModalEditarFiltro = ({
  visible,
  onClose,
  filtro,
  onSave, // Nueva prop
}: {
  visible: boolean;
  onClose: () => void;
  filtro: Filtro;
  onSave: (filtroEditado: Filtro) => void;
}) => {
  const [openMarcaFiltro, setOpenMarcaFiltro] = useState(false);
  const [openModeloFiltro, setOpenModeloFiltro] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Formik
        initialValues={{
          tipoFiltro: filtro.tipo,
          marcaFiltro: filtro.marca,
          modeloFiltro: filtro.modelo,
          diametro: filtro.diametro,
          datoExtra: filtro.datoExtra,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave({
            ...filtro,
            tipo: values.tipoFiltro,
            marca: values.marcaFiltro,
            modelo: values.modeloFiltro,
            diametro: values.diametro,
            datoExtra: values.datoExtra,
          });
          onClose();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          setFieldTouched,
          errors,
          touched,
          dirty,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white p-6 rounded-lg w-4/5 max-w-md">
                <Text className="text-lg font-geist-semi-bold text-text mb-4">
                  Editar Filtro
                </Text>

                <Text className="font-geist text-text text-base mt-3">
                  Tipo
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

                {touched.tipoFiltro && errors.tipoFiltro && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.tipoFiltro}
                  </Text>
                )}

                <Text className="font-geist text-text text-base mt-3">
                  Marca
                </Text>
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

                <Text className="font-geist text-text text-base mt-3">
                  Modelo
                </Text>
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
                  value={values.diametro.toString()}
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

                <Text className="font-geist text-text text-base mt-3">
                  {values.tipoFiltro === 'Arena'
                    ? 'Cantidad de arena (kg)'
                    : values.tipoFiltro === 'Vidrio'
                    ? 'Cantidad de vidrio (kg)'
                    : 'Micras del cartucho'}
                </Text>
                <TextInput
                  className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
                  value={values.datoExtra ? values.datoExtra.toString() : ''}
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
                    className={`bg-purple-unique rounded-lg flex-1 items-center justify-center h-12 ${
                      !dirty ? 'opacity-50' : ''
                    }`}
                    disabled={!dirty}
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

export default ModalEditarFiltro;

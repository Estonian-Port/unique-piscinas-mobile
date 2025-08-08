import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Switch,
} from 'react-native';
import { SaveIcon } from '@/assets/icons';
import { Cicle, Day, ModeCicle } from '@/data/domain/cicloFiltrado';
import TimeInput from '../utiles/timeInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { Bomba } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';

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
  marcaBomba: Yup.string().required('Seleccione una marca de bomba'),
  modeloBomba: Yup.string().required('Seleccione un modelo de bomba'),
  potenciaCV: Yup.number()
    .required('Ingrese la potencia en CV')
    .typeError('La potencia debe ser un número')
    .min(1, 'La potencia debe ser mayor que 0'),
});

const ModalEditarBomba = ({
  visible,
  onClose,
  bomba,
  onSave, // Nueva prop
}: {
  visible: boolean;
  onClose: () => void;
  bomba: Bomba;
  onSave: (bombaEditada: Bomba) => void;
}) => {
  const [openMarcaBomba, setOpenMarcaBomba] = useState(false);
  const [openModeloBomba, setOpenModeloBomba] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Formik
        initialValues={{
          marcaBomba: bomba.marca,
          modeloBomba: bomba.modelo,
          potenciaCV: bomba.potencia,
          velocidadVariable: bomba.esVelocidadVariable ?? false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave({
            ...bomba,
            marca: values.marcaBomba,
            modelo: values.modeloBomba,
            potencia: values.potenciaCV,
            esVelocidadVariable: values.velocidadVariable,
          });
          onClose();
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
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
                  Editar Bomba
                </Text>

                <Text className="font-geist text-text text-base mt-3">
                  Marca
                </Text>

                <DropDownPicker
                  open={openMarcaBomba}
                  value={values.marcaBomba}
                  items={marcasBomba.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                  setOpen={setOpenMarcaBomba}
                  setValue={(callback) => {
                    const val = callback(values.marcaBomba);
                    setFieldValue('marcaBomba', val);
                  }}
                  placeholder="Seleccione una marca"
                  zIndex={4000}
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
                {errors.marcaBomba && touched.marcaBomba && (
                  <Text className="text-red-500">{errors.marcaBomba}</Text>
                )}

                <Text className="font-geist text-text text-base mt-3">
                  Modelo
                </Text>

                <DropDownPicker
                  open={openModeloBomba}
                  value={values.modeloBomba}
                  items={modelosBomba.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                  setOpen={setOpenModeloBomba}
                  setValue={(callback) => {
                    const val = callback(values.modeloBomba);
                    setFieldValue('modeloBomba', val);
                  }}
                  placeholder="Seleccione un modelo"
                  zIndex={4000}
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
                {errors.modeloBomba && touched.modeloBomba && (
                  <Text className="text-red-500">{errors.modeloBomba}</Text>
                )}

                <Text className="font-geist text-text text-base mt-3">
                  Potencia
                </Text>

                <TextInput
                  className="border border-gray-300 rounded-md p-2 mb-4"
                  placeholder="Potencia en CV"
                  keyboardType="numeric"
                  onChangeText={handleChange('potenciaCV')}
                  value={String(values.potenciaCV)}
                />
                {errors.potenciaCV && touched.potenciaCV && (
                  <Text className="text-red-500">{errors.potenciaCV}</Text>
                )}

                <View className="flex-row items-center mt-4">
                  <Checkbox
                    value={values.velocidadVariable}
                    onValueChange={(value) => {
                      setFieldValue('velocidadVariable', value);
                    }}
                    color={
                      values.velocidadVariable ? '#0F0D23' : undefined
                    }
                  />
                  <Pressable
                    onPress={() =>
                      setFieldValue(
                        'velocidadVariable',
                        !values.velocidadVariable
                      )
                    }
                    className="ml-2"
                  >
                    <Text className="font-geist text-text text-base">
                      Es velocidad variable
                    </Text>
                  </Pressable>
                </View>

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

export default ModalEditarBomba;

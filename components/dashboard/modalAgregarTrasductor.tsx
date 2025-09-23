import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { GermicidaNuevo, PiscinaEquipos } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { marcasTrasductor } from './modalEditarGermicida';
import { piscinaService } from '@/services/piscina.service';
import Toast from 'react-native-toast-message';
import { Activity } from 'react-native-feather';

const validationSchema = Yup.object().shape({
  trasductorMarca: Yup.string().required('Seleccione una marca del trasductor'),
  trasductorPotencia: Yup.number()
    .required('Ingrese la potencia del trasductor')
    .typeError('La potencia debe ser un número')
    .min(1, 'La potencia debe ser mayor que 0'),
  trasductorTiempoVidaUtil: Yup.number()
    .required('Ingrese el tiempo de vida útil del trasductor')
    .typeError('El tiempo de vida útil debe ser un número')
    .min(1, 'El tiempo de vida útil debe ser mayor que 0'),
});

const ModalAgregarTrasductor = ({
  visible,
  onClose,
  piscina,
  actualizarPiscina,
}: {
  visible: boolean;
  onClose: () => void;
  piscina: PiscinaEquipos;
  actualizarPiscina: () => void;
}) => {
  const [openMarcaTrasductor, setOpenMarcaTrasductor] = useState(false);

  const sistemaGermicida = piscina.sistemasGermicidas || [];
  const trasductorExistente = sistemaGermicida.find(
    (s) => s.tipo === 'trasductor'
  );

  const handleNewTrasductor = async (newTrasductor: GermicidaNuevo) => {
    try {
      const response = await piscinaService.addGermicida(piscina.id, newTrasductor);
      actualizarPiscina(); // Actualiza la piscina después de agregar el germicida
      Toast.show({
        type: 'success',
        text1: 'Trasductor agregado',
        text2: response.message || 'El trasductor se ha agregado correctamente.',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Hubo un problema al agregar el trasductor. Inténtelo de nuevo.',
        position: 'bottom',
      });
      console.error('Error adding trasductor:', error);
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Formik
        initialValues={{
          trasductorMarca: trasductorExistente?.marca ?? '',
          trasductorPotencia: trasductorExistente?.datoExtra
            ? trasductorExistente.datoExtra.toString()
            : '',
          trasductorTiempoVidaUtil:
            trasductorExistente?.vidaRestante.toString() ?? '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const nuevoTrasductor: GermicidaNuevo = {
            id: null,
            tipo: 'TRASDUCTOR',
            marca: values.trasductorMarca,
            datoExtra: Number(values.trasductorPotencia),
            tiempoVidaUtil: Number(values.trasductorTiempoVidaUtil),
            activa: true,
          };
          handleNewTrasductor(nuevoTrasductor);
          onClose();
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
        }) => {
          return (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-6 rounded-lg w-4/5 max-w-md">
                  <Text className="text-lg font-geist-semi-bold text-text mb-4">
                    Agregar Germicida
                  </Text>
                  <View className="items-center justify-between">
                    <View className="flex-row items-center">
                      <Activity height={18} width={18} color={'blue'} />
                      <Text className="text-text text-base font-geist ml-1">
                        Trasductor de ultrasonido
                      </Text>
                    </View>
                    <View className="items-start w-4/5 my-2">
                      <Text className="text-text text-sm font-geist">
                        Marca
                      </Text>
                      <DropDownPicker
                        open={openMarcaTrasductor}
                        value={values.trasductorMarca}
                        items={marcasTrasductor.map((item) => ({
                          label: item.name,
                          value: item.name, // Cambiado para consistencia
                        }))}
                        setOpen={setOpenMarcaTrasductor}
                        setValue={(callback) => {
                          const val = callback(values.trasductorMarca);
                          setFieldValue('trasductorMarca', val);
                          setFieldTouched('trasductorMarca', true);
                        }}
                        placeholder="Seleccione una marca"
                        zIndex={1000}
                        zIndexInverse={3000}
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
                      {errors.trasductorMarca && touched.trasductorMarca && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.trasductorMarca}
                        </Text>
                      )}
                      <View className="items-start w-full mt-2">
                        <Text className="text-text text-sm font-geist">
                          Potencia (W)
                        </Text>
                        <TextInput
                          className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                          value={values.trasductorPotencia}
                          onChangeText={handleChange('trasductorPotencia')}
                          onBlur={handleBlur('trasductorPotencia')}
                          keyboardType="numeric"
                          placeholder="Ej: 15"
                        />
                        {errors.trasductorPotencia &&
                          touched.trasductorPotencia && (
                            <Text className="text-red-500 text-xs mt-1">
                              {errors.trasductorPotencia}
                            </Text>
                          )}
                      </View>
                      <View className="items-start w-full mt-2">
                        <Text className="text-text text-sm font-geist">
                          Tiempo de vida útil en horas
                        </Text>
                        <TextInput
                          className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                          value={values.trasductorTiempoVidaUtil}
                          onChangeText={handleChange(
                            'trasductorTiempoVidaUtil'
                          )}
                          onBlur={handleBlur('trasductorTiempoVidaUtil')}
                          keyboardType="numeric"
                          placeholder="Ej: 150"
                        />
                        {errors.trasductorTiempoVidaUtil &&
                          touched.trasductorTiempoVidaUtil && (
                            <Text className="text-red-500 text-xs mt-1">
                              {errors.trasductorTiempoVidaUtil}
                            </Text>
                          )}
                      </View>
                    </View>
                  </View>

                  <View className="flex-row justify-between gap-3 mt-3">
                    <Pressable
                      onPress={onClose}
                      className="bg-gray-400 rounded-lg flex-1 items-center justify-center h-12"
                    >
                      <Text className="text-text text-center font-geist-semi-bold">
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
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ModalAgregarTrasductor;

import {
  View,
  Text,
  Switch,
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
import { LightIcon, ThunderIcon, WavesIcon } from '@/assets/icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { marcasIonizador } from './modalEditarGermicida';
import { piscinaService } from '@/services/piscina.service';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  ionizadorMarca: Yup.string().required('Seleccione una marca de ionizador'),
  ionizadorElectrodos: Yup.number()
    .required('Ingrese la cantidad de electrodos')
    .typeError('La cantidad de electrodos debe ser un número')
    .min(1, 'La cantidad de electrodos debe ser mayor que 0'),
  ionizadorTiempoVidaUtil: Yup.number()
    .required('Ingrese el tiempo de vida útil del ionizador')
    .typeError('El tiempo de vida útil debe ser un número')
    .min(1, 'El tiempo de vida útil debe ser mayor que 0'),
});

const ModalAgregarIonizador = ({
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
  const [openMarcaIonizador, setOpenMarcaIonizador] = useState(false);

  const sistemaGermicida = piscina.sistemasGermicidas || [];
  const ionizadorExistente = sistemaGermicida.find(
    (s) => s.tipo === 'ionizador'
  );

  const handleNewIonizador = async (newIonizador: GermicidaNuevo) => {
    try {
      const response = await piscinaService.addGermicida(
        piscina.id,
        newIonizador
      );
      actualizarPiscina(); // Actualiza la piscina después de agregar el germicida
      Toast.show({
        type: 'success',
        text1: 'Ionizador agregado',
        text2: response.message || 'El ionizador se ha agregado correctamente.',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Hubo un problema al agregar el ionizador. Inténtelo de nuevo.',
        position: 'bottom',
      });
      console.error('Error adding ionizador:', error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Formik
        initialValues={{
          ionizadorMarca: ionizadorExistente?.marca ?? '',
          ionizadorElectrodos: ionizadorExistente?.datoExtra
            ? ionizadorExistente.datoExtra.toString()
            : '',
          ionizadorTiempoVidaUtil:
            ionizadorExistente?.vidaRestante.toString() ?? '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const newIonizador: GermicidaNuevo = {
            id: null,
            tipo: 'IONIZADOR',
            marca: values.ionizadorMarca,
            datoExtra: Number(values.ionizadorElectrodos),
            tiempoVidaUtil: Number(values.ionizadorTiempoVidaUtil),
            activa: true,
          };
          handleNewIonizador(newIonizador);
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
                      <LightIcon size={18} color={'orange'} />
                      <Text className="text-text text-base font-geist ml-1">
                        Ionizador de cobre
                      </Text>
                    </View>

                    <View className="items-start w-4/5">
                      <Text className="text-text text-sm font-geist">
                        Marca
                      </Text>
                      <DropDownPicker
                        open={openMarcaIonizador}
                        value={values.ionizadorMarca}
                        items={marcasIonizador.map((item) => ({
                          label: item.name,
                          value: item.name, // Cambiado para consistencia
                        }))}
                        setOpen={setOpenMarcaIonizador}
                        setValue={(callback) => {
                          const val = callback(values.ionizadorMarca);
                          setFieldValue('ionizadorMarca', val);
                          setFieldTouched('ionizadorMarca', true);
                        }}
                        placeholder="Seleccione una marca"
                        zIndex={2000}
                        zIndexInverse={2000}
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
                      {errors.ionizadorMarca && touched.ionizadorMarca && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.ionizadorMarca}
                        </Text>
                      )}
                      <View className="items-start w-full mt-2">
                        <Text className="text-text text-sm font-geist">
                          Electrodos
                        </Text>
                        <TextInput
                          className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                          value={values.ionizadorElectrodos}
                          onChangeText={handleChange('ionizadorElectrodos')}
                          onBlur={handleBlur('ionizadorElectrodos')}
                          keyboardType="numeric"
                          placeholder="Ej: 15"
                        />
                        {errors.ionizadorElectrodos &&
                          touched.ionizadorElectrodos && (
                            <Text className="text-red-500 text-xs mt-1">
                              {errors.ionizadorElectrodos}
                            </Text>
                          )}
                      </View>
                      <View className="items-start w-full mt-2">
                        <Text className="text-text text-sm font-geist">
                          Tiempo de vida útil en horas
                        </Text>
                        <TextInput
                          className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                          value={values.ionizadorTiempoVidaUtil}
                          onChangeText={handleChange('ionizadorTiempoVidaUtil')}
                          onBlur={handleBlur('ionizadorTiempoVidaUtil')}
                          keyboardType="numeric"
                          placeholder="Ej: 150"
                        />
                        {errors.ionizadorTiempoVidaUtil &&
                          touched.ionizadorTiempoVidaUtil && (
                            <Text className="text-red-500 text-xs mt-1">
                              {errors.ionizadorTiempoVidaUtil}
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

export default ModalAgregarIonizador;

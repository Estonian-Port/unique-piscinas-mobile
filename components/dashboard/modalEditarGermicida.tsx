import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Germicida } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LightIcon, ThunderIcon, WavesIcon } from '@/assets/icons';

export const marcasUV = [
  { id: 1, name: 'Astral' },
  { id: 2, name: 'Hayward' },
  { id: 3, name: 'Otra' },
];

export const marcasIonizador = [
  { id: 1, name: 'Copper Ionizer' },
  { id: 2, name: 'Otra' },
];

export const marcasTrasductor = [
  { id: 1, name: 'Sonic Wave' },
  { id: 2, name: 'Otra' },
];

const validationSchema = Yup.object().shape({
  uvMarca: Yup.string().when('uvSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de lámpara UV'),
    otherwise: (schema) => schema.notRequired(),
  }),
  uvPotencia: Yup.number().when('uvSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ionizadorMarca: Yup.string().when('ionizadorSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca de ionizador'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ionizadorElectrodos: Yup.number().when('ionizadorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la cantidad de electrodos')
        .typeError('La cantidad de electrodos debe ser un número')
        .min(1, 'La cantidad de electrodos debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  trasductorMarca: Yup.string().when('trasductorSwitch', {
    is: true,
    then: (schema) => schema.required('Seleccione una marca del trasductor'),
    otherwise: (schema) => schema.notRequired(),
  }),
  trasductorPotencia: Yup.number().when('trasductorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese la potencia del trasductor')
        .typeError('La potencia debe ser un número')
        .min(1, 'La potencia debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  trasductorTiempoVidaUtil: Yup.number().when('trasductorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese el tiempo de vida útil del trasductor')
        .typeError('El tiempo de vida útil debe ser un número')
        .min(1, 'El tiempo de vida útil debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ionizadorTiempoVidaUtil: Yup.number().when('ionizadorSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese el tiempo de vida útil del ionizador')
        .typeError('El tiempo de vida útil debe ser un número')
        .min(1, 'El tiempo de vida útil debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  uvTiempoVidaUtil: Yup.number().when('uvSwitch', {
    is: true,
    then: (schema) =>
      schema
        .required('Ingrese el tiempo de vida útil del UV')
        .typeError('El tiempo de vida útil debe ser un número')
        .min(1, 'El tiempo de vida útil debe ser mayor que 0'),
    otherwise: (schema) => schema.notRequired(),
  }),
  // Campos para los switches
  cloradorSalino: Yup.boolean(),
  controlPh: Yup.boolean(),
  controlOrp: Yup.boolean(),
  uvSwitch: Yup.boolean(),
  ionizadorSwitch: Yup.boolean(),
  trasductorSwitch: Yup.boolean(),
});

const ModalEditarGermicida = ({
  visible,
  onClose,
  germicida,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  germicida: Germicida;
  onSave: (germicidaEditado: Germicida) => void;
}) => {
  const [openMarcaUV, setOpenMarcaUV] = useState(false);
  const [openMarcaIonizador, setOpenMarcaIonizador] = useState(false);
  const [openMarcaTrasductor, setOpenMarcaTrasductor] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Formik
        initialValues={{
          tipo: germicida.tipo,
          marca: germicida.marca,
          vidaRestante: germicida.vidaRestante,
          activo: germicida.activo,
          estado: germicida.estado,
          datoExtra: germicida.datoExtra,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave({
            ...germicida,
            tipo: values.tipo,
            marca: values.marca,
            vidaRestante: values.vidaRestante,
            activo: values.activo,
            estado: values.estado,
            datoExtra: values.datoExtra,
          });
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
          dirty,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white p-6 rounded-lg w-4/5 max-w-md">
                <Text className="font-geist-semi-bold text-text text-lg mb-3">
                  Editar sistema germicida - {germicida.tipo}
                </Text>
                {germicida.tipo === 'UV' && (
                  <>
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaUV}
                      value={values.marca}
                      items={marcasUV.map((item) => ({
                        label: item.name,
                        value: item.name, // Cambiado para consistencia
                      }))}
                      setOpen={setOpenMarcaUV}
                      setValue={(callback) => {
                        const val = callback(values.marca);
                        setFieldValue('marca', val);
                        setFieldTouched('marca', true);
                      }}
                      placeholder="Seleccione una marca"
                      zIndex={3000}
                      zIndexInverse={1000}
                      onOpen={() => {
                        setOpenMarcaIonizador(false);
                        setOpenMarcaTrasductor(false);
                      }}
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
                    {errors.marca && touched.marca && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors.marca}
                      </Text>
                    )}
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Potencia (W)
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.datoExtra.toString()}
                        onChangeText={handleChange('datoExtra')}
                        onBlur={handleBlur('datoExtra')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      />
                      {errors.datoExtra && touched.datoExtra && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.datoExtra}
                        </Text>
                      )}
                    </View>
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Tiempo de vida útil en horas
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.vidaRestante.toString()}
                        onChangeText={handleChange('vidaRestante')}
                        onBlur={handleBlur('vidaRestante')}
                        keyboardType="numeric"
                        placeholder="Ej: 150"
                      />
                      {errors.vidaRestante && touched.vidaRestante && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.vidaRestante}
                        </Text>
                      )}
                    </View>
                  </>
                )}

                {germicida.tipo === 'Ionizador' && (
                  <>
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaIonizador}
                      value={values.marca}
                      items={marcasIonizador.map((item) => ({
                        label: item.name,
                        value: item.name, // Cambiado para consistencia
                      }))}
                      setOpen={setOpenMarcaIonizador}
                      setValue={(callback) => {
                        const val = callback(values.marca);
                        setFieldValue('marca', val);
                        setFieldTouched('marca', true);
                      }}
                      placeholder="Seleccione una marca"
                      zIndex={2000}
                      zIndexInverse={2000}
                      onOpen={() => {
                        setOpenMarcaUV(false);
                        setOpenMarcaTrasductor(false);
                      }}
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
                    {errors.marca && touched.marca && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors.marca}
                      </Text>
                    )}
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Electrodos
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.datoExtra.toString()}
                        onChangeText={handleChange('datoExtra')}
                        onBlur={handleBlur('datoExtra')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      />
                      {errors.datoExtra && touched.datoExtra && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.datoExtra}
                        </Text>
                      )}
                    </View>
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Tiempo de vida útil en horas
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.vidaRestante.toString()}
                        onChangeText={handleChange('vidaRestante')}
                        onBlur={handleBlur('vidaRestante')}
                        keyboardType="numeric"
                        placeholder="Ej: 150"
                      />
                      {errors.vidaRestante && touched.vidaRestante && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.vidaRestante}
                        </Text>
                      )}
                    </View>
                  </>
                )}

                {germicida.tipo === 'Trasductor' && (
                  <>
                    <Text className="text-text text-sm font-geist">Marca</Text>
                    <DropDownPicker
                      open={openMarcaTrasductor}
                      value={values.marca}
                      items={marcasTrasductor.map((item) => ({
                        label: item.name,
                        value: item.name, // Cambiado para consistencia
                      }))}
                      setOpen={setOpenMarcaTrasductor}
                      setValue={(callback) => {
                        const val = callback(values.marca);
                        setFieldValue('marca', val);
                        setFieldTouched('marca', true);
                      }}
                      placeholder="Seleccione una marca"
                      zIndex={1000}
                      zIndexInverse={3000}
                      onOpen={() => {
                        setOpenMarcaUV(false);
                        setOpenMarcaIonizador(false);
                      }}
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
                    {errors.marca && touched.marca && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors.marca}
                      </Text>
                    )}
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Potencia (W)
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.datoExtra.toString()}
                        onChangeText={handleChange('datoExtra')}
                        onBlur={handleBlur('datoExtra')}
                        keyboardType="numeric"
                        placeholder="Ej: 15"
                      />
                      {errors.datoExtra && touched.datoExtra && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.datoExtra}
                        </Text>
                      )}
                    </View>
                    <View className="items-start w-full mt-2">
                      <Text className="text-text text-sm font-geist">
                        Tiempo de vida útil en horas
                      </Text>
                      <TextInput
                        className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                        value={values.vidaRestante.toString()}
                        onChangeText={handleChange('vidaRestante')}
                        onBlur={handleBlur('vidaRestante')}
                        keyboardType="numeric"
                        placeholder="Ej: 150"
                      />
                      {errors.vidaRestante && touched.vidaRestante && (
                        <Text className="text-red-500 text-xs mt-1">
                          {errors.vidaRestante}
                        </Text>
                      )}
                    </View>
                    </>
                )}

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
                    disabled={!dirty}
                    onPress={handleSubmit as any}
                    className={`bg-purple-unique rounded-lg flex-1 items-center justify-center h-12 ${
                      !dirty ? 'opacity-50' : ''
                    }`}
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

export default ModalEditarGermicida;

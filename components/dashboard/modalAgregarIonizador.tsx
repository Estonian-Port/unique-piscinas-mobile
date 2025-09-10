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
import { PiscinaEquipos } from '@/data/domain/piscina';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LightIcon, ThunderIcon, WavesIcon } from '@/assets/icons';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  marcasIonizador,
  marcasTrasductor,
  marcasUV,
} from './modalEditarGermicida';

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
  const [openMarcaUV, setOpenMarcaUV] = useState(false);
  const [openMarcaIonizador, setOpenMarcaIonizador] = useState(false);
  const [openMarcaTrasductor, setOpenMarcaTrasductor] = useState(false);

  const sistemaGermicida = piscina.sistemasGermicidas || [];
  const tieneUv = sistemaGermicida.some((s) => s.tipo === 'UV');
  const tieneIonizador = sistemaGermicida.some(
    (s) => s.tipo === 'Ionizador de cobre'
  );
  const tieneTrasductor = sistemaGermicida.some(
    (s) => s.tipo === 'Trasductor de ultrasonido'
  );
  const uvExistente = sistemaGermicida.find((s) => s.tipo === 'uv');
  const ionizadorExistente = sistemaGermicida.find(
    (s) => s.tipo === 'ionizador'
  );
  const trasductorExistente = sistemaGermicida.find(
    (s) => s.tipo === 'trasductor'
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Formik
        initialValues={{
          uvSwitch: !!uvExistente,
          uvMarca: uvExistente?.marca ?? '',
          uvPotencia: uvExistente?.datoExtra
            ? uvExistente.datoExtra.toString()
            : '',
          uvTiempoVidaUtil: uvExistente?.vidaRestante.toString() ?? '',
          ionizadorSwitch: !!ionizadorExistente,
          ionizadorMarca: ionizadorExistente?.marca ?? '',
          ionizadorElectrodos: ionizadorExistente?.datoExtra
            ? ionizadorExistente.datoExtra.toString()
            : '',
          ionizadorTiempoVidaUtil:
            ionizadorExistente?.vidaRestante.toString() ?? '',
          trasductorSwitch: !!trasductorExistente,
          trasductorMarca: trasductorExistente?.marca ?? '',
          trasductorPotencia: trasductorExistente?.datoExtra
            ? trasductorExistente.datoExtra.toString()
            : '',
          trasductorTiempoVidaUtil:
            trasductorExistente?.vidaRestante.toString() ?? '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {}}
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
                  {!tieneUv && (
                    <View className="items-center justify-between">
                      <View className="flex-row items-center justify-between w-full py-2">
                        <View className="flex-row items-center">
                          <ThunderIcon size={18} color={'green'} />
                          <Text className="text-text text-base font-geist ml-1">
                            Sistema UV
                          </Text>
                        </View>
                        <Switch
                          trackColor={{ false: '#d3d3d3', true: '#000000' }}
                          thumbColor={values.uvSwitch ? '#fcdb99' : '#ffffff'}
                          ios_backgroundColor="#d3d3d3"
                          onValueChange={(value) => {
                            setFieldValue('uvSwitch', value);
                          }}
                          value={values.uvSwitch}
                        />
                      </View>

                      {values.uvSwitch && (
                        <View className="items-start w-4/5">
                          <Text className="text-text text-sm font-geist">
                            Marca
                          </Text>
                          <DropDownPicker
                            open={openMarcaUV}
                            value={values.uvMarca}
                            items={marcasUV.map((item) => ({
                              label: item.name,
                              value: item.name, // Cambiado para consistencia
                            }))}
                            setOpen={setOpenMarcaUV}
                            setValue={(callback) => {
                              const val = callback(values.uvMarca);
                              setFieldValue('uvMarca', val);
                              setFieldTouched('uvMarca', true);
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
                          {errors.uvMarca && touched.uvMarca && (
                            <Text className="text-red-500 text-xs mt-1">
                              {errors.uvMarca}
                            </Text>
                          )}
                          <View className="items-start w-full mt-2">
                            <Text className="text-text text-sm font-geist">
                              Potencia (W)
                            </Text>
                            <TextInput
                              className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                              value={values.uvPotencia}
                              onChangeText={handleChange('uvPotencia')}
                              onBlur={handleBlur('uvPotencia')}
                              keyboardType="numeric"
                              placeholder="Ej: 15"
                            />
                            {errors.uvPotencia && touched.uvPotencia && (
                              <Text className="text-red-500 text-xs mt-1">
                                {errors.uvPotencia}
                              </Text>
                            )}
                          </View>
                          <View className="items-start w-full mt-2">
                            <Text className="text-text text-sm font-geist">
                              Tiempo de vida útil en horas
                            </Text>
                            <TextInput
                              className="border-2 border-gray-300 rounded-md py-4 px-3 w-full"
                              value={values.uvTiempoVidaUtil}
                              onChangeText={handleChange('uvTiempoVidaUtil')}
                              onBlur={handleBlur('uvTiempoVidaUtil')}
                              keyboardType="numeric"
                              placeholder="Ej: 150"
                            />
                            {errors.uvTiempoVidaUtil &&
                              touched.uvTiempoVidaUtil && (
                                <Text className="text-red-500 text-xs mt-1">
                                  {errors.uvTiempoVidaUtil}
                                </Text>
                              )}
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                  {!tieneIonizador && (
                    <View className="items-center justify-between">
                      <View className="flex-row items-center justify-between w-full py-2">
                        <View className="flex-row items-center">
                          <LightIcon size={18} color={'orange'} />
                          <Text className="text-text text-base font-geist ml-1">
                            Ionizador de cobre
                          </Text>
                        </View>
                        <Switch
                          trackColor={{ false: '#d3d3d3', true: '#000000' }}
                          thumbColor={
                            values.ionizadorSwitch ? '#fcdb99' : '#ffffff'
                          }
                          ios_backgroundColor="#d3d3d3"
                          onValueChange={(value) => {
                            setFieldValue('ionizadorSwitch', value);
                          }}
                          value={values.ionizadorSwitch}
                        />
                      </View>

                      {values.ionizadorSwitch && (
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
                              onChangeText={handleChange(
                                'ionizadorTiempoVidaUtil'
                              )}
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
                      )}
                    </View>
                  )}
                  {!tieneTrasductor && (
                    <View className="items-center justify-between">
                      <View className="flex-row items-center justify-between w-full py-2">
                        <View className="flex-row items-center">
                          <WavesIcon size={18} color={'blue'} />
                          <Text className="text-text text-base font-geist ml-1">
                            Trasductor de ultrasonido
                          </Text>
                        </View>
                        <Switch
                          trackColor={{ false: '#d3d3d3', true: '#000000' }}
                          thumbColor={
                            values.trasductorSwitch ? '#fcdb99' : '#ffffff'
                          }
                          ios_backgroundColor="#d3d3d3"
                          onValueChange={(value) => {
                            setFieldValue('trasductorSwitch', value);
                          }}
                          value={values.trasductorSwitch}
                        />
                      </View>
                      {values.trasductorSwitch && (
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
                          {errors.trasductorMarca &&
                            touched.trasductorMarca && (
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
                      )}
                    </View>
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

import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useRef, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenCard } from '../utiles/ScreenCard';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NuevoUsuario } from '@/data/domain/usuario';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string()
    .email('El correo electrónico es inválido')
    .required('El correo electrónico es obligatorio'),
  celular: Yup.number()
    .typeError('El celular debe ser un número')
    .required('El celular es obligatorio'),
});

const usuarioVacio: NuevoUsuario = {
  nombre: '',
  apellido: '',
  email: '',
  celular: undefined,
};

const NuevoUsuarioForm = () => {
  const formikRef = useRef<any>(null);

  useFocusEffect(
    useCallback(() => {
      // Verificamos que la referencia exista antes de usarla
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    }, [])
  );

  const crearUsuario = async (usuario: NuevoUsuario, formikActions: any) => {
    try {
      // Mostrar que está cargando
      formikActions.setSubmitting(true);

      // await userService.createUser(usuario);
      // Por ahora simulo una operación async
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Usuario creado exitosamente');
      formikActions.resetForm();
    } catch (error) {
      console.error('Error al crear usuario:', error);

      // NO resetear si hay error
      // El usuario mantiene sus datos para poder corregir
    } finally {
      // Quitar el estado de "cargando" siempre
      formikActions.setSubmitting(false);
    }
  };

  // Función para obtener los valores iniciales
  const getInitialValues = () => {
    return {
      nombre: usuarioVacio.nombre,
      apellido: usuarioVacio.apellido,
      email: usuarioVacio.email,
      celular: usuarioVacio.celular,
    };
  };

  const initialValues = getInitialValues();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikActions) => {
        const usuarioNuevo: NuevoUsuario = {
          nombre: values.nombre,
          apellido: values.apellido,
          email: values.email,
          celular: values.celular,
        };

        crearUsuario(usuarioNuevo, formikActions);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <ScreenCard>
          <View>
            <Text className="font-geist-semi-bold text-text text-3xl">
              Nuevo Usuario
            </Text>
            <Text className="font-geist-light text-text text-base">
              Registre un nuevo usuario en el sistema
            </Text>
          </View>

          <Text className="font-geist text-text text-base mt-3">Nombre</Text>
          <TextInput
            className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
            value={values.nombre}
            onChangeText={handleChange('nombre')}
            onBlur={handleBlur('nombre')}
            placeholder="Ej: Juan"
            editable={!isSubmitting} // Deshabilitar si está enviando
          />
          {touched.nombre && errors.nombre && (
            <Text className="text-red-500 mt-2">{errors.nombre}</Text>
          )}

          <Text className="font-geist text-text text-base mt-3">Apellido</Text>
          <TextInput
            className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
            value={values.apellido}
            onChangeText={handleChange('apellido')}
            onBlur={handleBlur('apellido')}
            placeholder="Ej: Pérez"
            editable={!isSubmitting}
          />
          {touched.apellido && errors.apellido && (
            <Text className="text-red-500 mt-2">{errors.apellido}</Text>
          )}

          <Text className="font-geist text-text text-base mt-3">
            Correo electrónico
          </Text>
          <TextInput
            className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isSubmitting}
          />
          {touched.email && errors.email && (
            <Text className="text-red-500 mt-2">{errors.email}</Text>
          )}

          <Text className="font-geist text-text text-base mt-3">Celular</Text>
            <TextInput
            className="border-2 bg-white border-gray-300 rounded-md py-4 px-3"
            value={values.celular ? values.celular.toString() : ''}
            onChangeText={handleChange('celular')}
            onBlur={handleBlur('celular')}
            placeholder="Ej: 123456789"
            keyboardType="phone-pad"
            editable={!isSubmitting}
            />
            {touched.celular && errors.celular && (
            <Text className="text-red-500 mt-2">{errors.celular}</Text>
          )}

          <Text className="font-geist-bold text-text text-base text-center mt-2">
            El password por defecto es "unique". El usuario deberá cambiarlo al
            iniciar sesión por primera vez.
          </Text>

          <Pressable
            className={`rounded-md py-3 mt-4 w-1/2 self-end ${
              isSubmitting
                ? 'bg-gray-400' // Color cuando está cargando
                : 'bg-black' // Color normal
            }`}
            onPress={handleSubmit as any}
            disabled={isSubmitting} // Deshabilitar botón si está enviando
          >
            <Text className="font-geist-semi-bold text-sm text-center text-white">
              {isSubmitting ? 'Creando...' : 'Dar de alta usuario'}
            </Text>
          </Pressable>
        </ScreenCard>
      )}
    </Formik>
  );
};

export default NuevoUsuarioForm;

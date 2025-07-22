import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { users } from '@/data/mock/userMock';
import { Link } from 'expo-router';
import PasosFormulario from './pasosFormulario';
import { PiscinaNueva } from '@/data/domain/piscina';

const InformacionBasica = ({
  onCancel,
  onNext,
  nuevaPiscina
}: {
  onCancel: () => void;
  onNext: () => void;
  nuevaPiscina: PiscinaNueva;
}) => {
  const usuarios = users.filter((user) => user.isAdmin === false);

  const [nombrePiscina, setNombrePiscina] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [notas, setNotas] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    usuarios.map((usuario) => ({
      label: usuario.name + ' ' + usuario.lastname,
      value: usuario.id,
    }))
  );

  return (
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
        value={nombrePiscina}
        onChangeText={(text) => setNombrePiscina(text)}
        placeholder="Ej: Piscina Principal"
      ></TextInput>
      <Text className="font-geist text-text text-base mt-3">Propietario</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Seleccione un propietario"
        style={{ borderColor: '#e5e7eb' }}
        dropDownContainerStyle={{ borderColor: '#e5e7eb' }}
      />
      <Text className="font-geist text-text text-base mt-3">Dirección</Text>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={direccion}
        onChangeText={(text) => setDireccion(text)}
        placeholder="Ej: Av San Martin 1234"
      ></TextInput>
      <Text className="font-geist text-text text-base mt-3">Ciudad</Text>
      <TextInput
        className="border border-gray-200 rounded-md py-4 px-3"
        value={ciudad}
        onChangeText={(text) => setCiudad(text)}
        placeholder="Ej: Buenos Aires"
      ></TextInput>
      <Text className="font-geist text-text text-base mt-3">
        Notas adicionales
      </Text>
      <TextInput
        className="border border-gray-200 rounded-md px-3 h-40"
        value={notas}
        onChangeText={(text) => setNotas(text)}
        placeholder="Alguna información adicional que quieras agregar..."
        multiline={true}
        numberOfLines={6}
        textAlignVertical="top"
      ></TextInput>

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
          onPress={onNext}
          className="border border-gray-200 rounded-md p-2 items-center justify-center bg-purple-unique w-1/3"
        >
          <Text className="text-white text-base font-geist">Siguiente</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InformacionBasica;

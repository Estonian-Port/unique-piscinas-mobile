import { Pressable, ScrollView, Text, View } from 'react-native';
import { filtroMock } from '@/data/mock/piscinaMock';
import { Screen } from '@/components/utiles/Screen';
import { Piscina, PiscinaNueva } from '@/data/domain/piscina';
import { EditIcon } from '@/assets/icons';
import { useState } from 'react';
import ModalEditarInfoGeneral from '@/components/dashboard/modalEditarInfoGeneral';
import ModalEditarDimensiones from '@/components/dashboard/modalEditarDimensiones';
import ModalEditarNotas from '@/components/dashboard/modalEditarNotas';
import PrivateScreen from '@/components/utiles/privateScreen';

export default function FichaTecnica() {
  const [modalEditInfo, setModalEditInfo] = useState(false);
  const [modalEditDimension, setModalEditDimension] = useState(false);
  const [modalEditNotas, setModalEditNotas] = useState(false);

  const handleEdit = (poolEditada: Piscina) => {
    null;
  };

  const pool: PiscinaNueva = {
    id: 1,
    nombre: 'Piscina Central',
    direccion: 'Calle Falsa 123',
    ciudad: 'Ciudad Ejemplo',
    desbordante: true,
    largo: 10,
    ancho: 5,
    profundidad: 2,
    volumen: 100,
    volumenTC: 95,
    bomba: [],
    filtro: filtroMock,
    valvulas: [],
    sistemaGermicida: [],
    cloroSalino: true,
    controlAutomaticoPH: false,
    orp: true,
    administradorId: 101,
    notas: 'Piscina principal del complejo',
  };

  const InfoRow = ({
    label,
    value,
    isLast = false,
  }: {
    label: string;
    value: string;
    isLast?: boolean;
  }) => (
    <View className={`py-3 px-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-600 font-geist text-sm flex-1">{label}</Text>
        <Text className="font-geist-semi-bold text-gray-900 text-sm flex-1 text-right">
          {value}
        </Text>
      </View>
    </View>
  );

  const SectionCard = ({
    title,
    children,
    action,
  }: {
    title: string;
    children: React.ReactNode;
    action: () => void;
  }) => (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
      <View className="flex-row justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
        <Text className="font-geist-semi-bold text-gray-800 text-base">
          {title}
        </Text>
        <Pressable onPress={action}>
          <EditIcon />
        </Pressable>
      </View>
      {children}
    </View>
  );

  return (
    <PrivateScreen>
      <ScrollView className="flex-1 bg-gray-50">
        <Screen>
          <View className="p-5 w-11/12">
            {/* Header */}
            <View className="mb-6">
              <Text className="font-geist-semi-bold text-2xl text-gray-900 mb-1">
                {pool.nombre}
              </Text>
              <Text className="font-geist text-gray-600 text-sm">
                Ficha Técnica
              </Text>
            </View>

            {/* Información General */}
            <SectionCard
              title="Información General"
              action={() => setModalEditInfo(true)}
            >
              <InfoRow label="Dirección" value={pool.direccion} />
              <InfoRow label="Ciudad" value={pool.ciudad} isLast />
              <InfoRow
                label="Usuario administrador"
                value={
                  pool.administradorId != null
                    ? pool.administradorId.toString()
                    : 'No asignado'
                }
                isLast
              />
            </SectionCard>
            {modalEditInfo && (
              <ModalEditarInfoGeneral
                visible={modalEditInfo}
                onClose={() => setModalEditInfo(false)}
                onSave={handleEdit}
                pool={pool}
              />
            )}

            {/* Dimensiones */}
            <SectionCard
              title="Dimensiones y Capacidad"
              action={() => setModalEditDimension(true)}
            >
              <InfoRow
                label="Tipo de Piscina"
                value={pool.desbordante ? 'Desborde' : 'Skimmer'}
              />
              <InfoRow label="Largo" value={`${pool.largo} m`} />
              <InfoRow label="Ancho" value={`${pool.ancho} m`} />
              <InfoRow label="Profundidad" value={`${pool.profundidad} m`} />
              <InfoRow
                label="Volumen"
                value={`${pool.volumen} m³`}
                isLast={!pool.desbordante}
              />
              {pool.desbordante && (
                <InfoRow
                  label="Volumen T.C."
                  value={`${pool.volumenTC} m³`}
                  isLast
                />
              )}
            </SectionCard>
            {modalEditDimension && (
              <ModalEditarDimensiones
                visible={modalEditDimension}
                onClose={() => setModalEditDimension(false)}
                onSave={handleEdit}
                pool={pool}
              />
            )}

            {/* Notas */}
            <SectionCard
              title="Notas Adicionales"
              action={() => setModalEditNotas(true)}
            >
              <View className="p-4">
                <Text className="font-geist text-gray-700 text-sm leading-5">
                  {pool.notas != null && pool.notas !== ''
                    ? pool.notas
                    : 'No hay notas adicionales.'}
                </Text>
              </View>
            </SectionCard>
            {modalEditNotas && (
              <ModalEditarNotas
                visible={modalEditNotas}
                onClose={() => setModalEditNotas(false)}
                onSave={handleEdit}
                pool={pool}
              />
            )}
          </View>
        </Screen>
      </ScrollView>
    </PrivateScreen>
  );
}

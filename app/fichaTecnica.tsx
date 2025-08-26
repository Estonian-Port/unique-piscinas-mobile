import { Pressable, ScrollView, Text, View } from 'react-native';
import { Screen } from '@/components/utiles/Screen';
import { PiscinaFichaTecnica } from '@/data/domain/piscina';
import { EditIcon } from '@/assets/icons';
import { useEffect, useState } from 'react';
import ModalEditarInfoGeneral from '@/components/dashboard/modalEditarInfoGeneral';
import ModalEditarDimensiones from '@/components/dashboard/modalEditarDimensiones';
import ModalEditarNotas from '@/components/dashboard/modalEditarNotas';
import PrivateScreen from '@/components/utiles/privateScreen';
import { useAuth } from '@/context/authContext';
import { administracionService } from '@/services/administracion.service';
import { useLocalSearchParams } from 'expo-router';

export default function FichaTecnica() {
  const { poolId } = useLocalSearchParams();
  const [pool, setPool] = useState<PiscinaFichaTecnica | null>(null);
  const [modalEditInfo, setModalEditInfo] = useState(false);
  const [modalEditDimension, setModalEditDimension] = useState(false);
  const [modalEditNotas, setModalEditNotas] = useState(false);

  useEffect(() => {
    const fetchPool = async () => {
      try {
        const data = await administracionService.getPiscinaFichaTecnicaById(Number(poolId));
        console.log('Piscina ficha tecnica', data);
        setPool(data);
      } catch (error) {
        console.error('Error fetching pool data:', error);
      }
    };

    fetchPool();
  }, [poolId]);

  const handleEdit = (poolEditada: PiscinaFichaTecnica) => {
    null;
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
              <Text className="font-geist text-gray-600 text-sm">
                Ficha Técnica
              </Text>
            </View>

            {/* Información General */}
            <SectionCard
              title="Información General"
              action={() => setModalEditInfo(true)}
            >
              <InfoRow label="Dirección" value={pool!.direccion} />
              <InfoRow label="Ciudad" value={pool!.ciudad} isLast />
              <InfoRow
                label="Usuario administrador"
                value={
                  pool!.nombreAdministrador != null
                    ? pool!.nombreAdministrador
                    : 'No asignado'
                }
                isLast
              />
            </SectionCard>
            {modalEditInfo && pool && (
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
                value={pool!.esDesbordante ? 'Infinity' : 'Skimmer'}
              />
              <InfoRow label="Largo" value={`${pool!.largo} m`} />
              <InfoRow label="Ancho" value={`${pool!.ancho} m`} />
              <InfoRow label="Profundidad" value={`${pool!.profundidad} m`} />
              <InfoRow
                label="Volumen"
                value={`${pool!.volumen} m³`}
                isLast={!pool!.esDesbordante}
              />
              {pool!.esDesbordante && (
                <InfoRow
                  label="Volumen T.C."
                  value={`${pool!.volumenTC} m³`}
                  isLast
                />
              )}
            </SectionCard>
            {modalEditDimension && pool && (
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
                  {pool!.notas != null && pool!.notas !== ''
                    ? pool!.notas
                    : 'No hay notas adicionales.'}
                </Text>
              </View>
            </SectionCard>
            {modalEditNotas && pool && (
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

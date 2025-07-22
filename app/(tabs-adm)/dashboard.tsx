import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenTabs } from '@/components/utiles/Screen';
import StatCard from '@/components/dashboard/statCard';
import PiscinasRegistradas from '@/components/dashboard/piscinasRegistradas';
import { useAuth } from '@/context/authContext';
import { StatDashboard } from '@/data/domain/stat';
import { administracionService } from '@/services/administracion.service';
import { PiscinaDashboard } from '@/data/domain/piscina';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatDashboard>();
  const [loading, setLoading] = useState(true);
  const [piscinasRegistradas, setPiscinasRegistradas] = useState<PiscinaDashboard[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await administracionService.getEstadisticas(user!.id);
        setStats(data);
      } catch (error) {
        console.error('Error cargando las estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPiscinas = async () => {
      try {
        const data = await administracionService.getPiscinasRegistradas(user!.id);
        setPiscinasRegistradas(data);
      } catch (error) {
        console.error('Error cargando las piscinas registradas:', error);
      }
    };

    if (user) {
      fetchStats();
      fetchPiscinas();
    }
  }, [user]);

  if (loading || !stats) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <ScreenTabs>
        <Text className="self-start font-geist-bold text-3xl text-text m-5">
          Panel de Administración
        </Text>
        <StatCard
          title="Usuarios"
          value={stats.totalUsuarios}
          label={`${stats.usuarioActivos} activos, ${stats.usuarioInactivos} inactivos`}
          icon="people"
        />

        <StatCard
          title="Piscinas"
          value={stats.totalPiscinas}
          label={`${stats.piscinaSkimmer} skimmer, ${stats.piscinaDesborde} desborde`}
          icon="water-drop"
        />

        <StatCard
          title="Volumen Total"
          value={stats.volumenTotal}
          label={`Promedio: ${stats.volumenPromedio} m³ por piscina`}
          icon="water"
          unity="m³"
        />

        <PiscinasRegistradas pools={piscinasRegistradas}/>
      </ScreenTabs>
    </ScrollView>
  );
};

export default Dashboard;

import { PiscinaDashboard } from '@/data/domain/piscina';
import api from './api';
import { StatDashboard } from '@/data/domain/stat';

class AdministracionService {

  getEstadisticas = async (userId: number): Promise<StatDashboard> => {
    const response = await api.get(`/administracion/estadisticas/${userId}`);
    return response.data;
  };

  getPiscinasRegistradas = async (userId: number): Promise<PiscinaDashboard[]> => {
    const response = await api.get(`/administracion/piscinas-registradas/${userId}`);
    return response.data;
  };
}

export const administracionService = new AdministracionService();
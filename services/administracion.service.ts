import { PiscinaDashboard } from '@/data/domain/piscina';
import api from '../helper/auth.interceptor';
import { StatDashboard } from '@/data/domain/stat';

class AdministracionService {

  getEstadisticas = async (userId: number): Promise<StatDashboard> => {
    const response = await api.get(`/administracion/estadisticas/${userId}`);
    return response.data.data;
  };

  getPiscinasRegistradas = async (userId: number): Promise<PiscinaDashboard[]> => {
    const response = await api.get(`/administracion/piscinas-registradas/${userId}`);
    return response.data.data;
  };
}

export const administracionService = new AdministracionService();
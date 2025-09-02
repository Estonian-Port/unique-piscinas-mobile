import { PiscinaRegistrada, PiscinaFichaTecnica, PiscinaEquipos } from '@/data/domain/piscina';
import api from '../helper/auth.interceptor';
import { StatDashboard } from '@/data/domain/stat';
import { UsuarioRegistrado } from '@/data/domain/user';

const ADMINISTRACION = '/administracion'

class AdministracionService {

  getEstadisticas = async (userId: number): Promise<StatDashboard> => {
    const response = await api.get(`${ADMINISTRACION}/estadisticas/${userId}`);
    return response.data.data;
  };

  getPiscinasRegistradas = async (userId: number): Promise<PiscinaRegistrada[]> => {
    const response = await api.get(`${ADMINISTRACION}/piscinas-registradas/${userId}`);
    return response.data.data;
  };

  getPiscinaFichaTecnicaById = async (userId:number, piscinaId: number): Promise<PiscinaFichaTecnica | null> => {
    const response = await api.get(`${ADMINISTRACION}/piscina-ficha-tecnica/${userId}/${piscinaId}`);
    return response.data.data;
  };

  getPiscinaEquiposById = async (userId:number, piscinaId: number): Promise<PiscinaEquipos> => {
    const response = await api.get(`${ADMINISTRACION}/piscina-equipos/${userId}/${piscinaId}`);
    return response.data.data;
  };

  getUsuariosRegistrados = async (userId: number): Promise<UsuarioRegistrado[]> => {
    const response = await api.get(`${ADMINISTRACION}/usuarios-registrados/${userId}`);
    return response.data.data;
  };

}

export const administracionService = new AdministracionService();
import { PiscinaEquipamiento, PiscinaListItem, PiscinaProgramacion, PiscinaResume } from '@/data/domain/piscina';
import api from '../helper/auth.interceptor';
import { programacionFromDto } from '@/data/domain/cicloFiltrado';

class PiscinaService {

  getPiscinasByUserId = async (userId: number): Promise<PiscinaListItem[]> => {
    const response = await api.get(`/piscina/${userId}`);
    return response.data.data;
  };

  getPiscinaResumeById = async (id: number): Promise<PiscinaResume> => {
    const response = await api.get(`/piscina/resumen/${id}`);
    return response.data.data;
  };

  getPiscinaResumePhById = async (id: number): Promise<PiscinaResume> => {
    const response = await api.get(`/piscina/resumenPh/${id}`);
    return response.data.data;
  };

  getPiscinaEquipamientoById = async (id: number): Promise<PiscinaEquipamiento> => {
    const response = await api.get(`/piscina/equipamiento/${id}`);
    return response.data.data;
  };

  getPiscinaProgramacionById = async (id: number): Promise<PiscinaProgramacion> => {
    const response = await api.get(`/piscina/programacion/${id}`);
    const piscina = response.data.data;

    return {
      ...piscina,
      programacionLuces: piscina.programacionLuces.map(programacionFromDto),
      programacionFiltrado: piscina.programacionFiltrado.map(programacionFromDto),
    }
  };
}

export const piscinaService = new PiscinaService();
import { PiscinaEquipamiento, PiscinaListItem, PiscinaProgramacion, PiscinaResume } from '@/data/domain/piscina';
import api from '../helper/auth.interceptor';
import { programacionFromDto } from '@/data/domain/cicloFiltrado';

const PISCINA = '/piscina'


class PiscinaService {

  getPiscinasByUserId = async (userId: number): Promise<PiscinaListItem[]> => {
    const response = await api.get(`${PISCINA}/getAll/${userId}`);
    return response.data.data;
  };

   getPiscinaHeaderById = async (id: number): Promise<PiscinaListItem> => {
    const response = await api.get(`${PISCINA}/header/${id}`);
    return response.data.data;
  };

  getPiscinaResumeById = async (id: number): Promise<PiscinaResume> => {
    const response = await api.get(`${PISCINA}/resumen/${id}`);
    return response.data.data;
  };

  getPiscinaResumePhById = async (id: number): Promise<PiscinaResume> => {
    const response = await api.get(`${PISCINA}/resumenPh/${id}`);
    return response.data.data;
  };

  getPiscinaEquipamientoById = async (id: number): Promise<PiscinaEquipamiento> => {
    const response = await api.get(`${PISCINA}/equipamiento/${id}`);
    return response.data.data;
  };

  getPiscinaProgramacionById = async (id: number): Promise<PiscinaProgramacion> => {
    const response = await api.get(`${PISCINA}/programacion/${id}`);
    const piscina = response.data.data;

    return {
      ...piscina,
      programacionIluminacion: piscina.programacionIluminacion.map(programacionFromDto),
      programacionFiltrado: piscina.programacionFiltrado.map(programacionFromDto),
    }
  };
}

export const piscinaService = new PiscinaService();
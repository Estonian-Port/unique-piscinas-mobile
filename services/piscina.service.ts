import { PiscinaListItem, PiscinaResume } from '@/data/domain/piscina';
import api from './api';

class PiscinaService {

  getPiscinasByUserId = async (userId: number): Promise<PiscinaListItem[]> => {
    const response = await api.get(`/piscina/${userId}`);
    return response.data;
  };

  getPiscinaResumeById = async (id: number): Promise<PiscinaResume> => {
    const response = await api.get(`/piscina/resumen/${id}`);
    return response.data;
  };
}

export const piscinaService = new PiscinaService();
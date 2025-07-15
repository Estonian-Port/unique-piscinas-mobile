import { PiscinaResumenDTO } from '@/data/dto/piscinaResumenDto';
import { API_BASE_URL } from '@/utils/config';
import axios from 'axios';

class PiscinaService {
  async getPiscinaResumenById(id: string) {
    const response = await axios.get<PiscinaResumenDTO>(
      `${API_BASE_URL}/piscinas/${id}/resumen`
    );
    return response.data;
  }
}

export const piscinaService = new PiscinaService();

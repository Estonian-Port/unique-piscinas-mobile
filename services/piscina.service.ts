import {
  Bomba,
  BombaNuevo,
  Calefaccion,
  CalefaccionNueva,
  Filtro,
  Germicida,
  GermicidaNuevo,
  PiscinaEquipamiento,
  PiscinaListItem,
  PiscinaNueva,
  PiscinaProgramacion,
  PiscinaResume,
} from '@/data/domain/piscina';
import api from '../helper/auth.interceptor';
import { programacionFromDto } from '@/data/domain/cicloFiltrado';

const PISCINA = '/piscina';

class PiscinaService {
  getPiscinasByUserId = async (userId: number): Promise<PiscinaListItem[]> => {
    const response = await api.get(`${PISCINA}/getAll/${userId}`);
    return response.data.data;
  };

  getPiscinaHeaderById = async (id: number): Promise<PiscinaListItem> => {
    const response = await api.get(`${PISCINA}/header/${id}`);
    return response.data.data;
  };

  getPiscinaResume = async (id: number): Promise<PiscinaResume> => {
    const response = await api.get(`${PISCINA}/resumen/${id}`);
    return response.data.data;
  };

  getPiscinaResumePhById = async (id: number): Promise<PiscinaResume> => {
    const response = await api.get(`${PISCINA}/resumenPh/${id}`);
    return response.data.data;
  };

  getPiscinaEquipamientoById = async (
    id: number
  ): Promise<PiscinaEquipamiento> => {
    const response = await api.get(`${PISCINA}/equipamiento/${id}`);
    return response.data.data;
  };

  getPiscinaProgramacionById = async (
    id: number
  ): Promise<PiscinaProgramacion> => {
    const response = await api.get(`${PISCINA}/programacion/${id}`);
    const piscina = response.data.data;

    return {
      ...piscina,
      programacionIluminacion:
        piscina.programacionIluminacion.map(programacionFromDto),
      programacionFiltrado:
        piscina.programacionFiltrado.map(programacionFromDto),
    };
  };

  create = async (
    piscina: PiscinaNueva
  ): Promise<{ data: PiscinaNueva; message: string }> => {
    const response = await api.post(`${PISCINA}/alta`, piscina);
    return { data: response.data.data, message: response.data.message };
  };

  updateBomba = async (
    piscinaId: number,
    bomba: Bomba
  ): Promise<{ data: Bomba; message: string }> => {
    const response = await api.put(
      `${PISCINA}/update-bomba/${piscinaId}`,
      bomba
    );
    return { data: response.data.data, message: response.data.message };
  };

  updateFiltro = async (
    piscinaId: number,
    filtro: Filtro
  ): Promise<{ data: Filtro; message: string }> => {
    const response = await api.put(
      `${PISCINA}/update-filtro/${piscinaId}`,
      filtro
    );
    return { data: response.data.data, message: response.data.message };
  };

  updateGermicida = async (
    piscinaId: number,
    germicida: Germicida
  ): Promise<{ data: Germicida; message: string }> => {
    const response = await api.put(
      `${PISCINA}/update-germicida/${piscinaId}`,
      germicida
    );
    return { data: response.data.data, message: response.data.message };
  };

  updateCalefaccion = async (
    piscinaId: number,
    calefaccion: Calefaccion
  ): Promise<{ data: Calefaccion; message: string }> => {
    let tipoEnum = calefaccion.tipo;
    if (tipoEnum === 'Bomba Calor') tipoEnum = 'BOMBA_CALOR';
    if (tipoEnum === 'Bomba Gas') tipoEnum = 'BOMBA_GAS';

    const calefaccionToSend = { ...calefaccion, tipo: tipoEnum };

    const response = await api.put(
      `${PISCINA}/update-calefaccion/${piscinaId}`,
      calefaccionToSend
    );
    return { data: response.data.data, message: response.data.message };
  };

  deleteCalefaccion = async (
    piscinaId: number
  ): Promise<{ data: Calefaccion; message: string }> => {
    const response = await api.delete(
      `${PISCINA}/delete-calefaccion/${piscinaId}`
    );
    return { data: response.data.data, message: response.data.message };
  };

  deleteGermicida = async (
    piscinaId: number,
    germicidaId: number
  ): Promise<{ data: Germicida; message: string }> => {
    const response = await api.delete(
      `${PISCINA}/delete-germicida/${piscinaId}/${germicidaId}`
    );
    return { data: response.data.data, message: response.data.message };
  };

  addGermicida = async (
    piscinaId: number,
    germicida: GermicidaNuevo
  ): Promise<{ data: Germicida; message: string }> => {
    const response = await api.post(
      `${PISCINA}/add-germicida/${piscinaId}`,
      germicida
    );
    return { data: response.data.data, message: response.data.message };
  };

  addCalefaccion = async (
    piscinaId: number,
    calefaccion: CalefaccionNueva
  ): Promise<{ data: Calefaccion; message: string }> => {
    let tipoEnum = calefaccion.tipo;
    if (tipoEnum === 'Bomba Calor') tipoEnum = 'BOMBA_CALOR';
    if (tipoEnum === 'Bomba Gas') tipoEnum = 'BOMBA_GAS';

    const calefaccionDto = { ...calefaccion, tipo: tipoEnum };

    const response = await api.post(
      `${PISCINA}/add-calefaccion/${piscinaId}`,
      calefaccionDto
    );
    return { data: response.data.data, message: response.data.message };
  };

  addBomba = async (
    piscinaId: number,
    bomba: BombaNuevo
  ): Promise<{ data: Bomba; message: string }> => {
    const response = await api.post(`${PISCINA}/add-bomba/${piscinaId}`, bomba);
    return { data: response.data.data, message: response.data.message };
  };
}

export const piscinaService = new PiscinaService();

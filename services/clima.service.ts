export type ClimaResponse = {
  timestamp: string;
  temperatura: number;
  humedad: number;
  estadoClima: 'SOLEADO' | 'PARCIAL' | 'NUBLADO' | 'LLUVIA' | 'TORMENTA';
};

const API_URL = 'http://localhost:8082/clima/latest';

export const climaService = {
  async getClima(): Promise<ClimaResponse> {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Error al obtener clima: ${res.status}`);
    }
    return res.json();
  },
};
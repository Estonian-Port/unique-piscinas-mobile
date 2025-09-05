export type PiscinaResumenDTO = {
  id: number;
  nombre: string;
  direccion: string;
  volumen: string;
  ph: string;
  diferenciaPh: string;
  clima: string;
  entradaAgua: string[];
  funcionActiva: string[];
  sistemasGermicidas: string[];
  calefaccion: boolean;
};

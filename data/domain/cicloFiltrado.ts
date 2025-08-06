export interface Programacion {
  id: number;
  horaInicio: Date;
  horaFin: Date;
  dias: Day[];
  mode: ModeCicle | null; // esto falta en back
  estaActivo: boolean;
  esProgramacionFiltro: boolean;
}

export enum ModeCicle {
  FILTRAR = 'Filtrar',
  RETROLAVAR = 'Retrolavar',
  DESAGOTAR = 'Desagotar',
  RECIRCULAR = 'Recircular',
  ENJUAGAR = 'Enjuagar'
}

export enum Day {
  LUNES = 'L',
  MARTES = 'M',
  MIERCOLES = 'X',
  JUEVES = 'J',
  VIERNES = 'V',
  SABADO = 'S',
  DOMINGO = 'D'
}


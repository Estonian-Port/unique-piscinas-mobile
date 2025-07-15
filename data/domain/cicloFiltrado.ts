export interface Cicle {
  id: number;
  startTime: Date;
  endTime: Date;
  activeDays: Day[];
  mode: ModeCicle | null;
  isActive: boolean;
  isFilterCicle: boolean;
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


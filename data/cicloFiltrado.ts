export interface Cicle {
  id: number;
  startTime: string;
  endTime: string;
  activeDays: Day[];
  mode: ModeCicle;
  isActive: boolean;
  isFilterCicle: boolean;
}

export enum ModeCicle {
  FILTRAR = 'Filtrar',
  RETROLAVAR = 'Retrolavar'
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


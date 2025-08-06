import { Programacion, Day, ModeCicle } from "../domain/cicloFiltrado";

const cicloLuz1: Programacion = {
  id: 1,
  horaInicio: new Date('1970-01-01T08:00:00'),
  horaFin: new Date('1970-01-01T10:00:00'),
  dias: [Day.LUNES, Day.MIERCOLES, Day.VIERNES],
  mode: ModeCicle.FILTRAR,
  estaActivo: true,
  esProgramacionFiltro: false,
};

const cicloLuz2: Programacion = {
  id: 2,
  horaInicio: new Date('1970-01-01T14:00:00'),
  horaFin: new Date('1970-01-01T16:00:00'),
  dias: [Day.MARTES, Day.JUEVES, Day.VIERNES, Day.SABADO],
  mode: ModeCicle.FILTRAR,
  estaActivo: false,
  esProgramacionFiltro: false,
};

const cicloLuz3: Programacion = {
  id: 3,
  horaInicio: new Date('1970-01-01T18:00:00'),
  horaFin: new Date('1970-01-01T20:00:00'),
  dias: [Day.DOMINGO],
  mode: ModeCicle.RETROLAVAR,
  estaActivo: true,
  esProgramacionFiltro: false,
};

export const cicloLuzVacio: Programacion = {
  id: 4,
  horaInicio: new Date('1970-01-01T00:00:00'),
  horaFin: new Date('1970-01-01T00:00:00'),
  dias: [],
  mode: null,
  estaActivo: false,
  esProgramacionFiltro: false,
};

export const ciclosLucesMock: Programacion[] = [cicloLuz1];
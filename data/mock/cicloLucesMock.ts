import { Cicle, Day, ModeCicle } from "../cicloFiltrado";

const cicloLuz1: Cicle = {
  id: 1,
  startTime: new Date('1970-01-01T08:00:00'),
  endTime: new Date('1970-01-01T10:00:00'),
  activeDays: [Day.LUNES, Day.MIERCOLES, Day.VIERNES],
  mode: ModeCicle.FILTRAR,
  isActive: true,
  isFilterCicle: false,
};

const cicloLuz2: Cicle = {
  id: 2,
  startTime: new Date('1970-01-01T14:00:00'),
  endTime: new Date('1970-01-01T16:00:00'),
  activeDays: [Day.MARTES, Day.JUEVES, Day.VIERNES, Day.SABADO],
  mode: ModeCicle.FILTRAR,
  isActive: false,
  isFilterCicle: false,
};

const cicloLuz3: Cicle = {
  id: 3,
  startTime: new Date('1970-01-01T18:00:00'),
  endTime: new Date('1970-01-01T20:00:00'),
  activeDays: [Day.DOMINGO],
  mode: ModeCicle.RETROLAVAR,
  isActive: true,
  isFilterCicle: false,
};

export const cicloLuzVacio: Cicle = {
  id: 4,
  startTime: new Date('1970-01-01T00:00:00'),
  endTime: new Date('1970-01-01T00:00:00'),
  activeDays: [],
  mode: null,
  isActive: false,
  isFilterCicle: false,
};

export const ciclosLucesMock: Cicle[] = [cicloLuz1];
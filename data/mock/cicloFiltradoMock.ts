import { Cicle, Day, ModeCicle } from "../cicloFiltrado";

const ciclo1: Cicle = {
  id: 1,
  startTime: new Date('1970-01-01T08:00:00'),
  endTime: new Date('1970-01-01T10:00:00'),
  activeDays: [Day.LUNES, Day.MIERCOLES, Day.VIERNES],
  mode: ModeCicle.FILTRAR,
  isActive: true,
  isFilterCicle: true,
};

const ciclo2: Cicle = {
  id: 2,
  startTime: new Date('1970-01-01T14:00:00'),
  endTime: new Date('1970-01-01T16:00:00'),
  activeDays: [Day.MARTES, Day.JUEVES, Day.VIERNES, Day.SABADO],
  mode: ModeCicle.FILTRAR,
  isActive: false,
  isFilterCicle: true,
};

const ciclo3: Cicle = {
  id: 3,
  startTime: new Date('1970-01-01T18:00:00'),
  endTime: new Date('1970-01-01T20:00:00'),
  activeDays: [Day.DOMINGO],
  mode: ModeCicle.RETROLAVAR,
  isActive: true,
  isFilterCicle: true,
};

export const ciclosFiltradoMock: Cicle[] = [ciclo1, ciclo2, ciclo3];
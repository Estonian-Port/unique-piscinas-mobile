import { Cicle, Day, ModeCicle } from "../cicloFiltrado";

const cicloLuz1: Cicle = {
    id: 1,
    startTime: '08:00',
    endTime: '10:00',
    activeDays: [Day.LUNES, Day.MIERCOLES, Day.VIERNES],
    mode: ModeCicle.FILTRAR,
    isActive: true,
    isFilterCicle: false,
  };
  
  const cicloLuz2: Cicle = {
    id: 2,
    startTime: '14:00',
    endTime: '16:00',
    activeDays: [Day.MARTES, Day.JUEVES, Day.VIERNES, Day.SABADO],
    mode: ModeCicle.FILTRAR,
    isActive: false,
    isFilterCicle: false,
  };
  
  const cicloLuz3: Cicle = {
    id: 3,
    startTime: '18:00',
    endTime: '20:00',
    activeDays: [Day.DOMINGO],
    mode: ModeCicle.RETROLAVAR,
    isActive: true,
    isFilterCicle: false,
  };
  
  export const ciclosLucesMock: Cicle[] = [cicloLuz1];

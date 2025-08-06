import { StatDashboard } from "../domain/stat";

const statMock1 : StatDashboard = {
  id: 1,
    title: 'Usuarios',
    value: 4,
    label: '3 activos, 1 inactivo',
    icon: 'people',
};

const statMock2 : StatDashboard = {
    id: 2,
      title: 'Piscinas',
      value: 7,
      label: '5 skimmer, 2 desborde',
      icon: 'water-drop',
  };

const statMock3 : StatDashboard = {
    id: 3,
    title: 'Volumen Total',
    value: 440,
    label: 'Promedio: 63 m³ por piscina',
    icon: 'water',
    unity: 'm³',
};

export const statsMocks: StatDashboard[] = [
    statMock1,
    statMock2,
    statMock3,
];
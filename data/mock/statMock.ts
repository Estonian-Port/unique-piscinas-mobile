import { StatDashboard } from "../domain/stat";

const statMock1 : StatDashboard = {
  id: 1,
  title: 'Usuarios',
  value: 4,
  label: '3 activos, 1 inactivo',
  icon: 'people',
  totalPiscinas: 0,
  totalUsuarios: 0,
  usuarioActivos: 0,
  usuarioInactivos: 0,
  piscinaSkimmer: 0,
  piscinaDesborde: 0,
  volumenTotal: 0,
  volumenPromedio: 0,
  unity: ""
};

const statMock2 : StatDashboard = {
  id: 2,
  title: 'Piscinas',
  value: 7,
  label: '5 skimmer, 2 desborde',
  icon: 'water-drop',
  totalPiscinas: 0,
  totalUsuarios: 0,
  usuarioActivos: 0,
  usuarioInactivos: 0,
  piscinaSkimmer: 0,
  piscinaDesborde: 0,
  volumenTotal: 0,
  volumenPromedio: 0,
  unity: ""
};

const statMock3 : StatDashboard = {
  id: 3,
  title: 'Volumen Total',
  value: 440,
  label: 'Promedio: 63 m³ por piscina',
  icon: 'water',
  unity: 'm³',
  totalPiscinas: 0,
  totalUsuarios: 0,
  usuarioActivos: 0,
  usuarioInactivos: 0,
  piscinaSkimmer: 0,
  piscinaDesborde: 0,
  volumenTotal: 0,
  volumenPromedio: 0
};

export const statsMocks: StatDashboard[] = [
    statMock1,
    statMock2,
    statMock3,
];
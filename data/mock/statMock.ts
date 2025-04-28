const statMock1 : Stat = {
  id: 1,
    title: 'Usuarios',
    value: 4,
    label: '3 activos, 1 inactivo',
    icon: 'people',
};

const statMock2 : Stat = {
    id: 2,
      title: 'Piscinas',
      value: 7,
      label: '5 skimmer, 2 desborde',
      icon: 'water-drop',
  };

const statMock3 : Stat = {
    id: 3,
    title: 'Volumen Total',
    value: 440,
    label: 'Promedio: 63 m³ por piscina',
    icon: 'water',
    unity: 'm³',
};

export const statsMocks: Stat[] = [
    statMock1,
    statMock2,
    statMock3,
];
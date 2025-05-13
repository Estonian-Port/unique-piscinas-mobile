import { leo, gabi, seba, diego } from './userMock';

// Definición de bombas, germicidas, válvulas, calefacción, registros (puedes expandir si quieres más variedad)
const bomba1: Bomba = {
  id: 1,
  nombre: 'Bomba Principal',
  marca: 'Astral',
  modelo: 'Victoria Plus',
  activa: true,
  potencia: 2,
};
const bomba2: Bomba = {
  id: 2,
  nombre: 'Bomba Secundaria',
  marca: 'Hayward',
  modelo: 'Super Pump',
  activa: false,
  potencia: 1.5,
};
const bomba3: Bomba = {
  id: 3,
  nombre: 'Bomba Extra',
  marca: 'Intex',
  modelo: 'Ultra',
  activa: true,
  potencia: 2.2,
};

const lamparaUv: Germicida = {
  id: 1,
  nombre: 'Lámpara UV',
  vida: 5,
  activa: true,
};
const ionizador: Germicida = {
  id: 2,
  nombre: 'Ionizador de cobre',
  vida: 8,
  activa: false,
};
const trasductor: Germicida = {
  id: 3,
  nombre: 'Trasductor ultrasónido',
  vida: 60,
  activa: true,
};

const valvula1: Valvula = {
  id: 1,
  nombre: 'Válvula Selectora',
  tipo: 'Selectora',
  estado: 'Operativa',
};
const valvula2: Valvula = {
  id: 2,
  nombre: 'Válvula Skimmer',
  tipo: 'Bola',
  estado: 'Requiere revisión',
};

const calefaccion: Calefaccion = {
  id: 1,
  nombre: 'Sistema de calefacción',
  tipo: 'Bomba de calor',
  marca: 'Hayward',
  modelo: 'EnergyLine Pro',
  potencia: 20,
  activa: true,
};

const registro1: Registro = {
  id: 1,
  fecha: '2023-07-15',
  dispositivo: 'Bomba principal',
  accion: 'Mantenimiento preventivo',
  descripcion:
    'Se realizó limpieza de filtros y revisión general del sistema de bombeo. Se reemplazaron piezas desgastadas.',
  tecnico: 'Carlos Rodríguez',
  tipoAccion: 'mantenimiento',
};
const registro2: Registro = {
  id: 2,
  fecha: '2023-07-10',
  dispositivo: 'Sistema UV',
  accion: 'Reparación',
  descripcion:
    'Sustitución de lámpara UV defectuosa. Se verificó el correcto funcionamiento del sistema tras la reparación.',
  tecnico: 'Ana Martínez',
  tipoAccion: 'reparacion',
};
const registro3: Registro = {
  id: 3,
  fecha: '2023-07-05',
  dispositivo: 'Ionizador',
  accion: 'Instalación',
  descripcion:
    'Instalación de nuevo sistema de ionización. Se configuraron los parámetros según especificaciones del fabricante.',
  tecnico: 'Miguel Sánchez',
  tipoAccion: 'instalacion',
};
const registro4: Registro = {
  id: 4,
  fecha: '2023-07-01',
  dispositivo: 'Panel de control',
  accion: 'Actualización de firmware',
  descripcion:
    'Actualización del software de control a la versión 2.5.3. Se mejora la eficiencia energética y se corrigen errores.',
  tecnico: 'Laura Gómez',
  tipoAccion: 'configuracion',
};

// 10 piscinas, distribuidas entre gabi, seba y diego
const piscinas: Piscina[] = [
  {
    id: 1,
    name: 'Piscina Av. San Martín 123',
    volume: 100,
    bombas: [bomba1],
    germicidas: [lamparaUv],
    valvulas: [valvula1],
    calefaccion,
    registro: [registro1,registro4],
    propietario: gabi,
  },
  {
    id: 2,
    name: 'Piscina Roca 452',
    volume: 120,
    bombas: [bomba2],
    germicidas: [ionizador],
    valvulas: [valvula2],
    calefaccion,
    registro: [registro2],
    propietario: gabi,
  },
  {
    id: 3,
    name: 'Piscina Rodriguez Peña 4545',
    volume: 140,
    bombas: [bomba3],
    germicidas: [trasductor],
    valvulas: [valvula1],
    calefaccion,
    registro: [registro3],
    propietario: gabi,
  },
  {
    id: 4,
    name: 'Piscina Belgrano 333',
    volume: 200,
    bombas: [bomba1, bomba2],
    germicidas: [lamparaUv, ionizador],
    valvulas: [valvula1, valvula2],
    calefaccion,
    registro: [registro1, registro2],
    propietario: seba,
  },
  {
    id: 5,
    name: 'Piscina Av. La Plata 321',
    volume: 220,
    bombas: [bomba2],
    germicidas: [trasductor],
    valvulas: [valvula2],
    calefaccion,
    registro: [registro3],
    propietario: seba,
  },
  {
    id: 6,
    name: 'Piscina 9 de julio 654',
    volume: 240,
    bombas: [bomba3],
    germicidas: [lamparaUv],
    valvulas: [valvula1],
    calefaccion,
    registro: [registro1, registro4],
    propietario: seba,
  },
  {
    id: 7,
    name: 'Piscina Principal - Hornos 564',
    volume: 300,
    bombas: [bomba1],
    germicidas: [ionizador],
    valvulas: [valvula2],
    calefaccion,
    registro: [registro2, registro3, registro4],
    propietario: diego,
  },
  {
    id: 8,
    name: 'Piscina Secundaria - Hornos 564',
    volume: 320,
    bombas: [bomba2, bomba3],
    germicidas: [trasductor],
    valvulas: [valvula1, valvula2],
    calefaccion,
    registro: [registro3],
    propietario: diego,
  },
  {
    id: 9,
    name: 'Piscina Urquiza 852',
    volume: 340,
    bombas: [bomba1],
    germicidas: [lamparaUv, ionizador],
    valvulas: [valvula1],
    calefaccion,
    registro: [registro1, registro2],
    propietario: diego,
  },
  {
    id: 10,
    name: 'Piscina Rosas 258',
    volume: 360,
    bombas: [bomba3],
    germicidas: [trasductor],
    valvulas: [valvula2],
    calefaccion,
    registro: [registro3],
    propietario: diego,
  },
];

// Asignar piscinas a cada usuario
leo.piscinas = [...piscinas]; // Leo tiene todas

gabi.piscinas = piscinas.filter((p) => p.propietario === gabi);
seba.piscinas = piscinas.filter((p) => p.propietario === seba);
diego.piscinas = piscinas.filter((p) => p.propietario === diego);

export const piscinasMock: Piscina[] = piscinas;

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
  nombre: 'Bomba Principal',
  marca: 'Hayward',
  modelo: 'Super Pump',
  activa: true,
  potencia: 2.5,
};

// Germicidas
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

// Válvulas
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

// Calefacción
const calefaccion: Calefaccion = {
  id: 1,
  nombre: 'Sistema de calefacción',
  tipo: 'Bomba de calor',
  marca: 'Hayward',
  modelo: 'EnergyLine Pro',
  potencia: 20,
  activa: true,
};

// Registros
const registro1: Registro = {
  id: 1,
  fecha: '2025-05-01',
  dispositivo: 'Ionizador',
  accion: 'Reseteo',
  descripcion: 'Contador reseteado tras cambio de electrodos.',
  tecnico: 'Juan Pérez',
};

const registro2: Registro = {
  id: 2,
  fecha: '2025-05-02',
  dispositivo: 'Lámpara UV',
  accion: 'Reemplazo',
  descripcion: 'Se reemplazó la lámpara UV por desgaste.',
  tecnico: 'María López',
};

const registro3: Registro = {
  id: 3,
  fecha: '2025-05-03',
  dispositivo: 'Válvula Principal',
  accion: 'Ajuste',
  descripcion: 'Se ajustó la válvula principal para mejorar el flujo.',
  tecnico: 'Carlos Gómez',
};


const piscinaPrincipal: Piscina = {
  id: 1,
  name: 'Piscina Principal - Roca 4567',
  volume: 1000,
  bombas: [bomba3],
  germicidas: [lamparaUv, ionizador],
  valvulas: [valvula1, valvula2],
  calefaccion: calefaccion,
  registro: [registro1, registro2],
};

const piscinaSecundaria: Piscina = {
  id: 2,
  name: 'Piscina Secundaria - Roca 4567',
  volume: 500,
  bombas: [bomba2],
  germicidas: [trasductor],
  valvulas: [valvula2],
  calefaccion: calefaccion,
  registro: [registro3],
};

const piscinaNiños: Piscina = {
  id: 3,
  name: 'Piscina Niños - Av San Martín 1234',
  volume: 200,
  bombas: [bomba1],
  germicidas: [lamparaUv],
  valvulas: [valvula1],
  calefaccion: calefaccion,
  registro: [registro1],
};

const piscinaTerraza: Piscina = {
  id: 4,
  name: 'Piscina Terraza - Av San Martín 1234',
  volume: 300,
  bombas: [bomba1, bomba3],
  germicidas: [ionizador, trasductor],
  valvulas: [valvula1, valvula2],
  calefaccion: calefaccion,
  registro: [registro2, registro3],
};

const piscinaPatio: Piscina = {
  id: 5,
  name: 'Piscina Patio - Av La Plata 1234',
  volume: 400,
  bombas: [bomba1, bomba2],
  germicidas: [lamparaUv, trasductor],
  valvulas: [valvula1],
  calefaccion: calefaccion,
  registro: [registro1, registro3],
};

export {
  piscinaPrincipal,
  piscinaSecundaria,
  piscinaNiños,
  piscinaTerraza,
  piscinaPatio,
};

export const piscinas: Piscina[] = [
  piscinaPrincipal,
  piscinaSecundaria,
  piscinaNiños,
  piscinaTerraza,
  piscinaPatio,
];

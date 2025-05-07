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
  nombre: 'Bomba 3',
  marca: 'Hayward',
  modelo: 'Super Pump',
  activa: true,
  potencia: 2.5,
};

const piscinaPrincipal: Piscina = {
  id: 1,
  name: 'Piscina Principal - Roca 4567',
  volume: 1000,
  bombas: [bomba3],
};

const piscinaSecundaria: Piscina = {
  id: 2,
  name: 'Piscina Secundaria - Roca 4567',
  volume: 500,
  bombas: [bomba2],
};

const piscinaNiños: Piscina = {
  id: 3,
  name: 'Piscina Niños - Av San Martín 1234',
  volume: 200,
  bombas: [bomba1],
};

const piscinaTerraza: Piscina = {
  id: 4,
  name: 'Piscina Terraza - Av San Martín 1234',
  volume: 300,
  bombas: [bomba1, bomba3],
};

const piscinaPatio: Piscina = {
  id: 5,
  name: 'Piscina Patio - Av La Plata 1234',
  volume: 400,
  bombas: [bomba1, bomba2],
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

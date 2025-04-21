const piscinaPrincipal: Piscina = {
  id: 1,
  name: 'Piscina Principal - Roca 4567',
  volume: 1000,
};

const piscinaSecundaria: Piscina = {
  id: 2,
  name: 'Piscina Secundaria - Roca 4567',
  volume: 500,
};

const piscinaNiños: Piscina = {
  id: 3,
  name: 'Piscina Niños - Av San Martín 1234',
  volume: 200,
};

const piscinaTerraza: Piscina = {
  id: 4,
  name: 'Piscina Terraza - Av San Martín 1234',
  volume: 300,
};

const piscinaPatio: Piscina = {
  id: 5,
  name: 'Piscina Patio - Av La Plata 1234',
  volume: 400,
};

export { piscinaPrincipal, piscinaSecundaria, piscinaNiños, piscinaTerraza, piscinaPatio };
export const piscinas: Piscina[] = [
  piscinaPrincipal,
  piscinaSecundaria,
  piscinaNiños,
  piscinaTerraza,
  piscinaPatio,
];
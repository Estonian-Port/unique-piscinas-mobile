import { Usuario } from "../domain/user";

const leo: Usuario = {
  id: 1,
  name: 'Leo',
  lastname: 'Rodriguez',
  email: 'leo@unique.com',
  piscinas: [], // Se asigna después
  isAdmin: true,
};

const gabi: Usuario = {
  id: 2,
  name: 'Gabriel',
  lastname: 'Tarquini',
  email: 'gabi@unique.com',
  piscinas: [],
  isAdmin: false,
};

const seba: Usuario = {
  id: 3,
  name: 'Sebastian',
  lastname: 'Rodriguez',
  email: 'seba@unique.com',
  piscinas: [],
  isAdmin: false,
};

const diego: Usuario = {
  id: 4,
  name: 'Diego',
  lastname: 'Maradona',
  email: 'diego@unique.com',
  piscinas: [],
  isAdmin: false,
};

export { leo, gabi, seba, diego };

export const users: Usuario[] = [leo, gabi, seba, diego];

// Las piscinas y la asignación cruzada se hace en piscinaMock.ts
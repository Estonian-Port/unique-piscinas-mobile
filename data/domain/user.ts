import { Piscina } from "./piscina";

export interface UserLogin {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  isAdmin: boolean;
  piscinasId: number[];
}

export class User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  piscinas: Piscina[];
  isAdmin: boolean;

  constructor(
    id: number,
    name: string,
    lastname: string,
    email: string,
    piscinas: Piscina[],
    isAdmin: boolean
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.piscinas = piscinas;
    this.isAdmin = isAdmin;
  }
}
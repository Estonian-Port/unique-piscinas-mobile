import { Piscina, PiscinaListItem } from "./piscina";

export interface NuevoUsuario {
  email: string;
}

export interface UsuarioLogin {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  isAdmin: boolean;
  piscinasId: number[];
}

export interface UsuarioRegistrado {
  id: number;
  nombre: string;
  apellido: string;
  celular: number;
  email: string;
  estado: string;
  piscinasAsignadas: PiscinaListItem[];
}

export class Usuario {
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
import { User } from "./user";

export interface PiscinaNueva {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  desbordante: boolean;
  largo: number;
  ancho: number;
  profundidad: number;
  volumen: number;
  volumenTC?: number;
  bomba: Bomba[];
  filtro: Filtro;
  valvulas: Valvula[];
  sistemaGermicida: Germicida[];
  calefaccion?: Calefaccion;
  cloroSalino: boolean;
  controlAutomaticoPH: boolean;
  orp: boolean;
  administradorId: number | null;
  notas?: string;
}

export class Piscina {
  constructor(
  id: number,
  propietario?: User,
  name: string,
  volume: number,
  bombas: Bomba[],
  germicidas: Germicida[],
  valvulas: Valvula[],
  calefaccion: Calefaccion,
  registro: Registro[],
  ) {}
}

export type Bomba = {
  id: number;
  esVelocidadVariable: boolean;
  marca: string;
  modelo: string;
  potencia: number;
  activa: boolean;
};

export type Filtro = {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  diametro: number;
  datoExtra?: number;
  estado?: string;
};

export type GermicidaBase = {
  id: number;
  tipo: 'uv' | 'trasductor' | 'ionizador';
  marca: string;
  vida: number;
  activa: boolean;
};

export type GermicidaUV = GermicidaBase & {
  tipo: 'uv';
  potencia: number;
};

export type GermicidaTrasductor = GermicidaBase & {
  tipo: 'trasductor';
  potencia: number;
};

export type GermicidaIonizador = GermicidaBase & {
  tipo: 'ionizador';
  electrodos: number;
};

export type Germicida = GermicidaUV | GermicidaTrasductor | GermicidaIonizador;

export type Valvula = {
  id: number;
  tipo: string;
  estado: string;
};

export type Calefaccion = {
  id: number;
  nombre: string;
  tipo: string;
  marca: string;
  modelo: string;
  potencia: number;
  activa: boolean;
};

type Registro = {
  id: number
  fecha: string
  hora?: string
  dispositivo: string
  accion: string
  descripcion: string
  tecnico: string
  tipoAccion?: "mantenimiento" | "reparacion" | "instalacion" | "configuracion" | "otro"
}

type waterInletsType = 'background' | 'skimmer' | 'bottomSweeper';

type ligthsType = 'manual' | 'programmed';

type EntryFilter = 'filter' | 'backwash' | 'rinse' | 'drain' | 'recirculate';

interface PiscinaDashboard {
  id: number;
  nombre: string;
  propietario: string; // Nombre del propietario como string
  tipo: string; // Tipo de piscina (por ejemplo, "Skimmer")
  ph: number; // Nivel de pH
  equipos: EquipoDashboard[]; // Lista de equipos con su estado
}

type EquipoDashboard = {
  tipo: string; // Tipo de equipo (por ejemplo, "Uv", "Ionizador")
  estado: string; // Estado del equipo (por ejemplo, "Operativo", "Inactivo")
};


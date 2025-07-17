import { User } from "./user";

export interface PiscinaListItem {
  id: number;
  nombre: string;
  direccion: string;
}

export interface PiscinaResume {
  id: number;
  nombre: string;
  direccion: string;
  volumen: string;
  ph: string;
  diferenciaPh: string;
  clima: string;
  entradaAgua: entradaAgua[];
  funcionActiva: funcionFiltro[];
  sistemasGermicidas: sistemaGermicida[];
  calefaccion: boolean;
}

export class Piscina {
  id: number;
  propietario?: User;
  name: string;
  volume: number;
  bombas: Bomba[];
  germicidas: Germicida[];
  valvulas: Valvula[];
  calefaccion: Calefaccion;
  registro: Registro[];

  constructor(
    id: number,
    propietario: User | undefined,
    name: string,
    volume: number,
    bombas: Bomba[],
    germicidas: Germicida[],
    valvulas: Valvula[],
    calefaccion: Calefaccion,
    registro: Registro[],
  ) {
    this.id = id;
    this.propietario = propietario;
    this.name = name;
    this.volume = volume;
    this.bombas = bombas;
    this.germicidas = germicidas;
    this.valvulas = valvulas;
    this.calefaccion = calefaccion;
    this.registro = registro;
  }
}

type Bomba = {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  potencia: number;
  activa: boolean;
};

type Germicida = {
  id: number;
  nombre: string;
  vida: number;
  activa: boolean;
};

type Valvula = {
  id: number;
  nombre: string;
  tipo: string;
  estado: string;
};

type Calefaccion = {
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

export type entradaAgua = 'Fondo' | 'Barrefondo' | 'Skimmer';

export type ligthsType = 'manual' | 'programmed';

export type funcionFiltro = 'filter' | 'backwash' | 'rinse' | 'drain' | 'recirculate';

export type sistemaGermicida = 'UV' | 'Ionizador' | 'Trasductor';

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
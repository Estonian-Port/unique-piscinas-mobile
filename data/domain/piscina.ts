import { Programacion } from './cicloFiltrado';
import { Equipo } from './equipo';
import { Usuario } from './usuario';

export interface PiscinaDashboard {
  id: number;
  nombre: string;
  direccion: string;
  volumen: string;
  esDesbordante: boolean;
  administradorNombre: string;
  ph: number;
  sistemasGermicidas: Germicida[];
  calefaccion: Calefaccion;
  propietario: string;
  tipo: string;
  equipos: Equipo[];
}

export interface PiscinaProgramacion {
  id: number;
  nombre: string;
  direccion: string;
  volumen: string;
  programacionIluminacion: Programacion[];
  programacionFiltrado: Programacion[];
}

export interface PiscinaEquipamiento {
  id: number;
  nombre: string;
  direccion: string;
  volumen: string;
  estadoFiltro: boolean;
  entradaAgua: entradaAgua[];
  funcionActiva: funcionFiltro[];
  presion: number;
  ultimaActividad: string;
  proximoCiclo: string;
  bombas: Bomba[];
  filtro: Filtro;
  valvulas: Valvula[];
  sistemasGermicidas: Germicida[];
}

export interface PiscinaListItem {
  id: number;
  nombre: string;
  direccion: string;
  volumen: number;
}

export interface PiscinaResume {
  id: number;
  nombre: string;
  direccion: string;
  volumen: string;
  clima: string;
  ph: number;
  diferenciaPh: number;
  entradaAgua: entradaAgua[];
  funcionActiva: funcionFiltro[];
  sistemasGermicidas: sistemaGermicida[];
  calefaccion: boolean;
}

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
  id: number;
  propietario?: Usuario;
  name: string;
  volume: number;
  bombas: Bomba[];
  germicidas: Germicida[];
  valvulas: Valvula[];
  calefaccion: Calefaccion;
  registro: Registro[];

  constructor(
    id: number,
    propietario: Usuario | undefined,
    name: string,
    volume: number,
    bombas: Bomba[],
    germicidas: Germicida[],
    valvulas: Valvula[],
    calefaccion: Calefaccion,
    registro: Registro[]
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


export type Filtro1 = {
  marca: string;
  modelo: string;
  diametro: number;
  estado: string;
};

export type Bomba = {
  id: number;
  marca: string;
  modelo: string;
  potencia: number;
  esVelocidadVariable: boolean;
  activa: boolean;
};


export type Germicida = {
  id: number;
  tipo: string;
  vidaRestante: number;
  estado: boolean;
}

export type Filtro = {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  diametro: number;
  activo: boolean;
  datoExtra?: number;
  estado?: string;
};

export type GermicidaBase = {
  id: number;
  tipo: 'uv' | 'trasductor' | 'ionizador';
  marca: string;
  vida: number;
  activa: boolean;
  //estado
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
  id: number;
  fecha: string;
  hora?: string;
  dispositivo: string;
  accion: string;
  descripcion: string;
  tecnico: string;
  tipoAccion: string;
  /*tipoAccion?:
    | 'mantenimiento'
    | 'reparacion'
    | 'instalacion'
    | 'configuracion'
    | 'otro';*/
};

export type entradaAgua = 'Fondo' | 'Barrefondo' | 'Skimmer';

export type ligthsType = 'manual' | 'programmed';

export type funcionFiltro =
  | 'filter'
  | 'backwash'
  | 'rinse'
  | 'drain'
  | 'recirculate';


export type sistemaGermicida = 'UV' | 'Ionizador' | 'Trasductor';

type EquipoDashboard = {
  tipo: string; // Tipo de equipo (por ejemplo, "Uv", "Ionizador")
  estado: string; // Estado del equipo (por ejemplo, "Operativo", "Inactivo")
};
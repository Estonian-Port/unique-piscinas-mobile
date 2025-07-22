import { Programacion } from './cicloFiltrado';
import { User } from './user';

export interface PiscinaNueva {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
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
  administradorId?: number;
}


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
}

export interface PiscinaProgramacion {
  id: number;
  nombre: string;
  direccion: string;
  volumen: string;
  programacionLuces: Programacion[];
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

export type Filtro = {
  marca: string;
  modelo: string;
  diametro: number;
  estado: string;
};

export type Bomba = {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  potencia: number;
  activa: boolean;
};

export type Germicida = {
  id: number;
  tipo: string;
  vidaRestante: number;
  activa: boolean;
  //estado
};

export type Valvula = {
  id: number;
  nombre: string;
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
  tipoAccion?:
    | 'mantenimiento'
    | 'reparacion'
    | 'instalacion'
    | 'configuracion'
    | 'otro';
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

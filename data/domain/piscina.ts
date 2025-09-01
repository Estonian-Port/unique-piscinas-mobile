import { Programacion } from './cicloFiltrado';
import { Equipo } from './equipo';
import { Usuario } from './user';

export interface PiscinaRegistrada {
  id: number;
  direccion: string;
  esDesbordante: boolean;
  nombreAdministrador: string;
  ph: number;
  sistemasGermicidas: Germicida[];
}

//Se usa en la vista ficha tecnica
export interface PiscinaFichaTecnica {
  id: number;
  direccion: string;
  ciudad: string;
  nombreAdministrador: string;
  codigoPlaca: number;
  esDesbordante: boolean;
  largo: number;
  ancho: number;
  profundidad: number;
  volumen: number;
  volumenTC: number | null;
  notas: string;
}

//Se usa en el formulario de nueva piscina
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
  sistemaGermicida: GermicidaBase[];
  calefaccion?: Calefaccion;
  cloroSalino: boolean;
  controlAutomaticoPH: boolean;
  orp: boolean;
  administradorId: number | null;
  notas?: string;
}

//Se usa en la vista de admin -> equipos
export interface PiscinaEquipos {
  id: number;
  direccion: string;
  bombas: Bomba[];
  filtro: Filtro;
  valvulas: Valvula[];
  sistemasGermicidas: Germicida[];
  calefaccion: Calefaccion | null;
  registros: Registro[];
}

//Se usa en la vista usuario -> programation
export interface PiscinaProgramacion {
  id: number;
  direccion: string;
  volumen: string;
  programacionIluminacion: Programacion[];
  programacionFiltrado: Programacion[];
}

//Se usa en la vista usuario -> equipment
export interface PiscinaEquipamiento {
  id: number;
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
  direccion: string;
  volumen: number;
}

export interface PiscinaResume {
  id: number;
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

export class Piscina {
  id: number;
  propietario?: Usuario;
  name: string;
  volume: number;
  filtro?: Filtro;
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

export type Bomba = {
  id: number;
  marca: string;
  modelo: string;
  potencia: number;
  esVelocidadVariable: boolean;
  activa: boolean;
};

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

//Esto se usa para traer datos del back
export type Germicida = {
  id: number;
  tipo: string;
  marca: string;
  vidaRestante: number;
  activo: boolean;
  estado: string;
  datoExtra: number;
};

//Esto se usa en el formulario de nueva piscina
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

export type Registro = {
  id: number;
  fecha: string;
  dispositivo: string;
  accion: string;
  descripcion: string;
  nombreTecnico: string;
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

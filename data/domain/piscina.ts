import { Programacion } from './cicloFiltrado';
import { Equipo } from './equipo';
import { Usuario } from './user';

export interface PiscinaRegistrada {
  id: number;
  direccion: string;
  esDesbordante: boolean;
  administradorNombre: string;
  ph: number;
  sistemasGermicidas: Germicida[];
}

export interface PiscinaFichaTecnica {
  id: number;
  direccion: string;
  ciudad: string;
  nombreAdministrador: string;
  placaId: number;
  esDesbordante: boolean;
  largo: number;
  ancho: number;
  profundidad: number;
  volumen: number;
  volumenTC: number | null;
  notas: string;
}

export interface PiscinaProgramacion {
  id: number;
  direccion: string;
  volumen: string;
  programacionIluminacion: Programacion[];
  programacionFiltrado: Programacion[];
}

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

export type Germicida = {
  id: number;
  tipo: string;
  vidaRestante: number;
  estado: string;
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

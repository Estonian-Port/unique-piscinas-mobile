interface Piscina {
  id: number;
  propietario?: User;
  name: string;
  volume: number;
  bombas: Bomba[];
  germicidas: Germicida[];
  valvulas: Valvula[];
  calefaccion: Calefaccion;
  registro: Registro[];
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

type waterInletsType = 'background' | 'skimmer' | 'bottomSweeper';

type ligthsType = 'manual' | 'programmed';

type EntryFilter = 'filter' | 'backwash' | 'rinse' | 'drain' | 'recirculate';

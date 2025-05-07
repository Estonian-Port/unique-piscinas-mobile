interface Piscina {
    id:number;
    name:string;
    volume:number;
    bombas:Bomba[]
}

type Bomba = {
    id: number;
    nombre: string;
    marca: string;
    modelo: string;
    potencia: number;
    activa: boolean;
  };

type waterInletsType = "background" | "skimmer" | "bottomSweeper";

type ligthsType = "manual" | "programmed";

type EntryFilter = "filter" | "backwash" | "rinse" | "drain" | "recirculate";
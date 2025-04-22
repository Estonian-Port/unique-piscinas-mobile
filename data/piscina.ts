interface Piscina {
    id:number;
    name:string;
    volume:number;
}

type waterInletsType = "background" | "skimmer" | "bottomSweeper";

type ligthsType = "manual" | "programmed";

type EntryFilter = "filter" | "backwash" | "rinse" | "drain" | "recirculate";
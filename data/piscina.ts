interface Piscina {
    id:number;
    name:string;
    volume:number;
    ph:number;
    temperature:number;
    location:string;
    //Estado del sistema
    filterStatus:boolean;
    activeMode:boolean;
    activeEntries:boolean;
    workingPressure:number;
    lastActivity:Date;
    nextCycle:Date;
    //Control del filtro
    waterInlets:waterInletsType;
    //Lampara UV
    hoursUsedUV:number;
    remainingHoursUV:number;
    //Ionizador de cobre
    positiveElectrode:number;
    negativeElectrode:number;
    copperIonLevel:number;
    //Transductor de ultrasonido
    hoursUsed:number;
    remainingHours:number;
    currentPower:number;
    germicidalEffectiveness:number;
    //Control de luces
    lightsStatus:boolean;
    mode:ligthsType;
    //Ultima lectura
    lastReading:Date;
}

type waterInletsType = {
    background:boolean;
    skimmer:boolean;
    bottomSweeper:boolean
}

type ligthsType = {
    mode:string;
}

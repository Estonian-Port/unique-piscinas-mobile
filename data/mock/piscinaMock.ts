const mockPiscina: Piscina = {
  id: 1,
  name: 'Piscina Principal',
  volume: 50000, // Volumen en litros
  ph: 7.2, // Nivel de pH
  temperature: 28, // Temperatura en grados Celsius
  location: 'Buenos Aires, Argentina', // Ubicación de la piscina
  // Estado del sistema
  filterStatus: true,
  activeMode: true,
  activeEntries: false,
  workingPressure: 1.2, // Presión en bares
  lastActivity: new Date('2025-04-01T10:30:00'), // Última actividad
  nextCycle: new Date('2025-04-02T08:00:00'), // Próximo ciclo
  // Control del filtro
  waterInlets: {
    background: false,
    skimmer: true,
    bottomSweeper: false,
  },
  // Lámpara UV
  hoursUsedUV: 1200, // Horas de uso
  remainingHoursUV: 300, // Horas restantes
  // Ionizador de cobre
  positiveElectrode: 85, // Porcentaje de desgaste
  negativeElectrode: 80, // Porcentaje de desgaste
  copperIonLevel: 0.5, // Nivel de iones de cobre en ppm
  // Transductor de ultrasonido
  hoursUsed: 1500, // Horas de uso
  remainingHours: 500, // Horas restantes
  currentPower: 75, // Potencia actual en porcentaje
  germicidalEffectiveness: 95, // Efectividad germicida en porcentaje
  // Control de luces
  lightsStatus: true,
  mode: {
    mode: 'Manual', // Modo de luces (por ejemplo, RGB, blanco, etc.)
  },
  // Última lectura
  lastReading: new Date('2025-04-01T10:00:00'), // Fecha de la última lectura
};

export default mockPiscina;
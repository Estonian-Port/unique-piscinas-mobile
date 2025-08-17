export interface StatDashboard {
  id: number;
  title: string;
  value: number;
  label: string;
  icon: string;
  unity: string;
  totalPiscinas: number;
  totalUsuarios: number;
  usuarioActivos: number;
  usuarioInactivos: number;
  piscinaSkimmer: number;
  piscinaDesborde: number;
  volumenTotal: number;
  volumenPromedio: number;
}

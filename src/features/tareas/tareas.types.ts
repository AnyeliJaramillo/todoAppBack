export interface ITarea {
  titulo: string;
  descripcion: string;
  proyecto: string;
  ingenieroAsignado: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  estado: 'Pendiente' | 'En progreso' | 'Finalizada';
}
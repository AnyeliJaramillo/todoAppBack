export interface ProyectoBody {
  nombre: string;
  descripcion: string;
  estado: 'Activo' | 'En espera' | 'Finalizado';
  prioridad: 'Alta' | 'Media' | 'Baja';
  fechaEntrega: string;
  ingenieroAsignado?: string | null;
}
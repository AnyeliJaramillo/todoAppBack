import Tarea from './tareas.model';
import { ITarea } from './tareas.types';

export const obtenerTareas = async () => {
  return await Tarea.find()
    .populate('proyecto', 'nombre descripcion estado prioridad fechaEntrega')
    .populate('ingenieroAsignado', 'nombre correo rol activo')
    .sort({ createdAt: -1 });
};

export const obtenerTareaPorId = async (id: string) => {
  return await Tarea.findById(id)
    .populate('proyecto', 'nombre descripcion estado prioridad fechaEntrega')
    .populate('ingenieroAsignado', 'nombre correo rol activo');
};

export const obtenerTareasPorIngeniero = async (ingenieroId: string) => {
  return await Tarea.find({ ingenieroAsignado: ingenieroId })
    .populate('proyecto', 'nombre descripcion estado prioridad fechaEntrega')
    .populate('ingenieroAsignado', 'nombre correo rol activo')
    .sort({ createdAt: -1 });
};

export const crearTarea = async (data: ITarea) => {
  const nuevaTarea = await Tarea.create(data);

  return await Tarea.findById(nuevaTarea._id)
    .populate('proyecto', 'nombre descripcion estado prioridad fechaEntrega')
    .populate('ingenieroAsignado', 'nombre correo rol activo');
};

export const actualizarTarea = async (id: string, data: Partial<ITarea>) => {
  return await Tarea.findByIdAndUpdate(id, data, { new: true })
    .populate('proyecto', 'nombre descripcion estado prioridad fechaEntrega')
    .populate('ingenieroAsignado', 'nombre correo rol activo');
};

export const eliminarTarea = async (id: string) => {
  return await Tarea.findByIdAndDelete(id);
};
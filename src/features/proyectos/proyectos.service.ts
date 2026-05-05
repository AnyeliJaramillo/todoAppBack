import { ProyectoModel } from './proyectos.model';
import { ProyectoBody } from './proyectos.types';
import Tarea from '../tareas/tareas.model';

export class ProyectosService {
  // CREAR
  async crearProyecto(data: ProyectoBody) {
    const nuevoProyecto = new ProyectoModel({
      ...data,
      ingenieroAsignado: data.ingenieroAsignado || null
    });

    return await nuevoProyecto.save();
  }

  // LISTAR
  async obtenerProyectos() {
    return await ProyectoModel.find()
      .populate('ingenieroAsignado', 'nombre correo')
      .sort({ createdAt: -1 });
  }

  // POR ID
  async obtenerProyectoPorId(id: string) {
    return await ProyectoModel.findById(id)
      .populate('ingenieroAsignado', 'nombre correo');
  }

  // ACTUALIZAR
  async actualizarProyecto(id: string, data: Partial<ProyectoBody>) {
    return await ProyectoModel.findByIdAndUpdate(
      id,
      {
        ...data,
        ingenieroAsignado: data.ingenieroAsignado || null
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('ingenieroAsignado', 'nombre correo');
  }

  // ELIMINAR PROYECTO Y SUS TAREAS
  async eliminarProyecto(id: string) {
    const proyecto = await ProyectoModel.findById(id);

    if (!proyecto) {
      return null;
    }

    await Tarea.deleteMany({ proyecto: id });
    await ProyectoModel.findByIdAndDelete(id);

    return proyecto;
  }

  // PROYECTOS POR INGENIERO
  async obtenerProyectosPorIngeniero(ingenieroId: string) {
    return await ProyectoModel.find({ ingenieroAsignado: ingenieroId })
      .populate('ingenieroAsignado', 'nombre correo rol')
      .sort({ createdAt: -1 });
  }
}

export const proyectosService = new ProyectosService();
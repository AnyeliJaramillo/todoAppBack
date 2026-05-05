import { Request, Response } from 'express';
import {
  obtenerTareas,
  obtenerTareaPorId,
  obtenerTareasPorIngeniero,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from './tareas.service';

export const getTareas = async (_req: Request, res: Response) => {
  try {
    const tareas = await obtenerTareas();
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener tareas',
      error
    });
  }
};

export const getTareaById = async (req: Request, res: Response) => {
  try {
    const tarea = await obtenerTareaPorId(req.params.id as string);

    if (!tarea) {
      return res.status(404).json({
        mensaje: 'Tarea no encontrada'
      });
    }

    return res.status(200).json(tarea);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener tarea',
      error
    });
  }
};

export const getTareasByIngeniero = async (req: Request, res: Response) => {
  try {
    const tareas = await obtenerTareasPorIngeniero(req.params.ingenieroId as string);
    return res.status(200).json(tareas);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener tareas del ingeniero',
      error
    });
  }
};

export const postTarea = async (req: Request, res: Response) => {
  try {
    const { titulo, descripcion, proyecto, ingenieroAsignado, prioridad, estado } = req.body;

    if (!titulo || !descripcion || !proyecto || !ingenieroAsignado) {
      return res.status(400).json({
        mensaje: 'Título, descripción, proyecto e ingeniero son obligatorios'
      });
    }

    const tarea = await crearTarea({
      titulo,
      descripcion,
      proyecto,
      ingenieroAsignado,
      prioridad,
      estado
    });

    return res.status(201).json({
      mensaje: 'Tarea creada correctamente',
      data: tarea
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al crear tarea',
      error
    });
  }
};

export const putTarea = async (req: Request, res: Response) => {
  try {
    const tareaActualizada = await actualizarTarea(req.params.id as string, req.body);

    if (!tareaActualizada) {
      return res.status(404).json({
        mensaje: 'Tarea no encontrada'
      });
    }

    return res.status(200).json({
      mensaje: 'Tarea actualizada correctamente',
      data: tareaActualizada
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar tarea',
      error
    });
  }
};

export const deleteTarea = async (req: Request, res: Response) => {
  try {
    const tareaEliminada = await eliminarTarea(req.params.id as string);

    if (!tareaEliminada) {
      return res.status(404).json({
        mensaje: 'Tarea no encontrada'
      });
    }

    return res.status(200).json({
      mensaje: 'Tarea eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar tarea',
      error
    });
  }
};
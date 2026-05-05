import { Request, Response } from 'express';
import { proyectosService } from './proyectos.service';

type ParamsId = {
  id: string;
};

type ParamsIngeniero = {
  ingenieroId: string;
};

export class ProyectosController {
  // Crear proyecto
  async crear(req: Request, res: Response) {
    try {
      const proyecto = await proyectosService.crearProyecto(req.body);

      res.status(201).json({
        mensaje: 'Proyecto creado correctamente',
        data: proyecto,
      });
    } catch (error: any) {
      res.status(400).json({
        mensaje: 'Error al crear proyecto',
        error: error.message,
      });
    }
  }

  // Obtener todos los proyectos
  async listar(req: Request, res: Response) {
    try {
      const proyectos = await proyectosService.obtenerProyectos();

      res.status(200).json(proyectos);
    } catch (error: any) {
      res.status(500).json({
        mensaje: 'Error al obtener proyectos',
        error: error.message,
      });
    }
  }

  // Obtener proyectos por ingeniero
  async listarPorIngeniero(req: Request<ParamsIngeniero>, res: Response) {
    try {
      const { ingenieroId } = req.params;

      const proyectos = await proyectosService.obtenerProyectosPorIngeniero(
        ingenieroId
      );

      res.status(200).json(proyectos);
    } catch (error: any) {
      res.status(500).json({
        mensaje: 'Error al obtener proyectos del ingeniero',
        error: error.message,
      });
    }
  }

  // Obtener proyecto por ID
  async obtenerPorId(req: Request<ParamsId>, res: Response) {
    try {
      const { id } = req.params;

      const proyecto = await proyectosService.obtenerProyectoPorId(id);

      if (!proyecto) {
        return res.status(404).json({
          mensaje: 'Proyecto no encontrado',
        });
      }

      res.status(200).json(proyecto);
    } catch (error: any) {
      res.status(500).json({
        mensaje: 'Error al obtener proyecto',
        error: error.message,
      });
    }
  }

  // Actualizar proyecto
  async actualizar(req: Request<ParamsId>, res: Response) {
    try {
      const { id } = req.params;

      const proyectoActualizado = await proyectosService.actualizarProyecto(
        id,
        req.body
      );

      if (!proyectoActualizado) {
        return res.status(404).json({
          mensaje: 'Proyecto no encontrado',
        });
      }

      res.status(200).json({
        mensaje: 'Proyecto actualizado correctamente',
        data: proyectoActualizado,
      });
    } catch (error: any) {
      res.status(400).json({
        mensaje: 'Error al actualizar proyecto',
        error: error.message,
      });
    }
  }

  // Eliminar proyecto
  async eliminar(req: Request<ParamsId>, res: Response) {
    try {
      const { id } = req.params;

      const proyectoEliminado = await proyectosService.eliminarProyecto(id);

      if (!proyectoEliminado) {
        return res.status(404).json({
          mensaje: 'Proyecto no encontrado',
        });
      }

      res.status(200).json({
        mensaje: 'Proyecto eliminado correctamente',
      });
    } catch (error: any) {
      res.status(500).json({
        mensaje: 'Error al eliminar proyecto',
        error: error.message,
      });
    }
  }
}

export const proyectosController = new ProyectosController();
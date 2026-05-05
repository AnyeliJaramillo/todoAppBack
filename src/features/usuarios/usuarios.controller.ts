import { Request, Response } from 'express';
import {
  obtenerUsuarios,
  crearUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  obtenerIngenieros,
  actualizarCredencialesUsuario
} from './usuarios.service';

export const getUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener usuarios',
      error
    });
  }
};

export const getIngenieros = async (_req: Request, res: Response) => {
  try {
    const ingenieros = await obtenerIngenieros();
    res.status(200).json(ingenieros);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener ingenieros',
      error
    });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await crearUsuario(req.body);

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      data: usuario
    });
  } catch (error: any) {
    res.status(400).json({
      mensaje: error.message || 'Error al crear usuario'
    });
  }
};

export const getUsuarioById = async (req: Request, res: Response) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id as string);

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener usuario',
      error
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioActualizado = await actualizarUsuario(
      req.params.id as string,
      req.body
    );

    if (!usuarioActualizado) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      mensaje: 'Usuario actualizado correctamente',
      data: usuarioActualizado
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar usuario',
      error
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioEliminado = await eliminarUsuario(req.params.id as string);

    if (!usuarioEliminado) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      mensaje: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar usuario',
      error
    });
  }
};

export const putCredencialesUsuario = async (req: Request, res: Response) => {
  try {
    const { correo, password } = req.body;

    const resultado = await actualizarCredencialesUsuario(
      req.params.id as string,
      correo,
      password
    );

    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(400).json({
      mensaje: error.message || 'No se pudieron actualizar las credenciales'
    });
  }
};
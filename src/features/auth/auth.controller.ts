import { Request, Response } from 'express';
import {
  loginUsuario,
  loginConGoogle,
  enviarCodigoRecuperacion,
  verificarCodigoRecuperacion,
  restablecerPasswordConCodigo
} from './auth.service';

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { correo, password } = req.body;

    const resultado = await loginUsuario(correo, password);

    return res.status(200).json({
      mensaje: 'Inicio de sesión correcto',
      ...resultado
    });
  } catch (error: any) {
    return res.status(401).json({
      mensaje: error.message || 'Error al iniciar sesión'
    });
  }
};

export const postGoogleLogin = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        mensaje: 'La credencial de Google es obligatoria'
      });
    }

    const resultado = await loginConGoogle(credential);

    return res.status(200).json({
      mensaje: 'Inicio de sesión con Google correcto',
      ...resultado
    });
  } catch (error: any) {
    return res.status(401).json({
      mensaje: error.message || 'Error al iniciar sesión con Google'
    });
  }
};

export const postEnviarCodigoRecuperacion = async (req: Request, res: Response) => {
  try {
    const { correo } = req.body;

    const resultado = await enviarCodigoRecuperacion(correo);

    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(400).json({
      mensaje: error.message || 'No se pudo enviar el código'
    });
  }
};

export const postVerificarCodigoRecuperacion = async (req: Request, res: Response) => {
  try {
    const { correo, codigo } = req.body;

    const resultado = await verificarCodigoRecuperacion(correo, codigo);

    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(400).json({
      mensaje: error.message || 'No se pudo verificar el código'
    });
  }
};

export const postRestablecerPassword = async (req: Request, res: Response) => {
  try {
    const { correo, nuevaPassword } = req.body;

    const resultado = await restablecerPasswordConCodigo(correo, nuevaPassword);

    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(400).json({
      mensaje: error.message || 'No se pudo restablecer la contraseña'
    });
  }
};
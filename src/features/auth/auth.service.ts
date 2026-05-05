import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import Usuario from '../usuarios/usuarios.model';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generarToken = (usuario: any) => {
  return jwt.sign(
    {
      id: usuario._id,
      correo: usuario.correo,
      rol: usuario.rol
    },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '8h' }
  );
};

export const loginUsuario = async (correo: string, password: string) => {
  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  if (!usuario.activo) {
    throw new Error('Usuario inactivo');
  }

  let passwordValida = false;

  if (usuario.password.startsWith('$2a$') || usuario.password.startsWith('$2b$')) {
    passwordValida = await bcrypt.compare(password, usuario.password);
  } else {
    passwordValida = usuario.password === password;

    if (passwordValida) {
      usuario.password = await bcrypt.hash(password, 10);
      await usuario.save();
    }
  }

  if (!passwordValida) {
    throw new Error('Contraseña incorrecta');
  }

  const token = generarToken(usuario);

  return {
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      activo: usuario.activo
    }
  };
};

export const loginConGoogle = async (credential: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('No se pudo validar la cuenta de Google');
  }

  const correo = payload.email?.toLowerCase();

  if (!correo) {
    throw new Error('Google no devolvió un correo válido');
  }

  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    throw new Error('Este correo no está registrado en el sistema');
  }

  if (!usuario.activo) {
    throw new Error('Usuario inactivo');
  }

  const token = generarToken(usuario);

  return {
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      activo: usuario.activo
    }
  };
};

export const enviarCodigoRecuperacion = async (correo: string) => {
  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    throw new Error('No existe un usuario con ese correo');
  }

  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  const expiracion = new Date(Date.now() + 5 * 60 * 1000);

  usuario.resetCode = codigo;
  usuario.resetCodeExpires = expiracion;
  usuario.resetVerified = false;

  await usuario.save();

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: correo,
    subject: 'Código de recuperación - TodoAppDev',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Recuperación de contraseña</h2>
        <p>Tu código de verificación es:</p>
        <h1 style="letter-spacing: 4px;">${codigo}</h1>
        <p>Este código vence en 5 minutos.</p>
      </div>
    `
  });

  return {
    mensaje: 'Código enviado con éxito'
  };
};

export const verificarCodigoRecuperacion = async (correo: string, codigo: string) => {
  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    throw new Error('No existe un usuario con ese correo');
  }

  if (!usuario.resetCode || !usuario.resetCodeExpires) {
    throw new Error('No hay un código activo para este usuario');
  }

  if (new Date() > new Date(usuario.resetCodeExpires)) {
    throw new Error('El código ha expirado');
  }

  if (usuario.resetCode !== codigo) {
    throw new Error('El código es incorrecto');
  }

  usuario.resetVerified = true;
  await usuario.save();

  return {
    mensaje: 'Código verificado correctamente'
  };
};

export const restablecerPasswordConCodigo = async (
  correo: string,
  nuevaPassword: string
) => {
  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    throw new Error('No existe un usuario con ese correo');
  }

  if (!usuario.resetVerified) {
    throw new Error('Primero debes verificar el código');
  }

  usuario.password = await bcrypt.hash(nuevaPassword, 10);
  usuario.resetCode = null;
  usuario.resetCodeExpires = null;
  usuario.resetVerified = false;

  await usuario.save();

  return {
    mensaje: 'Contraseña actualizada correctamente'
  };
};
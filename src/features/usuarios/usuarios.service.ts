import bcrypt from 'bcryptjs';
import Usuario from './usuarios.model';
import { IUsuario } from './usuarios.types';

export const obtenerUsuarios = async () => {
  return await Usuario.find().select('-password -resetCode');
};

export const obtenerIngenieros = async () => {
  return await Usuario.find({
    rol: 'ingeniero',
    activo: true
  }).select('-password -resetCode');
};

export const crearUsuario = async (data: IUsuario) => {
  const existe = await Usuario.findOne({ correo: data.correo });

  if (existe) {
    throw new Error('El correo ya está registrado');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const nuevoUsuario = await Usuario.create({
    ...data,
    password: passwordHash
  });

  return await Usuario.findById(nuevoUsuario._id).select('-password -resetCode');
};

export const obtenerUsuarioPorId = async (id: string) => {
  return await Usuario.findById(id).select('-password -resetCode');
};

export const actualizarUsuario = async (id: string, data: Partial<IUsuario>) => {
  const datosActualizados: Partial<IUsuario> = { ...data };

  if (data.password) {
    datosActualizados.password = await bcrypt.hash(data.password, 10);
  }

  return await Usuario.findByIdAndUpdate(id, datosActualizados, { new: true }).select(
    '-password -resetCode'
  );
};

export const eliminarUsuario = async (id: string) => {
  return await Usuario.findByIdAndDelete(id);
};

export const actualizarCredencialesUsuario = async (
  id: string,
  correo: string,
  password: string
) => {
  const usuario = await Usuario.findById(id);

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const correoExistente = await Usuario.findOne({
    correo,
    _id: { $ne: id }
  });

  if (correoExistente) {
    throw new Error('Ese correo ya está en uso');
  }

  usuario.correo = correo;

  if (password && password.trim()) {
    usuario.password = await bcrypt.hash(password, 10);
  }

  await usuario.save();

  return {
    mensaje: 'Credenciales actualizadas correctamente'
  };
};
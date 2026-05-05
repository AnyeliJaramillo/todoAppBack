export interface IUsuario {
  nombre: string;
  correo: string;
  password: string;
  rol: string;
  activo?: boolean;
}
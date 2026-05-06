import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './features/auth/auth.routes';
import usuariosRoutes from './features/usuarios/usuarios.routes';
import proyectosRoutes from './features/proyectos/proyectos.routes';
import tareasRoutes from './features/tareas/tareas.routes';

dotenv.config();

const app = express();


app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API funcionando');
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/tareas', tareasRoutes);

const PORT = process.env.PORT || 4000;

const iniciarServidor = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

iniciarServidor();
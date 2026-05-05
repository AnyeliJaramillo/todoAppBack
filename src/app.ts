import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './features/auth/auth.routes';
import usuariosRoutes from './features/usuarios/usuarios.routes';
import proyectosRoutes from './features/proyectos/proyectos.routes';
import tareasRoutes from './features/tareas/tareas.routes';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:4200',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
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
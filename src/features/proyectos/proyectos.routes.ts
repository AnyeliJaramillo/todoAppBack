import { Router } from 'express';
import { proyectosController } from './proyectos.controller';

const router = Router();

router.post('/', proyectosController.crear.bind(proyectosController));
router.get('/', proyectosController.listar.bind(proyectosController));
router.get('/ingeniero/:ingenieroId', proyectosController.listarPorIngeniero.bind(proyectosController));
router.get('/:id', proyectosController.obtenerPorId.bind(proyectosController));
router.put('/:id', proyectosController.actualizar.bind(proyectosController));
router.delete('/:id', proyectosController.eliminar.bind(proyectosController));

export default router;
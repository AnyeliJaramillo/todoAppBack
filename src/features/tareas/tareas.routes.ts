import { Router } from 'express';
import {
  getTareas,
  getTareaById,
  getTareasByIngeniero,
  postTarea,
  putTarea,
  deleteTarea
} from './tareas.controller';

const router = Router();

router.get('/', getTareas);
router.post('/', postTarea);
router.get('/ingeniero/:ingenieroId', getTareasByIngeniero);
router.get('/:id', getTareaById);
router.put('/:id', putTarea);
router.delete('/:id', deleteTarea);

export default router;
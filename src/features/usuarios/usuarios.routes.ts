import { Router } from 'express';
import {
  getUsuarios,
  getIngenieros,
  postUsuario,
  getUsuarioById,
  putUsuario,
  deleteUsuario,
  putCredencialesUsuario
} from './usuarios.controller';

const router = Router();

router.get('/ingenieros', getIngenieros);

router.get('/', getUsuarios);
router.post('/', postUsuario);
router.get('/:id', getUsuarioById);
router.put('/:id', putUsuario);
router.put('/:id/credenciales', putCredencialesUsuario);
router.delete('/:id', deleteUsuario);

export default router;
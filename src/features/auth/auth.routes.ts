import { Router } from 'express';
import {
  postLogin,
  postGoogleLogin,
  postEnviarCodigoRecuperacion,
  postVerificarCodigoRecuperacion,
  postRestablecerPassword
} from './auth.controller';

const router = Router();

router.post('/login', postLogin);
router.post('/google-login', postGoogleLogin);
router.post('/enviar-codigo-recuperacion', postEnviarCodigoRecuperacion);
router.post('/verificar-codigo-recuperacion', postVerificarCodigoRecuperacion);
router.post('/restablecer-password', postRestablecerPassword);

export default router;
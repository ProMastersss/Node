import { Router } from 'express';
import {
  changePassword,
  index,
  login,
  logout,
  register,
  registrationPage,
  uploadAvatar,
} from '../controllers/profileController.js';
import { isAuthenticatedMiddleware } from '../middleware/auth.js';
import validator, {
  emailValidation,
  passwordValidation,
} from '../validators/registration.js';

const router = new Router();

router.get('/', isAuthenticatedMiddleware, index);
router.get('/logout', logout);
router.post('/login', emailValidation, login);
router.post('/registration', registrationPage);
router.post('/register-user', validator, register);
router.post(
  '/change-password',
  isAuthenticatedMiddleware,
  passwordValidation,
  changePassword
);
router.post('/upload-avatar', uploadAvatar);

export default router;

import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

// rotas
usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;

// rotas dos usuarios, cada rota tem seu controller onde executa as funcionalidades;

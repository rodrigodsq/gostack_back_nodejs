import uploadConfig from '@config/upload';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import multer from 'multer';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';



const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// rotas
usersRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;

// rotas dos usuarios, cada rota tem seu controller onde executa as funcionalidades;

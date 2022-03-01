import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import ProfileController from '../controllers/ProfileController';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';



const profileRouter = Router();
const profileController = new ProfileController();

// rotas
profileRouter.use(ensureAuthenticate); // declramos no começo das rotas pq vamos precisar em todas as rotas;

profileRouter.get('/', profileController.show);
profileRouter.put('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid( Joi.ref('password'))
        }
    }),
    profileController.update
);

export default profileRouter;

// rotas dos usuarios, cada rota tem seu controller onde executa as funcionalidades;

import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

// rotas
profileRouter.use(ensureAuthenticate); // declramos no começo das rotas pq vamos precisar em todas as rotas;

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;

// rotas dos usuarios, cada rota tem seu controller onde executa as funcionalidades;

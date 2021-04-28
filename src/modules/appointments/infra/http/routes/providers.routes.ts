import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersControllers from '../controllers/ProvidersControllers';

const providersRouter = Router();

const providersControllers = new ProvidersControllers();

// fazendo isso a middleware passa em todas as rotas de providers;
providersRouter.use(ensureAuthenticate);

providersRouter.get('/', providersControllers.index);

export default providersRouter;

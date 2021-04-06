import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsControllers';

const appointmentsRouter = Router();

// instanciando o controller de appointments
const appointmentsController = new AppointmentsController();

// fazendo isso a middleware passa em todas as rotas de appointments;
appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;

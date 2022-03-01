import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import AppointmentsController from '../controllers/AppointmentsControllers';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsControllers';


const appointmentsRouter = Router();

// instanciando o controller de appointments
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// fazendo isso a middleware passa em todas as rotas de appointments;
appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date(),
    }
}), appointmentsController.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;

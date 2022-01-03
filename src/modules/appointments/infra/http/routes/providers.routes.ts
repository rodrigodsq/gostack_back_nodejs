import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityControllers';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityControllers';
import ProvidersControllers from '../controllers/ProvidersControllers';

const providersRouter = Router();

const providersControllers = new ProvidersControllers();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

// fazendo isso a middleware passa em todas as rotas de providers;
providersRouter.use(ensureAuthenticate);

providersRouter.get('/', providersControllers.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default providersRouter;

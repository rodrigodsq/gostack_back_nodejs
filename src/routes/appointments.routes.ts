import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/appointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentsService';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// fazendo isso a middleware passa em todas as rotas de appointments;
appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService();

    const appointments = await CreateAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointments);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;

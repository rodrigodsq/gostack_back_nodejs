import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    // arquivo para importa as funcionalidades do service, onde ocorre toda logica e interação com o bd
    // container.resolve(CreateAppointmentService)  :   informa que na class service ja esta recebendo a injeção de dependencia;
    const CreateAppointment = container.resolve(CreateAppointmentService);

    // aqui nos executamos as regras de negocios do service e recebemos o resultado;
    const appointments = await CreateAppointment.execute({
      date: parsedDate,
      provider_id,
      user_id
    });

    return response.json(appointments);
  }
}

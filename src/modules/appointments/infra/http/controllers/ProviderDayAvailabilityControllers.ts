import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { day, month, year } = request.query;

    const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);

    // aqui nos executamos as regras de negocios do service e recebemos o resultado;
    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return response.json(availability);
  }
}
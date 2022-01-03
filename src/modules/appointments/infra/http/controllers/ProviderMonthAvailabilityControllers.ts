import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

    // aqui nos executamos as regras de negocios do service e recebemos o resultado;
    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year
    });

    return response.json(availability);
  }
}
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;

/*
extends Repository<Appointment>   :   `Repository é uma classe que esta sendo herdada e estamos passando Appointment como interface`
*/

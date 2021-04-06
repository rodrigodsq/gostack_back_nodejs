import { getRepository, Repository } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

// extends Repository<Appointment>   :   `Repository é uma classe que esta sendo herdada e estamos passando Appointment como interface`, REMOVIDO...
// private ormRepository: Repository<Appointment>    :   `definindo o tipo de ormRepository;`
// this.ormRepository = getRepository(Appointment)    :   `criando uma abstração do repositorio "Appointment", para executar os comandos sql ;`
// implements IAppointmentRepository   :    implementado as funcionalidades dessa classe com interface IAppointmentRepository, que vai ser exportada para as regras de negocio (services);

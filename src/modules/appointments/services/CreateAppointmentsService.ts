import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

// @injectable()  :   vai em toda classe que precisamos fazer injeção de dependencia;
@injectable()
class CreateAppointmentService {
  // private appointmentsRepository: IAppointmentRepository   :   ja declarando uma var no paramentro do contrutor;
  // @inject('AppointmentsRepository')    :   para injetar a dependencia do arquivo container, do id 'AppointmentsRepository';
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appoinments is already booked');
    }

    const appoinments = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appoinments;
  }
}

export default CreateAppointmentService;

import AppError from '@shared/errors/AppError';
import { getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';


interface IRequest {
  provider_id: string;
  user_id: string;
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

  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    //verificando se a data é antiga
    if ( isBefore(appointmentDate, Date.now())) {
        throw new AppError("You can't create an appointment on a past date.");
    }

    // usuario não pode fazer agendamento consigo mesmo;
    if ( user_id === provider_id ) {
        throw new AppError("You can't create an appointment with yourself.");
    }

    //so podem ser realizados agendamento entre as 8h e as 17h
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
        throw new AppError("You can't only create an appointments between 8am and 5pm.");
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appoinments is already booked');
    }

    const appoinments = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appoinments;
  }
}

export default CreateAppointmentService;

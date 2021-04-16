import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

// private appointments : `é um array da entidade Appointment(serve apenas como interface), para funcionar como se fosse nosso bd dados fake`;

// Object.assign()  :   `para colocar valores dentro de objetos, onde no primeiro parametro é passado o objt desejado, e no segundo são as chaves do objeto com os valores`;
// EXEMPLO: basicamente faz isso: ↓
// appointment.id = uuid();
// appointment.date = date;
// appointment.provider_id = provider_id;

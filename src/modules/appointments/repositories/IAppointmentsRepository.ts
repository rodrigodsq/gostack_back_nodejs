import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import Appointment from '../infra/typeorm/entities/appointment';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
      data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
      data: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>;
}

// utilizamos essa interface para caso alteramos as tecnologias, sabemos que precisamos dessas informações (como no caso a função "findByDate"). implementamos essa inertface dentro do infra/typeorm/repositories;

// criar essas interface é um principio SOLID, Liskov Substitution Principle;

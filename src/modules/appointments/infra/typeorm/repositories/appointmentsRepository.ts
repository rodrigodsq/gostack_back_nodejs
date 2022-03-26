import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Raw, Repository } from 'typeorm';
import Appointment from '../entities/appointment';



class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id, month, year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

    // verifica se o "month" tem dois digitos, caso não tenha ele coloca um zero no começo;
    const parseMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`,
        ),
      }
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id, day, month, year
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

    // verifica se o "month" tem dois digitos, caso não tenha ele coloca um zero no começo;
    const parseDay = String(day).padStart(2, '0');
    const parseMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`,
        ),
      },
      relations: ['user'],   //com isso ele traz os dados dos usuarios relacionados;
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
        provider_id,
        user_id,
        date
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

// extends Repository<Appointment>   :   `Repository é uma classe que esta sendo herdada e estamos passando Appointment como interface`, REMOVIDO...
// private ormRepository: Repository<Appointment>    :   `definindo o tipo de ormRepository;`
// this.ormRepository = getRepository(Appointment)    :   `criando uma abstração do repositorio "Appointment", para executar os comandos sql ;`
// implements IAppointmentRepository   :    implementado as funcionalidades dessa classe com interface IAppointmentRepository, que vai ser exportada para as regras de negocio (services);
// Raw()  :   `serve para passarmos um texto, pode ser uma query sql`;
// dateFieldName  :   o nome da chave "date" dentro da consulta sql;
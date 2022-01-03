import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

//modelo utilizado quando o tipo retornado deve ser um array;
// é tipo uma interface, so que usado para tipos arrays;
type IResponse = Array<{
    hour: number;
    available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, year, month, day }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day
    })

    const hourStart = 8;

    // criando um array de 10 posições onde começa do 9, exemplo: [9, 10, 11, ...]
    const eachHourArray = Array.from(
        { length: 10 },
        (_, index) => index + hourStart,
    );

    // pegando o horario atual
    const currentDate = new Date(Date.now());

    // verifica os horarios disponiveis do dia;
    const availability = eachHourArray.map(hour => {
        const hasAppointmentInHour = appointments.find(appointment =>
            getHours(appointment.date) === hour
        );

        const compareDate = new Date(year, month - 1, day, hour)

        return {
            hour,
            available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
        }
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;


//listar todos os horarios disponiveis no dia;

//isAfter(compareDate, currentDate) : para que pegue somente agendamentos com horarios apos o horario atual;
import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

//modelo utilizado quando o tipo retornado deve ser um array;
// é tipo uma interface, so que usado para tipos arrays;
type IResponse = Array<{
    day: number;
    available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
        provider_id,
        year,
        month,
    });

    //pegar quantos dias tem no mes passado
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    //criando um array com a quantidade de dias do mes escolhido, basicamene [1, 2, 3 ... ];
    const eachDaysArray = Array.from(
        { length: numberOfDaysInMonth },
        (_, index) => index + 1,
    )

    // verificando os dias que tem horarios disponiveis;
    // colocando como base 10, pq das 8h ate as 17h o maximo é 10 horarios que podem ser agendados;
    const availability = eachDaysArray.map(day => {
        const appointmentsInDay = appointments.filter(appointment => {
            return getDate(appointment.date) === day;
        });
        return {
            day,
            available: appointmentsInDay.length < 10
        };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;


//listar os dias disponiveis de um prestador no mes;
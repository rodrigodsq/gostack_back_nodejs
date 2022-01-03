import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository : FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
      fakeAppointmentsRepository = new FakeAppointmentsRepository();
      listProviderDayAvailability = new ListProviderDayAvailabilityService(
        fakeAppointmentsRepository,
      );
  });

  // testando a busca por todos horarios disponiveis de um prestador em um dia;
  it('should be able to list the Day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2022, 4, 20, 11, 0, 0).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
        provider_id: 'user',
        year: 2022,
        month: 5,
        day: 20
    })

    //espero que seja um array
    //e tenha os dias 20 e 21 com available: false
    expect(availability).toEqual(expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
    ]))

  });
});

// diferente do toBe() que verifica se é a mesma variavel, o toEqual() verifica se os valores são iguais/parecidos;
// expect.arrayContaining   :   verifica se a resposta do "availability" é um array contendo a informação passada;
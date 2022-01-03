import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository : FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
      fakeAppointmentsRepository = new FakeAppointmentsRepository();
      listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
        fakeAppointmentsRepository,
      );
  });

  // testando a busca por todas as datas disponiveis de um prestador em um mes;
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 13, 0, 0),
    });

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

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2022, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
        provider_id: 'user',
        year: 2022,
        month: 5
    })

    //espero que seja um array
    //e tenha os dias 20 e 21 com available: false
    expect(availability).toEqual(expect.arrayContaining([
        {day: 19, available: true},
        {day: 20, available: false},
        {day: 21, available: true},
        {day: 22, available: true},
    ]))

  });
});

// diferente do toBe() que verifica se é a mesma variavel, o toEqual() verifica se os valores são iguais/parecidos;
// expect.arrayContaining   :   verifica se a resposta do "availability" é um array contendo a informação passada;
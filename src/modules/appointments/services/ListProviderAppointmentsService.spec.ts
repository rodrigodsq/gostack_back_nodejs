import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeCachedProvider from '@shared/container/providers/CacheProvider/fakes/FakeCachedProvider';


let fakeAppointmentsRepository : FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCachedProvider: FakeCachedProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
      fakeAppointmentsRepository = new FakeAppointmentsRepository();
      fakeCachedProvider = new FakeCachedProvider();

      listProviderAppointments = new ListProviderAppointmentsService(
        fakeAppointmentsRepository,
        fakeCachedProvider
      );
  });

  // testando a busca por todos os agendamentos do prestador;
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2022, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2022, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
        provider_id: 'provider',
        year: 2022,
        month: 5,
        day: 20
    })

    expect(appointments).toEqual([appointment1, appointment2])

  });
});

// diferente do toBe() que verifica se é a mesma variavel, o toEqual() verifica se os valores são iguais/parecidos;
// expect.arrayContaining   :   verifica se a resposta do "availability" é um array contendo a informação passada;
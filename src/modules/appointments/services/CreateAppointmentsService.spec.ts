import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCachedProvider from '@shared/container/providers/CacheProvider/fakes/FakeCachedProvider';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCachedProvider: FakeCachedProvider;
let fakeNotificationRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationsRepository();
    fakeCachedProvider = new FakeCachedProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
      fakeCachedProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2022, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2022, 4, 10, 13),
      user_id: '123123',
      provider_id: '156114554'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('156114554');
  });

  // verificando se dois agendamentos ao mesmo tempo irá da error;
  it('should not be able to create two appointments on the same time', async () => {
    // predefinindo a data de 10/05/2021 as 11h;
    const appointmentDate = new Date(2022, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '156114554'
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '156114554'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  //não vai permitir agendamentos em data que ja passaram;
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
        createAppointment.execute({
          date: new Date(2022, 4, 10, 11),
          user_id: '123123',
          provider_id: '156114554'
        }),
      ).rejects.toBeInstanceOf(AppError);
  });

  //o user e o provider não podem ser iguais, o usuario não pode fazer um agendamento consigo mesmo;
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
        createAppointment.execute({
          date: new Date(2022, 4, 10, 13),
          user_id: '123123',
          provider_id: '123123'
        }),
      ).rejects.toBeInstanceOf(AppError);
  });

  // so podem ser realizados agendamento entre as 8h e as 17h
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
        createAppointment.execute({
          date: new Date(2022, 4, 11, 7),
          user_id: '123123',
          provider_id: '156114554'
        }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
        createAppointment.execute({
          date: new Date(2022, 4, 11, 18),
          user_id: '123123',
          provider_id: '156114554'
        }),
    ).rejects.toBeInstanceOf(AppError);
  });

});

// expect()   :   significa "o que espero", onde colocamos o codigo ou a função que desejamos executar/testar;
// toBe()   :   `significa "que seja", onde colocamos o resultado esperado do teste`;
// toHaveProperty() :  `espera que tenha a propriedade passa por paramentro no elemento esperado`;
// describe() : utilizado para dividir os testes, para não serem todos iguais, com um paramentro de identificador;
// it()   :   tipo uma descrição de cada teste;
// rejects :  espera que retorne algum error
// toBeInstanceOf : espera que seja uma instancia de determinado elemento;

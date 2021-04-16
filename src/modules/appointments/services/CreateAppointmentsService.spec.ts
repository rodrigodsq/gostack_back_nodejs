import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentsService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '156114554',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('156114554');
  });

  // verificando se dois agendamentos ao mesmo tempo irá da error;
  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    // predefinindo a data de 10/05/2021 as 11h;
    const appointmentDate = new Date(2021, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '156114554',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '156114554',
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

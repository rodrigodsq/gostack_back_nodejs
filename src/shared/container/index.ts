import { container } from 'tsyringe';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

// Arquivo para injeção de dependencia;
// conteiner que serão usados pelos arquivos do services (o service busca pelo id a injeção desejado) para que não precisemos passar como paramentro o nosso repositorio no contructor dos services e nem nas rotas, pois o conteiner resolve ja resolve isso nas rotas;
// o que esta sendo injetado são os Repository(abtrações, models para interação com banco de dados);
// IAppointmentRepository   :   tipagem da injeção de dependencia, definindo o formato;
// 'AppointmentsRepository'   :   com aspas é o id da injeção;
// AppointmentsRepository   :   repositorio que vai ser injetado;
// a diferença entre register e registerSingleton é que o register sempre cria uma nova instacia toda ver q é chamado, e o registerSingleton cria apenas uma vez;

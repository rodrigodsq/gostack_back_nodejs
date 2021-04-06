import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    // arquivo para importa as funcionalidades do service, onde ocorre toda logica e interação com o bd
    // container.resolve(AuthenticateUserService)  :   informa que na class service ja esta recebendo a injeção de dependencia;
    const authenticateUser = container.resolve(AuthenticateUserService);

    // aqui nos executamos as regras de negocios do service e recebemos o resultado;
    // usando descontrução p pegar a chave "user" vinda do reponse;
    const { user, token } = await authenticateUser.execute({ email, password });

    // @ts-expect-error Vai ocorrer um erro no delete user.password, mas vou ignorar
    delete user.password;

    return response.json({ user, token });
  }
}

// seguindo os principios de api rest, os controller devem ter no maximo 5 metodos (index, show, create, update, delete);

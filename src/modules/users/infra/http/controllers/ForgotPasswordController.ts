import { Request, Response } from 'express';

import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    // container.resolve(AuthenticateUserService)  :   informa que na class service ja esta recebendo a injeção de dependencia;
    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    // aqui nos executamos as regras de negocios do service e recebemos o resultado;
    await sendForgotPasswordEmail.execute({ email });

    return response.status(204).json();
  }
}

// seguindo os principios de api rest, os controller devem ter no maximo 5 metodos (index, show, create, update, delete);

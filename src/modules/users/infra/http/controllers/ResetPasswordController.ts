import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    // container.resolve(ResetPasswordService)  :   informa que na class service ja esta recebendo a injeção de dependencia;
    const resetPassword = container.resolve(ResetPasswordService);

    // aqui nos executamos as regras de negocios do service e recebemos o resultado;
    await resetPassword.execute({ token, password });

    return response.status(204).json();
  }
}

// seguindo os principios de api rest, os controller devem ter no maximo 5 metodos (index, show, create, update, delete);

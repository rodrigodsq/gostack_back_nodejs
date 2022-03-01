import CreateUserService from '@modules/users/services/CreateUserService';
import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    // arquivo para importa as funcionalidades do service, onde ocorre toda logica e interação com o bd
    // container.resolve() :   informa que na class service ja esta recebendo a injeção de dependencia;
    const createUser = container.resolve(CreateUserService);

    // executando a regra de negocio do service, e retornando o resultado na const user;
    const user = await createUser.execute({
        name,
        email,
        password,
    });

    return response.json(classToPlain(user));
  }
}

// seguindo os principios de api rest, os controller devem ter no maximo 5 metodos (index, show, create, update, delete);
// são responsaveis apenas por receber as requisições das rotas, enviar para os arquivos fazerem todas as funcionalidades, e retorna o resultado;

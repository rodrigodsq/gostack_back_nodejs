import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  // exibir dados do perfil do usuario logado
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    // arquivo para importa as funcionalidades do service, onde ocorre toda logica e interação com o bd
    // container.resolve() :   informa que na class service ja esta recebendo a injeção de dependencia;
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    // removendo do user a chave password, para não ser retornado ao frontend;
    // @ts-expect-error Vai ocorrer um erro no delete user.password, mas vou ignorar
    delete user.password;

    return response.json(user);
  }

  // atualizar usuario logado
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, old_password, password } = request.body;

      // arquivo para importa as funcionalidades do service, onde ocorre toda logica e interação com o bd
      // container.resolve() :   informa que na class service ja esta recebendo a injeção de dependencia;
      const updateProfile = container.resolve(UpdateProfileService);

      // executando a regra de negocio do service, e retornando o resultado na const user;
      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      // removendo do user a chave password, para não ser retornado ao frontend;
      // @ts-expect-error Vai ocorrer um erro no delete user.password, mas vou ignorar
      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ Error: err.message });
    }
  }
}

// seguindo os principios de api rest, os controller devem ter no maximo 5 metodos (index, show, create, update, delete);
// são responsaveis apenas por receber as requisições das rotas, enviar para os arquivos fazerem todas as funcionalidades, e retorna o resultado;

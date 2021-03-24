import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    // instaciando no service que executa as regras de negocios;
    const createUser = new CreateUserService();

    // executando a regra de negocio do service, e retornando o resultado na const user;
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // removendo do user a chave password, para não ser retornado ao frontend;
    // @ts-expect-error Vai ocorrer um erro no delete user.password, mas vou ignorar
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;

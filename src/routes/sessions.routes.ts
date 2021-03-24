import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    // usando descontrução p pegar a chave "user" vinda do reponse;
    const { user, token } = await authenticateUser.execute({ email, password });

    // @ts-expect-error Vai ocorrer um erro no delete user.password, mas vou ignorar
    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;

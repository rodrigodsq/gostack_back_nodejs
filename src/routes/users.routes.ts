import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    // @ts-expect-error Vai ocorrer um erro no delete user.password, mas vou ignorar
    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;

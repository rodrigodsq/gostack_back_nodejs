import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticate users can change avatar.');
    }

    // caso ele ja tiver uma avatar, vamos apaga-lo para não ficar enchendo a memoria do meu server e add o novo;
    if (user.avatar) {
      // pegando o diretorio do arquivo(imagem);
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // verificando se o arquivo existe no diretorio;
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // apagando o arquivo com a funcao unlink do fs;
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  // private usersRepository: IUsersRepository   :   ja declarando uma var no paramentro do contrutor;
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticate users can change avatar.', 401);
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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

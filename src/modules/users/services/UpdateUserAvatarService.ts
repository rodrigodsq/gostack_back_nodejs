import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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
    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticate users can change avatar.', 401);
    }

    // caso ele ja tiver uma avatar, vamos apaga-lo para não ficar enchendo a memoria do meu server;
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    // add o novo avatar;
    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

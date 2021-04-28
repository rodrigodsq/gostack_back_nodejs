import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('user token does not exists');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('user does not exists');
    }

    const tokenCreateAt = userToken.created_at;

    const compareDate = addHours(tokenCreateAt, 2);

    // verificando se a data atual for maior que "compareDate" ja que o token de recuperação de senha tem limite de 2hrs;
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;

// userToken?.user_id  :   `o "?." significa pode ter ou não resposta, pode ser que volte com resultado ou undefined`;

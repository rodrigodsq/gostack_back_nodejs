import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

// interface basicamente são para definir tipagem como: os tipos dos paramentros, o tipo do objeto que vai ser retornado(como no authUserServ);
interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  // private usersRepository: IUsersRepository   :   ja declarando uma var no paramentro do contrutor;
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,

    // ja injetamos as funcionalidades de "BCryptHashProvider" (que esta sendo passado) na propriedade "hashProvider";
    @inject('HashProvider') private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  // Promise<User>  :   informando qual o tipo de retorno;
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    // Endereço de email já usado
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    //para remover o cache antigo pq ele foi alterado
    await this.cacheProvider.invalidatePrefix('providers-list')

    return user;
  }
}

export default CreateUserService;

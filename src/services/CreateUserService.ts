import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

// interface basicamente são para definir tipagem como: os tipos dos paramentros, o tipo do objeto que vai ser retornado(como no authUserServ);
interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // Promise<User>  :   informando qual o tipo de retorno;
  public async execute({ name, email, password }: Request): Promise<User> {
    // usaremos a const "userRepository" para fazer todas funcoes sql com a tabela users no BD, porem não salva, apenas salva quando eu chamo o metodo save();
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    // Endereço de email já usado
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // as alterações so irão ser enviada quando chegar aqui, por esse metodo save();
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;

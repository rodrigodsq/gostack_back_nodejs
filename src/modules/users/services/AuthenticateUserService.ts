import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  // private usersRepository: IUsersRepository   :   ja declarando uma var no paramentro do contrutor;
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorrect email/password combination.', 401);
    }

    // user.password - senha criptografada, ao buscar o email foi retornado os dados do usuario buscado, ai temos esses valores dentro de "user"
    // password - senha não criptografada;

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    // ñ usaremos await pois ñ retorna uma promisse, ao passar o mouse em cima verificamos o retorno que no caso é uma "string";
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;

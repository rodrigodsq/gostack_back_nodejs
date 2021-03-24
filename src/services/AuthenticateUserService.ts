import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('incorrect email/password combination.');
    }

    // user.password - senha criptografada, ao buscar o email foi retornado os dados do usuario buscado, ai temos esses valores dentro de "user"
    // password - senha não criptografada;

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('incorrect email/password combination.');
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

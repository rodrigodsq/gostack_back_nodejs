import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token JWT
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  // divindo o token no ' ' que fica entre o barer eo token e como o split gera um array, ai na primeira parte vem o Bearer e na segunda o token;
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // decoded as TokenPayload  :   Colocando(forcando) tipagem na const decode;
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}

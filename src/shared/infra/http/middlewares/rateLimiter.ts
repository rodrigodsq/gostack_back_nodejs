import { NextFunction, Request, Response } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5,      //quantas requisições vamos permitir por minuto por IP;
    duration: 1,     //duração, ou seja 5 req por segundo
    //blockDuration: 10   //tempo que deixaremos o usuario bloqueado dpois que ele atingiu o numero maximo de requisições;
})

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        await limiter.consume(request.ip)
        return next();
    } catch (error) {
       throw new AppError('Too many request', 429);
    }
}
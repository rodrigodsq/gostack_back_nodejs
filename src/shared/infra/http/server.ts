import uploadConfig from '@config/upload';
import '@shared/container';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.UploadsFolder));

app.use(routes);

app.use(errors());      //para pegar os errors do celebrate (no caso quando vem alguma informação da request vazia);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // verificando se o erro é uam instancia da class AppError, pq se for que dizer que é um error originado pela nossa aplicação
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error!!',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

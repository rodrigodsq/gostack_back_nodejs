// para sobreescrever uma tipagem dentro do express
// criar uma nova var dentro do express para guarda os valores passados no middlewares para as rotas;
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

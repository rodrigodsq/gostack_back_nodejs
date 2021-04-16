import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

// conteiner que serão usados pelos arquivos do services (o service busca pelo id a injeção desejado) para que não precisemos passar como paramentro o nosso repositorio no contructor dos services

// importamos esse arquivos no src/shared/container/index.ts (arquivos principal de injeção de dependencia);

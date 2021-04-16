import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DIskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DIskStorageProvider,
);

// o container desse arquivo, sera alocado no index do shared/container, para ser usado como inção de dependencia;

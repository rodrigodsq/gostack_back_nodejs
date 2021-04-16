import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DIskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.UploadsFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    // pegando a rota do arquivo;
    const filePath = path.resolve(uploadConfig.UploadsFolder, file);
    try {
      // veifica se encontramos o arquivos;
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // para apagar o arquivo;
    await fs.promises.unlink(filePath);
  }
}

export default DIskStorageProvider;

// fs.promises.rename   :   `move o arquivo de pasta, no caso movendo as imagens da pasta "tmp" para "tmp/uploads"`;

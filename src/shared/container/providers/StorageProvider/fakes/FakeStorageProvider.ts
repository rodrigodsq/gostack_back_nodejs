import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    // buscando arquivo do mesmo nome
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    // remover informação do array;
    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;

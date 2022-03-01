import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import mime from 'mime';

class DIskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
        region: 'us-east-1'
    })
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if(!ContentType) {
        throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
        Bucket: uploadConfig.config.aws.bucket,      //nome da pasta no s3
        Key: file,                      //nome do arquivo
        ACL: 'public-read',             //permissão
        Body: fileContent,               //conteudo do arquivo
        ContentType,                    //tipo do arquivo
        ContentDisposition: `inline; filename${file}`   //
    }).promise();                       // para aguardar finalizar

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file
    }).promise();
  }
}

export default DIskStorageProvider;

// fs.promises.rename   :   `move o arquivo de pasta, no caso movendo as imagens da pasta "tmp" para "tmp/uploads"`;

import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
import 'dotenv/config';

interface IUploadConfig {
	driver: 's3' | 'disk';
	tmpFolder: string;
	UploadsFolder: string;
	multer: {
		storage: StorageEngine
	}
	config: {
		disk: {},
        aws: {
            bucket: string
        }
	}
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  UploadsFolder: path.resolve(tmpFolder, 'uploads'),

	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename(request, file, callback) {
				const fileHash = crypto.randomBytes(10).toString('hex'); // criando um hash de 10 caracter hexadecial;
				const fileName = `${fileHash}-${file.originalname}`;

				return callback(null, fileName);
			},
		}),
	},
	config: {
		disk: {},
        aws: {
            bucket: 's3-gobarber-app',
        }
	}
} as IUploadConfig;
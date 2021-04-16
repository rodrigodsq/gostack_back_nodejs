import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;

// generateHash : para criptografar uma senha (transforma em hash) utilizado em cadastro;
// compareHash : compara a senha passada com a senha armazenada criptografada, para autenticação;

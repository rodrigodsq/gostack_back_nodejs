import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>; // declarando função de interface para buscar por id e que retorna um User;
  findByEmail(email: string): Promise<User | undefined>; // declarando função de interface para buscar por email e que retorna um User;
  create(data: ICreateUserDTO): Promise<User>; // declarando função de interface para criar usuario e que retorna um User;
  save(user: User): Promise<User>; // declarando função de interface para salvar o usuario no bd e que retorna um User;
}

// interface apenas para mostrar quais metodos devemos ter dentro do repositories real que esta dentro da infra;
// para caso nos troquemos de tecnologia/orm sabemos quais metodos esse novo orm deve ter..

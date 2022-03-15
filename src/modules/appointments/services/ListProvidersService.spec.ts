import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCachedProvider from '@shared/container/providers/CacheProvider/fakes/FakeCachedProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCachedProvider: FakeCachedProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCachedProvider = new FakeCachedProvider();

    listProviders = new ListProvidersService(
        fakeUsersRepository,
        fakeCachedProvider
    );
  });

  // testando a busca por todos os prestadores, exceto o de id passado;
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});

// diferente do toBe() que verifica se é a mesma variavel, o toEqual() verifica se os valores são iguais/parecidos;

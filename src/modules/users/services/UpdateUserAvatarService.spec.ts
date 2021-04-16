import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  // testar upload de avatar;
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const UpdateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await UpdateUserAvatar.execute({
      user_id: (await user).id,
      avatarFilename: 'avatar.jpg',
    });

    expect((await user).avatar).toBe('avatar.jpg');
  });

  // verificar upload de avatar com id de usuario não existente;
  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const UpdateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      UpdateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // deve apagar o avatar antigo quando tiver atualizando um novo;
  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    // para espionar a função deleteFile de "fakeStorageProvider", retorna a função;
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const UpdateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await UpdateUserAvatar.execute({
      user_id: (await user).id,
      avatarFilename: 'avatar.jpg',
    });

    await UpdateUserAvatar.execute({
      user_id: (await user).id,
      avatarFilename: 'avatar2.jpg',
    });

    // verifica se na função "deleteFile" foi passado a string "avatar.jpg" como paramentro;
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    // verifica se o avatar retornado é o "avatar2.jpg";
    expect((await user).avatar).toBe('avatar2.jpg');
  });
});

// spyOn  : `serve para espionar se alguma função da nossa aplicação foi executada`;
// toHaveBeenCalled : `serve para verificar se a função passada como parametro foi chamada/executada`;
// toHaveBeenCalledWith : `serve para verificar se a função passada como parametro foi chamada/executada` com um parametro especifo (no caso avatar.jpg);

// expect()   :   significa "o que espero", onde colocamos o codigo ou a função que desejamos executar/testar;
// toBe()   :   `significa "que seja", onde colocamos o resultado esperado do teste`;
// toHaveProperty() :  `espera que tenha a propriedade passa por paramentro no elemento esperado`;
// describe() : utilizado para dividir os testes, para não serem todos iguais, com um paramentro de identificador;
// it()   :   tipo uma descrição de cada teste;
// rejects :  espera que retorne algum error
// toBeInstanceOf : espera que seja uma instancia de determinado elemento;

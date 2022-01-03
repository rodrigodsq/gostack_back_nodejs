import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

// devido ao codigo muito repetitivo, vamos iniciar essas var de forma global no arquivo;
let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  // beforeEach(): sempre disparada antes dos testes, no caso ja instancia o objeto antes de cada teste;
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  // teste para impedir de um usuario não cadastrado faça um recuperação de senha;
  it('should not be able to recover a non-existing use password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token ', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

// spyOn  : `serve para espionar se alguma função da nossa aplicação foi executada, saber se um metodo de alguma classe foi chamado`;
// toHaveBeenCalled : `serve para verificar se a função passada como parametro foi chamada/executada`;
// toHaveBeenCalledWith : `serve para verificar se a função passada como parametro foi chamada/executada` com um parametro especifo (no caso ...);

// expect()   :   significa "o que espero", onde colocamos o codigo ou a função que desejamos executar/testar;
// toBe()   :   `significa "que seja", onde colocamos o resultado esperado do teste`;
// toHaveProperty() :  `espera que tenha a propriedade passa por paramentro no elemento esperado`;
// describe() : utilizado para dividir os testes, para não serem todos iguais, com um paramentro de identificador;
// it()   :   tipo uma descrição de cada teste;
// rejects :  espera que retorne algum error
// toBeInstanceOf : espera que seja uma instancia de determinado elemento;

// beforeEach() :   função que é disparada sempre antes do teste

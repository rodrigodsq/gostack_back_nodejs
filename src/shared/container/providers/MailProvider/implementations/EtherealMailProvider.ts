import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  // injeção de dependendia na dependencia que tbm vai ser injeção de dependencia;
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    // criando conta de teste;
    this.createClient();
    // nodemailer.createTestAccount().then(account => {
    //   const transporter = nodemailer.createTransport({
    //     host: account.smtp.host,
    //     port: account.smtp.port,
    //     secure: account.smtp.secure,
    //     auth: {
    //       user: account.user,
    //       pass: account.pass,
    //     },
    //   });

    //   this.client = transporter;
    // });
  }

  //change
  private async createClient() {
    try {
      const account = await nodemailer.createTestAccount();
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    if (!this.client) await this.createClient();    //change
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Gobarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

// arquivo com as configurações da tacnologia de envio de email;

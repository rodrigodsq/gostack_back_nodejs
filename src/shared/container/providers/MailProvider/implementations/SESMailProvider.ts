import mailConfig from '@config/mail';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
//import aws from 'aws-sdk';
import 'dotenv/config';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  // injeção de dependendia na dependencia que tbm vai ser injeção de dependencia;
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    //   this.client = nodemailer.createTransport({
    //       SES: new aws.SES({
    //           apiVersion: '2010-12-01',
    //           region: 'us-east-1',
    //           credentials: {
    //               accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    //               secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    //           }
    //       })
    //   })

    this.client = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'oneforasteiro@gmail.com',
            pass: ''
        }
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
        from: {
          name: from?.name || name,
          address: from?.email || email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
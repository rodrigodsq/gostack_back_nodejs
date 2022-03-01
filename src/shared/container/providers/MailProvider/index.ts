import mailConfig from '@config/mail';
import { container } from 'tsyringe';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider)     // injetando do msm jeito que fazemos nos controllers;
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    providers[mailConfig.driver]   //no mailConfig.driver vem a informação de qual provider vamos escolher;
  );

//fica todos os providers de email, para ajudar na injeção de dependencia no providers/index.ts
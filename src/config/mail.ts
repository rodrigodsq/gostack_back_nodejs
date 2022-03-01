import 'dotenv/config';

interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from : {
            email: 'oneforasteiro@gmail.com',
            name: 'oneforasteiro'
        }
    }
} as IMailConfig;



// as : é para definir a tipagem;

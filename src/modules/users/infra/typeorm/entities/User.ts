/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
// import uploadConfig from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid') // gerar automaticamente um id unico usando uuid;
  id: string;

  @Column() // se não passar nada ele deixa como default varchar;
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude() // utilizado para remover esse campo de retorna para o front-end
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' }) // cria um novo campo para expor ao front-end;
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;

    // switch (uploadConfig.driver) {
    //   case 'disk':
    //     return `${process.env.APP_API_URL}/files/${this.avatar}`;
    //   case 's3':
    //     return `https://${uploadConfig.config.aws.bucket}.s3.amazonas.com/${this.avatar}`;
    //   default:
    //     return null;
    // }
  }
}

export default User;

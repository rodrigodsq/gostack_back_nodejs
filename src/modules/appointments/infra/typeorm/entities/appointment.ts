/* eslint-disable camelcase */
import User from '@modules/users/infra/typeorm/entities/User';
import
    {
        Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
    } from 'typeorm';


@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // gerar automaticamente um id unico usando uuid;
  id: string;

  @Column() // se não passar nada ele deixa como default varchar;
  provider_id: string;

  @ManyToOne(() => User) // Declaramos qual tabela usar, defindo como uma FK de Muitos para um;
  @JoinColumn({ name: 'provider_id' }) // informando qual a coluna(provider_id) que vai ser FK;
  provider: User;

  @Column()
  user_id: string;      //id do usuario que vai fazer o agendamento

  //relacionamento com a tebela de usuario
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;


// @ManyToOne(() => User, {eager: true})
//eager: ao trazer os dados, ele traz todos os dados de usuario (nome e etc..)
//lazy: traz os dados, permite trazer atraves de relacionamento
//eager loading: cria apenas uma query para chamar varios relacionamentos com determinado registro;
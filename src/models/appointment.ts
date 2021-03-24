/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // gerar automaticamente um id unico usando uuid;
  id: string;

  @Column() // se não passar nada ele deixa como default varchar;
  provider_id: string;

  @ManyToOne(() => User) // Declaramos qual tabela usar, defindo como uma FK de Muitos para um;
  @JoinColumn({ name: 'provider_id' }) // informando qual a coluna(provider_id) que vai ser FK;
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;

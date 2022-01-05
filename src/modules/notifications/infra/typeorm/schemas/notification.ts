import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('notifications')        //nome do schema (tabela) no mongo;
class Notification {

    @ObjectIdColumn()           // definindo como do tipo "ObjectID"
    id: ObjectID;               //no mongo não é armazenado id no formato uuid, mas no formato "ObjectID"

    @Column()
    content: string;

    @Column('uuid')
    recipient_id: string;       // usuario a quem a notificação vai ser enviada;

    @Column({ default: false})      //definindo a coluna por padrão como false;
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Notification;
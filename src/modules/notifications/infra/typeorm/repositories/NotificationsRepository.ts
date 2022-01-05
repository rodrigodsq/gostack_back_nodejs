
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Notification from '../schemas/notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
        content,
        recipient_id
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;

// this.ormRepository = getMongoRepository(Notification, 'mongo');
// sempre que for usar uma conexão que não for a default (no ormconfig.json) devemos passar o nome da conexão como parametro, no caso é 'mongo';
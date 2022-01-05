import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/notification';

export default interface INotificationsRepository {
    create(data: ICreateNotificationDTO): Promise<Notification>
}
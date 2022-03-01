import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToPlain(user));
  }
}

// seguindo os principios de api rest, os controller devem ter no maximo 5 metodos (index, show, create, update, delete);

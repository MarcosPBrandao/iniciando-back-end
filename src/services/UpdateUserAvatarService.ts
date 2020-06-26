import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/Users';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
      const usersRepository = getRepository(User);

      const user = await usersRepository.findOne(user_id);

      if (!user) {
          throw new AppError('Only authenticated users can change avatar.', 401);
      } 
      if (user.avatar) {
         const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
         try {
            if (fs.existsSync(userAvatarFilePath)) {
                fs.unlinkSync(userAvatarFilePath);
            }
          } catch(err) {
            console.error(err)
          }
      }

      user.avatar = avatarFilename;

      await usersRepository.save(user)

      return user;

    }
}

export default UpdateUserAvatarService;
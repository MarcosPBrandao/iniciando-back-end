import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import updateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticates from '../middlewares/EnsureAuthenticated'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
const usersRouter = Router();   
const upload = multer(uploadConfig); 

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const CreateUser = new CreateUserService();

    const user = await CreateUser.execute({
        name,
        email,
        password
    })

    delete user.password;

    return response.json(user);

})

usersRouter.patch(
   '/avatar', 
   ensureAuthenticates, 
   upload.single('avatar'), 
   async (request, response) => {
      const updateUserAvatarService = new UpdateUserAvatarService(); 
      const user = await updateUserAvatarService.execute({
          user_id: request.user.id,
          avatarFilename: request.file.filename
      })
      delete user.password;
      return response.json(user); 
});

export default usersRouter;
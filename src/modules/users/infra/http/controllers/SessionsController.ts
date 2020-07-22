import { Request, Response } from 'express';
import { container } from 'tsyringe';

//import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionsController {
  
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    console.log('NewSessionController');
    const authenticateUser = container.resolve(AuthenticateUserService);
    console.log('authenticateUser');
    const { user, token } = await authenticateUser.execute({
        email,
        password
    })

    delete user.password;

    return response.json({ user, token });
  }   
}
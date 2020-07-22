import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    console.log('solicitandocreateuser');
    const CreateUser = container.resolve(CreateUserService);
    console.log('solicitandoresolveuser');
    const user = await CreateUser.execute({
        name,
        email,
        password
    })

    delete user.password;

    return response.json(user);


  } 
}
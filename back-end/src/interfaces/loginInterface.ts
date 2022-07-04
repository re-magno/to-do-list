import { Request, Response, NextFunction } from 'express';
import { LoginType } from '../@types/loginType';

export interface ILoginController {
  login(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export interface ILoginService {
  login(email: string) : Promise<LoginType>;
}

export interface IUserModel {
  findOrCreate(email: string) : Promise<string>;
}

export interface ILogin {
  email: string;
}


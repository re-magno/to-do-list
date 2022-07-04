import { Request, Response, NextFunction } from 'express';
import { ILoginController, ILoginService } from '../interfaces/loginInterface';

export default class LoginController implements ILoginController {
  private _loginSevice: ILoginService;

  constructor(loginService: ILoginService) {
    this._loginSevice = loginService;
  }
  
  async login(req: Request, res: Response, next: NextFunction) : Promise<Response | void> {
    try {
      const { email } = req.body;
      const login = await this._loginSevice.login(email);
      return res.status(200).json(login);
    } catch (error) {
      console.log(error);
      
    }
  }
}
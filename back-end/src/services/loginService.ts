import Jwt from "../utils/auth/jwt";
import { LoginType } from "../@types/loginType";
import { ILoginService, IUserModel } from "../interfaces/loginInterface";

export default class LoginService implements ILoginService {
  private _userModel : IUserModel;
  
  constructor(userModel: IUserModel) {
    this._userModel = userModel;
}

  private getToken(id: string): string {
    return Jwt.createToken(id);
  }

  async login(email: string): Promise<LoginType> {
    const user = await this._userModel.findOrCreate(email);
    const token = this.getToken(user);
    return {
      user,
      token
    }
  }
}
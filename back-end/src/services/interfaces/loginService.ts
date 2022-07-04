import { LoginType } from "../@types/loginType";

export default interface ILoginService {
  login(email: string) : Promise<LoginType>;
}
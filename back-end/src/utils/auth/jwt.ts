import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

export default class Jwt {
  private static _jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  static createToken = (id: string) : string => {
    dotenv.config();
    const { expiresIn, algorithm } = this._jwtConfig;
    const secret = process.env.SECRET || 'secretJWT';
    const token = jwt.sign({ id }, secret, { expiresIn, algorithm });
    return token;
  };

  static validate = (payload: string): jwt.JwtPayload => {
    const secret = process.env.SECRET || 'secretJWT';
    const data = jwt.verify(payload, secret);
    return data as jwt.JwtPayload;
  };
}

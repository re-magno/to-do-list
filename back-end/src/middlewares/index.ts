import { ErrorRequestHandler, RequestHandler } from 'express';
import HttpError from '../utils/errors/HttpError';
import joi from 'joi';
import { BadRequest } from '../utils/errors';
import { ILogin } from '../interfaces/loginInterface';
import { Unauthorized } from '../utils/errors/Unauthorized';
import Jwt from '../utils/auth/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';

export default class Middlewares {
  public static error: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof HttpError) {
      const { httpCode, message } = err;
      return res.status(httpCode).json({ message });
    };
    console.log('error >>>>>>', err);
    return res.status(500).json({ message: 'Internal server error' });
  };

  private static _loginSchema = joi.object({
    email: joi.string().email().required(),
  });

  public static loginValidation: RequestHandler = (req, _res, next) => {
    const { email } = req.body as ILogin;
    const { error } = Middlewares._loginSchema.validate({ email });

    if(error) return next(new BadRequest(error.message));
    next();
  };

  public static tokenValidation: RequestHandler = (req, _res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return next(new Unauthorized('Token is required', 401));

    try {
      const user = Jwt.validate(authorization);
      req.body.user = user.id;
      next();
    } catch (error) {
      return next(new Unauthorized('Invalid token', 401));
    };
  };
}

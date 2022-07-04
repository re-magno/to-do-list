import { ErrorRequestHandler, RequestHandler } from 'express';
import HttpError from '../utils/errors/HttpError';
import joi from 'joi';
import { ILogin } from '../interfaces';
import { BadRequest } from '../utils/errors';

export default class Middlewares {
  public static error: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof HttpError) {
      const { httpCode, message } = err;

      return res.status(httpCode).json({ message });
    }
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
}

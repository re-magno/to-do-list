import { ErrorRequestHandler } from 'express';
import HttpError from '../utils/errors/HttpError';

export default class Middlewares {
  public static error: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof HttpError) {
      const { httpCode, message } = err;

      return res.status(httpCode).json({ message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  };
}

import HttpError from './HttpError';

export class BadRequest extends HttpError {
  public httpCode: number;

  constructor(message = 'Bad request' , httpCode = 400) {
    super(message);

    this.httpCode = httpCode;
  }
}
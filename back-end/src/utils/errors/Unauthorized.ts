import HttpError from './HttpError';

export class Unauthorized extends HttpError {
  public httpCode: number;

  constructor(message = 'Unauthorized', httpCode = 401) {
    super(message);

    this.httpCode = httpCode;
  }
}
import HttpError from './HttpError';

export class NotFound extends HttpError {
  public httpCode: number;

  constructor(message = 'Not found', httpCode = 404) {
    super(message);

    this.httpCode = httpCode;
  }
}
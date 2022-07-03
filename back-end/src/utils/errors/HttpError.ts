export default abstract class HttpError extends Error {
  public abstract httpCode: number;
}
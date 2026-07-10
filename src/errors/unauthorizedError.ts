/**
 *
 * UnauthorizedError should be used when the user is not authorized/authenticated for the service requested.
 */
export default class UnauthorizedError extends Error {
  private readonly _status = 401;
  private _data: object | [] = {};

  get statusCode(): number {
    return this._status;
  }

  get data(): object {
    return this._data;
  }
  set data(errorData: object) {
    this._data = errorData;
  }
}

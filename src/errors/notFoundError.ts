/**
 *
 * NotFoundError should be used when the requested data is missing.
 */
export default class NotFoundError extends Error {
  private readonly _status = 404;
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

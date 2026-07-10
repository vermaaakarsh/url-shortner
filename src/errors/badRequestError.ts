/**
 *
 * BadRequestError should be used when there is some missing data in the request or the request itself is invalid.
 */
export default class BadRequestError extends Error {
  private readonly _status = 400;
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

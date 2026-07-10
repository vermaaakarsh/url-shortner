/**
 *
 * CustomError is the default project error and should be used when custom status code is to be passed
 * or when server error with custom message is to be thrown.
 */

export default class CustomError extends Error {
  private _status = 0;
  private _data: object | [] = {};

  get statusCode(): number {
    return this._status;
  }
  set statusCode(statusCode: number) {
    this._status = statusCode;
  }

  get data(): object {
    return this._data;
  }
  set data(errorData: object) {
    this._data = errorData;
  }
}

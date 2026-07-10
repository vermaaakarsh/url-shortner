/**
 *
 * ForbiddenError should be used when the requested service is forbidden for the user.
 */

export default class ForbiddenError extends Error {
  private readonly _status = 403;
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

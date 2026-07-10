/**
 *
 * UnprocessableEntityError should be used when the data provided for the requested service is not valid.
 */
export default class UnprocessableEntityError extends Error {
  private readonly _status = 422;
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

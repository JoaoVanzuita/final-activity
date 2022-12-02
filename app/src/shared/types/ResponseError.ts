export class ResponseError {
  public readonly message: String

  public readonly statusCode: number

  constructor(messsage: String, statusCode: number) {
    this.message = messsage
    this.statusCode = statusCode
  }
}

export class BadRequestError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = 400
    Error.captureStackTrace(this, BadRequestError)
  }
}

export enum ErrorType  {
  INVALID_SIGNATURE = 'invalid_signature',
}

export default class WebhookError extends Error {
  public type: ErrorType

  constructor(type: ErrorType, message?: string) {
    super()
    this.type = type
  }
}

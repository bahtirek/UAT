export interface Screenshot {
  uuid?: string,
  screenshotId?: number,
  blob?: string,
  testStepExecutionId?: number
}

export interface ServerResponse <T> {
  result: T
}

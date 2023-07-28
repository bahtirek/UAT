export interface Browser {
  browserId?: number,
  name?: string,
  state?: boolean
}

export interface ServerResponse <T> {
  result: T
}

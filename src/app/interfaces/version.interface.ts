export interface Version {
  versionId?: number,
  name?: string,
  productId?: number
}

export interface ServerResponse <T> {
  result: T
}

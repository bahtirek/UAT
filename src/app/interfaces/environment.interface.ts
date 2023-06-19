export interface Environment {
    environmentId?: number,
    productId?: number,
    name?: string
}

export interface ServerResponse <T> {
  result: T
}
